import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { OfferCatalogClient } from "@/components/offer-catalog-client";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

const canonical = buildCanonical("/nabidky");

export const metadata: Metadata = {
  title: "Všechny ověřené nabídky, bonusy a slevové kódy 2026",
  description:
    "Kompletní katalog ověřených bankovních bonusů, investičních platforem, levnějších energií, pojištění, slevových kódů na Apple i možností extra příjmu v ČR.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Všechny ověřené nabídky a bonusy 2026 | BONUSLY",
    description:
      "Porovnejte přes 40 ověřených nabídek, finančních produktů, slevových kódů a možností extra příjmu na jednom místě.",
  },
};

export default async function NabidkyPage() {
  const [offers, categories] = await Promise.all([
    prisma.offer.findMany({
      where: { active: true },
      include: {
        category: { select: { name: true, slug: true, icon: true } },
        _count: { select: { promos: { where: { active: true } } } },
      },
      orderBy: [{ featured: "desc" }, { rating: "desc" }, { createdAt: "desc" }],
    }),
    prisma.category.findMany({
      include: { _count: { select: { offers: { where: { active: true } } } } },
      orderBy: { order: "asc" },
    }),
  ]);

  const baseUrl = getBaseUrl();

  const catalogOffers = offers.map((o) => ({
    slug: o.slug,
    name: o.name,
    shortDescription: o.shortDescription,
    logo: o.logo,
    bonus: o.bonus,
    promoCode: o.promoCode,
    rating: o.rating,
    verified: o.verified,
    featured: o.featured,
    hasPromos: o._count.promos > 0,
    category: o.category,
  }));

  const categoryFilters = categories
    .filter((c) => c._count.offers > 0)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      icon: c.icon,
      count: c._count.offers,
    }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Všechny ověřené nabídky na BONUSLY",
          description:
            "Procházejte ověřené nabídky, bonusy, slevové kódy, investice a možnosti extra příjmu.",
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: offers.length,
            itemListElement: offers.map((o, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: o.name,
              url: `${baseUrl}/nabidky/${o.slug}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Nabídky", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Nabídky" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Všechny ověřené nabídky ({offers.length})
        </h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Procházejte a filtrujte prověřené bankovní bonusy, investiční platformy, pojištění, energie, slevové kódy a možnosti extra příjmu.
        </p>
      </div>

      <OfferCatalogClient offers={catalogOffers} categories={categoryFilters} />
    </div>
  );
}
