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

const canonical = buildCanonical("/nejlepsi-bankovni-bonusy-2026");

export const metadata: Metadata = {
  title: "Nejlepší bankovní bonusy za založení účtu 2026",
  description:
    "Aktuální srovnání českých bank s bonusem za založení účtu v roce 2026: Raiffeisenbank 3 000 Kč, mBank 1 000 Kč, mSpořicí účet 4,41 %, Air Bank a Revolut.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Nejlepší bankovní bonusy za založení účtu 2026 | BONUSLY",
    description:
      "Která banka dává nejvyšší bonus za založení účtu online? Přehledná tabulka podmínek, kódů a úroků pro rok 2026.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const bankFaqs = [
  {
    question: "Která banka nabízí nejvyšší bonus za založení účtu v roce 2026?",
    answer:
      "Nejvyšší jednorázový finanční bonus pro nové klienty aktuálně nabízí Raiffeisenbank Chytrý účet (až 3 000 Kč s kódem lWcT2P), následovaný mBank mKontem (1 000 Kč za 10 libovolných plateb kartou s kódem adamm1863) a podnikatelským účtem Raiffeisenbank (+1 000 Kč pro OSVČ).",
  },
  {
    question: "Musím kvůli bonusu rušit svůj starý bankovní účet?",
    answer:
      "Ne, svůj stávající účet vůbec rušit nemusíte. Nový bezpoplatkový účet můžete založit online přes BankID za pár minut a používat ho jako druhý účet nebo pro spoření a cestování.",
  },
  {
    question: "Který spořicí účet má v roce 2026 výhodný úrok k novému účtu?",
    answer:
      "Velmi zajímavou kombinací je mBank mKonto + mSpořicí účet Plus se zvýhodněnou sazbou až 4,41 % p.a. (akce platí do 31. 1. 2027) bez nutnosti vázat peníze na termínovaný vklad.",
  },
  {
    question: "Jsou vklady u všech srovnávaných bank pojištěny?",
    answer:
      "Ano, všechny banky v našem přehledu (Raiffeisenbank, mBank, Air Bank i Revolut Bank UAB) mají zákonné evropské pojištění vkladů do 100 000 EUR (cca 2,5 mil. Kč) na osobu.",
  },
];

export default async function NejlepsiBankovniBonusyPage() {
  const bankOffers = await prisma.offer.findMany({
    where: { active: true, category: { slug: "banky" } },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Nejlepší bankovní bonusy za založení účtu 2026",
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: bankOffers.length,
            itemListElement: bankOffers.map((o, idx) => ({
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
            { "@type": "ListItem", position: 2, name: "Banky & Účty", item: `${baseUrl}/kategorie/banky` },
            { "@type": "ListItem", position: 3, name: "Nejlepší bankovní bonusy 2026", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: bankFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Banky & Účty", href: "/kategorie/banky" },
          { label: "Nejlepší bankovní bonusy 2026" },
        ]}
      />

      <header className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          🏦 Aktualizovaný žebříček 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Nejlepší bankovní bonusy za založení účtu 2026
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Přehledné srovnání všech ověřených bankovních účtů, podnikatelských účtů a karet v ČR, u kterých v roce 2026 získáte finanční bonus za založení online.
        </p>
      </header>

      {/* Comparison Table */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-bold">Banka / Produkt</th>
                <th className="px-5 py-4 font-bold">Aktuální bonus / výhoda</th>
                <th className="px-5 py-4 font-bold">Kód</th>
                <th className="px-5 py-4 font-bold">Hodnocení</th>
                <th className="px-5 py-4 font-bold text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bankOffers.map((offer) => (
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
                    {offer.bonus || "Účet zdarma"}
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
                        gaCategory="banky"
                        gaLocation="bank_bonuses_table"
                      >
                        Získat
                      </CtaButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategic Guide + Calculator CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
        <div className="lg:col-span-2 prose">
          <h2>Jak z bankovních bonusů získat 4 500+ Kč bez rizika</h2>
          <p>
            Založení druhého či třetího bezpoplatkového účtu přes <strong>BankID</strong> dnes trvá méně než 10 minut z gauče. Pokud zkombinujete <strong>Raiffeisenbank Chytrý účet (+3 000 Kč)</strong>, <strong>mBank mKonto (+1 000 Kč)</strong> a cestovatelský <strong>Revolut (+500 Kč od BONUSLY)</strong>, získáte za běžné nákupy, které byste stejně udělali, přes <strong>4 500 Kč čistého navíc</strong> — a živnostníci s IČO mohou přidat dalších 1 000 Kč u podnikatelského účtu.
          </p>
          <h3>Na co si dát při sbírání bankovních bonusů pozor</h3>
          <ul>
            <li><strong>Vždy používejte přesný promo odkaz nebo kód:</strong> Zpětné doplnění kódu po odeslání žádosti banky téměř nikdy neumožňují.</li>
            <li><strong>Hlídejte lhůtu od založení:</strong> Nejčastěji máte 30 až 45 dní na splnění požadovaného počtu plateb kartou.</li>
            <li><strong>Platby kartou vs. převody:</strong> Počítají se reálné nákupy v obchodech a na internetu (vč. Apple Pay / Google Pay), nikoliv převody mezi účty nebo dobití sázkových účtů.</li>
          </ul>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-navy text-white p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-green mb-2">
              🧮 Interaktivní kalkulačka
            </p>
            <h3 className="text-lg font-bold mb-2">Spočítejte si svůj celkový bonus</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Zaškrtněte banky, které ještě nemáte, a okamžitě uvidíte celkovou částku i přesný postup.
            </p>
            <Link
              href="/kalkulacka-bonusu"
              className="inline-flex w-full items-center justify-center rounded-xl bg-green px-4 py-2.5 text-sm font-bold text-navy hover:bg-green-light transition-colors"
            >
              Otevřít kalkulačku →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Přímé duely bank
            </p>
            <ul className="space-y-2 text-sm font-semibold text-navy">
              <li>
                <Link href="/porovnani/raiffeisenbank-vs-mbank" className="hover:text-green-dark">
                  Raiffeisenbank vs. mBank →
                </Link>
              </li>
              <li>
                <Link href="/porovnani/raiffeisenbank-vs-air-bank" className="hover:text-green-dark">
                  Raiffeisenbank vs. Air Bank →
                </Link>
              </li>
              <li>
                <Link href="/porovnani/mbank-vs-air-bank" className="hover:text-green-dark">
                  mBank vs. Air Bank →
                </Link>
              </li>
              <li>
                <Link href="/porovnani/raiffeisenbank-vs-revolut" className="hover:text-green-dark">
                  Raiffeisenbank vs. Revolut →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="max-w-3xl mb-12">
        <Faq items={bankFaqs} title="Časté dotazy k bankovním bonusům 2026" />
      </div>

      <div className="max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
