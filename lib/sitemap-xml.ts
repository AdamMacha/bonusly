export interface SitemapIndexEntry {
  loc: string;
  lastmod?: Date | string | null;
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: Date | string | null;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function formatW3CDate(date?: Date | string | null): string | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

export function maxDate(...dates: Array<Date | null | undefined>): Date {
  const valid = dates
    .filter((d): d is Date => d instanceof Date && !Number.isNaN(d.getTime()))
    .map((d) => d.getTime());
  if (valid.length === 0) return new Date("2026-11-25T00:00:00Z");
  return new Date(Math.max(...valid));
}

export const STATIC_CONTENT_LASTMOD = "2026-11-25";

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
