"use client";

import { useMemo, useState } from "react";
import { ToolSlider } from "./tool-slider";
import { formatCzk, formatPercent } from "@/lib/tools-data";

interface GrowthPoint {
  year: number;
  contributed: number;
  gains: number;
  total: number;
  realTotal: number;
}

export function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(50000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(8.0);
  const [years, setYears] = useState(20);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [includeDip, setIncludeDip] = useState(true);

  const result = useMemo(() => {
    const monthlyRate = annualReturn / 100 / 12;
    let balance = initialDeposit;
    let contributed = initialDeposit;
    const points: GrowthPoint[] = [];

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthlyDeposit;
        contributed += monthlyDeposit;
      }
      const realTotal = balance / Math.pow(1 + inflationRate / 100, y);
      points.push({
        year: y,
        contributed,
        gains: Math.max(0, balance - contributed),
        total: balance,
        realTotal,
      });
    }

    const finalBalance = balance;
    const totalContributed = contributed;
    const totalGains = Math.max(0, finalBalance - totalContributed);
    const realFinalBalance = finalBalance / Math.pow(1 + inflationRate / 100, years);

    // DIP 2026: odpočet až 48 000 Kč/rok -> 15 % daňová úspora = až 7 200 Kč/rok
    const annualContribution = monthlyDeposit * 12;
    const dipAnnualTaxSaving = includeDip ? Math.min(annualContribution, 48000) * 0.15 : 0;
    const dipTotalTaxSaving = dipAnnualTaxSaving * years;

    const monthlyRentaNominal = (finalBalance * 0.04) / 12;
    const monthlyRentaReal = (realFinalBalance * 0.04) / 12;
    const multiplier = totalContributed > 0 ? finalBalance / totalContributed : 1;

    // Sample at most 10 bars evenly for clean visualization
    const step = Math.max(1, Math.ceil(points.length / 10));
    const chartPoints = points.filter((p, idx) => idx === points.length - 1 || (idx + 1) % step === 0);

    return {
      finalBalance,
      totalContributed,
      totalGains,
      realFinalBalance,
      dipAnnualTaxSaving,
      dipTotalTaxSaving,
      monthlyRentaNominal,
      monthlyRentaReal,
      multiplier,
      chartPoints,
    };
  }, [initialDeposit, monthlyDeposit, annualReturn, years, inflationRate, includeDip]);

  const maxChartTotal = Math.max(1, result.finalBalance);
  const contributedPct =
    result.finalBalance > 0 ? (result.totalContributed / result.finalBalance) * 100 : 100;
  const gainsPct = 100 - contributedPct;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-extrabold text-navy">Nastavení investičního plánu</h2>
            <p className="text-xs text-slate-500">
              Vyzkoušejte efekt složeného úročení při pravidelném investování do ETF nebo DIP.
            </p>
          </div>

          <ToolSlider
            id="compound-initial"
            label="Počáteční vklad"
            value={initialDeposit}
            min={0}
            max={5000000}
            step={10000}
            unit="Kč"
            formattedValue={formatCzk(initialDeposit)}
            presets={[
              { label: "0 Kč", value: 0 },
              { label: "50 000 Kč", value: 50000 },
              { label: "200 000 Kč", value: 200000 },
              { label: "500 000 Kč", value: 500000 },
            ]}
            onChange={setInitialDeposit}
          />

          <ToolSlider
            id="compound-monthly"
            label="Pravidelný měsíční vklad"
            value={monthlyDeposit}
            min={500}
            max={100000}
            step={500}
            unit="Kč"
            formattedValue={formatCzk(monthlyDeposit)}
            presets={[
              { label: "2 000 Kč", value: 2000 },
              { label: "4 000 Kč (max DIP)", value: 4000 },
              { label: "5 000 Kč", value: 5000 },
              { label: "10 000 Kč", value: 10000 },
            ]}
            onChange={setMonthlyDeposit}
          />

          <ToolSlider
            id="compound-return"
            label="Očekávaný roční výnos p.a."
            value={annualReturn}
            min={2}
            max={15}
            step={0.5}
            unit="%"
            formattedValue={formatPercent(annualReturn, 1)}
            presets={[
              { label: "Konzervativní 4 %", value: 4 },
              { label: "Vyvážený 7 %", value: 7 },
              { label: "ETF Svět 8 %", value: 8 },
              { label: "S&P 500 9,5 %", value: 9.5 },
            ]}
            onChange={setAnnualReturn}
          />

          <ToolSlider
            id="compound-years"
            label="Investiční horizont"
            value={years}
            min={1}
            max={40}
            step={1}
            unit="let"
            formattedValue={`${years} let`}
            presets={[
              { label: "5 let", value: 5 },
              { label: "10 let", value: 10 },
              { label: "20 let", value: 20 },
              { label: "30 let", value: 30 },
            ]}
            onChange={setYears}
          />

          <ToolSlider
            id="compound-inflation"
            label="Očekávaná průměrná inflace p.a."
            value={inflationRate}
            min={0}
            max={6}
            step={0.5}
            unit="%"
            formattedValue={formatPercent(inflationRate, 1)}
            helperText="Pro výpočet reálné kupní síly v dnešních cenách"
            onChange={setInflationRate}
          />

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDip}
                onChange={(e) => setIncludeDip(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 accent-green-dark"
              />
              <div>
                <span className="block text-sm font-bold text-navy">
                  Započítat daňovou úsporu DIP (Dlouhodobý investiční produkt)
                </span>
                <span className="block text-xs text-slate-500 mt-0.5">
                  V ČR si můžete ze základu daně odečíst až 48 000 Kč ročně (= úspora až 7 200 Kč/rok při 15% dani).
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl bg-navy p-6 sm:p-7 text-white shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-green-light">
              Hodnota portfolia za {years} {years === 1 ? "rok" : years <= 4 ? "roky" : "let"}
            </span>
            <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
              {formatCzk(result.finalBalance)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Zhodnocení vkladů{" "}
              <strong className="text-green-light">{result.multiplier.toFixed(2)}×</strong> · V dnešních
              cenách (po inflaci {formatPercent(inflationRate, 1)}):{" "}
              <strong className="text-white">{formatCzk(result.realFinalBalance)}</strong>
            </p>

            {/* Ratio Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300">Vlastní vklady ({formatPercent(contributedPct, 0)})</span>
                <span className="text-green-light">Čistý zisk ({formatPercent(gainsPct, 0)})</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 flex">
                <div
                  className="bg-slate-400 transition-all duration-300"
                  style={{ width: `${contributedPct}%` }}
                />
                <div
                  className="bg-green transition-all duration-300"
                  style={{ width: `${gainsPct}%` }}
                />
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-white/10 text-sm">
              <div>
                <dt className="text-xs text-slate-400">Celkem vložíte</dt>
                <dd className="mt-0.5 font-bold text-white tabular-nums">
                  {formatCzk(result.totalContributed)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Zisk ze složeného úročení</dt>
                <dd className="mt-0.5 font-bold text-green-light tabular-nums">
                  +{formatCzk(result.totalGains)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Měsíční renta (pravidlo 4 %)</dt>
                <dd className="mt-0.5 font-bold text-white tabular-nums">
                  {formatCzk(result.monthlyRentaNominal)} / měs.
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Renta v dnešní kupní síle</dt>
                <dd className="mt-0.5 font-bold text-amber-300 tabular-nums">
                  {formatCzk(result.monthlyRentaReal)} / měs.
                </dd>
              </div>
            </dl>

            {includeDip && (
              <div className="mt-5 rounded-xl bg-white/10 border border-green/30 p-3.5 text-xs">
                <span className="font-bold text-green-light">
                  🏛️ Daňová úspora přes DIP: +{formatCzk(result.dipAnnualTaxSaving)} / rok
                </span>
                <p className="mt-0.5 text-slate-300">
                  Za {years} let získáte na vratkách daní celkem až{" "}
                  <strong className="text-white">{formatCzk(result.dipTotalTaxSaving)}</strong> (při 15% sazbě).
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-xs text-slate-600 leading-relaxed">
            <strong className="text-navy">Časový test 3 roky (ČR):</strong> Pokud držíte ETF nebo akcie déle než
            3 roky, je výnos z jejich prodeje v ČR zpravidla osvobozen od 15% daně z příjmu (do zákonného limitu 40 mil. Kč/rok).
          </div>
        </div>
      </div>

      {/* Visual Yearly Progression Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-extrabold text-navy">Vývoj hodnoty investice v čase</h3>
            <p className="text-xs text-slate-500">
              Porovnání vašich vkladů (šedá) a čistého výnosu ze složeného úročení (zelená)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-xs bg-slate-400" /> Vklady
            </span>
            <span className="inline-flex items-center gap-1.5 text-green-dark">
              <span className="h-2.5 w-2.5 rounded-xs bg-green" /> Výnosy
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {result.chartPoints.map((pt) => {
            const contributedWidth = (pt.contributed / maxChartTotal) * 100;
            const gainsWidth = (pt.gains / maxChartTotal) * 100;
            return (
              <div key={pt.year} className="grid grid-cols-12 items-center gap-3 text-xs">
                <div className="col-span-2 sm:col-span-1 font-bold text-navy whitespace-nowrap">
                  {pt.year}. rok
                </div>
                <div className="col-span-6 sm:col-span-8">
                  <div className="h-5 w-full rounded-md bg-slate-100 overflow-hidden flex">
                    <div
                      className="bg-slate-400 transition-all duration-300"
                      style={{ width: `${contributedWidth}%` }}
                      title={`Vklady: ${formatCzk(pt.contributed)}`}
                    />
                    <div
                      className="bg-green transition-all duration-300"
                      style={{ width: `${gainsWidth}%` }}
                      title={`Výnosy: ${formatCzk(pt.gains)}`}
                    />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-3 text-right font-bold text-navy tabular-nums">
                  {formatCzk(pt.total)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
