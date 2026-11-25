/**
 * Deterministické formátování českých dat bez React Hydration Error (#418).
 * Server na Vercelu běží v UTC, prohlížeče v ČR v Europe/Prague — proto vždy
 * předáváme explicitní timeZone.
 */

export function formatCzDate(
  value: Date | string,
  options?: Omit<Intl.DateTimeFormatOptions, "timeZone">
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("cs-CZ", {
    ...options,
    timeZone: "Europe/Prague",
  });
}

export interface PromoValidityDisplay {
  label: string;
  isLongTerm: boolean;
  iso: string;
}

/**
 * Formátuje datum platnosti promo akce uložené jako `YYYY-MM-DDT23:59:59Z`.
 * Používá UTC kalendářní den (shodný na serveru i v klientu, bez posunu o +1 den)
 * a pro dlouhodobé feedové akce (rok >= 2029) zobrazí „Dlouhodobá akce“.
 */
export function formatPromoValidUntil(
  value?: Date | string | null
): PromoValidityDisplay | null {
  if (!value) return null;
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return null;

  const iso = date.toISOString();
  if (date.getUTCFullYear() >= 2029) {
    return {
      label: "Dlouhodobá akce",
      isLongTerm: true,
      iso,
    };
  }

  return {
    label: date.toLocaleDateString("cs-CZ", { timeZone: "UTC" }),
    isLongTerm: false,
    iso,
  };
}
