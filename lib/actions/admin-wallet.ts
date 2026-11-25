"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getResendClient } from "@/lib/resend";
import { calculateCashbackSplit } from "@/lib/cashback";
import { normalizeEhubStatus, syncEhubTransactions } from "@/lib/ehub-api";
import { TransactionStatus, CashoutStatus } from "@prisma/client";

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Neznámá chyba";
}

/**
 * Ruční spuštění synchronizace transakcí z eHUB API v3 administrátorem.
 */
export async function triggerEhubSync(lookbackDays = 90) {
  await requireAdminAuth();

  const result = await syncEhubTransactions({
    trigger: "manual",
    lookbackDays,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/provize");
  revalidatePath("/admin/uzivatele");
  revalidatePath("/dashboard");

  return result;
}

/**
 * Manuální vytvoření transakce administrátorem ke konkrétnímu uživateli.
 */
export async function createManualTransaction(formData: FormData) {
  await requireAdminAuth();

  const userId = formData.get("userId") as string;
  const rawAmount = formData.get("amount") as string;
  const status = (formData.get("status") as TransactionStatus) || TransactionStatus.APPROVED;
  const description = (
    (formData.get("description") as string) || "Manuální odměna od administrátora"
  ).trim();
  const offerId = (formData.get("offerId") as string) || null;

  if (!userId) {
    return { error: "Vyberte prosím uživatele." };
  }

  const amount = parseFloat(rawAmount);
  if (Number.isNaN(amount) || amount <= 0) {
    return { error: "Zadejte platnou kladnou částku." };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { error: "Uživatel nebyl nalezen." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({
        data: {
          userId,
          amount,
          status,
          source: "manual",
          description,
          offerId: offerId && offerId.trim() !== "" ? offerId : null,
        },
      });

      if (status === TransactionStatus.APPROVED) {
        await tx.user.update({
          where: { id: userId },
          data: { balance: { increment: amount } },
        });
      }
    });

    revalidatePath("/admin");
    revalidatePath("/admin/provize");
    revalidatePath("/admin/uzivatele");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Transakce na částku ${amount.toLocaleString("cs-CZ")} Kč byla úspěšně vytvořena pro uživatele ${user.email}.`,
    };
  } catch (err: unknown) {
    console.error("Chyba při vytváření manuální transakce:", err);
    return { error: "Nepodařilo se vytvořit transakci: " + getErrorMessage(err) };
  }
}

/**
 * Schválení žádosti o výplatu administrátorem (označení jako vyplaceno).
 */
export async function approveCashout(cashoutId: string) {
  await requireAdminAuth();

  const cashout = await prisma.cashoutRequest.findUnique({
    where: { id: cashoutId },
    include: { user: true },
  });

  if (!cashout) {
    return { error: "Žádost o výplatu nebyla nalezena." };
  }

  if (cashout.status !== CashoutStatus.PENDING) {
    return { error: "Tato žádost již byla zpracována." };
  }

  try {
    await prisma.cashoutRequest.update({
      where: { id: cashoutId },
      data: {
        status: CashoutStatus.APPROVED,
        processedAt: new Date(),
      },
    });

    const resendClient = getResendClient();
    if (resendClient && cashout.user.email) {
      try {
        await resendClient.emails.send({
          from: process.env.EMAIL_FROM || "BONUSLY <onboarding@resend.dev>",
          to: cashout.user.email,
          subject: "Odměna byla odeslána na váš účet! 💸 | BONUSLY",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0B1220;">
              <h2 style="color: #10B981;">Peníze jsou na cestě! 💸</h2>
              <p>Dobrý den,</p>
              <p>vaše žádost o výplatu byla schválena a částka <strong>${cashout.amount.toLocaleString("cs-CZ")} Kč</strong> byla odeslána na bankovní účet <strong>${cashout.bankAccount}</strong>.</p>
              <p>Peníze dorazí na váš účet v závislosti na mezibankovních převodech obvykle následující pracovní den.</p>
              <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
              <p style="color: #94A3B8; font-size: 12px;">Tým BONUSLY.cz</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("E-mail o výplatě nebyl odeslán:", mailErr);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/vybery");
    revalidatePath("/dashboard");

    return { success: true, message: "Žádost o výplatu byla označena jako vyplacena." };
  } catch (err: unknown) {
    return { error: "Chyba při schvalování: " + getErrorMessage(err) };
  }
}

/**
 * Zamítnutí žádosti o výplatu s vrácením částky zpět na zůstatek uživatele.
 */
export async function rejectCashout(cashoutId: string, note?: string) {
  await requireAdminAuth();

  const cashout = await prisma.cashoutRequest.findUnique({
    where: { id: cashoutId },
    include: { user: true },
  });

  if (!cashout) {
    return { error: "Žádost o výplatu nebyla nalezena." };
  }

  if (cashout.status !== CashoutStatus.PENDING) {
    return { error: "Tato žádost již byla dříve zpracována." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.cashoutRequest.update({
        where: { id: cashoutId },
        data: {
          status: CashoutStatus.REJECTED,
          note: note || "Zamítnuto administrátorem",
          processedAt: new Date(),
        },
      });

      await tx.user.update({
        where: { id: cashout.userId },
        data: {
          balance: { increment: cashout.amount },
        },
      });
    });

    const resendClient = getResendClient();
    if (resendClient && cashout.user.email) {
      try {
        await resendClient.emails.send({
          from: process.env.EMAIL_FROM || "BONUSLY <onboarding@resend.dev>",
          to: cashout.user.email,
          subject: "Informace k vaší žádosti o výplatu | BONUSLY",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0B1220;">
              <h2 style="color: #EF4444;">Žádost o výplatu nebyla schválena</h2>
              <p>Dobrý den,</p>
              <p>vaše žádost o výplatu na částku <strong>${cashout.amount.toLocaleString("cs-CZ")} Kč</strong> nemohla být schválena.</p>
              ${note ? `<p><strong>Důvod:</strong> ${note}</p>` : ""}
              <p>Částka ${cashout.amount.toLocaleString("cs-CZ")} Kč vám byla vrácena zpět na váš disponibilní zůstatek v peněžence.</p>
              <p>Zkontrolujte prosím správnost zadaného čísla účtu v dashboardu a zkuste žádost podat znovu.</p>
              <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
              <p style="color: #94A3B8; font-size: 12px;">Tým BONUSLY.cz</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("E-mail o zamítnutí nebyl odeslán:", mailErr);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/vybery");
    revalidatePath("/dashboard");

    return { success: true, message: "Žádost byla zamítnuta a částka byla vrácena uživateli na zůstatek." };
  } catch (err: unknown) {
    return { error: "Chyba při zamítání: " + getErrorMessage(err) };
  }
}

/**
 * Záložní hromadný import transakcí z CSV exportu eHUBu (`/transaction` -> Export).
 * Podporuje přesné české hlavičky eHUBu (`Klik data 1`, `Klik data 2`, `Provize`,
 * `Hodnota objednávky`, `ID objednávky`, `Program`, `Stav`) a automaticky
 * aplikuje rozdělení provize (výchozí 50 % uživateli / 50 % BONUSLY).
 */
export async function importTransactionsCsv(formData: FormData) {
  await requireAdminAuth();

  const file = formData.get("csvFile") as File | null;
  const rawText = ((formData.get("csvText") as string) || "").trim();

  let content = "";
  if (file && file.size > 0) {
    content = await file.text();
  } else if (rawText) {
    content = rawText;
  }

  if (!content.trim()) {
    return { error: "Nahrajte prosím CSV soubor nebo vložte text z exportu." };
  }

  const lines = content.replace(/^\uFEFF/, "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    return { error: "CSV musí obsahovat záhlaví a alespoň jeden řádek dat." };
  }

  const headerLine = lines[0];
  let delimiter = ",";
  if (headerLine.includes(";")) delimiter = ";";
  else if (headerLine.includes("\t")) delimiter = "\t";

  const cleanCol = (col: string) => col.replace(/^["']|["']$/g, "").trim().toLowerCase();
  const headers = headerLine.split(delimiter).map(cleanCol);

  const subIdIdx = headers.findIndex((h) =>
    ["klik data 1", "data1", "sub_id", "subid", "data", "user", "uživatel", "uzivatel"].includes(h)
  );
  const clickIdIdx = headers.findIndex((h) =>
    ["klik data 2", "data2", "click_id", "clickid"].includes(h)
  );
  const amountIdx = headers.findIndex((h) =>
    ["provize", "commission", "amount", "částka", "castka", "payout", "odměna"].includes(h)
  );
  const orderAmountIdx = headers.findIndex((h) =>
    ["hodnota objednávky", "hodnota objednavky", "order_amount", "orderamount"].includes(h)
  );
  const statusIdx = headers.findIndex((h) =>
    ["stav", "status", "state"].includes(h)
  );
  const payoutStatusIdx = headers.findIndex((h) =>
    ["stav výplaty", "stav vyplaty", "payout_status"].includes(h)
  );
  const idIdx = headers.findIndex((h) =>
    ["id", "transaction_id", "transakce", "id transakce", "id objednávky", "id objednavky", "order_id"].includes(h)
  );
  const orderIdIdx = headers.findIndex((h) =>
    ["id objednávky", "id objednavky", "order_id", "orderid"].includes(h)
  );
  const descIdx = headers.findIndex((h) =>
    ["program", "kampaň", "kampan", "campaign", "popis", "description"].includes(h)
  );

  if (subIdIdx === -1 || amountIdx === -1) {
    return {
      error: `V hlavičce CSV chybí povinné sloupce. Nalezeno: [${headers.join(", ")}]. Je nutné mít alespoň sloupec pro uživatele (Klik data 1 / data1 / sub_id) a pro provizi (Provize / commission / amount).`,
    };
  }

  let importedCount = 0;
  let skippedCount = 0;
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(delimiter).map((c) => c.replace(/^["']|["']$/g, "").trim());
    if (row.length <= Math.max(subIdIdx, amountIdx)) continue;

    const subIdVal = row[subIdIdx];
    const clickIdVal = clickIdIdx !== -1 ? row[clickIdIdx] || null : null;
    const grossCommission =
      parseFloat(row[amountIdx].replace(",", ".").replace(/[^0-9.-]/g, "")) || 0;
    const orderAmount =
      orderAmountIdx !== -1
        ? parseFloat(row[orderAmountIdx].replace(",", ".").replace(/[^0-9.-]/g, "")) || 0
        : 0;
    const statusValRaw = statusIdx !== -1 ? row[statusIdx] : "pending";
    const payoutStatusVal = payoutStatusIdx !== -1 ? row[payoutStatusIdx] || null : null;
    const affiliateIdVal = idIdx !== -1 ? row[idIdx] || null : null;
    const orderIdVal = orderIdIdx !== -1 ? row[orderIdIdx] || null : null;
    const descVal = descIdx !== -1 ? row[descIdx] || "eHUB CSV import" : "eHUB CSV import";

    if (!subIdVal || grossCommission <= 0) {
      skippedCount++;
      continue;
    }

    const status = normalizeEhubStatus(statusValRaw);

    const user = await prisma.user.findFirst({
      where: { OR: [{ id: subIdVal }, { email: subIdVal }] },
      select: { id: true },
    });

    if (!user) {
      errors.push(`Řádek ${i + 1}: Uživatel pro "${subIdVal}" nebyl nalezen.`);
      skippedCount++;
      continue;
    }

    const matchedClick = clickIdVal
      ? await prisma.click.findUnique({
          where: { id: clickIdVal },
          select: { id: true, offerId: true },
        })
      : null;

    const offer = matchedClick?.offerId
      ? await prisma.offer.findUnique({
          where: { id: matchedClick.offerId },
          select: { id: true, cashbackAllowed: true, cashbackSharePct: true },
        })
      : descVal
        ? await prisma.offer.findFirst({
            where: { name: { contains: descVal, mode: "insensitive" } },
            select: { id: true, cashbackAllowed: true, cashbackSharePct: true },
          })
        : null;

    if (offer && !offer.cashbackAllowed) {
      errors.push(`Řádek ${i + 1}: Program "${descVal}" zakazuje cashback — přeskočeno.`);
      skippedCount++;
      continue;
    }

    const split = calculateCashbackSplit(grossCommission, offer?.cashbackSharePct);

    try {
      await prisma.$transaction(async (tx) => {
        const existing = affiliateIdVal
          ? await tx.transaction.findFirst({
              where: { affiliateId: affiliateIdVal, source: "eHUB" },
            })
          : null;

        if (existing) {
          if (existing.status !== TransactionStatus.APPROVED && status === TransactionStatus.APPROVED) {
            await tx.user.update({
              where: { id: user.id },
              data: { balance: { increment: split.userCashback } },
            });
          } else if (existing.status === TransactionStatus.APPROVED && status === TransactionStatus.REJECTED) {
            await tx.user.update({
              where: { id: user.id },
              data: { balance: { decrement: existing.amount } },
            });
          }
          await tx.transaction.update({
            where: { id: existing.id },
            data: {
              offerId: offer?.id ?? existing.offerId,
              clickId: matchedClick?.id ?? existing.clickId,
              orderId: orderIdVal ?? existing.orderId,
              orderAmount: orderAmount > 0 ? orderAmount : existing.orderAmount,
              grossCommission: split.grossCommission,
              cashbackSharePct: split.cashbackSharePct,
              amount: split.userCashback,
              platformProfit: split.platformProfit,
              status,
              payoutStatus: payoutStatusVal ?? existing.payoutStatus,
            },
          });
        } else {
          await tx.transaction.create({
            data: {
              userId: user.id,
              offerId: offer?.id ?? null,
              clickId: matchedClick?.id ?? null,
              orderId: orderIdVal,
              orderAmount: orderAmount > 0 ? orderAmount : null,
              grossCommission: split.grossCommission,
              cashbackSharePct: split.cashbackSharePct,
              amount: split.userCashback,
              platformProfit: split.platformProfit,
              status,
              payoutStatus: payoutStatusVal,
              source: "eHUB",
              affiliateId: affiliateIdVal,
              description: descVal,
            },
          });

          if (status === TransactionStatus.APPROVED && split.userCashback > 0) {
            await tx.user.update({
              where: { id: user.id },
              data: { balance: { increment: split.userCashback } },
            });
          }
        }
      });
      importedCount++;
    } catch (err: unknown) {
      errors.push(`Řádek ${i + 1}: Chyba při zápisu - ${getErrorMessage(err)}`);
      skippedCount++;
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/provize");
  revalidatePath("/admin/uzivatele");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `Zpracováno: ${importedCount} transakcí naimportováno (s rozdělením provize), ${skippedCount} přeskočeno.`,
    errors: errors.slice(0, 5),
  };
}
