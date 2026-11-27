import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/jak-funguje-cashback");

export const metadata: Metadata = {
  title: "Jak funguje cashback 50/50 na BONUSLY (návod 2026)",
  description:
    "Získejte zpět 50 % z naší partnerské provize u více než 330 českých e-shopů. Přehledný návod, jak cashback aktivovat, jak nepřijít o odměnu a jak probíhá výplata.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Jak funguje cashback 50/50 na BONUSLY | BONUSLY",
    description:
      "Transparentní model 50/50: polovinu provize z každého vašeho nákupu u 330+ e-shopů vracíme přímo do vaší BONUSLY peněženky.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const cashbackFaqs = [
  {
    question: "Kolik přesně dostanu z nákupu zpět?",
    answer:
      "Na BONUSLY používáme férový model 50/50 — přesně 50 % z čisté partnerské provize, kterou nám e-shop za váš nákup vyplatí, připisujeme rovnou do vaší BONUSLY peněženky. Orientační procento nebo částku v Kč vidíte vždy přímo u nabídky (např. Cashback 4 % nebo Cashback až 500 Kč).",
  },
  {
    question: "Za jak dlouho uvidím transakci v peněžence?",
    answer:
      "Propojení s partnerskou sítí synchronizujeme automaticky každých 30 minut. Jakmile e-shop objednávku zaeviduje (obvykle během několika minut až hodin po nákupu), objeví se ve vaší peněžence ve stavu „Čeká na schválení“. Po uplynutí lhůty pro vrácení zboží partner objednávku schválí a odměna se uvolní k výplatě.",
  },
  {
    question: "Proč musím vypnout AdBlock a povolit cookies?",
    answer:
      "Cashback funguje díky měřicím cookies a partnerskému odkazu. Blokátory reklam (AdBlock, uBlock Origin, Brave Shields) nebo odmítnutí analytických/marketingových cookies na webu e-shopu mohou přerušit přenos ID vaší objednávky, a e-shop pak nákup nepřipíše. Před proklikem proto doporučujeme AdBlock dočasně pozastavit a cookies v e-shopu přijmout.",
  },
  {
    question: "Proč u některých nabídek (např. Blaire.cz nebo Jabkolevně.cz) cashback není?",
    answer:
      "Někteří partneři ve svých oficiálních affiliate podmínkách cashback výslovně zakazují. Tato pravidla striktně dodržujeme — u těchto nabídek cashback nikdy nenabízíme, ale můžete na nich bez registrace využít všechny uvedené přímé slevové kódy a akce.",
  },
  {
    question: "Můžu kombinovat cashback se slevovým kódem?",
    answer:
      "Slevové kódy uvedené přímo na BONUSLY můžete u většiny e-shopů bez problémů použít. Použití cizího (nepartnerského) kódu z jiného portálu, newsletteru nebo influencer kampaně ale může způsobit, že e-shop provizi nepřipíše, případně sníží cashback sazbu podle podmínek programu.",
  },
  {
    question: "Jak si vyplatím nasbírané peníze na bankovní účet?",
    answer:
      "Jakmile máte v BONUSLY peněžence schválený zůstatek, stačí na stránce Moje peněženka zadat své číslo českého bankovního účtu a požádat o výplatu. Převod je zcela zdarma bez jakýchkoliv poplatků.",
  },
];

