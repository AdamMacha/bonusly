import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BonusCalculator } from "@/components/bonus-calculator";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/kalkulacka-bonusu");

export const metadata: Metadata = {
  title: "Kalkulačka bankovních a investičních bonusů 2026",
  description:
    "Spočítejte si za 30 sekund, kolik peněz můžete v roce 2026 získat na bankovních účtech zdarma, investičních bonusech a ověřených slevových kódech v ČR.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Kalkulačka bonusů 2026: Kolik si dnes vyděláte? | BONUSLY",
    description:
      "Interaktivní kalkulačka českých bankovních a investičních bonusů 2026 — sestavte si vlastní akční plán krok za krokem.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const calcFaqs = [
  {
    question: "Mohu legálně založit více bankovních účtů najednou a získat všechny bonusy?",
    answer:
      "Ano, v České republice neexistuje žádný limit na počet běžných účtů u různých bank. Všechny vybrané účty (Raiffeisenbank Chytrý účet, mBank mKonto, Air Bank, Revolut) mají vedení za 0 Kč bez závazku.",
  },
  {
    question: "Musím bankovní a registrační bonusy v ČR danit?",
    answer:
      "U běžných bankovních a marketingových bonusů v řádu jednotek tisíc korun za rok (zpravidla do zákonného limitu ostatních příjmů § 10 ZDP nebo zdaněných bankou srážkovou daní) nebývá daňová povinnost u drobných klientů složitá; při vyšších příjmech doporučujeme ověřit konkrétní podmínky akce v daňovém přiznání.",
  },
  {
    question: "Jak dlouho reálně trvá posbírat první 4 000 až 5 000 Kč z bonusů?",
    answer:
      "Samotné založení účtů přes BankID (Raiffeisenbank, mBank, Investown, Revolut) zabere zhruba 30 až 40 minut online. Odměny se pak připisují po splnění podmínek (např. plateb kartou) během několika dnů až týdnů.",
  },
];

export default function KalkulackaBonusuPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Kalkulačka bankovních a investičních bonusů 2026",
          url: canonical,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          inLanguage: "cs-CZ",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "CZK",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Kalkulačka bonusů 2026", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: calcFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs items={[{ label: "Kalkulačka bonusů 2026" }]} />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          🧮 Interaktivní nástroj 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Kolik si dnes vyděláte na bonusech v ČR?
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Zaškrtněte banky, investiční platformy a slevy, které ještě nevyužíváte, a připočítejte roční cashback z běžných nákupů. Kalkulačka okamžitě spočítá váš celkový zisk a připraví akční plán.
        </p>
      </header>

      <BonusCalculator />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
        <Link
          href="/nejlepsi-bankovni-bonusy-2026"
          className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-green/40 hover:shadow-md transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-green-dark">Přehled 2026</span>
          <h2 className="mt-1 text-lg font-bold text-navy">Nejlepší bankovní bonusy za účet →</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Detailní srovnání všech českých bank s odměnou až 3 000 Kč a nulovými poplatky.
          </p>
        </Link>
        <Link
          href="/investicni-bonusy-2026"
          className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-green/40 hover:shadow-md transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-green-dark">Přehled 2026</span>
          <h2 className="mt-1 text-lg font-bold text-navy">Nejlepší investiční bonusy a ETF →</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Srovnání Portu, Patria Finance, Investown, Roier a Ronda Invest včetně DIP.
          </p>
        </Link>
      </div>

      <div className="mt-14 max-w-3xl">
        <Faq items={calcFaqs} title="Často kladené otázky ke kombinování bonusů" />
      </div>

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
