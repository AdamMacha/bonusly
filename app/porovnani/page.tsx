import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, CURATED_COMPARISONS, getBaseUrl } from "@/lib/seo";

const canonical = buildCanonical("/porovnani");

export const metadata: Metadata = {
  title: "Velká srovnání nabídek, bank, investic a e-shopů 2026",
  description:
    "Objektivní srovnání bankovních účtů, investičních platforem, dodavatelů energií, rozvážkových aplikací i prodejců zánovních iPhonů v ČR.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Velká srovnání nabídek a služeb 2026 | BONUSLY",
    description:
      "Porovnání bonusů, poplatků, podmínek a výhod: Raiffeisenbank vs mBank, Portu vs Patria, Investown vs Roier, Jabkolevně vs iPhoneMarket a další.",
  },
};

export default function PorovnaniIndexPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Srovnání nabídek a služeb na BONUSLY",
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: CURATED_COMPARISONS.length,
            itemListElement: CURATED_COMPARISONS.map((c, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: c.title,
              url: `${baseUrl}/porovnani/${c.slug}`,
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
            { "@type": "ListItem", position: 2, name: "Srovnání", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Srovnání" }]} />

      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Srovnání nabídek a služeb ({CURATED_COMPARISONS.length})
        </h1>
        <p className="mt-3 text-lg text-slate-500">
          Vyberte si duel dvou populárních služeb a zjistěte během minuty, kde získáte vyšší bonus, lepší podmínky nebo nižší cenu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CURATED_COMPARISONS.map((item) => (
          <Link
            key={item.slug}
            href={`/porovnani/${item.slug}`}
            className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:border-green/35"
          >
            <span className="inline-block rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 mb-3">
              {item.category}
            </span>
            <h2 className="text-xl font-bold text-navy group-hover:text-green-dark transition-colors">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500 line-clamp-2">
              {item.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-green-dark">
              <span>Zobrazit detailní porovnání</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
