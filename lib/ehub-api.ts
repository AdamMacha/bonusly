import { prisma } from "@/lib/db";
import { calculateCashbackSplit } from "@/lib/cashback";
import { getResendClient } from "@/lib/resend";
import { TransactionStatus } from "@prisma/client";

const EHUB_API_BASE = "https://api.ehub.cz/v3";

export interface RawEhubTransaction {
  id?: string | number;
  transactionId?: string | number;
  orderId?: string | number | null;
  campaignId?: string | null;
  campaignName?: string | null;
  program?: string | null;
  status?: string | null;
  payoutStatus?: string | null;
  commission?: number | string | null;
  commissionPublisher?: number | string | null;
  orderAmount?: number | string | null;
  amount?: number | string | null;
  clickData1?: string | null;
  clickData2?: string | null;
  data1?: string | null;
  data2?: string | null;
  dateInserted?: string | null;
  createdAt?: string | null;
  [key: string]: unknown;
}

export interface EhubSyncResult {
  success: boolean;
  fetchedCount: number;
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  message: string;
}

function parseNumber(val: unknown): number {
  if (typeof val === "number") return Number.isFinite(val) ? Math.max(0, val) : 0;
  if (typeof val === "string") {
    const cleaned = val.replace(",", ".").replace(/[^0-9.-]/g, "");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }
  return 0;
}

/**
 * Normalizuje stav transakce z eHUBu.
 * DŮLEŽITÉ: pm_preapproved (Předschváleno) zůstává PENDING — uživatel dostane
 * schválený zůstatek až po finálním pm_approved / approved / schváleno!
 */
export function normalizeEhubStatus(raw?: string | null): TransactionStatus {
  if (!raw) return TransactionStatus.PENDING;
  const s = raw.toLowerCase().trim();

  if (
    s === "pm_approved" ||
    s === "approved" ||
    s === "schvaleno" ||
    s === "schváleno" ||
    s === "confirmed" ||
    s === "accepted" ||
    s === "1"
  ) {
    return TransactionStatus.APPROVED;
  }

  if (
    s === "declined" ||
    s === "rejected" ||
    s === "zamitnuto" ||
    s === "zamítnuto" ||
    s === "cancelled" ||
    s === "canceled" ||
    s === "2"
  ) {
    return TransactionStatus.REJECTED;
  }

  return TransactionStatus.PENDING;
}

function extractTransactionsArray(payload: unknown): RawEhubTransaction[] {
  if (Array.isArray(payload)) {
    return payload as RawEhubTransaction[];
  }
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const key of ["transactions", "items", "data", "results"]) {
      if (Array.isArray(obj[key])) {
        return obj[key] as RawEhubTransaction[];
      }
    }
  }
  return [];
}

function readStringField(row: RawEhubTransaction, keys: string[]): string | null {
  for (const key of keys) {
    const val = row[key];
    if (val !== undefined && val !== null && String(val).trim() !== "") {
      return String(val).trim();
    }
  }
  return null;
}

/**
 * Stáhne transakce z eHUB API v3 za posledních N dní a idempotentně je
 * propíše do tabulky Transaction (včetně rozpočtu 50/50 a bezpečných stavových přechodů).
 */
