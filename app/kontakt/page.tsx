import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SocialLinks } from "@/components/social-links";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl, SOCIAL_LINKS } from "@/lib/seo";

export const revalidate = 86400;

const canonical = buildCanonical("/kontakt");

export const metadata: Metadata = {
  title: "Kontakt a provozovatel portálu",
  description:
    "Kontaktujte redakci a provozovatele BONUSLY.cz na info@bonusly.cz. Hlášení nefunkčních kódů, dotazy k bonusům, reklamace i návrhy na partnerskou spolupráci.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Kontakt a provozovatel | BONUSLY",
    description:
      "Máte dotaz k bonusu, našli jste neaktuální podmínku nebo máte zájem o spolupráci? Napište týmu BONUSLY.cz.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function KontaktPage() {
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Kontakt BONUSLY.cz",
          url: canonical,
          mainEntity: {
            "@type": "Organization",
            name: "BONUSLY",
            url: `${baseUrl}/`,
            email: "info@bonusly.cz",
            sameAs: SOCIAL_LINKS,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Kontakt", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Kontakt" }]} />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-6">
        Kontakt & provozovatel
      </h1>

      <div className="prose">
        <p>
          Máte dotaz ke konkrétnímu bankovnímu bonusu, narazili jste na změnu podmínek, potřebujete poradit s peněženkou nebo máte návrh na spolupráci? Napište nám — odpovídáme zpravidla do 24 hodin v pracovní dny.
        </p>

        <h2>Kontaktní údaje provozovatele</h2>
        <ul>
          <li><strong>Provozovatel projektu:</strong> Adam Mácha — BONUSLY.cz (Česká republika)</li>
          <li>
            <strong>E-mail pro uživatele, opravy a podporu:</strong>{" "}
            <a href="mailto:info@bonusly.cz">info@bonusly.cz</a>
          </li>
          <li>
            <strong>Nahlášení neaktuální nabídky či kódu:</strong> pošlete odkaz na stránku na{" "}
            <a href="mailto:info@bonusly.cz?subject=Aktualizace%20nab%C3%ADdky%20BONUSLY">info@bonusly.cz</a>
          </li>
        </ul>

        <h2>Sociální sítě</h2>
        <p>
          Sledujte nás na sociálních sítích, kde sdílíme krátkodobé bonusové akce, tipy na úspory a nové slevové kódy:
        </p>
        <div className="not-prose my-4">
          <SocialLinks variant="light" iconClassName="w-5 h-5" />
        </div>

        <h2>Obchodní a affiliate spolupráce</h2>
        <p>
          Zastupujete banku, investiční platformu, pojišťovnu nebo kvalitní český e-shop a chcete svou nabídku zařadit do srovnání na BONUSLY.cz? Napište nám na <a href="mailto:info@bonusly.cz">info@bonusly.cz</a>. Každou nabídku posuzujeme podle naší <Link href="/jak-hodnotime">redakční metodiky</Link>.
        </p>
      </div>
    </div>
  );
}
