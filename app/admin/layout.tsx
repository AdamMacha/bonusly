import type { Metadata } from "next";
import Link from "next/link";

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-navy">
            BONUSLY<span className="text-green">.</span> Admin
          </h1>
          <Link href="/" className="text-sm text-slate-500 hover:text-navy transition-colors">
            ← Zpět na web
          </Link>
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
