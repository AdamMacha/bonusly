import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Ochrana soukromí",
  description: "Zásady ochrany osobních údajů platformy BONUSLY.",
};

export default function OchranaSoukromiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Ochrana soukromí" }]} />
      <h1 className="text-3xl font-bold text-navy tracking-tight mb-6">Ochrana soukromí</h1>
      <div className="prose">
        <p><strong>Poslední aktualizace:</strong> {new Date().toLocaleDateString("cs-CZ")}</p>
        <h2>1. Jaké údaje sbíráme</h2>
        <p>BONUSLY sbírá pouze údaje nezbytné pro provoz webu:</p>
        <ul>
          <li>Email adresu při přihlášení k odběru newsletteru</li>
          <li>Anonymizované údaje o návštěvnosti</li>
        </ul>
        <h2>2. Jak údaje používáme</h2>
        <p>Vaše údaje používáme výhradně pro:</p>
        <ul>
          <li>Zasílání newsletteru (pokud jste se přihlásili)</li>
          <li>Analýzu návštěvnosti a zlepšování služeb</li>
        </ul>
        <h2>3. Sdílení údajů</h2>
        <p>Vaše osobní údaje nesdílíme s třetími stranami s výjimkou služeb nezbytných pro provoz (např. emailová služba pro newsletter).</p>
        <h2>4. Vaše práva</h2>
        <p>Máte právo na přístup k vašim údajům, jejich opravu a výmaz. Kontaktujte nás na info@bonusly.cz.</p>
        <h2>5. Odhlášení z newsletteru</h2>
        <p>Z odběru newsletteru se můžete kdykoliv odhlásit prostřednictvím odkazu v každém emailu.</p>
      </div>
    </div>
  );
}
