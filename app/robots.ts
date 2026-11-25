import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  // Poznámka: /hledani není blokováno v robots.txt, protože používá meta robots noindex,follow —
  // Googlebot tak direktivu noindex spolehlivě přečte a stránku s parametry neindexuje.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/go/",
          "/dashboard/",
          "/prihlaseni/",
        ],
      },
    ],
    sitemap: [`${baseUrl}/sitemap_index.xml`, `${baseUrl}/sitemap.xml`],
  };
}
