"use client";

import { useMemo, useState } from "react";
import { ToolSlider } from "./tool-slider";
import { formatCzk, formatPercent } from "@/lib/tools-data";

// Parametry výpočtu čisté mzdy v ČR pro rok 2026
const TAXPAYER_CREDIT_MONTHLY = 2570; // 30 840 Kč / rok
const HIGHER_TAX_THRESHOLD_MONTHLY = 146901; // 3× průměrná mzda pro 2026 (36× ročně)
const MIN_GROSS_FOR_TAX_BONUS = 11200; // polovina minimální mzdy 2026 (22 400 Kč)
const CHILD_CREDITS = [1267, 1860, 2320] as const;

type DisabilityLevel = "none" | "inv12" | "inv3" | "ztpp";

const DISABILITY_CREDITS: Record<DisabilityLevel, { label: string; amount: number }> = {
  none: { label: "Žádná", amount: 0 },
  inv12: { label: "Invalidita I. / II. st. (210 Kč)", amount: 210 },
  inv3: { label: "Invalidita III. st. (420 Kč)", amount: 420 },
  ztpp: { label: "Držitel průkazu ZTP/P (1 345 Kč)", amount: 1345 },
};

export function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState(48000);
  const [signedDeclaration, setSignedDeclaration] = useState(true);
  const [childrenCount, setChildrenCount] = useState(0);
  const [ztppChildCount, setZtppChildCount] = useState(0);
  const [disability, setDisability] = useState<DisabilityLevel>("none");

  const safeZtppChildren = Math.min(ztppChildCount, childrenCount);

  const result = useMemo(() => {
    const socialEmployee = Math.ceil(grossSalary * 0.071); // 6,5 % důchodové + 0,6 % nemocenské
    const healthEmployee = Math.ceil(grossSalary * 0.045); // 4,5 % zdravotní

    // Základ pro výpočet zálohy na daň zaokrouhlený na celé stokoruny nahoru (§ 38h ZDP)
    const taxBase = Math.ceil(grossSalary / 100) * 100;

    let rawTax = 0;
    if (taxBase <= HIGHER_TAX_THRESHOLD_MONTHLY) {
      rawTax = Math.ceil(taxBase * 0.15);
    } else {
      const part15 = HIGHER_TAX_THRESHOLD_MONTHLY * 0.15;
      const part23 = (taxBase - HIGHER_TAX_THRESHOLD_MONTHLY) * 0.23;
      rawTax = Math.ceil(part15 + part23);
    }

    const taxpayerCredit = signedDeclaration ? TAXPAYER_CREDIT_MONTHLY : 0;
    const disabilityCredit = signedDeclaration ? DISABILITY_CREDITS[disability].amount : 0;

    let childCredit = 0;
    if (signedDeclaration && childrenCount > 0) {
      for (let i = 0; i < childrenCount; i++) {
        const base = i === 0 ? CHILD_CREDITS[0] : i === 1 ? CHILD_CREDITS[1] : CHILD_CREDITS[2];
        const isZtpp = i < safeZtppChildren;
        childCredit += isZtpp ? base * 2 : base;
      }
    }

    const taxAfterPersonalCredits = Math.max(0, rawTax - taxpayerCredit - disabilityCredit);
    let finalTax = 0;
    let taxBonus = 0;

    if (taxAfterPersonalCredits >= childCredit) {
      finalTax = taxAfterPersonalCredits - childCredit;
    } else {
      finalTax = 0;
      const potentialBonus = childCredit - taxAfterPersonalCredits;
      taxBonus = grossSalary >= MIN_GROSS_FOR_TAX_BONUS ? potentialBonus : 0;
    }

    const netSalary = Math.max(0, grossSalary - socialEmployee - healthEmployee - finalTax + taxBonus);
    const totalEmployeeDeductions = socialEmployee + healthEmployee + finalTax - taxBonus;
    const effectiveRatePct = grossSalary > 0 ? (totalEmployeeDeductions / grossSalary) * 100 : 0;

    const employerSocial = Math.ceil(grossSalary * 0.248);
    const employerHealth = Math.ceil(grossSalary * 0.09);
    const employerTotalCost = grossSalary + employerSocial + employerHealth;

    return {
      socialEmployee,
      healthEmployee,
      rawTax,
      finalTax,
      taxBonus,
      childCredit,
      netSalary,
      effectiveRatePct,
      employerSocial,
      employerHealth,
      employerTotalCost,
    };
  }, [grossSalary, signedDeclaration, childrenCount, safeZtppChildren, disability]);

  const netPct = result.employerTotalCost > 0 ? (result.netSalary / result.employerTotalCost) * 100 : 0;
  const statePct = 100 - netPct;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Inputs */}
      <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-navy">Údaje pro výpočet mzdy 2026</h2>
          <p className="text-xs text-slate-500">
            Výpočet pro zaměstnance na HPP podle sazeb sociálního (7,1 %) a zdravotního (4,5 %) pojištění pro rok 2026.
          </p>
        </div>

        <ToolSlider
          id="salary-gross"
          label="Hrubá měsíční mzda"
          value={grossSalary}
          min={22400}
          max={250000}
          step={1000}
          unit="Kč"
          formattedValue={formatCzk(grossSalary)}
          presets={[
            { label: "35 000 Kč", value: 35000 },
            { label: "48 000 Kč (průměr)", value: 48000 },
            { label: "70 000 Kč", value: 70000 },
            { label: "100 000 Kč", value: 100000 },
          ]}
          onChange={setGrossSalary}
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={signedDeclaration}
              onChange={(e) => setSignedDeclaration(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-green-dark"
            />
            <div>
              <span className="block text-sm font-bold text-navy">
                Podepsané prohlášení poplatníka („růžový formulář“)
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">
                Uplatní základní slevu na poplatníka 2 570 Kč/měs. a případné daňové zvýhodnění na děti.
              </span>
            </div>
          </label>
        </div>

        {signedDeclaration && (
          <div className="space-y-5 pt-1">
            <div>
              <span className="block text-sm font-semibold text-navy mb-2">
                Počet vyživovaných dětí (daňové zvýhodnění)
              </span>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      setChildrenCount(count);
                      if (ztppChildCount > count) setZtppChildCount(count);
                    }}
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
                      childrenCount === count
                        ? "border-green bg-navy text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                    }`}
                  >
                    {count === 0 ? "Bez dětí" : `${count} ${count === 1 ? "dítě" : count <= 4 ? "děti" : "dětí"}`}
                  </button>
                ))}
              </div>
              {childrenCount > 0 && (
                <div className="mt-3 flex items-center gap-3">
                  <label htmlFor="ztpp-children" className="text-xs font-semibold text-slate-600">
                    Z toho děti s průkazem ZTP/P (dvojnásobné zvýhodnění):
                  </label>
                  <select
                    id="ztpp-children"
                    value={safeZtppChildren}
                    onChange={(e) => setZtppChildCount(Number(e.target.value))}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-navy"
                  >
                    {Array.from({ length: childrenCount + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="salary-disability" className="block text-sm font-semibold text-navy mb-1.5">
                Další osobní sleva (invalidita / ZTP/P)
              </label>
              <select
                id="salary-disability"
                value={disability}
                onChange={(e) => setDisability(e.target.value as DisabilityLevel)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-navy focus:border-green focus:bg-white focus:outline-none"
              >
                {(Object.keys(DISABILITY_CREDITS) as DisabilityLevel[]).map((key) => (
                  <option key={key} value={key}>
                    {DISABILITY_CREDITS[key].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl bg-navy p-6 sm:p-7 text-white shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-green-light">
            Čistá měsíční mzda na účet
          </span>
          <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
            {formatCzk(result.netSalary)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Roční čistý příjem:{" "}
            <strong className="text-white">{formatCzk(result.netSalary * 12)}</strong> · Efektivní
            odvody z hrubé: <strong className="text-amber-300">{formatPercent(result.effectiveRatePct, 1)}</strong>
          </p>

          <dl className="mt-6 space-y-2.5 pt-5 border-t border-white/10 text-sm tabular-nums">
            <div className="flex items-center justify-between">
              <dt className="text-slate-300">Sociální pojištění (7,1 %)</dt>
              <dd className="font-bold text-rose-300">-{formatCzk(result.socialEmployee)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-300">Zdravotní pojištění (4,5 %)</dt>
              <dd className="font-bold text-rose-300">-{formatCzk(result.healthEmployee)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-300">Záloha na daň z příjmu</dt>
              <dd className="font-bold text-rose-300">
                {result.finalTax > 0 ? `-${formatCzk(result.finalTax)}` : "0 Kč"}
              </dd>
            </div>
            {result.taxBonus > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-green-light font-semibold">Daňový bonus na děti</dt>
                <dd className="font-bold text-green-light">+{formatCzk(result.taxBonus)}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Employer Total Cost */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Celkové náklady zaměstnavatele
            </span>
            <span className="text-base font-extrabold text-navy tabular-nums">
              {formatCzk(result.employerTotalCost)}
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex">
            <div className="bg-green" style={{ width: `${netPct}%` }} />
            <div className="bg-slate-400" style={{ width: `${statePct}%` }} />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Vy dostanete: {formatPercent(netPct, 1)}</span>
            <span>Stát (daně + odvody): {formatPercent(statePct, 1)}</span>
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Zaměstnavatel za vás navíc odvádí {formatCzk(result.employerSocial)} sociální (24,8 %) a{" "}
            {formatCzk(result.employerHealth)} zdravotní (9 %).
          </p>
        </div>
      </div>
    </div>
  );
}
