"use client";

import { useMemo, useState } from "react";
import { ToolSlider } from "./tool-slider";
import { formatCzk, formatPercent } from "@/lib/tools-data";

export function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState(200000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [annualRate, setAnnualRate] = useState(4.4);
  const [months, setMonths] = useState(36);
  const [compounding, setCompounding] = useState<"monthly" | "yearly">("monthly");
  const [applyTax, setApplyTax] = useState(true);

  const result = useMemo(() => {
    let balance = initialAmount;
    let totalContributed = initialAmount;
    let totalGrossInterest = 0;
    let totalTaxPaid = 0;
    let accruedAnnualInterest = 0;

    for (let m = 1; m <= months; m++) {
      const monthGross = balance * (annualRate / 100 / 12);

      if (compounding === "monthly") {
        const tax = applyTax ? monthGross * 0.15 : 0;
        totalGrossInterest += monthGross;
        totalTaxPaid += tax;
        balance += monthGross - tax + monthlyDeposit;
      } else {
        accruedAnnualInterest += monthGross;
        balance += monthlyDeposit;
        if (m % 12 === 0 || m === months) {
          const tax = applyTax ? accruedAnnualInterest * 0.15 : 0;
          totalGrossInterest += accruedAnnualInterest;
          totalTaxPaid += tax;
          balance += accruedAnnualInterest - tax;
          accruedAnnualInterest = 0;
        }
      }
      totalContributed += monthlyDeposit;
    }

    const totalNetInterest = Math.max(0, totalGrossInterest - totalTaxPaid);
    const avgNetMonthlyInterest = months > 0 ? totalNetInterest / months : 0;
    const effectiveNetRate = applyTax ? annualRate * 0.85 : annualRate;
    const realBalanceAt25Inflation = balance / Math.pow(1.025, months / 12);

    return {
      finalBalance: balance,
      totalContributed,
      totalGrossInterest,
      totalTaxPaid,
      totalNetInterest,
      avgNetMonthlyInterest,
      effectiveNetRate,
      realBalanceAt25Inflation,
    };
  }, [initialAmount, monthlyDeposit, annualRate, months, compounding, applyTax]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Inputs */}
      <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-navy">Parametry spoření</h2>
          <p className="text-xs text-slate-500">
            Spočítejte si čistý úrok po 15% srážkové dani, kterou české banky odvádějí automaticky.
          </p>
        </div>

        <ToolSlider
          id="savings-initial"
          label="Počáteční vklad"
          value={initialAmount}
          min={0}
          max={5000000}
          step={10000}
          unit="Kč"
          formattedValue={formatCzk(initialAmount)}
          presets={[
            { label: "50 000 Kč", value: 50000 },
            { label: "200 000 Kč", value: 200000 },
            { label: "500 000 Kč", value: 500000 },
            { label: "1 000 000 Kč", value: 1000000 },
          ]}
          onChange={setInitialAmount}
        />

        <ToolSlider
          id="savings-monthly"
          label="Měsíční odkládání"
          value={monthlyDeposit}
          min={0}
          max={100000}
          step={500}
          unit="Kč"
          formattedValue={formatCzk(monthlyDeposit)}
          presets={[
            { label: "0 Kč", value: 0 },
            { label: "3 000 Kč", value: 3000 },
            { label: "5 000 Kč", value: 5000 },
            { label: "15 000 Kč", value: 15000 },
          ]}
          onChange={setMonthlyDeposit}
        />

        <ToolSlider
          id="savings-rate"
          label="Úroková sazba p.a."
          value={annualRate}
          min={0.5}
          max={7}
          step={0.1}
          unit="%"
          formattedValue={formatPercent(annualRate, 1)}
          presets={[
            { label: "3,5 %", value: 3.5 },
            { label: "4,4 % (mBank Plus)", value: 4.4 },
            { label: "5,0 %", value: 5.0 },
          ]}
          onChange={setAnnualRate}
        />

        <ToolSlider
          id="savings-months"
          label="Doba spoření"
          value={months}
          min={3}
          max={120}
          step={3}
          unit="měs."
          formattedValue={`${months} měsíců`}
          helperText={`${(months / 12).toLocaleString("cs-CZ", { maximumFractionDigits: 1 })} let`}
          presets={[
            { label: "1 rok", value: 12 },
            { label: "2 roky", value: 24 },
            { label: "3 roky", value: 36 },
            { label: "5 let", value: 60 },
          ]}
          onChange={setMonths}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div>
            <span className="block text-xs font-bold text-navy mb-1.5">Připisování úroků</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setCompounding("monthly")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  compounding === "monthly" ? "bg-white text-navy shadow-xs" : "text-slate-600"
                }`}
              >
                Měsíčně (spořicí účet)
              </button>
              <button
                type="button"
                onClick={() => setCompounding("yearly")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  compounding === "yearly" ? "bg-white text-navy shadow-xs" : "text-slate-600"
                }`}
              >
                Ročně (termínovaný vklad)
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={applyTax}
              onChange={(e) => setApplyTax(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-green-dark"
            />
            <span className="text-xs font-bold text-navy">Odečíst 15% srážkovou daň (ČR)</span>
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl bg-navy p-6 sm:p-7 text-white shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-green-light">
            Celkem naspoříte (včetně čistých úroků)
          </span>
          <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
            {formatCzk(result.finalBalance)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Čistý úrok po dani:{" "}
            <strong className="text-green-light">+{formatCzk(result.totalNetInterest)}</strong> (čistá sazba{" "}
            {formatPercent(result.effectiveNetRate, 2)} p.a.)
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-white/10 text-sm">
            <div>
              <dt className="text-xs text-slate-400">Vaše vklady celkem</dt>
              <dd className="mt-0.5 font-bold text-white tabular-nums">
                {formatCzk(result.totalContributed)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Průměrný čistý úrok / měs.</dt>
              <dd className="mt-0.5 font-bold text-green-light tabular-nums">
                +{formatCzk(result.avgNetMonthlyInterest)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Hrubý úrok před daní</dt>
              <dd className="mt-0.5 font-bold text-slate-200 tabular-nums">
                {formatCzk(result.totalGrossInterest)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Srážková daň 15 %</dt>
              <dd className="mt-0.5 font-bold text-amber-300 tabular-nums">
                -{formatCzk(result.totalTaxPaid)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-xs text-slate-600 leading-relaxed space-y-1.5">
          <p>
            <strong className="text-navy">Vliv inflace (2,5 % p.a.):</strong> Reálná kupní síla úspor na
            konci období bude přibližně{" "}
            <strong className="text-navy">{formatCzk(result.realBalanceAt25Inflation)}</strong>.
          </p>
          <p className="text-slate-500">
            Spořicí účet je ideální pro finanční rezervu (3–6 měsíčních výdajů). Pro delší horizont nad 5 let zvažte ETF nebo DIP.
          </p>
        </div>
      </div>
    </div>
  );
}
