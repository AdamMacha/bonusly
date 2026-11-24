import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";
import { buildSitemapIndexXml, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const [latestOffer, latestCategory, latestArticle] = await Promise.all([
    prisma.offer.findFirst({
      where: { active: true },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    }),
    prisma.category.findFirst({
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    }),
    prisma.article.findFirst({
      where: { draft: false },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    }),
  ]);

  const xml = buildSitemapIndexXml([
    { loc: `${baseUrl}/page-sitemap.xml`, lastmod: now },
    { loc: `${baseUrl}/nabidky-sitemap.xml`, lastmod: latestOffer?.updatedAt || now },
    { loc: `${baseUrl}/kategorie-sitemap.xml`, lastmod: latestCategory?.updatedAt || now },
    { loc: `${baseUrl}/porovnani-sitemap.xml`, lastmod: latestOffer?.updatedAt || now },
    { loc: `${baseUrl}/blog-sitemap.xml`, lastmod: latestArticle?.updatedAt || now },
  ]);

  return xmlResponse(xml);
}
