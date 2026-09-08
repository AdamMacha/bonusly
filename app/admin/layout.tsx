import type { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { logoutAdmin } from "@/lib/actions/auth";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | BONUSLY Admin" },
  robots: { index: false, follow: false },
};

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/nabidky", label: "Nabídky", icon: "🎯" },
  { href: "/admin/clanky", label: "Články", icon: "📝" },
  { href: "/admin/leady", label: "Zájemci (Leady)", icon: "📋" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await isAdminAuthenticated();

  // Pokud uživatel není přihlášen (např. na stránce /admin/login), zobrazíme čisté rozhraní
  if (!isAuth) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-navy">
              BONUSLY<span className="text-green">.</span> Admin
            </h1>
            <span className="inline-flex items-center rounded-md bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Přihlášen
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-500 hover:text-navy transition-colors">
              ← Zpět na web
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Odhlásit se
              </button>
            </form>
          </div>
        </div>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-green/30 hover:text-navy transition-colors whitespace-nowrap"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
