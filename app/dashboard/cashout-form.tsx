"use client";

import { useState } from "react";
import { requestCashout } from "@/lib/actions/wallet";

interface CashoutFormProps {
  balance: number;
  savedBankAccount?: string | null;
  minAmount: number;
}

export function CashoutForm({ balance, savedBankAccount, minAmount }: CashoutFormProps) {
  const [bankAccount, setBankAccount] = useState(savedBankAccount || "");
  const [amount, setAmount] = useState(balance > 0 ? String(balance) : "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const canCashout = balance >= minAmount;
  const missingAmount = Math.max(0, minAmount - balance);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("bankAccount", bankAccount);
    formData.append("amount", amount || String(balance));

    try {
      const res = await requestCashout(formData);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setStatusMessage({ type: "success", text: res.message });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Nastala neočekávaná chyba při komunikaci se serverem.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💳</span>
        <h2 className="text-lg font-bold text-navy">Žádost o výplatu odměn</h2>
      </div>

      {statusMessage && (
        <div
          className={`mb-5 rounded-xl p-4 text-xs sm:text-sm flex items-start gap-2.5 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <span className="font-bold text-base">
            {statusMessage.type === "success" ? "✓" : "⚠️"}
          </span>
          <p className="leading-relaxed">{statusMessage.text}</p>
        </div>
      )}

      {!canCashout ? (
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Průběh k minimální výplatě</span>
              <span className="font-semibold text-navy">
                {balance.toLocaleString("cs-CZ")} / {minAmount.toLocaleString("cs-CZ")} Kč
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-green h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, (balance / minAmount) * 100))}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              K možnosti požádat o výběr vám zbývá získat ještě{" "}
              <strong className="text-navy">{missingAmount.toLocaleString("cs-CZ")} Kč</strong>.
              Prozkoumejte nabídky a získejte další odměny!
            </p>
          </div>

          <a
            href="/nabidky"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 text-sm font-semibold transition-colors"
          >
            <span>Objevit nabídky s odměnou →</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bankAccount" className="block text-xs font-semibold text-navy mb-1">
              Číslo bankovního účtu (v ČR)
            </label>
            <input
              id="bankAccount"
              type="text"
              required
              placeholder="např. 123456789/0800 nebo IBAN"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20 transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="amount" className="block text-xs font-semibold text-navy">
                Částka k výběru (Kč)
              </label>
              <button
                type="button"
                onClick={() => setAmount(String(balance))}
                className="text-xs text-green-dark hover:text-green font-semibold cursor-pointer"
              >
                Vybrat vše ({balance.toLocaleString("cs-CZ")} Kč)
              </button>
            </div>
            <input
              id="amount"
              type="number"
              min={minAmount}
              max={balance}
              step="any"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20 transition-all"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Minimální částka: {minAmount.toLocaleString("cs-CZ")} Kč | Maximum:{" "}
              {balance.toLocaleString("cs-CZ")} Kč
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green px-5 py-3 text-sm font-bold text-navy hover:bg-green-light transition-all shadow-md shadow-green/20 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span>Odesílám žádost...</span>
            ) : (
              <>
                <span>Požádat o výplatu na účet</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
