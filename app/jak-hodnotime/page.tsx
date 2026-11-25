import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/jak-hodnotime");

export const metadata: Metadata = {
  title: "Jak ověřujeme a hodnotíme nabídky",
  description:
    "Transparentní metodika BONUSLY: jak reálně testujeme bankovní bonusy, investiční platformy a slevové kódy, jak funguje naše bodování a redakční nezávislost.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Jak ověřujeme a hodnotíme nabídky | BONUSLY",
    description:
      "Podrobná metodika redakce BONUSLY pro ověřování bankovních bonusů, investičních platforem a slevových kódů v ČR.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function JakHodnotimePage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Jak ověřujeme a hodnotíme nabídky na BONUSLY",
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
            { "@type": "ListItem", position: 2, name: "Jak hodnotíme", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Jak hodnotíme nabídky" }]} />

      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green-dark mb-3">
          Transparentní metodika & E-E-A-T
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Jak ověřujeme a hodnotíme nabídky na BONUSLY
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Finanční produkty, investice i slevové akce vyžadují maximální přesnost. Zde popisujeme přesný postup, podle kterého každou nabídku kontrolujeme, bodujeme a udržujeme aktuální.
        </p>
      </header>

      <div className="prose">
        <h2>1. Ověření z reálných podmínek a sazebníků</h2>
        <p>
          Každou bankovní, investiční či pojišťovací nabídku nejprve porovnáme přímo s oficiálním sazebníkem, statutem marketingové akce a smluvními podmínkami poskytovatele. Nikdy nepřebíráme pouze reklamní slogany — vždy hledáme případné háčky (minimální počet plateb kartou, lhůtu od registrace, limit vkladu nebo poplatky za vedení).
        </p>

        <h2>2. Pět kritérií našeho hodnocení (škála 1,0–5,0 ★)</h2>
        <ul>
          <li>
            <strong>Reálná finanční hodnota (30 %):</strong> Výše bonusu v Kč, procentní sleva nebo dlouhodobá úspora na poplatcích oproti trhu.
          </li>
          <li>
            <strong>Srozumitelnost a splnitelnost podmínek (25 %):</strong> Zda lze bonus reálně získat během pár minut či běžného používání bez nesplnitelných obratových pastí.
          </li>
          <li>
            <strong>Důvěryhodnost a regulace poskytovatele (20 %):</strong> Dohled ČNB nebo evropského regulátora (u bank, pojišťoven a investic), pojištění vkladů a historie na českém trhu.
          </li>
          <li>
            <strong>Uživatelská přívětivost (15 %):</strong> Kvalita mobilní aplikace, online sjednání přes BankID, rychlost zákaznické podpory a dostupnost češtiny.
          </li>
          <li>
            <strong>Zpětná vazba komunity (10 %):</strong> Reálné zkušenosti uživatelů BONUSLY s rychlostí připsání odměny a uplatněním slevových kódů.
          </li>
        </ul>

        <h2>3. Pravidelná kontrola platnosti kódů a akcí</h2>
        <p>
          U každé nabídky uvádíme datum posledního redakčního ověření a u časově omezených akcí i přesné datum platnosti (např. do 30. 11. 2026 nebo 31. 12. 2026). Pokud partner kampaň dočasně pozastaví — jako například u akce na akcii zdarma u Trading 212 — na stránce to okamžitě a otevřeně uvádíme.
        </p>

        <h2>4. Redakční nezávislost a financování webu</h2>
        <p>
          Provoz portálu BONUSLY je financován z partnerských (affiliate) provizí, které můžeme získat, pokud si službu sjednáte přes náš odkaz. Pro vás se cena produktu ani výše bonusu nijak nemění — u řady nabídek naopak získáváte exkluzivní bonus nebo slevový kód navíc. Výše affiliate provize nikdy neurčuje konečné hodnocení ani nevylučuje kritické zmínění nevýhod v sekci „Na co si dát pozor“.
        </p>

        <h2>5. Našli jste neaktuální podmínku?</h2>
        <p>
          Podmínky bank i e-shopů se mohou měnit ze dne na den. Pokud narazíte na nefunkční kód nebo změnu akce, napište nám prosím na{" "}
          <a href="mailto:info@bonusly.cz">info@bonusly.cz</a> — podněty ověřujeme a opravujeme zpravidla do 24 hodin.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-sm">
        <Link href="/o-nas" className="font-semibold text-green-dark hover:text-green">
          O provozovateli a redakci →
        </Link>
        <Link href="/nabidky" className="font-semibold text-navy hover:text-green-dark">
          Prozkoumat ověřené nabídky →
        </Link>
      </div>
    </div>
  );
}
