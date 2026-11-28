import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TrackSignUpInitiated } from "@/components/ga-tracker";

export const metadata: Metadata = {
  title: "Zkontrolujte svůj e-mail",
  description: "Na váš e-mail jsme odeslali přihlašovací odkaz.",
  robots: { index: false, follow: false },
};

export default function OvereniPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <TrackSignUpInitiated />
      <Breadcrumbs items={[{ label: "Přihlášení", href: "/prihlaseni" }, { label: "Ověření e-mailu" }]} />

      <div className="mx-auto max-w-md text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green/10 text-green mb-6 text-3xl shadow-inner">
          ✉️
        </div>
        <h1 className="text-3xl font-bold text-navy tracking-tight mb-3">Zkontrolujte svůj e-mail</h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Právě jsme vám odeslali kouzelný přihlašovací odkaz (Magic Link). Klikněte na tlačítko v e-mailu pro okamžité přihlášení do vaší BONUSLY peněženky.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Nedorazil vám e-mail?
          </h2>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Zkontrolujte prosím složku Spam, Hromadné nebo Promo akce.</li>
            <li>Doručení může trvat 1–2 minuty.</li>
            <li>Ujistěte se, že jste zadali e-mail správně.</li>
          </ul>
        </div>

        <Link
          href="/prihlaseni"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-dark hover:text-green transition-colors"
        >
          ← Zpět na přihlášení
        </Link>
      </div>
    </div>
  );
}
