"use client";

import { useState } from "react";
import { approveCashout, rejectCashout } from "@/lib/actions/admin-wallet";

interface CashoutActionsProps {
  cashoutId: string;
  amount: number;
}

export function CashoutActions({ cashoutId, amount }: CashoutActionsProps) {
  const [loading, setLoading] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectNote, setRejectNote] = useState("");

  async function handleApprove() {
    if (!confirm(`Opravdu chcete označit žádost na ${amount.toLocaleString("cs-CZ")} Kč jako vyplacenou?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await approveCashout(cashoutId);
      if (res?.error) {
        alert(res.error);
      }
    } catch {
      alert("Chyba při schvalování žádosti.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRejectSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await rejectCashout(cashoutId, rejectNote);
      if (res?.error) {
        alert(res.error);
      } else {
        setIsRejecting(false);
      }
    } catch {
      alert("Chyba při zamítání žádosti.");
    } finally {
      setLoading(false);
    }
  }

  if (isRejecting) {
    return (
      <form onSubmit={handleRejectSubmit} className="flex flex-col gap-2 min-w-[200px]">
        <input
          type="text"
          placeholder="Důvod zamítnutí (např. neplatný účet)"
          value={rejectNote}
          onChange={(e) => setRejectNote(e.target.value)}
          className="rounded-lg border border-red-200 bg-white px-2 py-1 text-xs text-navy focus:outline-none focus:ring-1 focus:ring-red-400"
          required
        />
        <div className="flex gap-1 justify-end">
          <button
            type="button"
            onClick={() => setIsRejecting(false)}
            disabled={loading}
            className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            Zrušit
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-2 py-1 text-[11px] rounded bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
          >
            {loading ? "..." : "Potvrdit zamítnutí"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-1.5 justify-end">
      <button
        type="button"
        disabled={loading}
        onClick={handleApprove}
        className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-300 px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer disabled:opacity-50"
      >
        <span>✓</span>
        <span>Vyplatit</span>
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => setIsRejecting(true)}
        className="inline-flex items-center gap-1 rounded-lg bg-red-50 border border-red-300 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50"
      >
        <span>✕</span>
        <span>Zamítnout</span>
      </button>
    </div>
  );
}
