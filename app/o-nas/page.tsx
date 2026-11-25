import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl, SOCIAL_LINKS } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/o-nas");

export const metadata: Metadata = {
  title: "O nás — Provozovatel, redakce a mise",
  description:
    "Poznejte tým a provozovatele nezávislého českého srovnávače BONUSLY.cz. Jak vybíráme a ověřujeme bankovní bonusy, investice, pojištění a slevové kódy.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "O nás — Provozovatel a redakce | BONUSLY",
    description:
      "Kdo stojí za portálem BONUSLY.cz, jak ověřujeme finanční nabídky a proč nám záleží na transparentnosti bez skrytých háčků.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function ONasPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "O projektu BONUSLY.cz",
          url: canonical,
          mainEntity: {
            "@type": "Organization",
            name: "BONUSLY",
            url: `${baseUrl}/`,
            logo: `${baseUrl}/logo.png`,
            email: "info@bonusly.cz",
            sameAs: SOCIAL_LINKS,
            founder: {
              "@type": "Person",
              name: "Adam Mácha",
              jobTitle: "Zakladatel a finanční analytik",
              url: canonical,
            },
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "O nás", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "O nás" }]} />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-6">
        O projektu BONUSLY.cz
      </h1>

      <div className="prose">
        <p>
          <strong>BONUSLY.cz</strong> je nezávislý český srovnávací a informační portál zaměřený na bankovní bonusy za založení účtu, prověřené investiční platformy, online pojištění, energie, ověřené slevové kódy bez vynucené registrace a flexibilní možnosti extra příjmu.
        </p>
        <p>
          Projekt vznikl s jednoduchým cílem: ušetřit lidem hodiny hledání v drobném písmu bankovních sazebníků a promo podmínek. Místo desítek nepřehledných stránek přinášíme u každé služby jasnou tabulku parametrů, přesný návod krok za krokem, reálné výhody i nevýhody a datum posledního ověření.
        </p>

        <h2>Kdo stojí za BONUSLY</h2>
        <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-green font-black text-xl">
              AM
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Adam Mácha</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-green-dark">
                Zakladatel, provozovatel a hlavní analytik BONUSLY.cz
              </p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Dlouhodobě se věnuje osobním financím, online investování (ETF, nemovitostní crowdfunding), srovnávání bankovních produktů a digitálnímu marketingu v České republice. Většinu nabídek publikovaných na BONUSLY osobně zakládá, testuje a pravidelně ověřuje funkčnost odměn i slevových kódů.
              </p>
            </div>
          </div>
        </div>

        <h2>Provozovatel a transparentnost</h2>
        <ul>
          <li><strong>Provozovatel:</strong> Adam Mácha — BONUSLY.cz (Česká republika)</li>
          <li><strong>Kontaktní e-mail:</strong> <a href="mailto:info@bonusly.cz">info@bonusly.cz</a></li>
          <li><strong>Metodika hodnocení:</strong> Podrobná pravidla testování a bodování najdete na stránce <Link href="/jak-hodnotime">Jak ověřujeme a hodnotíme nabídky</Link>.</li>
          <li><strong>Financování projektu:</strong> Web je pro uživatele 100 % zdarma. Příjmy pocházejí z partnerských (affiliate) provizí při prokliku vybraných odkazů, což nikdy nezvyšuje cenu pro uživatele ani neovlivňuje objektivitu recenzí.</li>
        </ul>

        <h2>Důležité upozornění (YMYL)</h2>
        <p>
          Veškeré články, kalkulace a srovnání na portálu BONUSLY.cz slouží výhradně pro informační a vzdělávací účely a nepředstavují individuální finanční, daňové ani investiční poradenství. Před uzavřením jakékoliv smlouvy si vždy ověřte aktuální znění smluvních podmínek přímo u poskytovatele služby.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-sm">
        <Link href="/jak-hodnotime" className="font-semibold text-green-dark hover:text-green">
          Metodika hodnocení →
        </Link>
        <Link href="/kontakt" className="font-semibold text-navy hover:text-green-dark">
          Kontaktovat redakci →
        </Link>
      </div>
    </div>
  );
}
