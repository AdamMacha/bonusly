import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CURATED_COMPARISONS, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const [categories, offers, articles] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.offer.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true, featured: true },
    }),
    prisma.article.findMany({
      where: { draft: false },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const activeOfferSlugs = new Set(offers.map((o) => o.slug));
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/nabidky`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/akce-a-kupony`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/kategorie`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/porovnani`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/o-nas`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/kategorie/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const offerPages: MetadataRoute.Sitemap = offers.map((o) => ({
    url: `${baseUrl}/nabidky/${o.slug}`,
    lastModified: o.updatedAt,
    changeFrequency: "weekly",
    priority: o.featured ? 0.9 : 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = CURATED_COMPARISONS.filter(
    (c) => activeOfferSlugs.has(c.slugA) && activeOfferSlugs.has(c.slugB)
  ).map((c) => ({
    url: `${baseUrl}/porovnani/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...offerPages,
    ...comparisonPages,
    ...articlePages,
  ];
}
