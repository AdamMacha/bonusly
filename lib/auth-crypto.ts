export const ADMIN_COOKIE_NAME = "bonusly_admin_session";

/**
 * Vypočítá SHA-256 hash hesla pomocí Web Crypto API (kompatibilní s Node.js i Edge Runtime v middleware).
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`bonusly_admin_salt_${password}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Získá nakonfigurované heslo administrátora z environment variables.
 */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "bonusly-admin-2024";
}

/**
 * Zkontroluje, zda je předaný token platným hashem hesla.
 */
export async function isValidAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expectedToken = await hashPassword(getAdminPassword());
  return token === expectedToken;
}
