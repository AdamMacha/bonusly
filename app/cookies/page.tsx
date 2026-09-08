import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Informace o používání cookies na platformě BONUSLY.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Cookies" }]} />
      <h1 className="text-3xl font-bold text-navy tracking-tight mb-6">Cookies</h1>
      <div className="prose">
        <p>BONUSLY používá cookies pouze v nezbytném rozsahu pro správné fungování webu.</p>
        <h2>Technické cookies</h2>
        <p>Nezbytné pro fungování webu. Nelze je vypnout.</p>
        <h2>Analytické cookies</h2>
        <p>Pomáhají nám pochopit, jak návštěvníci web používají. Data jsou anonymizována.</p>
      </div>
    </div>
  );
}
