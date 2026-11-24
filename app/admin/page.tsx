import Link from "next/link";
import { prisma } from "@/lib/db";
import { CashoutActions } from "./vybery/cashout-actions";
import { CashoutStatus } from "@prisma/client";

export default async function AdminDashboard() {
  const [
    offerCount,
    articleCount,
    clickCount,
    subscriberCount,
    leadCount,
    userCount,
    pendingCashouts,
    totalBalanceAgg,
    recentClicks,
  ] = await Promise.all([
    prisma.offer.count({ where: { active: true } }),
    prisma.article.count(),
    prisma.click.count(),
    prisma.newsletterSubscriber.count({ where: { unsubscribed: false } }),
    prisma.lead.count(),
    prisma.user.count(),
    prisma.cashoutRequest.findMany({
      where: { status: CashoutStatus.PENDING },
      include: { user: { select: { email: true, name: true } } },
      orderBy: { createdAt: "asc" },
      take: 5,
    }),
    prisma.user.aggregate({ _sum: { balance: true } }),
    prisma.click.findMany({
      include: { offer: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const totalBalance = totalBalanceAgg._sum.balance || 0;

  const stats = [
    { label: "Aktivní nabídky", value: offerCount, icon: "🎯" },
    { label: "Registrovaní uživatelé", value: userCount, icon: "👥" },
    { label: "Zůstatek v peněženkách", value: `${totalBalance.toLocaleString("cs-CZ")} Kč`, icon: "💰" },
    { label: "Čekající žádosti o výběr", value: pendingCashouts.length, icon: "⏳" },
    { label: "Články", value: articleCount, icon: "📝" },
    { label: "Celkem kliknutí", value: clickCount, icon: "🖱️" },
    { label: "Zájemci (Leady)", value: leadCount, icon: "📋" },
    { label: "Newsletter odběratelé", value: subscriberCount, icon: "📧" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Dashboard</h2>
        <div className="flex gap-2">
          <Link
            href="/admin/uzivatele"
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50 transition-colors"
          >
            👥 Spravovat uživatele
          </Link>
          <Link
            href="/admin/vybery"
            className="rounded-xl bg-green px-3 py-1.5 text-xs font-bold text-navy hover:bg-green-light transition-colors"
          >
            💸 Vyřídit žádosti o výběr
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-xl sm:text-2xl font-bold text-navy">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Čekající žádosti o výběr */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-navy flex items-center gap-2">
              <span>⏳</span> Čekající žádosti o výběr
            </h3>
            <Link href="/admin/vybery" className="text-xs text-green-dark hover:text-green font-semibold">
              Zobrazit všechny →
            </Link>
          </div>

          {pendingCashouts.length === 0 ? (
            <div className="px-5 py-8 text-center text-xs text-slate-400">
              Žádné čekající žádosti o výběr. Všechny jsou vyřízené.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingCashouts.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-navy text-xs sm:text-sm">{req.user.email}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      Účet: {req.bankAccount} • {req.amount.toLocaleString("cs-CZ")} Kč
                    </div>
                  </div>
                  <CashoutActions cashoutId={req.id} amount={req.amount} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Poslední kliknutí */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-navy flex items-center gap-2">
              <span>🖱️</span> Poslední kliknutí na nabídky
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentClicks.length === 0 ? (
              <div className="px-5 py-8 text-center text-xs text-slate-400">Zatím žádná kliknutí.</div>
            ) : (
              recentClicks.map((click) => (
                <div key={click.id} className="px-5 py-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-navy">{click.offer.name}</span>
                  <span className="text-slate-400">
                    {new Date(click.createdAt).toLocaleString("cs-CZ")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
