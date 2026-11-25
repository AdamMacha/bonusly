import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").trim();

  if (!q) {
    const featuredOffers = await prisma.offer.findMany({
      where: { active: true, featured: true },
      select: {
        slug: true,
        name: true,
        bonus: true,
        promoCode: true,
        logo: true,
        rating: true,
        category: { select: { name: true } },
      },
      orderBy: [{ rating: "desc" }],
      take: 6,
    });

    return NextResponse.json(
      { offers: featuredOffers, articles: [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }

  const [offers, articles] = await Promise.all([
    prisma.offer.findMany({
      where: {
        active: true,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { shortDescription: { contains: q, mode: "insensitive" } },
          { bonus: { contains: q, mode: "insensitive" } },
          { promoCode: { contains: q, mode: "insensitive" } },
          { category: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
      select: {
        slug: true,
        name: true,
        bonus: true,
        promoCode: true,
        logo: true,
        rating: true,
        category: { select: { name: true } },
      },
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
      take: 6,
    }),
    prisma.article.findMany({
      where: {
        draft: false,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        slug: true,
        title: true,
        category: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return NextResponse.json(
    { offers, articles },
    {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    }
  );
}
