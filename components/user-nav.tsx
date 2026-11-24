import Link from "next/link";
import { auth, signOut } from "@/auth";

export async function UserNav() {
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  if (!session?.user) {
    return (
      <Link
        href="/prihlaseni"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-all"
      >
        <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  const balance = session.user.balance || 0;

  async function handleLogout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs sm:text-sm font-bold text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400/50 transition-all shadow-xs"
        title="Přejít do vaší peněženky"
      >
        <span>💰</span>
        <span>{balance.toLocaleString("cs-CZ")} Kč</span>
      </Link>

      <form action={handleLogout}>
        <button
          type="submit"
          title="Odhlásit se"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
