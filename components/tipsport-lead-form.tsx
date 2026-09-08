"use client";

import { useState } from "react";
import { submitLead } from "@/lib/actions/leads";

interface Props {
  offerSlug?: string;
  offerName?: string;
}

export function TipsportLeadForm({ offerSlug = "tipsport", offerName = "Tipsport" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.set("offerSlug", offerSlug);

    try {
      const res = await submitLead(formData);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Došlo k chybě při odesílání.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Nepodařilo se odeslat požadavek. Zkuste to prosím znovu.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green/30 bg-green/5 p-6 sm:p-8 text-center my-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green text-navy font-bold text-xl mb-4">
          ✓
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">Žádost o pozvánku přijata!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Děkujeme. Vaši osobní pozvánku k bonusu pro {offerName} zařadíme k odeslání. Očekávejte e-mail s instrukcemi k dokončení registrace.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-green/30 bg-gradient-to-br from-green/10 via-white to-slate-50 p-6 sm:p-8 my-8 shadow-sm">
      <div className="max-w-xl mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-green/20 px-3 py-1 text-xs font-semibold text-green-dark mb-3">
          <span>🎁 Speciální akce Přiveď kamaráda</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
          Získejte osobní pozvánku k bonusu 1 300 Kč
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Tento bonus (1 000 Kč + 300 Kč zdarma) vyžaduje zaslání pozvánky od stávajícího člena. Zadejte své údaje a my vám pozvánku zdarma obratem vygenerujeme.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-name" className="block text-xs font-semibold text-navy mb-1.5">
              Jméno a příjmení *
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              required
              placeholder="Jan Novák"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
            />
          </div>

          <div>
            <label htmlFor="lead-phone" className="block text-xs font-semibold text-navy mb-1.5">
              Telefonní číslo
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              placeholder="+420 777 123 456"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-xs font-semibold text-navy mb-1.5">
            E-mailová adresa (kam zaslat pozvánku) *
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            placeholder="jan.novak@email.cz"
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </div>

        {status === "error" && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-green px-6 py-3 text-sm font-bold text-navy hover:bg-green-light transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
          >
            {status === "loading" ? "Odesílám žádost..." : "Zaslat mi pozvánku zdarma"}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            Vaše osobní údaje chráníme a použijeme je výhradně pro odeslání pozvánky.
          </p>
        </div>
      </form>
    </div>
  );
}
