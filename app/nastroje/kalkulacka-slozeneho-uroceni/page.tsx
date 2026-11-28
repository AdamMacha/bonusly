import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator";
import { ToolPartnerCards } from "@/components/tools/tool-partner-cards";
import { ToolCrossLinks } from "@/components/tools/tool-cross-links";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/nastroje/kalkulacka-slozeneho-uroceni");

export const metadata: Metadata = {
  title: "Kalkulačka složeného úročení & DIP 2026: výpočet výnosu ETF",
  description:
    "Interaktivní investiční kalkulačka složeného úročení 2026. Spočítejte si růst pravidelných investic do ETF, reálnou hodnotu po inflaci, daňovou úsporu DIP i měsíční rentu dle pravidla 4 %.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Kalkulačka složeného úročení & DIP 2026 | BONUSLY",
    description:
      "Zjistěte, kolik vám vydělá složené úročení v ETF a kolik ušetříte na daních díky DIP.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630, alt: "Kalkulačka složeného úročení" }],
  },
};

const compoundFaqs = [
  {
    question: "Jak funguje složené úročení u pravidelného investování?",
    answer:
      "Při složeném úročení se úroky a kapitálové výnosy dále reinvestují a v dalších letech vydělávají samy na sebe. Na horizontu 15–30 let tvoří výnosy ze složeného úročení často větší část celkového majetku než vaše samotné vklady.",
  },
  {
    question: "Jaká je daňová úspora u DIP (Dlouhodobého investičního produktu) v roce 2026?",
    answer:
      "Vklady na DIP (v kombinaci s penzijním spořením a životním pojištěním) si můžete odečíst od základu daně až do výše 48 000 Kč ročně. Při 15% sazbě daně ušetříte až 7 200 Kč ročně (při 23% sazbě až 11 040 Kč). Podmínkou je držení do 60 let věku a min. 10 let.",
  },
  {
    question: "Co je pravidlo 4 % (finanční renta)?",
    answer:
      "Pravidlo 4 % vychází z historických studií (Trinity Study) a ukazuje orientační částku, kterou lze z diverzifikovaného akciovo-dluhopisového portfolia dlouhodobě čerpat (4 % ročně děleno 12 měsíci), aniž by se majetek předčasně vyčerpal.",
  },
];

export default function KalkulackaSlozenehoUroceniPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Kalkulačka složeného úročení & DIP 2026",
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
            { "@type": "ListItem", position: 3, name: "Kalkulačka složeného úročení", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: compoundFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Nástroje", href: "/nastroje" },
          { label: "Kalkulačka složeného úročení & DIP" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          📈 Investice, ETF & DIP 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Kalkulačka složeného úročení &amp; DIP
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Podívejte se, jak pravidelné měsíční investice rostou v čase. Kalkulačka započítá inflaci,
          daňovou úsporu z DIP až 7 200 Kč ročně i vaši budoucí pasivní rentu.
        </p>
      </header>

      <CompoundInterestCalculator />

      <ToolPartnerCards
        slugs={["portu", "patria-finance", "investown"]}
        title="Kde začít investovat do ETF, DIP a nemovitostí"
        subtitle="Ověřené investiční platformy dostupné v ČR s registračním bonusem nebo cashbackem od BONUSLY."
        gaLocation="tool_compound_partners"
      />

      <div className="mt-14 max-w-3xl">
        <Faq items={compoundFaqs} title="Často kladené otázky ke složenému úročení a DIP" />
      </div>

      <ToolCrossLinks currentToolId="kalkulacka-slozeneho-uroceni" />

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
