import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  hashPassword,
  getAdminPassword,
  isValidAdminToken,
} from "./auth-crypto";

export { ADMIN_COOKIE_NAME, hashPassword, getAdminPassword, isValidAdminToken };

/**
 * Ověří zadané heslo oproti proměnné ADMIN_PASSWORD.
 */
export function verifyAdminPassword(inputPassword: string): boolean {
  const adminPassword = getAdminPassword();
  return Boolean(inputPassword && inputPassword.trim() === adminPassword.trim());
}

/**
 * Nastaví zabezpečenou HTTP-only cookie s hashovaným tokenem.
 */
export async function createAdminSession(password: string) {
  const token = await hashPassword(password);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dní
  });
}

/**
 * Zruší administrátorskou session (odhlášení).
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Zkontroluje, zda je aktuální uživatel přihlášen jako admin.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminToken(sessionCookie);
}

/**
 * Vyhodí chybu, pokud uživatel není přihlášen jako admin.
 */
export async function requireAdminAuth() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    throw new Error("Neautorizovaný přístup. Přihlaste se prosím do administrace.");
  }
}
