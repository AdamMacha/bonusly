/**
 * Centrální logika pro výpočet uživatelského cashbacku a marže BONUSLY.
 * Výchozí rozdělení: 50 % z reálně připsané provize uživateli / 50 % BONUSLY.
 */

export const DEFAULT_CASHBACK_SHARE_PCT = 50;

export function getDefaultCashbackSharePct(): number {
  const raw = process.env.CASHBACK_DEFAULT_SHARE_PCT;
  if (!raw) return DEFAULT_CASHBACK_SHARE_PCT;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 95) {
    return DEFAULT_CASHBACK_SHARE_PCT;
  }
  return parsed;
}

export interface CashbackSplit {
  grossCommission: number;
  cashbackSharePct: number;
  userCashback: number;
  platformProfit: number;
}

/**
 * Rozpočítá hrubou provizi z partnerské sítě mezi uživatele a BONUSLY.
 * U částek >= 2 Kč zaokrouhluje uživatelský podíl dolů na celé Kč,
 * aby marže BONUSLY byla vždy garantována a zůstatek zůstal čistý.
 */
export function calculateCashbackSplit(
  grossCommission: number,
  overrideSharePct?: number | null
): CashbackSplit {
  const safeGross = Number.isFinite(grossCommission)
    ? Math.max(0, Math.round(grossCommission * 100) / 100)
    : 0;

  const pct =
    typeof overrideSharePct === "number" &&
    Number.isFinite(overrideSharePct) &&
    overrideSharePct >= 0 &&
    overrideSharePct <= 95
      ? overrideSharePct
      : getDefaultCashbackSharePct();

  const rawUser = safeGross * (pct / 100);
  const userCashback =
    safeGross >= 2
      ? Math.floor(rawUser)
      : Math.floor(rawUser * 100) / 100;

  const platformProfit = Math.max(
    0,
    Math.round((safeGross - userCashback) * 100) / 100
  );

  return {
    grossCommission: safeGross,
    cashbackSharePct: pct,
    userCashback,
    platformProfit,
  };
}
