import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/podminky");

export const metadata: Metadata = {
  title: "Podmínky použití portálu BONUSLY",
  description:
    "Obchodní a uživatelské podmínky portálu BONUSLY.cz: pravidla užívání webu, transparentní fungování affiliate odkazů, odpovědnost za obsah a autorská práva.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Podmínky použití | BONUSLY",
    description:
      "Pravidla používání portálu BONUSLY.cz, informace o provozovateli, affiliate odkazech a odpovědnosti za obsah.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function PodminkyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Podmínky použití" }]} />
      <h1 className="text-3xl font-extrabold text-navy tracking-tight mb-6">
        Podmínky použití
      </h1>
      <div className="prose">
        <p>
          <strong>Poslední aktualizace:</strong> 25. listopadu 2026 · <strong>Provozovatel:</strong> Adam Mácha — BONUSLY.cz, IČO: 19421915, sídlo: U smaltovny 1375/25, 170 00 Praha 7 – Holešovice (<a href="mailto:info@bonusly.cz">info@bonusly.cz</a>)
        </p>

        <h2>1. Úvodní ustanovení</h2>
        <p>
          Tyto podmínky upravují práva a povinnosti při používání webového portálu <strong>BONUSLY.cz</strong>. Používáním stránek potvrzujete, že jste se s těmito podmínkami seznámili a souhlasíte s nimi.
        </p>

        <h2>2. Charakter informací a vyloučení finančního poradenství</h2>
        <p>
          Veškeré srovnání, články, recenze a kalkulace publikované na portálu BONUSLY.cz mají výhradně informativní charakter a nepředstavují individuální finanční, daňové, právní ani investiční poradenství. Ačkoliv podmínky bonusů a slevových kódů pravidelně ověřujeme, závazné jsou vždy aktuální podmínky uvedené přímo na stránkách příslušného poskytovatele.
        </p>

        <h2>3. Partnerské (affiliate) odkazy a slevové kódy</h2>
        <p>
          Web BONUSLY.cz obsahuje partnerské (affiliate) odkazy a doporučovací kódy. Pokud prostřednictvím těchto odkazů využijete službu nebo nakoupíte u partnera, může provozovatel obdržet zprostředkovatelskou provizi. Tato provize nijak nezvyšuje výslednou cenu pro uživatele. Podrobnosti o našem hodnocení najdete na stránce <Link href="/jak-hodnotime">Jak hodnotíme nabídky</Link>.
        </p>

        <h2>4. Uživatelský účet, peněženka a recenze</h2>
        <p>
          Uživatelé mohou dobrovolně odesílat pravdivé zkušenosti s nabídkami či využívat uživatelskou peněženku u vybraných povolených kampaní. Provozovatel si vyhrazuje právo odstranit spam, vulgární či nepravdivé příspěvky a zabránit zneužívání doporučovacích programů.
        </p>

        <h2>5. Autorská práva</h2>
        <p>
          Texty, srovnávací tabulky, zdrojový kód a grafické prvky portálu BONUSLY.cz jsou chráněny autorským právem. Jakékoliv hromadné kopírování či komerční přebírání obsahu bez předchozího písemného souhlasu provozovatele je zakázáno.
        </p>
      </div>
    </div>
  );
}
