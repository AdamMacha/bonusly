import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CURATED_COMPARISONS, getBaseUrl } from "@/lib/seo";
import { maxDate, STATIC_CONTENT_LASTMOD } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const [categories, offers, promos, articles] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true }, orderBy: { order: "asc" } }),
    prisma.offer.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    }),
    prisma.offerPromo.findMany({
      where: { active: true },
      select: { updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 1,
    }),
    prisma.article.findMany({
      where: { draft: false },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  const staticDate = new Date(`${STATIC_CONTENT_LASTMOD}T00:00:00Z`);
  const offerUpdatedMap = new Map(offers.map((o) => [o.slug, o.updatedAt]));
  const latestOfferDate = maxDate(...offers.map((o) => o.updatedAt), staticDate);
  const latestPromoDate = maxDate(promos[0]?.updatedAt, latestOfferDate);
  const latestCatDate = maxDate(...categories.map((c) => c.updatedAt), staticDate);
  const latestArticleDate = maxDate(...articles.map((a) => a.updatedAt), staticDate);
  const homeDate = maxDate(latestOfferDate, latestPromoDate, latestArticleDate);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: homeDate },
    { url: `${baseUrl}/nabidky`, lastModified: latestOfferDate },
    { url: `${baseUrl}/akce-a-kupony`, lastModified: latestPromoDate },
    { url: `${baseUrl}/nejlepsi-bankovni-bonusy-2026`, lastModified: maxDate(staticDate, latestOfferDate) },
    { url: `${baseUrl}/investicni-bonusy-2026`, lastModified: maxDate(staticDate, latestOfferDate) },
    { url: `${baseUrl}/kalkulacka-bonusu`, lastModified: maxDate(staticDate, latestOfferDate) },
    { url: `${baseUrl}/kategorie`, lastModified: latestCatDate },
    { url: `${baseUrl}/porovnani`, lastModified: latestOfferDate },
    { url: `${baseUrl}/blog`, lastModified: latestArticleDate },
    { url: `${baseUrl}/jak-hodnotime`, lastModified: staticDate },
    { url: `${baseUrl}/o-nas`, lastModified: staticDate },
    { url: `${baseUrl}/kontakt`, lastModified: staticDate },
    { url: `${baseUrl}/podminky`, lastModified: staticDate },
    { url: `${baseUrl}/ochrana-soukromi`, lastModified: staticDate },
    { url: `${baseUrl}/cookies`, lastModified: staticDate },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/kategorie/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  const offerPages: MetadataRoute.Sitemap = offers.map((o) => ({
    url: `${baseUrl}/nabidky/${o.slug}`,
    lastModified: o.updatedAt,
  }));

  const comparisonPages: MetadataRoute.Sitemap = CURATED_COMPARISONS.filter(
    (c) => offerUpdatedMap.has(c.slugA) && offerUpdatedMap.has(c.slugB)
  ).map((c) => ({
    url: `${baseUrl}/porovnani/${c.slug}`,
    lastModified: maxDate(offerUpdatedMap.get(c.slugA), offerUpdatedMap.get(c.slugB), staticDate),
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.updatedAt,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...offerPages,
    ...comparisonPages,
    ...articlePages,
  ];
}
