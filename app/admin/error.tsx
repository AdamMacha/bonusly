"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Error:", error);
  }, [error]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        !
      </div>
      <h2 className="text-xl font-bold text-navy mb-2">Chyba v administraci</h2>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        {error.message || "Při zpracování požadavku došlo k neočekávané chybě."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-green px-5 py-2.5 text-sm font-semibold text-navy hover:bg-green-light transition-colors"
        >
          Zkusit znovu
        </button>
        <Link
          href="/admin"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Přejít na Dashboard
        </Link>
      </div>
    </div>
  );
}
