import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButton } from "@/components/cta-button";
import { CopyCodeButton } from "@/components/copy-code-button";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/investicni-bonusy-2026");

export const metadata: Metadata = {
  title: "Nejlepší investiční platformy a bonusy 2026",
  description:
    "Srovnání nejlepších investičních platforem v ČR pro rok 2026: Portu, Patria Finance (ETF bez poplatku), Investown (+500 Kč), Ronda Invest (+1 %), Roier a Trading 212.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Nejlepší investiční platformy a bonusy 2026 | BONUSLY",
    description:
      "Kde nejvýhodněji investovat do ETF, nemovitostních úvěrů a DIP v roce 2026? Srovnání poplatků, výnosů, regulace ČNB a uvítacích bonusů.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const investFaqs = [
  {
    question: "Kde v roce 2026 získám nejvyšší vstupní investiční bonus?",
    answer:
      "Pro drobné investory od 5 000 Kč je nejlepší Investown (500 Kč bonus = okamžitých +10 % s kódem 0G1ADBC5). Pro vyšší investice nad 50 000 Kč vede Ronda Invest s 1% vstupním bonusem ze všech investic za prvních 30 dnů. U pravidelných ETF zase Patria Finance odpouští nákupní poplatky do 31. 12. 2026.",
  },
  {
    question: "Jaký je rozdíl mezi ETF (Portu / Patria) a nemovitostním crowdfundingem (Investown / Roier / Ronda)?",
    answer:
      "ETF fondy představují podíl na stovkách až tisících světových firem (historický výnos ~7–9 % ročně, daňově osvobozeno po 3 letech držení, vyšší krátkodobé kolísání). Nemovitostní úvěry vyplácejí fixní měsíční úrok ~8–10 % p.a. krytý zástavou nemovitosti, ale výnosy podléhají zdanění a nesou kreditní riziko dlužníka.",
  },
  {
    question: "Které platformy podporují daňově zvýhodněný Důchodový účet (DIP)?",
    answer:
      "Z našeho srovnání nabízejí český Dlouhodobý investiční produkt (DIP) s možností daňového odpočtu až 48 000 Kč ročně platformy Portu.cz a Patria Finance.",
  },
];

export default async function InvesticniBonusyPage() {
  const financeOffers = await prisma.offer.findMany({
    where: { active: true, category: { slug: "finance" } },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Nejlepší investiční platformy a bonusy 2026",
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: financeOffers.length,
            itemListElement: financeOffers.map((o, idx) => ({
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
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Investice & Finance", item: `${baseUrl}/kategorie/finance` },
            { "@type": "ListItem", position: 3, name: "Investiční bonusy 2026", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: investFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Investice & Finance", href: "/kategorie/finance" },
          { label: "Investiční bonusy 2026" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          📈 Srovnání investic 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Nejlepší investiční platformy a bonusy 2026
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Přehled regulovaných investičních platforem pro ETF, DIP i úvěry zajištěné nemovitostmi — porovnejte poplatky, výnosy a vstupní bonusy na jednom místě.
        </p>
      </header>

      {/* Comparison Table */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-bold">Platforma</th>
                <th className="px-5 py-4 font-bold">Hlavní výhoda / Bonus 2026</th>
                <th className="px-5 py-4 font-bold">Kód</th>
                <th className="px-5 py-4 font-bold">Hodnocení</th>
                <th className="px-5 py-4 font-bold text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {financeOffers.map((offer) => (
                <tr key={offer.slug} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <Link
                      href={`/nabidky/${offer.slug}`}
                      className="font-bold text-navy hover:text-green-dark transition-colors block"
                    >
                      {offer.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-xs line-clamp-1">
                      {offer.shortDescription}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-green-dark">
                    {offer.bonus || "Ověřená platforma"}
                  </td>
                  <td className="px-5 py-4">
                    {offer.promoCode ? (
                      <CopyCodeButton code={offer.promoCode} offerSlug={offer.slug} size="sm" />
                    ) : (
                      <span className="text-xs text-slate-400">Přes odkaz</span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-bold text-amber-600 whitespace-nowrap">
                    {offer.rating ? `★ ${offer.rating.toFixed(1)}` : "Ověřeno"}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/nabidky/${offer.slug}`}
                        className="text-xs font-semibold text-slate-500 hover:text-navy"
                      >
                        Recenze
                      </Link>
                      <CtaButton
                        href={`/go/${offer.trackingSlug}`}
                        size="sm"
                        gaOfferSlug={offer.slug}
                        gaCategory="finance"
                        gaLocation="invest_bonuses_table"
                      >
                        Přejít
                      </CtaButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
        <div className="lg:col-span-2 prose">
          <h2>Jak sestavit vyvážené portfolio v roce 2026</h2>
          <ul>
            <li>
              <strong>Jádro portfolia (60–80 %) — Globální ETF & DIP:</strong> Pro bezstarostný automatizovaný start zvolte <Link href="/nabidky/portu">Portu.cz</Link> nebo <Link href="/nabidky/patria-finance">Patria Finance</Link> (pravidelné ETF bez nákupních poplatků do 31. 12. 2026); zkušení investoři ocení 0% komise na <Link href="/nabidky/trading-212">Trading 212</Link>.
            </li>
            <li>
              <strong>Měsíční cashflow (15–30 %) — Úvěry zajištěné nemovitostmi:</strong> Rozložte vklady napříč <Link href="/nabidky/investown">Investownem (+500 Kč bonus)</Link>, <Link href="/nabidky/rondainvest">Ronda Invest (+1 % vstupní bonus)</Link> a konzervativním <Link href="/nabidky/roier">Roierem (LTV max. 70 %)</Link>.
            </li>
            <li>
              <strong>Diverzifikace (5–10 %) — Alternativní aktiva:</strong> Pro milovníky sběratelských předmětů a nízké korelace s burzou je tu <Link href="/nabidky/portu-gallery">Portu Gallery</Link> již od 1 Kč.
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            *Upozornění: Investování je spojeno s rizikem kolísání hodnoty a ztráty části investované částky. Minulé výnosy nejsou zárukou výnosů budoucích.*
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Srovnání platforem 1 vs. 1
            </p>
            <ul className="space-y-2 text-sm font-semibold text-navy">
              <li>
                <Link href="/porovnani/portu-vs-patria-finance" className="hover:text-green-dark">
                  Portu vs. Patria Finance →
                </Link>
              </li>
              <li>
                <Link href="/porovnani/investown-vs-roier" className="hover:text-green-dark">
                  Investown vs. Roier →
                </Link>
              </li>
              <li>
                <Link href="/porovnani/investown-vs-rondainvest" className="hover:text-green-dark">
                  Investown vs. Ronda Invest →
                </Link>
              </li>
              <li>
                <Link href="/porovnani/roier-vs-rondainvest" className="hover:text-green-dark">
                  Roier vs. Ronda Invest →
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/kalkulacka-bonusu"
            className="block rounded-2xl bg-navy text-white p-5 hover:bg-navy-light transition-colors"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-green mb-1">
              🧮 Kalkulačka bonusů
            </p>
            <p className="text-sm font-bold">Spočítejte si celkový zisk z bonusů 2026 →</p>
          </Link>
        </aside>
      </div>

      <div className="max-w-3xl mb-12">
        <Faq items={investFaqs} title="Časté otázky k investičním platformám" />
      </div>

      <div className="max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
