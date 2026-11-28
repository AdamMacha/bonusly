import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SavingsCalculator } from "@/components/tools/savings-calculator";
import { ToolPartnerCards } from "@/components/tools/tool-partner-cards";
import { ToolCrossLinks } from "@/components/tools/tool-cross-links";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/nastroje/kalkulacka-sporiciho-uctu");

export const metadata: Metadata = {
  title: "Kalkulačka spořicího účtu 2026: výpočet čistého úroku po 15% dani",
  description:
    "Spočítejte si přesný čistý výnos na spořicím účtu nebo termínovaném vkladu v ČR pro rok 2026 včetně automatického odečtu 15% srážkové daně a měsíčního připisování úroků.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Kalkulačka spořicího účtu 2026 (po 15% dani) | BONUSLY",
    description:
      "Kolik vám skutečně připíše spořicí účet v čistém po odečtení 15% srážkové daně v ČR?",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630, alt: "Kalkulačka spořicího účtu 2026" }],
  },
};

const savingsFaqs = [
  {
    question: "Musím úroky ze spořicího účtu v ČR uvádět v daňovém přiznání?",
    answer:
      "Ne. U českých bank se úroky na spořicích účtech i termínovaných vkladech daní automaticky 15% srážkovou daní přímo v bance. Na účet vám tedy chodí již čistý zdaněný úrok.",
  },
  {
    question: "Jsou peníze na spořicím účtu pojištěné?",
    answer:
      "Ano, vklady u všech bank s českou či evropskou bankovní licencí jsou ze zákona pojištěny u Garančního systému finančního trhu až do výše 100 000 EUR (cca 2,5 mil. Kč) na jednoho klienta a jednu banku.",
  },
  {
    question: "Kolik peněz držet na spořicím účtu a kdy už raději investovat?",
    answer:
      "Na spořicím účtu se doporučuje držet pohotovostní rezervu ve výši 3 až 6 měsíčních výdajů domácnosti nebo peníze, které budete potřebovat do 2–3 let (např. na akontaci k hypotéce). Prostředky s delším horizontem dlouhodobě lépe ochrání před inflací ETF nebo DIP.",
  },
];

export default function KalkulackaSporicihoUctuPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Kalkulačka spořicího účtu 2026",
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
            { "@type": "ListItem", position: 3, name: "Kalkulačka spořicího účtu", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: savingsFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Nástroje", href: "/nastroje" },
          { label: "Kalkulačka spořicího účtu 2026" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          🏦 Spoření & rezervy 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Kalkulačka spořicího účtu 2026
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Spočítejte si přesný čistý úrok po odečtení 15% srážkové daně v ČR. Podporuje měsíční i
          roční připisování úroků a pravidelné měsíční odkládání.
        </p>
      </header>

      <SavingsCalculator />

      <ToolPartnerCards
        slugs={["mbank-sporici-ucet", "raiffeisenbank", "rondainvest"]}
        title="Kam uložit úspory s nejlepším úrokem a bonusem"
        subtitle="Spořicí účty zdarma, bankovní odměny za založení účtu i alternativy s vyšším zhodnocením."
        gaLocation="tool_savings_partners"
      />

      <div className="mt-14 max-w-3xl">
        <Faq items={savingsFaqs} title="Často kladené otázky ke spořicím účtům" />
      </div>

      <ToolCrossLinks currentToolId="kalkulacka-sporiciho-uctu" />

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
