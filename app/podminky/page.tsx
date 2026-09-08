import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Podmínky použití",
  description: "Podmínky použití platformy BONUSLY.",
};

export default function PodminkyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Podmínky" }]} />
      <h1 className="text-3xl font-bold text-navy tracking-tight mb-6">Podmínky použití</h1>
      <div className="prose">
        <p><strong>Poslední aktualizace:</strong> {new Date().toLocaleDateString("cs-CZ")}</p>
        <h2>1. Obecná ustanovení</h2>
        <p>Tyto podmínky upravují pravidla používání webových stránek BONUSLY. Používáním webu souhlasíte s těmito podmínkami.</p>
        <h2>2. Obsah a odpovědnost</h2>
        <p>Informace na webu BONUSLY mají informativní charakter a nepředstavují finanční poradenství. Před využitím jakékoli nabídky si prosím ověřte aktuální podmínky u poskytovatele.</p>
        <h2>3. Affiliate odkazy</h2>
        <p>BONUSLY může získat provizi za zprostředkování návštěvy prostřednictvím affiliate odkazů. Tato provize nemá vliv na cenu produktu nebo služby pro uživatele.</p>
        <h2>4. Autorská práva</h2>
        <p>Veškerý obsah na webu BONUSLY je chráněn autorským právem. Bez předchozího souhlasu není dovoleno obsah kopírovat nebo šířit.</p>
      </div>
    </div>
  );
}
