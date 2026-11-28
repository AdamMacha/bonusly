import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { BONUSLY_TOOLS } from "@/lib/tools-data";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/nastroje");

export const metadata: Metadata = {
  title: "Finanční nástroje a kalkulačky 2026 zdarma",
  description:
    "Přehledné online kalkulačky pro rok 2026: hypoteční kalkulačka s limity ČNB, složené úročení a DIP, čistá mzda 2026, půjčka, spořicí účet i kalkulačka bankovních bonusů.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Finanční nástroje a kalkulačky 2026 | BONUSLY",
    description:
      "Hypoteční kalkulačka, složené úročení & DIP, čistá mzda 2026, půjčka, spořicí účet i kalkulačka bonusů — zdarma a bez registrace.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630, alt: "BONUSLY Nástroje" }],
  },
};

const hubFaqs = [
  {
    question: "Jsou všechny finanční kalkulačky na BONUSLY zdarma a bez registrace?",
    answer:
      "Ano, všechny nástroje a kalkulačky můžete používat opakovaně, okamžitě a bez zadávání e-mailu nebo telefonního čísla. Výpočty probíhají přímo ve vašem prohlížeči.",
  },
  {
    question: "Odpovídají výpočty českým pravidlům a sazbám pro rok 2026?",
    answer:
      "Ano. Hypoteční kalkulačka hlídá limity LTV podle doporučení ČNB (80 % / 90 % pro žadatele do 36 let), investiční kalkulačka umí daňový odpočet DIP až 48 000 Kč ročně, spořicí účet počítá s 15% srážkovou daní a čistá mzda využívá odvody a slevy platné v ČR pro rok 2026.",
  },
  {
    question: "Jak mohu kromě výpočtu ušetřit i reálné peníze?",
    answer:
      "Pod každou kalkulačkou najdete ověřené bankovní, investiční či pojistné nabídky s finančním bonusem až 3 000 Kč nebo cashbackem od BONUSLY. Využít můžete také naši Kalkulačku bankovních a investičních bonusů.",
  },
];

const CATEGORIES = ["Bydlení & Úvěry", "Investice & Spoření", "Příjmy & Bonusy"] as const;

export default function NastrojePage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Finanční nástroje a kalkulačky 2026",
          url: canonical,
          description:
            "Sada interaktivních finančních kalkulaček pro ČR 2026: hypotéka, složené úročení, čistá mzda, půjčka, spořicí účet a bonusy.",
          inLanguage: "cs-CZ",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: BONUSLY_TOOLS.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.name,
              url: `${baseUrl}${tool.href}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Nástroje", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hubFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs items={[{ label: "Nástroje" }]} />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          🧮 Finanční nástroje & kalkulačky 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Chytré kalkulačky pro hypotéku, investice i čistou mzdu
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Spočítejte si během pár sekund měsíční splátku hypotéky, efekt složeného úročení s DIP,
          čistou mzdu 2026 nebo celkový zisk z bankovních bonusů. Vše zdarma, okamžitě a bez registrace.
        </p>
      </header>

      {/* Featured Highlight: Hypoteční kalkulačka */}
      <div className="mb-12 rounded-3xl bg-navy p-6 sm:p-8 lg:p-10 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green/20 px-3 py-1 text-xs font-bold text-green-light mb-3">
              🏠 Nejpoužívanější nástroj
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hypoteční kalkulačka 2026 se splátkovým kalendářem
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Zjistěte měsíční splátku, hlídání limitu LTV podle ČNB (80 % / 90 % pro mladé do 36 let),
              zůstatek po fixaci i stresový test sazby +1 % a +2 %.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="rounded-full bg-white/10 px-3 py-1">✓ Roční splátkový kalendář</span>
              <span className="rounded-full bg-white/10 px-3 py-1">✓ Stresový test fixace</span>
              <span className="rounded-full bg-white/10 px-3 py-1">✓ Bez zadávání e-mailu</span>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/nastroje/hypotecni-kalkulacka"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-base font-bold text-navy hover:bg-green-light transition-colors shadow-lg shadow-green/20"
            >
              Spustit hypoteční kalkulačku →
            </Link>
          </div>
        </div>
      </div>

      {/* All Tools Grouped by Category */}
      <div className="space-y-12">
        {CATEGORIES.map((category) => {
          const items = BONUSLY_TOOLS.filter((t) => t.category === category);
          return (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <div className="flex items-center justify-between mb-5">
                <h2 id={`cat-${category}`} className="text-xl sm:text-2xl font-extrabold text-navy">
                  {category}
                </h2>
                <span className="text-xs font-semibold text-slate-400">
                  {items.length} {items.length === 1 ? "nástroj" : items.length <= 4 ? "nástroje" : "nástrojů"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-green/45 hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 text-2xl">
                          {tool.icon}
                        </span>
                        {tool.badge && (
                          <span className="inline-flex rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark">
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-extrabold text-navy group-hover:text-green-dark transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {tool.description}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {tool.highlights.map((item) => (
                          <li
                            key={item}
                            className="rounded-lg bg-slate-50 border border-slate-200/70 px-2.5 py-1 text-xs font-semibold text-slate-600"
                          >
                            ✓ {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">Zdarma & okamžitě</span>
                      <span className="text-sm font-bold text-green-dark group-hover:translate-x-0.5 transition-transform">
                        Otevřít kalkulačku →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-16 max-w-3xl">
        <Faq items={hubFaqs} title="Často kladené otázky k nástrojům BONUSLY" />
      </div>

      <div className="mt-10 max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
