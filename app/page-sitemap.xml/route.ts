import { getBaseUrl } from "@/lib/seo";
import { buildUrlsetXml, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const xml = buildUrlsetXml([
    { loc: `${baseUrl}/`, lastmod: now, changefreq: "daily", priority: 1.0 },
    { loc: `${baseUrl}/nabidky`, lastmod: now, changefreq: "daily", priority: 0.9 },
    { loc: `${baseUrl}/akce-a-kupony`, lastmod: now, changefreq: "daily", priority: 0.9 },
    { loc: `${baseUrl}/kategorie`, lastmod: now, changefreq: "weekly", priority: 0.8 },
    { loc: `${baseUrl}/porovnani`, lastmod: now, changefreq: "weekly", priority: 0.8 },
    { loc: `${baseUrl}/blog`, lastmod: now, changefreq: "daily", priority: 0.8 },
    { loc: `${baseUrl}/o-nas`, lastmod: now, changefreq: "monthly", priority: 0.4 },
    { loc: `${baseUrl}/kontakt`, lastmod: now, changefreq: "monthly", priority: 0.4 },
  ]);

  return xmlResponse(xml);
}
