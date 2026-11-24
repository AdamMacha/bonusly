"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getResendClient } from "@/lib/resend";
import { TransactionStatus, CashoutStatus } from "@prisma/client";

/**
 * Manuální vytvoření transakce administrátorem ke konkrétnímu uživateli.
 */
export async function createManualTransaction(formData: FormData) {
  await requireAdminAuth();

  const userId = formData.get("userId") as string;
  const rawAmount = formData.get("amount") as string;
  const status = (formData.get("status") as TransactionStatus) || TransactionStatus.APPROVED;
  const description = (formData.get("description") as string || "Manuální odměna od administrátora").trim();
  const offerId = (formData.get("offerId") as string) || null;

  if (!userId) {
    return { error: "Vyberte prosím uživatele." };
  }

  const amount = parseFloat(rawAmount);
  if (isNaN(amount) || amount <= 0) {
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
    revalidatePath("/admin/uzivatele");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Transakce na částku ${amount.toLocaleString("cs-CZ")} Kč byla úspěšně vytvořena pro uživatele ${user.email}.`,
    };
  } catch (err: any) {
    console.error("Chyba při vytváření manuální transakce:", err);
    return { error: "Nepodařilo se vytvořit transakci: " + err?.message };
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

    // Odeslání e-mailu přes Resend
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
  } catch (err: any) {
    return { error: "Chyba při schvalování: " + err?.message };
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
      // 1. Nastavíme žádost jako zamítnutou
      await tx.cashoutRequest.update({
        where: { id: cashoutId },
        data: {
          status: CashoutStatus.REJECTED,
          note: note || "Zamítnuto administrátorem",
          processedAt: new Date(),
        },
      });

      // 2. Vrátíme částku zpět na schválený zůstatek uživatele
      await tx.user.update({
        where: { id: cashout.userId },
        data: {
          balance: { increment: cashout.amount },
        },
      });
    });

    // Odeslání e-mailu o zamítnutí
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
  } catch (err: any) {
    return { error: "Chyba při zamítání: " + err?.message };
  }
}

/**
 * Hromadný import transakcí z CSV (export z eHUBu nebo jiných sítí).
 */
export async function importTransactionsCsv(formData: FormData) {
  await requireAdminAuth();

  const file = formData.get("csvFile") as File | null;
  const rawText = (formData.get("csvText") as string || "").trim();

  let content = "";
  if (file && file.size > 0) {
    content = await file.text();
  } else if (rawText) {
    content = rawText;
  }

  if (!content.trim()) {
    return { error: "Nahrajte prosím CSV soubor nebo vložte text z exportu." };
  }

  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    return { error: "CSV musí obsahovat záhlaví a alespoň jeden řádek dat." };
  }

  // Detekce oddělovače (; nebo , nebo \t)
  const headerLine = lines[0];
  let delimiter = ",";
  if (headerLine.includes(";")) delimiter = ";";
  else if (headerLine.includes("\t")) delimiter = "\t";

  const cleanCol = (col: string) => col.replace(/^["']|["']$/g, "").trim().toLowerCase();
  const headers = headerLine.split(delimiter).map(cleanCol);

  // Nalezení indexů sloupců
  const subIdIdx = headers.findIndex((h) =>
    h === "sub_id" || h === "subid" || h === "data1" || h === "data" || h === "user" || h === "uživatel" || h === "uzivatel"
  );
  const amountIdx = headers.findIndex((h) =>
    h === "amount" || h === "provize" || h === "commission" || h === "částka" || h === "castka" || h === "payout" || h === "odměna"
  );
  const statusIdx = headers.findIndex((h) =>
    h === "status" || h === "stav" || h === "state"
  );
  const idIdx = headers.findIndex((h) =>
    h === "id" || h === "transaction_id" || h === "transakce" || h === "id transakce" || h === "order_id"
  );
  const descIdx = headers.findIndex((h) =>
    h === "campaign" || h === "kampaň" || h === "kampan" || h === "program" || h === "popis" || h === "description"
  );

  if (subIdIdx === -1 || amountIdx === -1) {
    return {
      error: `V hlavičce CSV chybí povinné sloupce. Nalezeno: [${headers.join(", ")}]. Je nutné mít alespoň sloupec pro uživatele (sub_id nebo data1) a pro částku (provize nebo amount).`,
    };
  }

  let importedCount = 0;
  let skippedCount = 0;
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(delimiter).map((c) => c.replace(/^["']|["']$/g, "").trim());
    if (row.length <= Math.max(subIdIdx, amountIdx)) continue;

    const subIdVal = row[subIdIdx];
    const amountValRaw = row[amountIdx];
    const statusValRaw = statusIdx !== -1 ? row[statusIdx] : "approved";
    const affiliateIdVal = idIdx !== -1 ? row[idIdx] : null;
    const descVal = descIdx !== -1 ? row[descIdx] : "eHUB CSV import";

    if (!subIdVal) {
      skippedCount++;
      continue;
    }

    const amount = parseFloat(amountValRaw.replace(",", ".").replace(/[^0-9.-]/g, "")) || 0;
    if (amount <= 0) {
      skippedCount++;
      continue;
    }

    // Normalizace statusu
    const sLower = statusValRaw.toLowerCase();
    let status: TransactionStatus = TransactionStatus.PENDING;
    if (sLower.includes("schvál") || sLower.includes("schval") || sLower.includes("approv") || sLower === "1") {
      status = TransactionStatus.APPROVED;
    } else if (sLower.includes("zamít") || sLower.includes("zamit") || sLower.includes("reject") || sLower === "2") {
      status = TransactionStatus.REJECTED;
    }

    // Najdeme uživatele
    const user = await prisma.user.findFirst({
      where: { OR: [{ id: subIdVal }, { email: subIdVal }] },
    });

    if (!user) {
      errors.push(`Řádek ${i + 1}: Uživatel pro sub_id "${subIdVal}" nebyl nalezen.`);
      skippedCount++;
      continue;
    }

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
              data: { balance: { increment: amount } },
            });
          }
          await tx.transaction.update({
            where: { id: existing.id },
            data: { status, amount },
          });
        } else {
          await tx.transaction.create({
            data: {
              userId: user.id,
              amount,
              status,
              source: "eHUB",
              affiliateId: affiliateIdVal,
              description: descVal,
            },
          });

          if (status === TransactionStatus.APPROVED) {
            await tx.user.update({
              where: { id: user.id },
              data: { balance: { increment: amount } },
            });
          }
        }
      });
      importedCount++;
    } catch (err: any) {
      errors.push(`Řádek ${i + 1}: Chyba při zápisu - ${err.message}`);
      skippedCount++;
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/uzivatele");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `Zpracováno: ${importedCount} transakcí úspěšně naimportováno, ${skippedCount} přeskočeno.`,
    errors: errors.slice(0, 5),
  };
}

