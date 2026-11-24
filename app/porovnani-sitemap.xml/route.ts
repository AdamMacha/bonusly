import { prisma } from "@/lib/db";
import { CURATED_COMPARISONS, getBaseUrl } from "@/lib/seo";
import { buildUrlsetXml, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const offers = await prisma.offer.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  });

  const offerUpdatedMap = new Map(offers.map((o) => [o.slug, o.updatedAt]));
  const now = new Date();

  const entries = CURATED_COMPARISONS.filter(
    (c) => offerUpdatedMap.has(c.slugA) && offerUpdatedMap.has(c.slugB)
  ).map((c) => {
    const dA = offerUpdatedMap.get(c.slugA) || now;
    const dB = offerUpdatedMap.get(c.slugB) || now;
    return {
      loc: `${baseUrl}/porovnani/${c.slug}`,
      lastmod: dA > dB ? dA : dB,
      changefreq: "weekly" as const,
      priority: 0.7,
    };
  });

  return xmlResponse(buildUrlsetXml(entries));
}
