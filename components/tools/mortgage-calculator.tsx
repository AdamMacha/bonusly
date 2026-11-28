"use client";

import { useMemo, useState } from "react";
import { ToolSlider } from "./tool-slider";
import { formatCzk, formatPercent } from "@/lib/tools-data";

function calculateAnnuity(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

const FIXATION_OPTIONS = [1, 3, 5, 7, 10] as const;

export function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(6000000);
  const [downPayment, setDownPayment] = useState(1200000);
  const [interestRate, setInterestRate] = useState(4.7);
  const [years, setYears] = useState(30);
  const [fixationYears, setFixationYears] = useState<number>(3);
  const [showSchedule, setShowSchedule] = useState(false);

  const safeDownPayment = Math.min(downPayment, Math.max(0, propertyPrice - 100000));

  const result = useMemo(() => {
    const loanAmount = Math.max(0, propertyPrice - safeDownPayment);
    const ltv = propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;
    const totalMonths = years * 12;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = calculateAnnuity(loanAmount, interestRate, totalMonths);
    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = Math.max(0, totalPaid - loanAmount);

    const schedule: AmortizationYear[] = [];
    let balance = loanAmount;
    const effectiveFixationYears = Math.min(fixationYears, years);
    let balanceAfterFixation = loanAmount;
    let interestInFixation = 0;
    let principalInFixation = 0;

    for (let y = 1; y <= years; y++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        if (balance <= 0) break;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = Math.min(balance, Math.max(0, monthlyPayment - interestForMonth));
        balance = Math.max(0, balance - principalForMonth);
        yearPrincipal += principalForMonth;
        yearInterest += interestForMonth;
      }
      schedule.push({
        year: y,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        totalPaid: yearPrincipal + yearInterest,
        remainingBalance: balance,
      });

      if (y <= effectiveFixationYears) {
        interestInFixation += yearInterest;
        principalInFixation += yearPrincipal;
        balanceAfterFixation = balance;
      }
    }

    const remainingMonthsAfterFix = Math.max(0, (years - effectiveFixationYears) * 12);
    const stressRate1 = interestRate + 1;
    const stressRate2 = interestRate + 2;
    const stressPayment1 =
      remainingMonthsAfterFix > 0
        ? calculateAnnuity(balanceAfterFixation, stressRate1, remainingMonthsAfterFix)
        : calculateAnnuity(loanAmount, stressRate1, totalMonths);
    const stressPayment2 =
      remainingMonthsAfterFix > 0
        ? calculateAnnuity(balanceAfterFixation, stressRate2, remainingMonthsAfterFix)
        : calculateAnnuity(loanAmount, stressRate2, totalMonths);

    const principalRatioPct = totalPaid > 0 ? (loanAmount / totalPaid) * 100 : 100;
    const interestRatioPct = 100 - principalRatioPct;

    return {
      loanAmount,
      ltv,
      monthlyPayment,
      totalPaid,
      totalInterest,
      effectiveFixationYears,
      balanceAfterFixation,
      interestInFixation,
      principalInFixation,
      stressRate1,
      stressRate2,
      stressPayment1,
      stressPayment2,
      principalRatioPct,
      interestRatioPct,
      schedule,
    };
  }, [propertyPrice, safeDownPayment, interestRate, years, fixationYears]);

  const ltvStatus =
    result.ltv <= 80
      ? {
          tone: "bg-green/15 text-green-dark border-green/30",
          label: `LTV ${formatPercent(result.ltv, 1)} — splňuje standardní limit ČNB (do 80 %)`,
        }
      : result.ltv <= 90
        ? {
            tone: "bg-amber-50 text-amber-900 border-amber-200",
            label: `LTV ${formatPercent(result.ltv, 1)} — nad 80 % (pro žadatele do 36 let platí limit 90 %)`,
          }
        : {
            tone: "bg-rose-50 text-rose-800 border-rose-200",
            label: `LTV ${formatPercent(result.ltv, 1)} — překračuje limit ČNB 90 %, navyšte vlastní zdroje`,
          };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-navy">Parametry hypotéky</h2>
              <p className="text-xs text-slate-500">
                Upravte cenu nemovitosti, vlastní zdroje, sazbu a dobu splatnosti.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-navy">
              Výše úvěru: {formatCzk(result.loanAmount)}
            </span>
          </div>

          <ToolSlider
            id="mortgage-price"
            label="Cena nemovitosti"
            value={propertyPrice}
            min={1000000}
            max={25000000}
            step={100000}
            unit="Kč"
            formattedValue={formatCzk(propertyPrice)}
            presets={[
              { label: "4 mil.", value: 4000000 },
              { label: "6 mil.", value: 6000000 },
              { label: "8 mil.", value: 8000000 },
              { label: "12 mil.", value: 12000000 },
            ]}
            onChange={(val) => {
              setPropertyPrice(val);
              if (downPayment > val - 100000) {
                setDownPayment(Math.round(val * 0.2));
              }
            }}
          />

          <ToolSlider
            id="mortgage-downpayment"
            label="Vlastní zdroje (akontace)"
            value={safeDownPayment}
            min={0}
            max={Math.max(100000, propertyPrice - 100000)}
            step={50000}
            unit="Kč"
            formattedValue={formatCzk(safeDownPayment)}
            helperText={`${formatPercent(propertyPrice > 0 ? (safeDownPayment / propertyPrice) * 100 : 0, 1)} z ceny`}
            presets={[
              { label: "10 % (do 36 let)", value: Math.round(propertyPrice * 0.1) },
              { label: "20 % (standard)", value: Math.round(propertyPrice * 0.2) },
              { label: "30 %", value: Math.round(propertyPrice * 0.3) },
              { label: "40 %", value: Math.round(propertyPrice * 0.4) },
            ]}
            onChange={setDownPayment}
          />

          <div className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold ${ltvStatus.tone}`}>
            {ltvStatus.label}
          </div>

          <ToolSlider
            id="mortgage-rate"
            label="Úroková sazba p.a."
            value={interestRate}
            min={2.5}
            max={8.5}
            step={0.1}
            unit="%"
            formattedValue={formatPercent(interestRate, 1)}
            presets={[
              { label: "4,3 %", value: 4.3 },
              { label: "4,7 % (průměr)", value: 4.7 },
              { label: "5,2 %", value: 5.2 },
              { label: "6,0 %", value: 6.0 },
            ]}
            onChange={setInterestRate}
          />

          <ToolSlider
            id="mortgage-years"
            label="Doba splatnosti"
            value={years}
            min={5}
            max={35}
            step={1}
            unit="let"
            formattedValue={`${years} let`}
            presets={[
              { label: "15 let", value: 15 },
              { label: "20 let", value: 20 },
              { label: "25 let", value: 25 },
              { label: "30 let", value: 30 },
            ]}
            onChange={setYears}
          />

          <div className="pt-2">
            <span className="block text-sm font-semibold text-navy mb-2">Délka fixace úrokové sazby</span>
            <div className="flex flex-wrap gap-2">
              {FIXATION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFixationYears(opt)}
                  className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
                    fixationYears === opt
                      ? "border-green bg-navy text-white shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  {opt} {opt === 1 ? "rok" : opt <= 4 ? "roky" : "let"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl bg-navy p-6 sm:p-7 text-white shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-green-light">
              Měsíční splátka hypotéky
            </span>
            <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
              {formatCzk(result.monthlyPayment)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Anuitní splátka při úroku {formatPercent(interestRate, 1)} p.a. na {years} let
            </p>

            {/* Principal vs interest bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300">
                  Jistina ({formatPercent(result.principalRatioPct, 0)})
                </span>
                <span className="text-amber-300">
                  Úroky ({formatPercent(result.interestRatioPct, 0)})
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 flex">
                <div
                  className="bg-green transition-all duration-300"
                  style={{ width: `${result.principalRatioPct}%` }}
                />
                <div
                  className="bg-amber-400 transition-all duration-300"
                  style={{ width: `${result.interestRatioPct}%` }}
                />
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-white/10 text-sm">
              <div>
                <dt className="text-xs text-slate-400">Výše hypotéky</dt>
                <dd className="mt-0.5 font-bold text-white tabular-nums">
                  {formatCzk(result.loanAmount)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Celkem přeplatíte na úrocích</dt>
                <dd className="mt-0.5 font-bold text-amber-300 tabular-nums">
                  {formatCzk(result.totalInterest)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Celkem zaplatíte bance</dt>
                <dd className="mt-0.5 font-bold text-white tabular-nums">
                  {formatCzk(result.totalPaid)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">
                  Zůstatek po fixaci ({result.effectiveFixationYears} r.)
                </dt>
                <dd className="mt-0.5 font-bold text-green-light tabular-nums">
                  {formatCzk(result.balanceAfterFixation)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Fixation & Stress Test Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-navy">
                Co se stane během {result.effectiveFixationYears}leté fixace?
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Za prvních {result.effectiveFixationYears}{" "}
                {result.effectiveFixationYears === 1
                  ? "rok"
                  : result.effectiveFixationYears <= 4
                    ? "roky"
                    : "let"}{" "}
                splatíte <strong className="text-navy">{formatCzk(result.principalInFixation)}</strong>{" "}
                z jistiny a <strong className="text-navy">{formatCzk(result.interestInFixation)}</strong>{" "}
                na úrocích.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-sm font-extrabold text-navy mb-2">
                Stresový test sazby po konci fixace
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                  <span className="block text-[11px] font-semibold text-slate-500">
                    Sazba +1 % ({formatPercent(result.stressRate1, 1)})
                  </span>
                  <span className="mt-0.5 block text-base font-extrabold text-navy tabular-nums">
                    {formatCzk(result.stressPayment1)}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700">
                    +{formatCzk(Math.max(0, result.stressPayment1 - result.monthlyPayment))} / měs.
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                  <span className="block text-[11px] font-semibold text-slate-500">
                    Sazba +2 % ({formatPercent(result.stressRate2, 1)})
                  </span>
                  <span className="mt-0.5 block text-base font-extrabold text-navy tabular-nums">
                    {formatCzk(result.stressPayment2)}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-700">
                    +{formatCzk(Math.max(0, result.stressPayment2 - result.monthlyPayment))} / měs.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Annual Amortization Schedule */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setShowSchedule((v) => !v)}
          aria-expanded={showSchedule}
          className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div>
            <span className="block text-base font-extrabold text-navy">
              Roční splátkový kalendář ({years} let)
            </span>
            <span className="text-xs text-slate-500">
              Přesný vývoj splácení jistiny, úroků a zůstatku hypotéky rok po roce
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-navy shrink-0">
            {showSchedule ? "Skrýt tabulku ↑" : "Zobrazit tabulku ↓"}
          </span>
        </button>

        {showSchedule && (
          <div className="border-t border-slate-200 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Rok</th>
                  <th className="px-4 py-3 font-bold text-right">Splacená jistina</th>
                  <th className="px-4 py-3 font-bold text-right">Zaplacené úroky</th>
                  <th className="px-4 py-3 font-bold text-right">Roční splátky</th>
                  <th className="px-4 py-3 font-bold text-right">Zůstatek úvěru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {result.schedule.map((row) => (
                  <tr
                    key={row.year}
                    className={
                      row.year === result.effectiveFixationYears
                        ? "bg-green/10 font-semibold"
                        : "hover:bg-slate-50/70"
                    }
                  >
                    <td className="px-4 py-2.5 text-navy font-semibold">
                      {row.year}. rok
                      {row.year === result.effectiveFixationYears && (
                        <span className="ml-2 inline-flex rounded-full bg-green/20 px-2 py-0.5 text-[10px] font-bold text-green-dark">
                          Konec fixace
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right text-green-dark">
                      {formatCzk(row.principalPaid)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-amber-700">
                      {formatCzk(row.interestPaid)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-700">
                      {formatCzk(row.totalPaid)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-navy">
                      {formatCzk(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
