import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "O nás",
  description: "BONUSLY je moderní česká platforma pro porovnávání nabídek, přivýdělků a finančních produktů.",
};

export default function ONasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "O nás" }]} />
      <h1 className="text-3xl font-bold text-navy tracking-tight mb-6">O BONUSLY</h1>
      <div className="prose">
        <p>
          BONUSLY je moderní česká platforma, která pomáhá lidem objevovat zajímavé přivýdělky, referral nabídky, finanční produkty, bankovní účty, platební karty a registrační bonusy.
        </p>
        <p>
          Naším cílem je poskytnout přehledné a ověřené informace na jednom místě, aby uživatelé mohli snadno porovnat dostupné nabídky a vybrat si to, co jim dává smysl.
        </p>
        <h2>Co děláme</h2>
        <ul>
          <li>Vyhledáváme a ověřujeme zajímavé nabídky</li>
          <li>Porovnáváme finanční produkty a služby</li>
          <li>Publikujeme užitečné články a průvodce</li>
          <li>Pravidelně aktualizujeme informace</li>
        </ul>
        <h2>Transparentnost</h2>
        <p>
          BONUSLY může získat provizi, pokud nabídku využijete prostřednictvím některých našich odkazů. Pro uživatele se cena nabídky tímto nemění. Vždy usilujeme o to, aby naše doporučení byla založena na kvalitě nabídky, nikoli na výši provize.
        </p>
      </div>
    </div>
  );
}
