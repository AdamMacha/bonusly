"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CashbackBannerProps {
  rewardAmount?: number | null;
  bonusText?: string | null;
  className?: string;
}

export function CashbackBanner({
  rewardAmount,
  className = "",
}: CashbackBannerProps) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!rewardAmount || rewardAmount <= 0) return;
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
  }, [rewardAmount]);

  // Zobrazujeme pouze u nabídek, které mají explicitně povolenou cashback odměnu
  // (dodržuje pravidlo zákazu cashbacku u partnerských programů).
  if (!rewardAmount || rewardAmount <= 0) {
    return null;
  }

  const rewardDisplay = `${rewardAmount.toLocaleString("cs-CZ")} Kč`;

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
        <div className="flex-1">
          <span className="font-semibold">Cashback aktivní:</span> Po využití nabídky a splnění podmínek ti připíšeme{" "}
          <strong className="text-emerald-700 font-bold">{rewardDisplay}</strong> do tvé BONUSLY peněženky.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-amber-50/90 border border-amber-200/80 px-3.5 py-2.5 text-xs text-amber-900 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-base">
          🎁
        </span>
        <div>
          <span>Přihlas se a získej k této nabídce navíc </span>
          <strong className="text-amber-800 font-bold">{rewardDisplay}</strong>
          <span> do své BONUSLY peněženky!</span>
        </div>
      </div>
      <Link
        href="/prihlaseni"
        className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2 shrink-0 self-start sm:self-auto"
      >
        Přihlásit se <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
