import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";
import {
  buildUrlsetXml,
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
  const homeLastMod = maxDate(latestOffer?.updatedAt, latestPromo?.updatedAt, latestArticle?.updatedAt);
  const offersLastMod = latestOffer?.updatedAt || staticDate;
  const promosLastMod = maxDate(latestPromo?.updatedAt, latestOffer?.updatedAt);
  const catsLastMod = latestCategory?.updatedAt || staticDate;
  const blogLastMod = latestArticle?.updatedAt || staticDate;

  const xml = buildUrlsetXml([
    { loc: `${baseUrl}/`, lastmod: homeLastMod },
    { loc: `${baseUrl}/nabidky`, lastmod: offersLastMod },
    { loc: `${baseUrl}/akce-a-kupony`, lastmod: promosLastMod },
    { loc: `${baseUrl}/jak-funguje-cashback`, lastmod: STATIC_CONTENT_LASTMOD },
    { loc: `${baseUrl}/nejlepsi-bankovni-bonusy-2026`, lastmod: maxDate(staticDate, offersLastMod) },
    { loc: `${baseUrl}/investicni-bonusy-2026`, lastmod: maxDate(staticDate, offersLastMod) },
    { loc: `${baseUrl}/kalkulacka-bonusu`, lastmod: maxDate(staticDate, offersLastMod) },
    { loc: `${baseUrl}/kategorie`, lastmod: catsLastMod },
    { loc: `${baseUrl}/porovnani`, lastmod: offersLastMod },
    { loc: `${baseUrl}/blog`, lastmod: blogLastMod },
    { loc: `${baseUrl}/jak-hodnotime`, lastmod: STATIC_CONTENT_LASTMOD },
    { loc: `${baseUrl}/o-nas`, lastmod: STATIC_CONTENT_LASTMOD },
    { loc: `${baseUrl}/kontakt`, lastmod: STATIC_CONTENT_LASTMOD },
    { loc: `${baseUrl}/podminky`, lastmod: STATIC_CONTENT_LASTMOD },
    { loc: `${baseUrl}/ochrana-soukromi`, lastmod: STATIC_CONTENT_LASTMOD },
    { loc: `${baseUrl}/cookies`, lastmod: STATIC_CONTENT_LASTMOD },
  ]);

  return xmlResponse(xml);
}
