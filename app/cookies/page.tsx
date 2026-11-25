import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/cookies");

export const metadata: Metadata = {
  title: "Zásady používání cookies",
  description:
    "Přehled technických, měřicích a partnerských cookies používaných na BONUSLY.cz a jednoduchý návod, jak cookies spravovat ve vašem prohlížeči.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Zásady používání cookies | BONUSLY",
    description:
      "Jaké soubory cookies používáme pro zabezpečení webu, přihlášení do peněženky a měření výkonnosti stránek BONUSLY.cz.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Cookies" }]} />
      <h1 className="text-3xl font-extrabold text-navy tracking-tight mb-6">
        Zásady používání cookies
      </h1>
      <div className="prose">
        <p>
          <strong>Poslední aktualizace:</strong> 25. listopadu 2026
        </p>
        <p>
          Portál <strong>BONUSLY.cz</strong> dbá na soukromí návštěvníků a používá soubory cookies pouze v nezbytném rozsahu pro spolehlivé fungování webu a uživatelského účtu.
        </p>

        <h2>1. Nezbytné technické cookies</h2>
        <p>
          Zajišťují základní funkce webu, zabezpečení formulářů (CSRF ochrana) a udržení přihlášení do uživatelské peněženky (Auth.js session cookie). Bez těchto cookies nemohou přihlašovací funkce fungovat.
        </p>

        <h2>2. Výkonnostní a anonymizované statistiky</h2>
        <p>
          Pro sledování rychlosti načítání (Core Web Vitals) a obecné návštěvnosti používáme soukromí respektující nástroje Vercel Analytics a Speed Insights, které neukládají sledovací cookies napříč jinými weby.
        </p>

        <h2>3. Partnerské (affiliate) cookies u třetích stran</h2>
        <p>
          Po kliknutí na partnerský odkaz a přechodu na web inzerenta či affiliate sítě (např. eHUB) může cílový web uložit vlastní cookie pro správné přiřazení bonusu a odměny. Zpracování těchto cookies se řídí zásadami příslušného partnera.
        </p>

        <h2>4. Správa cookies v prohlížeči</h2>
        <p>
          Ukládání cookies můžete kdykoliv omezit nebo zcela zakázat v nastavení vašeho internetového prohlížeče (Chrome, Safari, Firefox, Edge). Upozorňujeme, že úplné blokování cookies může zabránit správnému přiřazení bonusů u partnerů.
        </p>
      </div>
    </div>
  );
}