export default function JakFungujeCashbackPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Jak funguje cashback 50/50 na BONUSLY",
          url: canonical,
          inLanguage: "cs-CZ",
          publisher: {
            "@type": "Organization",
            name: "BONUSLY",
            url: `${baseUrl}/`,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Jak funguje cashback", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: cashbackFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs items={[{ label: "Jak funguje cashback 50/50" }]} />

      <header className="mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 mb-3">
          <span aria-hidden="true">💰</span> Férový model 50/50 · 330+ českých e-shopů
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Jak funguje cashback na BONUSLY
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Když nakoupíte v partnerském e-shopu přes náš odkaz, získá BONUSLY od obchodu provizi za doporučení.{" "}
          <strong className="text-navy">Přesně 50 % z této provize vracíme zpět vám</strong> do vaší BONUSLY peněženky — bez skrytých poplatků a bez navýšení ceny nákupu.
        </p>
      </header>

      {/* 4 Steps Visual Flow */}
      <section aria-labelledby="steps-heading" className="mb-12">
        <h2 id="steps-heading" className="text-xl font-bold text-navy mb-5">
          4 jednoduché kroky k vaší odměně
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              step: "1",
              title: "Přihlásíte se zdarma jedním klikem",
              text: "Stačí zadat e-mail na stránce Přihlášení — pošleme vám okamžitý přihlašovací odkaz (Magic Link) bez hesla. Díky přihlášení víme, komu odměnu připsat.",
            },
            {
              step: "2",
              title: "Prokliknete se k e-shopu s cashbackem",
              text: "Vyberte si v katalogu některý z 330+ obchodů označených zlatým štítkem 💰 Cashback (např. Vivantis, Lékárna.cz, eObuv, Douglas) a klikněte na zelené tlačítko.",
            },
            {
              step: "3",
              title: "Nakoupíte jako obvykle",
              text: "Cena zboží je úplně stejná jako napřímo. Naše propojení s partnerskou sítí kontroluje nové objednávky automaticky každých 30 minut.",
            },
            {
              step: "4",
              title: "Připíšeme 50 % provize a vyplatíme na účet",
              text: "Po schválení objednávky e-shopem se odměna uvolní ve vaší BONUSLY peněžence a můžete si ji zdarma poslat na svůj bankovní účet.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green text-sm font-black text-navy mb-3">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-navy">{item.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important Checklist: AdBlock & Cookies */}
      <section
        aria-labelledby="tips-heading"
        className="mb-12 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-6 sm:p-7"
      >
        <h2 id="tips-heading" className="text-lg sm:text-xl font-extrabold text-amber-950 flex items-center gap-2">
          <span aria-hidden="true">🛡️</span> Jak nepřijít o cashback (důležitá pravidla)
        </h2>
        <p className="mt-2 text-sm text-amber-900/90 leading-relaxed">
          Aby e-shop spolehlivě spároval vaši objednávku s vaším účtem na BONUSLY, dodržte před nákupem těchto 5 drobností:
        </p>
        <ul className="mt-4 space-y-2.5 text-sm text-amber-950">
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-amber-700 shrink-0">✓</span>
            <span>
              <strong>Vypněte AdBlock a blokátory sledování</strong> (uBlock Origin, Brave Shields, agresivní ochrana v Safari/Firefox) alespoň po dobu nákupu.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-amber-700 shrink-0">✓</span>
            <span>
              <strong>Povolte cookies na webu e-shopu</strong> v cookie liště (hlavně marketingové/partnerské cookies), jinak e-shop nepozná, že jste přišli přes BONUSLY.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-amber-700 shrink-0">✓</span>
            <span>
              <strong>Dokončete objednávku v tom samém okně prohlížeče</strong> — nepřeskakujte v průběhu nákupu do mobilní aplikace e-shopu ani na srovnávače cen (Heureka, Zboží).
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-amber-700 shrink-0">✓</span>
            <span>
              <strong>Nepoužívejte cizí slevové kódy mimo BONUSLY</strong> — u řady obchodů může externí kupón zrušit nárok na cashback provizi.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-amber-700 shrink-0">✓</span>
            <span>
              <strong>Nákup začněte vždy přihlášeni na BONUSLY</strong> — v horní liště uvidíte svůj účet a u nabídky zelený pruh <em>„Cashback aktivní“</em>.
            </span>
          </li>
        </ul>
      </section>

      {/* CTA Banner */}
      <section className="mb-12 rounded-3xl bg-navy text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Připraveni dostávat peníze zpět z každého nákupu?
          </h2>
          <p className="mt-1.5 text-sm text-slate-300">
            Přihlášení trvá 15 sekund a je navždy zdarma. Vyberte si z více než 330 ověřených e-shopů.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/prihlaseni"
            className="inline-flex items-center justify-center rounded-xl bg-green px-5 py-3 text-sm font-bold text-navy hover:bg-green-light transition-colors"
          >
            Aktivovat cashback zdarma →
          </Link>
          <Link
            href="/nabidky"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Prohlédnout e-shopy
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <div className="mb-10">
        <Faq items={cashbackFaqs} title="Časté dotazy k BONUSLY cashbacku" />
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-sm">
        <Link href="/kalkulacka-bonusu" className="font-semibold text-green-dark hover:text-green">
          🧮 Spočítat roční cashback v kalkulačce →
        </Link>
        <Link href="/jak-hodnotime" className="font-semibold text-navy hover:text-green-dark">
          Jak ověřujeme nabídky →
        </Link>
      </div>
    </div>
  );
}
