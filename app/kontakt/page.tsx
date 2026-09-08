import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktujte tým BONUSLY. Rádi vám odpovíme na vaše dotazy.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <h1 className="text-3xl font-bold text-navy tracking-tight mb-6">Kontakt</h1>
      <div className="prose">
        <p>Máte dotaz, návrh na spolupráci nebo jste našli chybu? Napište nám.</p>
        <h2>Email</h2>
        <p>
          <a href="mailto:info@bonusly.cz">info@bonusly.cz</a>
        </p>
        <h2>Sociální sítě</h2>
        <p>
          Sledujte nás na sociálních sítích, kde pravidelně sdílíme novinky, tipy na nejvýhodnější bonusy a přivýdělky:
        </p>
        <div className="not-prose my-4">
          <SocialLinks variant="light" iconClassName="w-5 h-5" />
        </div>
        <h2>Spolupráce</h2>
        <p>
          Pokud máte zájem o spolupráci nebo chcete přidat vaši nabídku na BONUSLY, kontaktujte nás na výše uvedeném emailu.
        </p>
      </div>
    </div>
  );
}
