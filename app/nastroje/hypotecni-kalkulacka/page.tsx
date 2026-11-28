import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";
import { ToolPartnerCards } from "@/components/tools/tool-partner-cards";
import { ToolCrossLinks } from "@/components/tools/tool-cross-links";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/nastroje/hypotecni-kalkulacka");

export const metadata: Metadata = {
  title: "Hypoteční kalkulačka 2026: výpočet splátky, LTV a splátkový kalendář",
  description:
    "Přesná hypoteční kalkulačka 2026 zdarma bez registrace. Spočítejte si měsíční splátku hypotéky, kontrolu LTV dle ČNB, zůstatek po fixaci, stresový test sazby i roční splátkový kalendář.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Hypoteční kalkulačka 2026 — splátka, LTV a fixace | BONUSLY",
    description:
      "Okamžitý výpočet hypotéky pro rok 2026 včetně splátkového kalendáře, kontroly limitů ČNB a stresového testu sazby.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630, alt: "Hypoteční kalkulačka 2026" }],
  },
};

const mortgageFaqs = [
  {
    question: "Kolik vlastních peněz potřebuji na hypotéku v roce 2026 (LTV)?",
    answer:
      "Podle pravidel ČNB je standardní horní limit LTV 80 % — musíte tedy mít alespoň 20 % z hodnoty nemovitosti z vlastních zdrojů (nebo dofinancovat další nemovitostí do zástavy). Žadatelé mladší 36 let mohou při koupi vlastního bydlení dosáhnout až na 90 % LTV (stačí 10 % vlastních zdrojů).",
  },
  {
    question: "Jakou délku fixace hypotéky zvolit v roce 2026?",
    answer:
      "Nejčastější volbou je 3letá nebo 5letá fixace, které kombinují stabilitu splátky s dobrou sazbou. Pokud čekáte další pokles sazeb, bývá zajímavá 3letá fixace; pokud chcete delší jistotu rodinného rozpočtu, dává smysl 5 let.",
  },
  {
    question: "Co znamená stresový test sazby +1 % a +2 % v kalkulačce?",
    answer:
      "Po skončení fixačního období vám banka nabídne novou úrokovou sazbu na zbývající nesplacenou jistinu. Stresový test ukazuje, o kolik by se zvedla vaše měsíční splátka, kdyby sazby vzrostly o 1 nebo 2 procentní body, abyste si ověřili bezpečnou rezervu v rozpočtu.",
  },
  {
    question: "Které další náklady musím kromě splátky hypotéky započítat?",
    answer:
      "Kromě samotné splátky počítejte s povinným pojištěním nemovitosti (vyžaduje ho každá banka), doporučeným pojištěním domácnosti, odhadem nemovitosti, poplatkem za vklad do katastru (2 000 Kč) a fondem oprav / energiemi.",
  },
];

export default function HypotecniKalkulackaPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Hypoteční kalkulačka 2026",
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
            { "@type": "ListItem", position: 3, name: "Hypoteční kalkulačka", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: mortgageFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Nástroje", href: "/nastroje" },
          { label: "Hypoteční kalkulačka 2026" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          🏠 Bydlení & hypotéky 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Hypoteční kalkulačka 2026
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Spočítejte si přesnou měsíční splátku hypotéky, hlídání limitu LTV podle ČNB, zůstatek
          úvěru po fixaci i kompletní splátkový kalendář rok po roce — zdarma a bez zadávání kontaktu.
        </p>
      </header>

      <MortgageCalculator />

      <ToolPartnerCards
        slugs={["csob-pojistovna", "mbank-sporici-ucet", "stalynajem"]}
        title="Užitečné nabídky k hypotéce a nemovitosti"
        subtitle="Pojištění nemovitosti vyžaduje každá banka, spořicí účet zhodnotí vlastní zdroje a Stálýnájem.cz zajistí garantovaný příjem u investičního bytu."
        gaLocation="tool_mortgage_partners"
      />

      <div className="mt-14 max-w-3xl">
        <Faq items={mortgageFaqs} title="Často kladené otázky k hypotéce v roce 2026" />
      </div>

      <ToolCrossLinks currentToolId="hypotecni-kalkulacka" />

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
