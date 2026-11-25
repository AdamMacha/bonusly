import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";

const reviewSchema = z.object({
  offerSlug: z.string().min(1).max(120),
  authorName: z.string().trim().min(2, "Zadejte prosím jméno nebo přezdívku (min. 2 znaky).").max(60),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(600, "Zkušenost může mít maximálně 600 znaků.").optional().or(z.literal("")),
  bonusReceived: z.boolean().default(true),
  daysToReceive: z.number().int().min(0).max(365).nullable().optional(),
  website: z.string().max(0).optional(), // honeypot proti botům
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Tiché zahození spam botů vyplňujících skryté pole
    if (body?.website && String(body.website).trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const parsed = reviewSchema.safeParse({
      ...body,
      rating: Number(body?.rating),
      daysToReceive:
        body?.daysToReceive !== "" && body?.daysToReceive !== undefined && body?.daysToReceive !== null
          ? Number(body.daysToReceive)
          : null,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Neplatné údaje recenze." },
        { status: 400 }
      );
    }

    const { offerSlug, authorName, rating, comment, bonusReceived, daysToReceive } = parsed.data;

    const offer = await prisma.offer.findUnique({
      where: { slug: offerSlug },
      select: { id: true, slug: true, active: true },
    });

    if (!offer || !offer.active) {
      return NextResponse.json({ error: "Nabídka nebyla nalezena." }, { status: 404 });
    }

    const created = await prisma.offerReview.create({
      data: {
        offerId: offer.id,
        authorName,
        rating,
        comment: comment && comment.trim() !== "" ? comment.trim() : null,
        bonusReceived,
        daysToReceive: daysToReceive ?? null,
        approved: true,
      },
      select: {
        id: true,
        authorName: true,
        rating: true,
        comment: true,
        bonusReceived: true,
        daysToReceive: true,
        createdAt: true,
      },
    });

    revalidatePath(`/nabidky/${offer.slug}`);

    return NextResponse.json({ success: true, review: created }, { status: 201 });
  } catch (err) {
    console.error("Failed to save review:", err);
    return NextResponse.json(
      { error: "Hodnocení se nepodařilo uložit. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
