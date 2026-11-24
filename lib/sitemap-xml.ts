export interface SitemapIndexEntry {
  loc: string;
  lastmod?: Date | string | null;
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: Date | string | null;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatW3CDate(date?: Date | string | null): string | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

export function buildSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const items = entries
    .map((entry) => {
      const lastmod = formatW3CDate(entry.lastmod);
      return [
        "  <sitemap>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        "  </sitemap>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</sitemapindex>",
    "",
  ].join("\n");
}

export function buildUrlsetXml(entries: SitemapUrlEntry[]): string {
  const items = entries
    .map((entry) => {
      const lastmod = formatW3CDate(entry.lastmod);
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        ...(entry.changefreq ? [`    <changefreq>${entry.changefreq}</changefreq>`] : []),
        ...(entry.priority !== undefined
          ? [`    <priority>${entry.priority.toFixed(1)}</priority>`]
          : []),
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</urlset>",
    "",
  ].join("\n");
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
