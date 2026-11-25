"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  balance?: number;
}

export function UserNav() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        setUser(data?.user ?? null);
        setChecked(true);
      })
      .catch(() => {
        if (active) setChecked(true);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!checked || !user) {
    return (
      <Link
        href="/prihlaseni"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-all"
      >
        <svg
          aria-hidden="true"
          className="w-4 h-4 text-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span>Přihlásit se</span>
      </Link>
    );
  }

  const balance = user.balance || 0;

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs sm:text-sm font-bold text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400/50 transition-all shadow-xs"
        title="Přejít do vaší peněženky"
      >
        <span aria-hidden="true">💰</span>
        <span>{balance.toLocaleString("cs-CZ")} Kč</span>
      </Link>
    </div>
  );
}
