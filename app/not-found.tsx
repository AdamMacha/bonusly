import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-8xl font-bold text-slate-100 mb-4">404</div>
      <h1 className="text-2xl font-bold text-navy mb-2">Stránka nenalezena</h1>
      <p className="text-slate-500 mb-8 max-w-md">
        Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-green px-6 py-3 text-sm font-semibold text-navy hover:bg-green-light transition-colors"
        >
          Zpět na hlavní stránku
        </Link>
        <Link
          href="/nabidky"
          className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-medium text-navy hover:bg-slate-50 transition-colors"
        >
          Prozkoumat nabídky
        </Link>
      </div>
    </div>
  );
}
