"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getResendClient } from "@/lib/resend";
import { CashoutStatus } from "@prisma/client";

/**
 * Validuje český formát bankovního účtu (např. 123456-7890123456/0100 nebo 123456789/0800).
 */
function isValidCzechBankAccount(account: string): boolean {
  const trimmed = account.trim();
  // Zjednodušená validace pro české účty a IBAN
  const czAccountRegex = /^(\d{1,6}-)?\d{2,10}\/\d{4}$/;
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
  return czAccountRegex.test(trimmed) || ibanRegex.test(trimmed.replace(/\s+/g, ""));
}

export async function requestCashout(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Pro odeslání žádosti o výplatu se musíte nejprve přihlásit." };
  }

  const bankAccount = (formData.get("bankAccount") as string || "").trim();
  const rawAmount = formData.get("amount") as string;

  if (!bankAccount) {
    return { error: "Zadejte prosím číslo bankovního účtu." };
  }

  if (!isValidCzechBankAccount(bankAccount)) {
    return {
      error: "Zadejte platné číslo bankovního účtu ve formátu předčíslí-číslo/banka (např. 123456789/0800).",
    };
  }

  const minAmount = parseFloat(process.env.MIN_CASHOUT_AMOUNT || "500") || 500;

  // Načteme aktuální stav uživatele z databáze
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { error: "Uživatelský profil nebyl nalezen." };
  }

  const requestedAmount = rawAmount ? parseFloat(rawAmount) : user.balance;

  if (isNaN(requestedAmount) || requestedAmount < minAmount) {
    return {
      error: `Minimální částka pro výplatu je ${minAmount.toLocaleString("cs-CZ")} Kč.`,
    };
  }

  if (requestedAmount > user.balance) {
    return {
      error: `Nemáte dostatečný schválený zůstatek. Váš aktuální zůstatek k výplatě je ${user.balance.toLocaleString("cs-CZ")} Kč.`,
    };
  }

  try {
    const cashout = await prisma.$transaction(async (tx) => {
      // 1. Vytvoříme žádost o výplatu
      const request = await tx.cashoutRequest.create({
        data: {
          userId: user.id,
          amount: requestedAmount,
          bankAccount,
          status: CashoutStatus.PENDING,
        },
      });

      // 2. Odečteme požadovanou částku ze schváleného zůstatku a uložíme účet do profilu
      await tx.user.update({
        where: { id: user.id },
        data: {
          balance: { decrement: requestedAmount },
          bankAccount,
        },
      });

      return request;
    });

    // 3. Volitelné odeslání potvrzovacího e-mailu přes Resend
    const resendClient = getResendClient();
    if (resendClient && user.email) {
      try {
        await resendClient.emails.send({
          from: process.env.EMAIL_FROM || "BONUSLY <onboarding@resend.dev>",
          to: user.email,
          subject: "Potvrzení žádosti o výplatu odměn | BONUSLY",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0B1220;">
              <h2 style="color: #10B981;">Žádost o výplatu byla přijata 👋</h2>
              <p>Dobrý den,</p>
              <p>přijali jsme vaši žádost o výplatu odměn z peněženky BONUSLY:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 0; color: #64748B;">Částka k výplatě:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${requestedAmount.toLocaleString("cs-CZ")} Kč</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B;">Bankovní účet:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${bankAccount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B;">Stav:</td>
                  <td style="padding: 8px 0; color: #F59E0B; font-weight: bold;">Čeká na zpracování</td>
                </tr>
              </table>
              <p>Peníze odesíláme na bankovní účet obvykle do 3 pracovních dnů od schválení.</p>
              <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
              <p style="color: #94A3B8; font-size: 12px;">Tým BONUSLY.cz</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Nepodařilo se odeslat potvrzovací e-mail o výběru:", emailErr);
      }
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: `Žádost o výplatu ${requestedAmount.toLocaleString("cs-CZ")} Kč byla úspěšně odeslána. Peníze vám zašleme na účet ${bankAccount}.`,
    };
  } catch (err: any) {
    console.error("Chyba při vytváření žádosti o výplatu:", err);
    return {
      error: "Při vytváření žádosti o výplatu došlo k chybě. Zkuste to prosím znovu.",
    };
  }
}
