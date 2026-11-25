import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateCashbackSplit } from "@/lib/cashback";
import { normalizeEhubStatus } from "@/lib/ehub-api";
import { TransactionStatus } from "@prisma/client";

function parseAmount(rawAmount: unknown): number {
  if (typeof rawAmount === "number") return Number.isFinite(rawAmount) ? Math.max(0, rawAmount) : 0;
  if (!rawAmount) return 0;
  const cleaned = String(rawAmount).replace(",", ".").replace(/[^0-9.-]/g, "");
  const val = parseFloat(cleaned);
  return Number.isNaN(val) ? 0 : Math.max(0, val);
}

/**
 * Záložní webhook endpoint (GET i POST) pro případné externí S2S callbacky.
 * Automaticky uplatňuje procentuální rozdělení provize (výchozí 50 % uživateli / 50 % BONUSLY)
 * a respektuje zákaz cashbacku (cashbackAllowed).
 */
async function handleWebhook(request: NextRequest) {
  const url = new URL(request.url);

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

  let bodyData: Record<string, unknown> = {};
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const parsed: unknown = await request.json();
        if (parsed && typeof parsed === "object") {
          bodyData = parsed as Record<string, unknown>;
        }
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const formData = await request.formData();
        bodyData = Object.fromEntries(formData.entries());
      }
    } catch {
      // Parametry mohou být v URL query
    }
  }

  const getParam = (key: string): string | undefined => {
    return bodyData[key] !== undefined && bodyData[key] !== null
      ? String(bodyData[key])
      : url.searchParams.get(key) || undefined;
  };

  const subId =
    getParam("data1") ||
    getParam("clickData1") ||
    getParam("sub_id") ||
    getParam("subid") ||
    getParam("user_id") ||
    getParam("userId");

  const clickIdParam = getParam("data2") || getParam("clickData2") || null;
  const campaignId = getParam("campaign_id") || getParam("campaignId") || null;
  const orderId = getParam("order_id") || getParam("orderId") || null;
  const orderAmount = parseAmount(getParam("order_amount") || getParam("orderAmount") || 0);

  const affiliateId =
    getParam("transaction_id") ||
    getParam("id") ||
    orderId ||
    getParam("conversion_id") ||
    getParam("affiliate_id") ||
    null;

  const rawStatus =
    getParam("status") ||
    getParam("state") ||
    getParam("conversion_status");

  const rawCommission =
    getParam("commission") ||
    getParam("commission_publisher") ||
    getParam("amount") ||
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
      { error: "Chybí povinný parametr data1 / sub_id (identifikátor uživatele)" },
      { status: 400 }
    );
  }

  const grossCommission = parseAmount(rawCommission);
  const status = normalizeEhubStatus(rawStatus);

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ id: subId }, { email: subId }],
    },
    select: { id: true },
  });

  if (!user) {
    console.warn(`[eHUB Webhook] Uživatel pro sub_id "${subId}" nebyl nalezen.`);
    return NextResponse.json(
      { success: false, message: `Uživatel pro sub_id ${subId} nebyl nalezen.` },
      { status: 200 }
    );
  }

  const matchedClick = clickIdParam
    ? await prisma.click.findUnique({
        where: { id: clickIdParam },
        select: { id: true, offerId: true },
      })
    : null;

  const offer = matchedClick?.offerId
    ? await prisma.offer.findUnique({
        where: { id: matchedClick.offerId },
        select: { id: true, cashbackAllowed: true, cashbackSharePct: true },
      })
    : campaignId
      ? await prisma.offer.findFirst({
          where: { ehubCampaignId: campaignId },
          select: { id: true, cashbackAllowed: true, cashbackSharePct: true },
        })
      : null;

  if (offer && !offer.cashbackAllowed) {
    return NextResponse.json(
      { success: false, message: "Nabídka zakazuje cashback — odměna nebyla připsána." },
      { status: 200 }
    );
  }

  const split = calculateCashbackSplit(grossCommission, offer?.cashbackSharePct);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingTx = affiliateId
        ? await tx.transaction.findFirst({
            where: { affiliateId, source: "eHUB" },
          })
        : null;

      if (existingTx) {
        const oldStatus = existingTx.status;
        const nextAmount = split.userCashback > 0 ? split.userCashback : existingTx.amount;

        if (oldStatus !== TransactionStatus.APPROVED && status === TransactionStatus.APPROVED) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { increment: nextAmount } },
          });
        } else if (oldStatus === TransactionStatus.APPROVED && status === TransactionStatus.REJECTED) {
          await tx.user.update({
            where: { id: user.id },
            data: { balance: { decrement: existingTx.amount } },
          });
        }

        const updatedTx = await tx.transaction.update({
          where: { id: existingTx.id },
          data: {
            offerId: offer?.id ?? existingTx.offerId,
            clickId: matchedClick?.id ?? existingTx.clickId,
            orderId: orderId ?? existingTx.orderId,
            orderAmount: orderAmount > 0 ? orderAmount : existingTx.orderAmount,
            grossCommission: split.grossCommission > 0 ? split.grossCommission : existingTx.grossCommission,
            cashbackSharePct: split.cashbackSharePct,
            amount: nextAmount,
            platformProfit: split.platformProfit,
            status,
            description: description || existingTx.description,
          },
        });

        return { transaction: updatedTx, action: "updated" };
      }

      const newTx = await tx.transaction.create({
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
          source: "eHUB",
          affiliateId,
          description,
        },
      });

      if (status === TransactionStatus.APPROVED && split.userCashback > 0) {
        await tx.user.update({
          where: { id: user.id },
          data: { balance: { increment: split.userCashback } },
        });
      }

      return { transaction: newTx, action: "created" };
    });

    return NextResponse.json(
      {
        success: true,
        action: result.action,
        transactionId: result.transaction.id,
        status: result.transaction.status,
        grossCommission: result.transaction.grossCommission,
        userCashback: result.transaction.amount,
        platformProfit: result.transaction.platformProfit,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const details = err instanceof Error ? err.message : "Unknown error";
    console.error("[eHUB Webhook Error]:", err);
    return NextResponse.json(
      { error: "Chyba při ukládání transakce do databáze", details },
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
