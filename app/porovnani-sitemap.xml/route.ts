import { prisma } from "@/lib/db";
import { CURATED_COMPARISONS, getBaseUrl } from "@/lib/seo";
import { buildUrlsetXml, maxDate, STATIC_CONTENT_LASTMOD, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const offers = await prisma.offer.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  });

  const offerUpdatedMap = new Map(offers.map((o) => [o.slug, o.updatedAt]));
  const fallback = new Date(`${STATIC_CONTENT_LASTMOD}T00:00:00Z`);

  const entries = CURATED_COMPARISONS.filter(
    (c) => offerUpdatedMap.has(c.slugA) && offerUpdatedMap.has(c.slugB)
  ).map((c) => ({
    loc: `${baseUrl}/porovnani/${c.slug}`,
    lastmod: maxDate(offerUpdatedMap.get(c.slugA), offerUpdatedMap.get(c.slugB), fallback),
  }));

  return xmlResponse(buildUrlsetXml(entries));
}
