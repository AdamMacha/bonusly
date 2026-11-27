"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CopyCodeButton } from "./copy-code-button";

interface CalcItem {
  id: string;
  name: string;
  slug: string;
  trackingSlug: string;
  category: "Banky" | "Investice" | "Slevy & Bonusy" | "Extra příjem";
  amount: number;
  minutes: number;
  condition: string;
  promoCode?: string;
  defaultSelected?: boolean;
}

const CALC_ITEMS: CalcItem[] = [
  {
    id: "raiffeisenbank",
    name: "Raiffeisenbank Chytrý účet",
    slug: "raiffeisenbank",
    trackingSlug: "raiffeisenbank",
    category: "Banky",
    amount: 3000,
    minutes: 10,
    condition: "Založení online do 30 dní s kódem lWcT2P + aktivní platby kartou",
    promoCode: "lWcT2P",
    defaultSelected: true,
  },
  {
    id: "mbank",
    name: "mBank mKonto",
    slug: "mbank",
    trackingSlug: "mbank",
    category: "Banky",
    amount: 1000,
    minutes: 8,
    condition: "100 Kč za každou z prvních 10 plateb kartou (kód adamm1863)",
    promoCode: "adamm1863",
    defaultSelected: true,
  },
  {
    id: "revolut",
    name: "Revolut (+ BONUSLY odměna)",
    slug: "revolut",
    trackingSlug: "revolut",
    category: "Banky",
    amount: 500,
    minutes: 10,
    condition: "3 platby min. 100 Kč + objednání fyzické karty",
    defaultSelected: true,
  },
  {
    id: "rb-business",
    name: "Raiffeisenbank Podnikatelský účet (OSVČ)",
    slug: "raiffeisenbank-podnikatelsky-ucet",
    trackingSlug: "raiffeisenbank-podnikatelsky-ucet",
    category: "Banky",
    amount: 1000,
    minutes: 10,
    condition: "Pro živnostníky (IČO) — CHYTRÝ účet zdarma bez podmínek",
  },
  {
    id: "investown",
    name: "Investown (nemovitosti)",
    slug: "investown",
    trackingSlug: "investown",
    category: "Investice",
    amount: 500,
    minutes: 8,
    condition: "Investice min. 5 000 Kč do 7 dní s kódem 0G1ADBC5",
    promoCode: "0G1ADBC5",
    defaultSelected: true,
  },
  {
    id: "tipsport",
    name: "Tipsport (18+, pozvánka + BankID)",
    slug: "tipsport",
    trackingSlug: "tipsport",
    category: "Slevy & Bonusy",
    amount: 1300,
    minutes: 5,
    condition: "300 Kč ihned bez vkladu + 1 000 Kč přes pozvánku Přiveď kamaráda",
  },
  {
    id: "csob-majetek",
    name: "ČSOB Pojištění majetku (Alza poukázka)",
    slug: "csob-pojistovna",
    trackingSlug: "csob-pojistovna",
    category: "Slevy & Bonusy",
    amount: 500,
    minutes: 7,
    condition: "Online sjednání pojištění majetku do 30. 11. 2026 (+ 10 % sleva)",
  },
  {
    id: "jabkolevne",
    name: "Jabkolevně.cz (nákup iPhonu)",
    slug: "jabkolevne",
    trackingSlug: "jabkolevne",
    category: "Slevy & Bonusy",
    amount: 600,
    minutes: 2,
    condition: "Okamžitá sleva s kódem sleva600 při nákupu nad 2 000 Kč bez DPH",
    promoCode: "sleva600",
  },
  {
    id: "iphonemarket",
    name: "iPhoneMarket.cz (nákup iPhonu)",
    slug: "iphonemarket",
    trackingSlug: "iphonemarket",
    category: "Slevy & Bonusy",
    amount: 400,
    minutes: 2,
    condition: "Okamžitá sleva s kódem SLEVA400 při nákupu nad 2 000 Kč",
    promoCode: "SLEVA400",
  },
  {
    id: "wolt-kuryr",
    name: "Wolt kurýr (startovací bonus)",
    slug: "wolt-kuryr",
    trackingSlug: "wolt-kuryr",
    category: "Extra příjem",
    amount: 4000,
    minutes: 15,
    condition: "150 objednávek během prvních 45 dní s kódem CPCJPUX",
    promoCode: "CPCJPUX",
  },
  {
    id: "airbnb",
    name: "Airbnb Hostitel",
    slug: "airbnb",
    trackingSlug: "airbnb",
    category: "Extra příjem",
    amount: 500,
    minutes: 15,
    condition: "První dokončená rezervace vlastního pokoje, bytu nebo chalupy",
  },
];

