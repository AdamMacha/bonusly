import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Srovnání nabídek a služeb",
  description: "Podrobná srovnání finančních produktů, brokerských účtů, karet a extra příjmů na BONUSLY.",
};

const popularComparisons = [
  {
    title: "Wolt kurýr vs foodora kurýr",
    slug: "wolt-kuryr-vs-foodora-kuryr",
    category: "Extra příjem",
    description: "Srovnání dvou největších rozvážkových služeb v ČR. Kde si vyděláte více peněz a kdo nabízí lepší podmínky?",
  },
  {
    title: "Trading 212 vs XTB",
    slug: "trading-212-vs-xtb",
    category: "Finance & Investice",
    description: "Který broker je lepší pro nákup akcií a ETF bez poplatků? Porovnání kurzů, aplikace a české podpory.",
  },
  {
    title: "Revolut vs Curve",
    slug: "revolut-vs-curve",
    category: "Bankovní účty",
    description: "Multiměnová karta s mezibankovními kurzy nebo chytrá karta propojující všechny vaše karty v jednu?",
  },
  {
    title: "Raiffeisenbank vs Air Bank",
    slug: "raiffeisenbank-vs-air-bank",
    category: "Banky",
    description: "Chytrý účet s bonusem 3 000 Kč nebo přátelská banka s cashbackem v aplikaci My Air?",
  },
];

export default function PorovnaniIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Srovnání" }]} />

      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
          Srovnání nabídek
        </h1>
        <p className="mt-3 text-lg text-slate-500">
          Vyberte si srovnání dvou populárních služeb a zjistěte, která je pro vaše potřeby výhodnější.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {popularComparisons.map((item) => (
          <Link
            key={item.slug}
            href={`/porovnani/${item.slug}`}
            className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:border-green/30"
          >
            <span className="inline-block rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 mb-3">
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
