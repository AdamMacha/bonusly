import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";
import { newsletterSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Zadejte platný email." },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.unsubscribed) {
        // Re-subscribe
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { unsubscribed: false, confirmed: true },
        });
      } else {
        return NextResponse.json(
          { message: "Tento email je již přihlášen k odběru." },
          { status: 200 }
        );
      }
    } else {
      await prisma.newsletterSubscriber.create({
        data: { email, confirmed: true },
      });
    }

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: "BONUSLY <noreply@bonusly.cz>",
        to: email,
        subject: "Vítej v BONUSLY 👋",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0B1220; font-size: 24px;">Vítej v BONUSLY!</h1>
            <p style="color: #475569; line-height: 1.6;">
              Díky za přihlášení k odběru. Budeme tě informovat o nových bonusech, přivýdělcích a zajímavých nabídkách.
            </p>
            <p style="color: #475569; line-height: 1.6;">
              Mezitím se můžeš podívat na naše <a href="${process.env.NEXT_PUBLIC_BASE_URL}/nabidky" style="color: #22C55E;">aktuální nabídky</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
            <p style="color: #94A3B8; font-size: 12px;">
              Pokud ses nepřihlásil(a) k odběru, tento email můžeš ignorovat.
            </p>
          </div>
        `,
      });
    } catch {
      // Don't fail the subscription if email sending fails
      console.error("Failed to send welcome email to:", email);
    }

    return NextResponse.json(
      { message: "Úspěšně přihlášeno! Děkujeme." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Něco se pokazilo. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