export function BonusCalculator() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    CALC_ITEMS.filter((i) => i.defaultSelected).map((i) => i.id)
  );
  const [rondaInvestment, setRondaInvestment] = useState<number>(0);
  const [monthlySpend, setMonthlySpend] = useState<number>(4000);
  const [cashbackRate, setCashbackRate] = useState<number>(4);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = useMemo(
    () => CALC_ITEMS.filter((i) => selectedIds.includes(i.id)),
    [selectedIds]
  );

  const rondaBonus = Math.round(rondaInvestment * 0.01);
  const oneTimeBonus =
    selectedItems.reduce((sum, i) => sum + i.amount, 0) + rondaBonus;
  const yearlyCashback = Math.round(monthlySpend * 12 * (cashbackRate / 100));
  const totalBonus = oneTimeBonus + yearlyCashback;
  const totalMinutes =
    selectedItems.reduce((sum, i) => sum + i.minutes, 0) +
    (rondaInvestment > 0 ? 10 : 0) +
    (yearlyCashback > 0 ? 1 : 0);

  const selectedCount =
    selectedItems.length +
    (rondaInvestment > 0 ? 1 : 0) +
    (yearlyCashback > 0 ? 1 : 0);

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-navy">
              1. Vyberte nabídky, které ještě nemáte
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedIds(CALC_ITEMS.map((i) => i.id))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:border-green/40 cursor-pointer"
              >
                Vybrat vše
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedIds([]);
                  setRondaInvestment(0);
                  setMonthlySpend(0);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-navy cursor-pointer"
              >
                Vymazat
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {CALC_ITEMS.map((item) => {
              const checked = selectedIds.includes(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-all ${
                    checked
                      ? "border-green bg-green/5 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleItem(item.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-green focus:ring-green"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-navy text-sm sm:text-base">{item.name}</span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {item.category}
                        </span>
                      </div>
                      <span className="font-extrabold text-green-dark text-sm sm:text-base whitespace-nowrap">
                        +{item.amount.toLocaleString("cs-CZ")} Kč
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{item.condition}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Ronda Invest 1% Slider */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <label htmlFor="ronda-slider" className="font-bold text-navy text-sm block">
                  Ronda Invest — vstupní bonus 1 % z investice v prvních 30 dnech
                </label>
                <p className="text-xs text-slate-500">
                  Posuňte, kolik byste případně investovali do úvěrů zajištěných nemovitostmi:
                </p>
              </div>
              <span className="font-extrabold text-green-dark text-base whitespace-nowrap">
                +{rondaBonus.toLocaleString("cs-CZ")} Kč
              </span>
            </div>
            <input
              id="ronda-slider"
              type="range"
              min={0}
              max={200000}
              step={10000}
              value={rondaInvestment}
              onChange={(e) => setRondaInvestment(Number(e.target.value))}
              className="w-full accent-green cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>0 Kč (nepočítat)</span>
              <span className="font-semibold text-navy">
                Investice: {rondaInvestment.toLocaleString("cs-CZ")} Kč
              </span>
              <span>200 000 Kč</span>
            </div>
          </div>

          {/* 50/50 Cashback Yearly Slider */}
          <div className="rounded-2xl border-2 border-amber-200/90 bg-amber-50/40 p-5">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 mb-1.5">
                  <span aria-hidden="true">💰</span> Novinka · Cashback 50/50 z 330+ e-shopů
                </span>
                <label htmlFor="cashback-spend-slider" className="font-bold text-navy text-sm sm:text-base block">
                  Roční cashback z vašich běžných online nákupů
                </label>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kolik měsíčně utratíte v e-shopech (móda, elektro, kosmetika, dům, krmivo, dárky)?
                </p>
              </div>
              <span className="font-extrabold text-amber-800 text-base whitespace-nowrap">
                +{yearlyCashback.toLocaleString("cs-CZ")} Kč / rok
              </span>
            </div>

            <input
              id="cashback-spend-slider"
              type="range"
              min={0}
              max={30000}
              step={1000}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>0 Kč</span>
              <span className="font-semibold text-navy">
                Útrata: {monthlySpend.toLocaleString("cs-CZ")} Kč / měsíc
              </span>
              <span>30 000 Kč</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-200/70">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-600">Průměrný cashback:</span>
                {[3, 4, 6].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setCashbackRate(rate)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                      cashbackRate === rate
                        ? "bg-amber-600 text-white"
                        : "bg-white border border-amber-200 text-amber-900 hover:border-amber-400"
                    }`}
                  >
                    {rate} %
                  </button>
                ))}
              </div>
              <Link
                href="/jak-funguje-cashback"
                className="text-xs font-semibold text-amber-900 hover:underline underline-offset-2"
              >
                Jak cashback 50/50 funguje →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Sticky Result Card */}
        <aside id="kalkulacka-vysledek" className="lg:col-span-5 lg:sticky lg:top-20 scroll-mt-24">
          <div className="rounded-3xl bg-navy text-white p-6 sm:p-8 shadow-xl">
            <span className="inline-flex items-center rounded-full bg-green/20 px-3 py-1 text-xs font-bold text-green mb-4">
              Váš odhadovaný zisk v roce 2026
            </span>
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {totalBonus.toLocaleString("cs-CZ")}{" "}
              <span className="text-2xl text-green">Kč</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Vybráno <strong className="text-white">{selectedCount}</strong> položek ·
              Odhadovaný čas registrací: <strong className="text-white">~{totalMinutes} min</strong>
            </p>

            {/* Split breakdown */}
            {(oneTimeBonus > 0 || yearlyCashback > 0) && (
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                  <span className="block text-[11px] text-slate-400">Jednorázové bonusy</span>
                  <span className="text-sm font-extrabold text-white">
                    {oneTimeBonus.toLocaleString("cs-CZ")} Kč
                  </span>
                </div>
                <div className="rounded-xl bg-amber-500/15 border border-amber-400/25 px-3 py-2">
                  <span className="block text-[11px] text-amber-200">Roční cashback ({cashbackRate} %)</span>
                  <span className="text-sm font-extrabold text-amber-300">
                    +{yearlyCashback.toLocaleString("cs-CZ")} Kč
                  </span>
                </div>
              </div>
            )}

            {selectedItems.length > 0 || rondaInvestment > 0 || yearlyCashback > 0 ? (
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Váš akční plán krok za krokem:
                </p>
                <ol className="space-y-2.5">
                  {selectedItems.map((item, idx) => (
                    <li
                      key={item.id}
                      className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={`/nabidky/${item.slug}`}
                          className="font-bold text-white hover:text-green transition-colors truncate block min-w-0"
                        >
                          {idx + 1}. {item.name}
                        </Link>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-green">
                            +{item.amount.toLocaleString("cs-CZ")} Kč
                          </span>
                          <a
                            href={`/go/${item.trackingSlug}`}
                            target="_blank"
                            rel="nofollow sponsored noopener"
                            className="rounded-lg bg-green px-2.5 py-1 text-[11px] font-bold text-navy hover:bg-green-light transition-colors"
                          >
                            Přejít ↗
                          </a>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{item.condition}</p>
                      {item.promoCode && (
                        <div className="pt-0.5">
                          <CopyCodeButton code={item.promoCode} size="sm" />
                        </div>
                      )}
                    </li>
                  ))}
                  {rondaInvestment > 0 && (
                    <li className="flex items-center justify-between gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs">
                      <Link
                        href="/nabidky/rondainvest"
                        className="font-bold text-white hover:text-green transition-colors truncate"
                      >
                        {selectedItems.length + 1}. Ronda Invest (1 % bonus)
                      </Link>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-green">
                          +{rondaBonus.toLocaleString("cs-CZ")} Kč
                        </span>
                        <a
                          href="/go/rondainvest"
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="rounded-lg bg-green px-2.5 py-1 text-[11px] font-bold text-navy hover:bg-green-light transition-colors"
                        >
                          Přejít ↗
                        </a>
                      </div>
                    </li>
                  )}
                  {yearlyCashback > 0 && (
                    <li className="rounded-xl bg-amber-500/15 border border-amber-400/25 px-3.5 py-2.5 text-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-amber-200 truncate">
                          💰 BONUSLY Cashback peněženka
                        </span>
                        <span className="font-bold text-amber-300 shrink-0">
                          +{yearlyCashback.toLocaleString("cs-CZ")} Kč / rok
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        Přihlaste se před nákupem v 200+ e-shopech a získejte 50 % z naší provize zpět na účet.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <Link
                          href="/prihlaseni"
                          className="rounded-lg bg-amber-400 px-3 py-1.5 text-[11px] font-bold text-navy hover:bg-amber-300 transition-colors"
                        >
                          Aktivovat cashback zdarma →
                        </Link>
                        <Link
                          href="/nabidky"
                          className="text-[11px] font-semibold text-slate-300 hover:text-white underline underline-offset-2"
                        >
                          Prohlédnout e-shopy
                        </Link>
                      </div>
                    </li>
                  )}
                </ol>
              </div>
            ) : (
              <p className="mt-6 pt-6 border-t border-white/10 text-sm text-slate-400">
                Zaškrtněte vlevo alespoň jednu nabídku nebo posuňte cashback a okamžitě spočítáme váš potenciální bonus.
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Running Total Bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 backdrop-blur-md px-4 py-3 text-white shadow-2xl">
        <div className="mx-auto max-w-xl flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[11px] text-slate-400 leading-tight">
              Odhadovaný zisk ({selectedCount} položek)
            </span>
            <span className="text-lg font-black text-white leading-tight">
              {totalBonus.toLocaleString("cs-CZ")}{" "}
              <span className="text-sm text-green">Kč</span>
            </span>
          </div>
          <a
            href="#kalkulacka-vysledek"
            className="shrink-0 rounded-xl bg-green px-4 py-2 text-xs font-bold text-navy hover:bg-green-light transition-colors"
          >
            Zobrazit plán ↓
          </a>
        </div>
      </div>
    </div>
  );
}
