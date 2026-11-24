import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";
import { buildUrlsetXml, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const offers = await prisma.offer.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true, featured: true },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });

  const xml = buildUrlsetXml(
    offers.map((offer) => ({
      loc: `${baseUrl}/nabidky/${offer.slug}`,
      lastmod: offer.updatedAt,
      changefreq: "weekly",
      priority: offer.featured ? 0.9 : 0.8,
    }))
  );

  return xmlResponse(xml);
}