export async function syncEhubTransactions(options?: {
  trigger?: "cron" | "manual";
  lookbackDays?: number;
}): Promise<EhubSyncResult> {
  const trigger = options?.trigger ?? "manual";
  const lookbackDays = options?.lookbackDays ?? 90;

  const apiKey = process.env.EHUB_API_KEY?.trim();
  const publisherId = (process.env.EHUB_PUBLISHER_ID || "2eb84bd5").trim();

  if (!apiKey) {
    const msg = "Chybí proměnná prostředí EHUB_API_KEY (nastavte ji z pm.ehub.cz/api/).";
    await prisma.ehubSyncLog.create({
      data: { trigger, status: "error", message: msg },
    });
    return {
      success: false,
      fetchedCount: 0,
      createdCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      message: msg,
    };
  }

  const now = new Date();
  const fromDate = new Date(now.getTime() - lookbackDays * 24 * 60 * 60 * 1000);
  const formatIso = (d: Date) => d.toISOString().slice(0, 19).replace("T", " ");

  const allRows: RawEhubTransaction[] = [];
  const maxPages = 10;

  try {
    for (let page = 1; page <= maxPages; page++) {
      const params = new URLSearchParams({
        apiKey,
        fromDateTime: formatIso(fromDate),
        toDateTime: formatIso(now),
        page: String(page),
        perPage: "100",
      });

      const res = await fetch(
        `${EHUB_API_BASE}/publishers/${encodeURIComponent(publisherId)}/transactions?${params.toString()}`,
        {
          headers: { Accept: "application/json" },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`eHUB API vrátilo HTTP ${res.status}: ${errText.slice(0, 200)}`);
      }

      const json: unknown = await res.json();
      const rows = extractTransactionsArray(json);
      allRows.push(...rows);

      if (rows.length < 100) {
        break;
      }
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Neznámá chyba při volání eHUB API v3";
    await prisma.ehubSyncLog.create({
      data: { trigger, status: "error", message },
    });
    return {
      success: false,
      fetchedCount: allRows.length,
      createdCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      message,
    };
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  const approvedEmailsToSend: Array<{
    email: string;
    amount: number;
    offerName: string;
  }> = [];

  for (const row of allRows) {
    const affiliateId = readStringField(row, ["id", "transactionId", "transaction_id"]);
    const clickData1 = readStringField(row, ["clickData1", "data1", "click_data_1", "sub_id"]);
    const clickData2 = readStringField(row, ["clickData2", "data2", "click_data_2"]);
    const campaignId = readStringField(row, ["campaignId", "campaign_id"]);
    const campaignName = readStringField(row, ["campaignName", "campaign_name", "program"]);
    const orderId = readStringField(row, ["orderId", "order_id"]);
    const payoutStatus = readStringField(row, ["payoutStatus", "payout_status"]);
    const rawStatus = readStringField(row, ["status", "state"]);
    const grossCommission = parseNumber(
      row.commission ?? row.commissionPublisher ?? row.commission_publisher ?? 0
    );
    const orderAmount = parseNumber(row.orderAmount ?? row.order_amount ?? row.amount ?? 0);

    if (!affiliateId || grossCommission <= 0) {
      skippedCount++;
      continue;
    }

    // 1. Spárování kliku (data2) a uživatele (data1 nebo fallback z Click)
    const matchedClick = clickData2
      ? await prisma.click.findUnique({
          where: { id: clickData2 },
          select: { id: true, userId: true, offerId: true },
        })
      : null;

    const userLookup = clickData1 || matchedClick?.userId || null;
    if (!userLookup) {
      // Transakce bez přiřazeného registrovaného uživatele (anonymní proklik)
      skippedCount++;
      continue;
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ id: userLookup }, { email: userLookup }] },
      select: { id: true, email: true },
    });

    if (!user) {
      skippedCount++;
      continue;
    }

    // 2. Spárování nabídky (z Clicku nebo podle ehubCampaignId)
    const offer = matchedClick?.offerId
      ? await prisma.offer.findUnique({
          where: { id: matchedClick.offerId },
          select: {
            id: true,
            name: true,
            cashbackAllowed: true,
            cashbackSharePct: true,
          },
        })
      : campaignId
        ? await prisma.offer.findFirst({
            where: { ehubCampaignId: campaignId },
            select: {
              id: true,
              name: true,
              cashbackAllowed: true,
              cashbackSharePct: true,
            },
          })
        : null;

    // 3. Tvrdý zámek: pokud nabídka zakazuje cashback, uživateli se cashback nepřipisuje
    if (offer && !offer.cashbackAllowed) {
      skippedCount++;
      continue;
    }

    const split = calculateCashbackSplit(grossCommission, offer?.cashbackSharePct);
    const status = normalizeEhubStatus(rawStatus);
    const description =
      campaignName || offer?.name || `eHUB konverze #${affiliateId}`;

    const actionResult = await prisma.$transaction(async (tx) => {
      const existing = await tx.transaction.findFirst({
        where: { affiliateId, source: "eHUB" },
      });

      if (existing) {
        const oldStatus = existing.status;
        const oldAmount = existing.amount;
        let newlyApproved = false;

        if (
          oldStatus !== TransactionStatus.APPROVED &&
          status === TransactionStatus.APPROVED &&
          split.userCashback > 0
        ) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { increment: split.userCashback } },
          });
          newlyApproved = true;
        } else if (
          oldStatus === TransactionStatus.APPROVED &&
          status === TransactionStatus.REJECTED &&
          oldAmount > 0
        ) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { decrement: oldAmount } },
          });
        } else if (
          oldStatus === TransactionStatus.APPROVED &&
          status === TransactionStatus.APPROVED &&
          Math.abs(split.userCashback - oldAmount) >= 0.01
        ) {
          const delta = Math.round((split.userCashback - oldAmount) * 100) / 100;
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { increment: delta } },
          });
        }

        await tx.transaction.update({
          where: { id: existing.id },
          data: {
            offerId: offer?.id ?? existing.offerId,
            clickId: matchedClick?.id ?? existing.clickId,
            orderId: orderId ?? existing.orderId,
            orderAmount: orderAmount > 0 ? orderAmount : existing.orderAmount,
            grossCommission: split.grossCommission,
            cashbackSharePct: split.cashbackSharePct,
            amount: split.userCashback,
            platformProfit: split.platformProfit,
            status,
            payoutStatus: payoutStatus ?? existing.payoutStatus,
            description,
          },
        });

        return { action: "updated" as const, newlyApproved };
      }

      await tx.transaction.create({
        data: {
          userId: user.id,
          offerId: offer?.id ?? null,
          clickId: matchedClick?.id ?? null,
          orderId,
          orderAmount: orderAmount > 0 ? orderAmount : null,
          grossCommission: split.grossCommission,
          cashbackSharePct: split.cashbackSharePct,
          amount: split.userCashback,
          platformProfit: split.platformProfit,
          status,
          payoutStatus,
          source: "eHUB",
          affiliateId,
          description,
        },
      });

      let newlyApproved = false;
      if (status === TransactionStatus.APPROVED && split.userCashback > 0) {
        await tx.user.update({
          where: { id: user.id },
          data: { balance: { increment: split.userCashback } },
        });
        newlyApproved = true;
      }

      return { action: "created" as const, newlyApproved };
    });

    if (actionResult.action === "created") createdCount++;
    else updatedCount++;

    if (actionResult.newlyApproved && user.email && split.userCashback > 0) {
      approvedEmailsToSend.push({
        email: user.email,
        amount: split.userCashback,
        offerName: offer?.name || description,
      });
    }
  }

  // Odeslání e-mailů o schváleném cashbacku (neblokuje sync při chybě)
  const resend = getResendClient();
  if (resend && approvedEmailsToSend.length > 0) {
    for (const notice of approvedEmailsToSend) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "BONUSLY <onboarding@resend.dev>",
          to: notice.email,
          subject: `Cashback ${notice.amount.toLocaleString("cs-CZ")} Kč byl schválen! 🎉 | BONUSLY`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0B1220;">
              <h2 style="color: #10B981;">Váš cashback byl schválen 🎉</h2>
              <p>Dobrý den,</p>
              <p>partner <strong>${notice.offerName}</strong> potvrdil vaši transakci a do vaší peněženky BONUSLY jsme právě připsali <strong>${notice.amount.toLocaleString("cs-CZ")} Kč</strong>.</p>
              <p>Jakmile váš schválený zůstatek dosáhne 500 Kč, můžete si peníze nechat kdykoliv vyplatit na svůj bankovní účet v sekci Moje peněženka.</p>
              <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
              <p style="color: #94A3B8; font-size: 12px;">Tým BONUSLY.cz</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("[eHUB Sync] E-mail o schváleném cashbacku nebyl odeslán:", mailErr);
      }
    }
  }

  const message = `Staženo ${allRows.length} transakcí z eHUB API: ${createdCount} nových, ${updatedCount} aktualizovaných, ${skippedCount} přeskočených.`;

  await prisma.ehubSyncLog.create({
    data: {
      trigger,
      status: "success",
      fetchedCount: allRows.length,
      createdCount,
      updatedCount,
      skippedCount,
      message,
    },
  });

  return {
    success: true,
    fetchedCount: allRows.length,
    createdCount,
    updatedCount,
    skippedCount,
    message,
  };
}
