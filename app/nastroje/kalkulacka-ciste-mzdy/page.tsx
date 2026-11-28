import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SalaryCalculator } from "@/components/tools/salary-calculator";
import { ToolPartnerCards } from "@/components/tools/tool-partner-cards";
import { ToolCrossLinks } from "@/components/tools/tool-cross-links";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/nastroje/kalkulacka-ciste-mzdy");

export const metadata: Metadata = {
  title: "Kalkulačka čisté mzdy 2026: výpočet z hrubé mzdy, slevy a děti",
  description:
    "Aktuální kalkulačka čisté mzdy pro rok 2026 v ČR. Výpočet sociálního (7,1 %) a zdravotního (4,5 %) pojištění, zálohy na daň 15 % / 23 %, slevy na poplatníka, daňového zvýhodnění na děti i nákladů zaměstnavatele.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Kalkulačka čisté mzdy 2026 (ČR) | BONUSLY",
    description:
      "Rychlý a přesný výpočet čisté mzdy 2026 včetně slev na děti, daňového bonusu a odvodů zaměstnavatele.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630, alt: "Kalkulačka čisté mzdy 2026" }],
  },
};

const salaryFaqs = [
  {
    question: "Jaké jsou sazby sociálního a zdravotního pojištění v roce 2026?",
    answer:
      "Zaměstnanec odvádí z hrubé mzdy 7,1 % na sociální pojištění (6,5 % důchodové + 0,6 % nemocenské) a 4,5 % na zdravotní pojištění. Zaměstnavatel za zaměstnance navíc hradí 24,8 % sociální a 9 % zdravotní pojištění.",
  },
  {
    question: "Jak vysoké je daňové zvýhodnění na děti a kdy vzniká daňový bonus?",
    answer:
      "Na 1. dítě je sleva 1 267 Kč/měs., na 2. dítě 1 860 Kč/měs. a na 3. a každé další dítě 2 320 Kč/měs. (u dítěte s průkazem ZTP/P dvojnásobek). Pokud zvýhodnění převýší vypočtenou daň a hrubá mzda dosahuje alespoň poloviny minimální mzdy, stát rozdíl vyplatí jako daňový bonus přímo do čisté mzdy.",
  },
  {
    question: "Kdy se uplatňuje vyšší 23% sazba daně z příjmu?",
    answer:
      "Vyšší 23% sazba daně se v ČR uplatňuje pouze na část hrubé mzdy nad 3násobek průměrné mzdy měsíčně (36násobek ročně, tj. v roce 2026 část příjmu nad cca 146 901 Kč měsíčně). Zbytek mzdy do tohoto limitu se vždy daní 15 %.",
  },
];

export default function KalkulackaCisteMzdyPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Kalkulačka čisté mzdy 2026",
          url: canonical,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          inLanguage: "cs-CZ",
          offers: { "@type": "Offer", price: "0", priceCurrency: "CZK" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Nástroje", item: `${baseUrl}/nastroje` },
            { "@type": "ListItem", position: 3, name: "Kalkulačka čisté mzdy 2026", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: salaryFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Nástroje", href: "/nastroje" },
          { label: "Kalkulačka čisté mzdy 2026" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          💼 Mzdy & daně ČR 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Kalkulačka čisté mzdy 2026
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Spočítejte si během sekundy čistou mzdu z hrubé podle aktuálních sazeb pro rok 2026 —
          včetně sociálního a zdravotního pojištění, slev na děti, daňového bonusu a celkové ceny práce.
        </p>
      </header>

      <SalaryCalculator />

      <ToolPartnerCards
        slugs={["raiffeisenbank", "mbank", "wolt-kuryr"]}
        title="Jak si legálně navýšit čistý příjem o tisíce Kč"
        subtitle="Založte si bezplatný účet s bonusem až 3 000 Kč nebo si přivydělejte flexibilně ve volném čase."
        gaLocation="tool_salary_partners"
      />

      <div className="mt-14 max-w-3xl">
        <Faq items={salaryFaqs} title="Často kladené otázky k výpočtu čisté mzdy 2026" />
      </div>

      <ToolCrossLinks currentToolId="kalkulacka-ciste-mzdy" />

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
