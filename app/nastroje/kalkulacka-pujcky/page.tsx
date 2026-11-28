import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import { ToolPartnerCards } from "@/components/tools/tool-partner-cards";
import { ToolCrossLinks } from "@/components/tools/tool-cross-links";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/nastroje/kalkulacka-pujcky");

export const metadata: Metadata = {
  title: "Kalkulačka půjčky a refinancování 2026: výpočet splátky a RPSN",
  description:
    "Spočítejte si měsíční splátku spotřebitelské půjčky, orientační RPSN, celkové přeplacení i přesnou úsporu při refinancování nebo konsolidaci dražších úvěrů.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Kalkulačka půjčky a refinancování 2026 | BONUSLY",
    description:
      "Okamžitý výpočet splátky půjčky, RPSN a úspory při refinancování dražších úvěrů.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630, alt: "Kalkulačka půjčky 2026" }],
  },
};

const loanFaqs = [
  {
    question: "Jaký je rozdíl mezi úrokovou sazbou a RPSN?",
    answer:
      "Úroková sazba udává pouze cenu samotných půjčených peněz za rok. RPSN (roční procentní sazba nákladů) zahrnuje kromě úroku i všechny poplatky za sjednání, vedení úvěru nebo povinné pojištění — díky RPSN snadno porovnáte, která půjčka je skutečně nejlevnější.",
  },
  {
    question: "Kdy se vyplatí refinancování nebo konsolidace půjček?",
    answer:
      "Refinancování se vyplatí téměř vždy, když dokážete snížit úrokovou sazbu alespoň o 1,5–2 procentní body a zbývá vám splácet více než rok. Navíc sloučením kreditních karet, kontokorentu a menších půjček do jedné bankovní půjčky získáte přehled a často ušetříte tisíce korun měsíčně.",
  },
  {
    question: "Mohu spotřebitelskou půjčku v ČR splatit předčasně?",
    answer:
      "Ano, ze zákona o spotřebitelském úvěru můžete půjčku kdykoli splatit částečně nebo zcela. Banka si smí účtovat jen účelně vynaložené náklady (maximálně 1 % ze splacené částky, resp. 0,5 % v posledním roce splácení), řada bank však umožňuje předčasné splacení zcela zdarma.",
  },
];

export default function KalkulackaPujckyPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Kalkulačka půjčky a refinancování 2026",
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
            { "@type": "ListItem", position: 3, name: "Kalkulačka půjčky", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: loanFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Nástroje", href: "/nastroje" },
          { label: "Kalkulačka půjčky a refinancování" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          💳 Půjčky & konsolidace 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Kalkulačka půjčky a refinancování
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Ověřte si přesnou měsíční splátku, orientační RPSN i celkové přeplacení půjčky. Součástí
          je srovnávač refinancování, který okamžitě ukáže úsporu při převedení dražšího úvěru.
        </p>
      </header>

      <LoanCalculator />

      <ToolPartnerCards
        slugs={["raiffeisenbank-pujcka", "raiffeisenbank", "flowpay"]}
        title="Ověřené bankovní půjčky a financování"
        subtitle="Porovnejte aktuální podmínky úvěrů pro fyzické osoby i podnikatele (OSVČ a s.r.o.)."
        gaLocation="tool_loan_partners"
      />

      <div className="mt-14 max-w-3xl">
        <Faq items={loanFaqs} title="Často kladené otázky k půjčkám a RPSN" />
      </div>

      <ToolCrossLinks currentToolId="kalkulacka-pujcky" />

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
