import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/ochrana-soukromi");

export const metadata: Metadata = {
  title: "Ochrana soukromí a GDPR",
  description:
    "Zásady zpracování osobních údajů (GDPR) na portálu BONUSLY.cz: jaké údaje zpracováváme, k jakému účelu, doba uchování a vaše práva subjektu údajů.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Ochrana soukromí a GDPR | BONUSLY",
    description:
      "Transparentní informace o ochraně osobních údajů, přihlášení k newsletteru, peněžence a vašich právech podle GDPR na BONUSLY.cz.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function OchranaSoukromiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Ochrana soukromí" }]} />
      <h1 className="text-3xl font-extrabold text-navy tracking-tight mb-6">
        Ochrana soukromí (GDPR)
      </h1>
      <div className="prose">
        <p>
          <strong>Poslední aktualizace:</strong> 25. listopadu 2026 · <strong>Správce údajů:</strong> Adam Mácha — BONUSLY.cz (<a href="mailto:info@bonusly.cz">info@bonusly.cz</a>)
        </p>

        <h2>1. Jaké osobní údaje zpracováváme</h2>
        <p>Zpracováváme pouze nezbytný rozsah údajů, které nám sami dobrovolně poskytnete:</p>
        <ul>
          <li><strong>E-mailová adresa</strong> při odběru newsletteru nebo přihlášení do uživatelské peněženky (Magic Link).</li>
          <li><strong>Číslo bankovního účtu</strong> výhradně v případě, že sami požádáte o výplatu schválené odměny z peněženky.</li>
          <li><strong>Jméno / přezdívka a text zkušenosti</strong> při dobrovolném vložení uživatelského hodnocení nabídky.</li>
          <li><strong>Anonymizovaná technická data</strong> o návštěvnosti (Vercel Analytics / Speed Insights) bez ukládání reklamních cookies třetích stran.</li>
        </ul>

        <h2>2. Účel a právní základ zpracování</h2>
        <ul>
          <li>Plnění požadované služby (přihlášení k účtu, zaslání pozvánky, výplata odměny).</li>
          <li>Váš souhlas (zasílání občasného newsletteru s novými bonusy a kódy — lze kdykoliv odvolat).</li>
          <li>Oprávněný zájem správce na zabezpečení webu, měření funkčnosti affiliate odkazů a ochraně proti spamu.</li>
        </ul>

        <h2>3. Zpracovatelé a zabezpečení</h2>
        <p>
          Osobní údaje nikdy neprodáváme. Pro technický provoz využíváme prověřené infrastruktury v souladu s GDPR (hosting Vercel, databáze Supabase v EU regionu, rozesílání transakčních e-mailů Resend).
        </p>

        <h2>4. Vaše práva podle GDPR</h2>
        <p>
          Máte právo požadovat přístup ke svým údajům, jejich opravu, výmaz („právo být zapomenut“), omezení zpracování či podání stížnosti u Úřadu pro ochranu osobních údajů (ÚOOÚ). Jakýkoliv požadavek vyřídíme obratem na{" "}
          <a href="mailto:info@bonusly.cz">info@bonusly.cz</a>.
        </p>
      </div>
    </div>
  );
}
