import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";
import {
  buildSitemapIndexXml,
  maxDate,
  STATIC_CONTENT_LASTMOD,
  xmlResponse,
} from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();

  const [latestOffer, latestPromo, latestCategory, latestArticle] = await Promise.all([
    prisma.offer.findFirst({
      where: { active: true },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    }),
    prisma.offerPromo.findFirst({
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

  const staticDate = new Date(`${STATIC_CONTENT_LASTMOD}T00:00:00Z`);
  const pageLastMod = maxDate(
    staticDate,
    latestOffer?.updatedAt,
    latestPromo?.updatedAt,
    latestArticle?.updatedAt
  );

  const xml = buildSitemapIndexXml([
    { loc: `${baseUrl}/page-sitemap.xml`, lastmod: pageLastMod },
    { loc: `${baseUrl}/nabidky-sitemap.xml`, lastmod: latestOffer?.updatedAt || staticDate },
    { loc: `${baseUrl}/kategorie-sitemap.xml`, lastmod: latestCategory?.updatedAt || staticDate },
    { loc: `${baseUrl}/porovnani-sitemap.xml`, lastmod: latestOffer?.updatedAt || staticDate },
    { loc: `${baseUrl}/blog-sitemap.xml`, lastmod: latestArticle?.updatedAt || staticDate },
  ]);

  return xmlResponse(xml);
}
