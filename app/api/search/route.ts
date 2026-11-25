import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { matchesSearchQuery, scoreOfferSearchMatch } from "@/lib/search";

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

  // Načteme aktivní nabídky a články (malý katalog ~41 nabídek / ~7 článků)
  // a aplikujeme chytré české vyhledávání bez diakritiky a se synonymy.
  const [allOffers, allArticles] = await Promise.all([
    prisma.offer.findMany({
      where: { active: true },
      select: {
        slug: true,
        name: true,
        shortDescription: true,
        bonus: true,
        promoCode: true,
        logo: true,
        rating: true,
        featured: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
    }),
    prisma.article.findMany({
      where: { draft: false },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        keywords: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  const matchedOffers = allOffers
    .filter((o) => {
      const hay = `${o.name} ${o.slug} ${o.shortDescription} ${o.bonus || ""} ${o.promoCode || ""} ${o.category.name} ${o.category.slug}`;
      return matchesSearchQuery(hay, q);
    })
    .sort((a, b) => scoreOfferSearchMatch(b, q) - scoreOfferSearchMatch(a, q))
    .slice(0, 8)
    .map(({ slug, name, bonus, promoCode, logo, rating, category }) => ({
      slug,
      name,
      bonus,
      promoCode,
      logo,
      rating,
      category: { name: category.name },
    }));

  const matchedArticles = allArticles
    .filter((a) => {
      const hay = `${a.title} ${a.excerpt} ${a.keywords.join(" ")} ${a.category.name}`;
      return matchesSearchQuery(hay, q);
    })
    .slice(0, 4)
    .map(({ slug, title, category }) => ({
      slug,
      title,
      category: { name: category.name },
    }));

  return NextResponse.json(
    { offers: matchedOffers, articles: matchedArticles },
    {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    }
  );
}
