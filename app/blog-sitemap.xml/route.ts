import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";
import { buildUrlsetXml, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const articles = await prisma.article.findMany({
    where: { draft: false },
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const xml = buildUrlsetXml(
    articles.map((article) => ({
      loc: `${baseUrl}/blog/${article.slug}`,
      lastmod: article.updatedAt,
    }))
  );

  return xmlResponse(xml);
}
