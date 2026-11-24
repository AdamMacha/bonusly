import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TransactionStatus } from "@prisma/client";

/**
 * Normalizuje stav konverze z eHUB do naší databázové reprezentace.
 */
function normalizeStatus(rawStatus: string | null | undefined): TransactionStatus {
  if (!rawStatus) return TransactionStatus.PENDING;
  const s = String(rawStatus).toLowerCase().trim();

  if (
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
    s === "rejected" ||
    s === "zamitnuto" ||
    s === "zamítnuto" ||
    s === "cancelled" ||
    s === "canceled" ||
    s === "declined" ||
    s === "2"
  ) {
    return TransactionStatus.REJECTED;
  }

  return TransactionStatus.PENDING;
}

/**
 * Bezpečně převede hodnotu provize na číslo.
 */
function parseAmount(rawAmount: any): number {
  if (typeof rawAmount === "number") return rawAmount;
  if (!rawAmount) return 0;
  const cleaned = String(rawAmount).replace(",", ".").replace(/[^0-9.-]/g, "");
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : Math.max(0, val);
}

/**
 * Zpracuje příchozí data z webhooku (GET i POST).
 */
async function handleWebhook(request: NextRequest) {
  const url = new URL(request.url);

  // 1. Ověření volitelného tajného klíče (EHUB_WEBHOOK_SECRET)
  const webhookSecret = process.env.EHUB_WEBHOOK_SECRET;
  if (webhookSecret && webhookSecret.trim() !== "") {
    const providedSecret =
      url.searchParams.get("secret") || request.headers.get("x-ehub-secret");
    if (providedSecret !== webhookSecret) {
      return NextResponse.json(
        { error: "Neplatný nebo chybějící tajný klíč (secret)" },
        { status: 401 }
      );
    }
  }

  // 2. Extrakce parametrů (z query stringu i z těla požadavku pro POST)
  let bodyData: Record<string, any> = {};
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        bodyData = await request.json();
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const formData = await request.formData();
        bodyData = Object.fromEntries(formData.entries());
      }
    } catch {
      // Ignorujeme chyby parsování těla, parametry mohou být v URL query
    }
  }

  // Sjednotíme parametry s předností těla požadavku
  const getParam = (key: string): string | undefined => {
    return bodyData[key] !== undefined
      ? String(bodyData[key])
      : url.searchParams.get(key) || undefined;
  };

  const subId =
    getParam("sub_id") ||
    getParam("subid") ||
    getParam("data1") ||
    getParam("data") ||
    getParam("user_id") ||
    getParam("userId");

  const affiliateId =
    getParam("transaction_id") ||
    getParam("id") ||
    getParam("order_id") ||
    getParam("conversion_id") ||
    getParam("affiliate_id") ||
    null;

  const rawStatus =
    getParam("status") ||
    getParam("state") ||
    getParam("conversion_status");

  const rawAmount =
    getParam("amount") ||
    getParam("commission") ||
    getParam("commission_publisher") ||
    getParam("payout") ||
    getParam("reward") ||
    "0";

  const description =
    getParam("description") ||
    getParam("campaign_name") ||
    getParam("offer_name") ||
    (affiliateId ? `eHUB konverze #${affiliateId}` : "Odměna z eHUB");

  if (!subId) {
    return NextResponse.json(
      { error: "Chybí povinný parametr sub_id (identifikátor uživatele)" },
      { status: 400 }
    );
  }

  const amount = parseAmount(rawAmount);
  const status = normalizeStatus(rawStatus);

  // 3. Nalezení uživatele podle sub_id (id nebo email)
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ id: subId }, { email: subId }],
    },
  });

  if (!user) {
    console.warn(`[eHUB Webhook] Uživatel pro sub_id "${subId}" nebyl v databázi nalezen.`);
    // Vracíme 200, aby eHUB nepokračoval v nekonečných retries, s informací o výsledku
    return NextResponse.json(
      {
        success: false,
        message: `Uživatel pro sub_id ${subId} nebyl nalezen.`,
      },
      { status: 200 }
    );
  }

  // 4. Idempotentní vytvoření nebo aktualizace transakce
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Hledáme existující transakci podle affiliateId
      const existingTx = affiliateId
        ? await tx.transaction.findFirst({
            where: { affiliateId, source: "eHUB" },
          })
        : null;

      if (existingTx) {
        // Pokud již transakce existuje, zkontrolujeme přechod stavu
        const oldStatus = existingTx.status;

        // PENDING -> APPROVED: přičteme zůstatek
        if (oldStatus !== TransactionStatus.APPROVED && status === TransactionStatus.APPROVED) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { increment: amount } },
          });
        }
        // APPROVED -> REJECTED: odečteme dříve schválený zůstatek
        else if (oldStatus === TransactionStatus.APPROVED && status === TransactionStatus.REJECTED) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { decrement: existingTx.amount } },
          });
        }

        const updatedTx = await tx.transaction.update({
          where: { id: existingTx.id },
          data: {
            status,
            amount: amount > 0 ? amount : existingTx.amount,
            description: description || existingTx.description,
          },
        });

        return { transaction: updatedTx, action: "updated" };
      } else {
        // Vytvoření nové transakce
        const newTx = await tx.transaction.create({
          data: {
            userId: user.id,
            amount,
            status,
            source: "eHUB",
            affiliateId,
            description,
          },
        });

        // Pokud je nová transakce rovnou schválena, přičteme zůstatek
        if (status === TransactionStatus.APPROVED && amount > 0) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { increment: amount } },
          });
        }

        return { transaction: newTx, action: "created" };
      }
    });

    return NextResponse.json(
      {
        success: true,
        action: result.action,
        transactionId: result.transaction.id,
        status: result.transaction.status,
        amount: result.transaction.amount,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[eHUB Webhook Error]:", err);
    return NextResponse.json(
      { error: "Chyba při ukládání transakce do databáze", details: err?.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleWebhook(request);
}

export async function POST(request: NextRequest) {
  return handleWebhook(request);
}
