"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CashbackBannerProps {
  cashbackAllowed?: boolean;
  userCashbackLabel?: string | null;
  rewardAmount?: number | null;
  bonusText?: string | null;
  className?: string;
}

export function CashbackBanner({
  cashbackAllowed,
  userCashbackLabel,
  rewardAmount,
  className = "",
}: CashbackBannerProps) {
  const [isAuth, setIsAuth] = useState(false);

  const hasFixedReward = Boolean(rewardAmount && rewardAmount > 0);
  const enabled = cashbackAllowed !== undefined ? cashbackAllowed : hasFixedReward;
  const displayLabel =
    userCashbackLabel?.trim() ||
    (hasFixedReward && rewardAmount
      ? `${rewardAmount.toLocaleString("cs-CZ")} Kč`
      : null);

  useEffect(() => {
    if (!enabled || !displayLabel) return;
    let active = true;
    fetch("/api/auth/session", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.user) {
          setIsAuth(true);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [enabled, displayLabel]);

  // Zobrazujeme výhradně u nabídek s explicitně povoleným cashbackem
  // (striktně dodržuje zákaz cashbacku u partnerských programů).
  if (!enabled || !displayLabel) {
    return null;
  }

  if (isAuth) {
    return (
      <div
        className={`flex items-center gap-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 px-3.5 py-2.5 text-xs text-emerald-900 ${className}`}
      >
        <span
          aria-hidden="true"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold"
        >
          ✓
        </span>
        <div className="flex-1 leading-relaxed">
          <span className="font-semibold">Cashback aktivní ({displayLabel}):</span> Díky přihlášení tvůj proklik automaticky měříme a po schválení partnerem ti připíšeme odměnu do{" "}
          <Link href="/dashboard" className="font-bold text-emerald-800 underline underline-offset-2">
            BONUSLY peněženky
          </Link>
          .{" "}
          <Link href="/jak-funguje-cashback" className="text-emerald-700 hover:text-emerald-950 underline underline-offset-2">
            Tipy pro správné připsání
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-amber-50/90 border border-amber-200/80 px-3.5 py-2.5 text-xs text-amber-900 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-base shrink-0">
          💰
        </span>
        <div className="leading-relaxed">
          <strong className="text-amber-950 font-bold">{displayLabel} navíc</strong>{" "}
          <span>do tvé BONUSLY peněženky — stačí se před proklikem zdarma přihlásit.</span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
        <Link
          href="/jak-funguje-cashback"
          className="font-medium text-amber-800/90 hover:text-amber-950 underline underline-offset-2"
        >
          Jak to funguje?
        </Link>
        <Link
          href="/prihlaseni"
          className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2"
        >
          Aktivovat cashback <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
