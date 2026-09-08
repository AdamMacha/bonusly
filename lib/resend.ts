import { Resend } from "resend";

/**
 * Vrátí instanci klienta Resend, pokud je k dispozici API klíč.
 * Zabraňuje pádům aplikace a build procesu, pokud není proměnná prostředí nastavena.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
    return null;
  }
  return new Resend(apiKey);
}

// Export pro zpětnou kompatibilitu – bezpečně vrací null místo chyby při buildu
export const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== ""
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
