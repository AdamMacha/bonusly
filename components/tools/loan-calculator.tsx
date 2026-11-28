"use client";

import { useMemo, useState } from "react";
import { ToolSlider } from "./tool-slider";
import { formatCzk, formatPercent } from "@/lib/tools-data";

function calculateMonthlyPayment(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/** Numerically solve RPSN (effective annual APR) via bisection */
function calculateRpsn(
  principal: number,
  originationFee: number,
  monthlyPaymentWithFees: number,
  months: number
): number {
  const netReceived = principal - originationFee;
  if (netReceived <= 0 || monthlyPaymentWithFees <= 0 || months <= 0) return 0;
  if (monthlyPaymentWithFees * months <= netReceived) return 0;

  let low = 0;
  let high = 2.5; // up to 250 % APR
  for (let i = 0; i < 45; i++) {
    const mid = (low + high) / 2;
    let pv = 0;
    for (let k = 1; k <= months; k++) {
      pv += monthlyPaymentWithFees / Math.pow(1 + mid, k / 12);
    }
    if (pv > netReceived) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return ((low + high) / 2) * 100;
}

export function LoanCalculator() {
  const [amount, setAmount] = useState(250000);
  const [months, setMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(6.9);
  const [originationFee, setOriginationFee] = useState(0);
  const [monthlyFee, setMonthlyFee] = useState(0);

  const [compareRefinance, setCompareRefinance] = useState(true);
  const [oldRate, setOldRate] = useState(12.9);

  const result = useMemo(() => {
    const baseMonthly = calculateMonthlyPayment(amount, interestRate, months);
    const totalMonthly = baseMonthly + monthlyFee;
    const totalPaid = totalMonthly * months + originationFee;
    const totalOverpaid = Math.max(0, totalPaid - amount);
    const rpsn = calculateRpsn(amount, originationFee, totalMonthly, months);

    const oldMonthly = calculateMonthlyPayment(amount, oldRate, months);
    const oldTotalPaid = oldMonthly * months;
    const monthlySavings = Math.max(0, oldMonthly - totalMonthly);
    const totalSavings = Math.max(0, oldTotalPaid - totalPaid);

    const principalPct = totalPaid > 0 ? (amount / totalPaid) * 100 : 100;
    const costPct = 100 - principalPct;

    return {
      totalMonthly,
      totalPaid,
      totalOverpaid,
      rpsn,
      oldMonthly,
      monthlySavings,
      totalSavings,
      principalPct,
      costPct,
    };
  }, [amount, months, interestRate, originationFee, monthlyFee, oldRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Inputs */}
      <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-navy">Parametry půjčky</h2>
          <p className="text-xs text-slate-500">
            Spočítejte si přesnou splátku, RPSN a kolik ušetříte refinancováním dražšího úvěru.
          </p>
        </div>

        <ToolSlider
          id="loan-amount"
          label="Výše půjčky"
          value={amount}
          min={10000}
          max={1500000}
          step={10000}
          unit="Kč"
          formattedValue={formatCzk(amount)}
          presets={[
            { label: "50 000 Kč", value: 50000 },
            { label: "150 000 Kč", value: 150000 },
            { label: "300 000 Kč", value: 300000 },
            { label: "600 000 Kč", value: 600000 },
          ]}
          onChange={setAmount}
        />

        <ToolSlider
          id="loan-months"
          label="Doba splácení"
          value={months}
          min={6}
          max={120}
          step={6}
          unit="měs."
          formattedValue={`${months} měsíců`}
          helperText={`${(months / 12).toLocaleString("cs-CZ", { maximumFractionDigits: 1 })} let`}
          presets={[
            { label: "2 roky (24 m)", value: 24 },
            { label: "4 roky (48 m)", value: 48 },
            { label: "5 let (60 m)", value: 60 },
            { label: "8 let (96 m)", value: 96 },
          ]}
          onChange={setMonths}
        />

        <ToolSlider
          id="loan-rate"
          label="Úroková sazba p.a."
          value={interestRate}
          min={3.5}
          max={22}
          step={0.1}
          unit="%"
          formattedValue={formatPercent(interestRate, 1)}
          presets={[
            { label: "4,8 % (top akce)", value: 4.8 },
            { label: "6,9 % (průměr)", value: 6.9 },
            { label: "9,9 %", value: 9.9 },
            { label: "14,9 %", value: 14.9 },
          ]}
          onChange={setInterestRate}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label htmlFor="loan-origination-fee" className="block text-xs font-semibold text-navy mb-1">
              Poplatek za sjednání (Kč)
            </label>
            <input
              id="loan-origination-fee"
              type="number"
              min={0}
              max={50000}
              step={500}
              value={originationFee}
              onChange={(e) => setOriginationFee(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-navy focus:border-green focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="loan-monthly-fee" className="block text-xs font-semibold text-navy mb-1">
              Měsíční poplatek za vedení (Kč)
            </label>
            <input
              id="loan-monthly-fee"
              type="number"
              min={0}
              max={2000}
              step={50}
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-navy focus:border-green focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Refinancing Comparison */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={compareRefinance}
              onChange={(e) => setCompareRefinance(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-green-dark"
            />
            <span className="text-sm font-bold text-navy">
              Porovnat úsporu při refinancování / konsolidaci stávající půjčky
            </span>
          </label>

          {compareRefinance && (
            <ToolSlider
              id="loan-old-rate"
              label="Stávající úrok vaší drahé půjčky"
              value={oldRate}
              min={4}
              max={25}
              step={0.5}
              unit="%"
              formattedValue={formatPercent(oldRate, 1)}
              onChange={setOldRate}
            />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl bg-navy p-6 sm:p-7 text-white shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-green-light">
            Měsíční splátka půjčky
          </span>
          <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
            {formatCzk(result.totalMonthly)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Orientační RPSN: <strong className="text-white">{formatPercent(result.rpsn, 2)}</strong>
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300">Půjčená částka ({formatPercent(result.principalPct, 0)})</span>
              <span className="text-amber-300">Přeplacení ({formatPercent(result.costPct, 0)})</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 flex">
              <div className="bg-green transition-all duration-300" style={{ width: `${result.principalPct}%` }} />
              <div className="bg-amber-400 transition-all duration-300" style={{ width: `${result.costPct}%` }} />
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-white/10 text-sm">
            <div>
              <dt className="text-xs text-slate-400">Celkem přeplatíte</dt>
              <dd className="mt-0.5 font-bold text-amber-300 tabular-nums">
                {formatCzk(result.totalOverpaid)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Celková splacená částka</dt>
              <dd className="mt-0.5 font-bold text-white tabular-nums">
                {formatCzk(result.totalPaid)}
              </dd>
            </div>
          </dl>
        </div>

        {compareRefinance && result.totalSavings > 0 && (
          <div className="rounded-2xl border-2 border-green/35 bg-green/10 p-5 space-y-2">
            <span className="inline-flex rounded-full bg-green/20 px-2.5 py-0.5 text-xs font-bold text-green-dark">
              💡 Úspora při převedení z {formatPercent(oldRate, 1)} na {formatPercent(interestRate, 1)}
            </span>
            <p className="text-2xl font-extrabold text-navy tabular-nums">
              Ušetříte {formatCzk(result.totalSavings)}
            </p>
            <p className="text-xs text-slate-700">
              Měsíční splátka klesne o{" "}
              <strong className="text-navy">{formatCzk(result.monthlySavings)}</strong> (z{" "}
              {formatCzk(result.oldMonthly)} na {formatCzk(result.totalMonthly)}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
