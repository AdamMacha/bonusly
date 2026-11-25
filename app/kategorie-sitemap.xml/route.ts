import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";
import { buildUrlsetXml, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const categories = await prisma.category.findMany({
    where: { offers: { some: { active: true } } },
    select: { slug: true, updatedAt: true },
    orderBy: { order: "asc" },
  });

  const xml = buildUrlsetXml(
    categories.map((cat) => ({
      loc: `${baseUrl}/kategorie/${cat.slug}`,
      lastmod: cat.updatedAt,
    }))
  );

  return xmlResponse(xml);
}
