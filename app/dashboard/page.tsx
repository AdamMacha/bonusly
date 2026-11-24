import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CashoutForm } from "./cashout-form";
import { TransactionStatus, CashoutStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Moje peněženka a odměny | BONUSLY",
  description: "Přehled vašeho zůstatku, čekajících odměn, historie transakcí a žádostí o výplatu.",
  robots: { index: false, follow: false },
};

function StatusBadge({ status }: { status: TransactionStatus | CashoutStatus }) {
  switch (status) {
    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Schváleno
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          Čeká na schválení
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200/70 px-2.5 py-0.5 text-xs font-semibold text-red-700">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Zamítnuto
        </span>
      );
    default:
      return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/prihlaseni?callbackUrl=/dashboard");
  }

  // Načteme čerstvá data uživatele přímo z databáze
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/prihlaseni");
  }

  const minAmount = parseFloat(process.env.MIN_CASHOUT_AMOUNT || "500") || 500;

  // Spočítáme čekající odměny a již vyplacené částky
  const [pendingAgg, paidAgg, transactions, cashouts] = await Promise.all([
    prisma.transaction.aggregate({
      where: { userId: user.id, status: TransactionStatus.PENDING },
      _sum: { amount: true },
    }),
    prisma.cashoutRequest.aggregate({
      where: { userId: user.id, status: CashoutStatus.APPROVED },
      _sum: { amount: true },
    }),
    prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        offer: {
          select: { name: true, slug: true, logo: true },
        },
      },
    }),
    prisma.cashoutRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const pendingBalance = pendingAgg._sum.amount || 0;
  const totalPaid = paidAgg._sum.amount || 0;

  async function handleLogout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Moje peněženka" }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Ahoj, {user.name || user.email.split("@")[0]} 👋
            </h1>
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="inline-flex items-center rounded-md bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition-colors"
              >
                ⚙️ Administrace
              </Link>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Účet: <strong className="text-navy">{user.email}</strong> • ID uživatele:{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono text-xs">
              {user.id}
            </code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/nabidky"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>🎯 Získat odměny</span>
          </Link>
          <form action={handleLogout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer shadow-xs"
            >
              Odhlásit se
            </button>
          </form>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {/* K výběru */}
        <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-50/70 via-white to-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              K výplatě (schváleno)
            </span>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-navy">
            {user.balance.toLocaleString("cs-CZ")} <span className="text-xl font-bold text-slate-500">Kč</span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Peníze připravené k okamžité výplatě na váš bankovní účet.
          </p>
        </div>

        {/* Čeká na schválení */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Čekající odměny
            </span>
            <span className="text-2xl">⏳</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-navy">
            {pendingBalance.toLocaleString("cs-CZ")} <span className="text-xl font-bold text-slate-500">Kč</span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Provize čekající na ověření a schválení partnerskou sítí (obvykle 14–30 dní).
          </p>
        </div>

        {/* Vyplaceno celkem */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Vyplaceno celkem
            </span>
            <span className="text-2xl">🏦</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-navy">
            {totalPaid.toLocaleString("cs-CZ")} <span className="text-xl font-bold text-slate-500">Kč</span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Celková suma odměn již úspěšně odeslaných na váš bankovní účet.
          </p>
        </div>
      </div>

      {/* Main Grid: Form + History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left column: Cashout form & Tips */}
        <div className="space-y-6">
          <CashoutForm
            balance={user.balance}
            savedBankAccount={user.bankAccount}
            minAmount={minAmount}
          />

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-navy mb-2 flex items-center gap-1.5">
              <span>💡</span> Jak získávat odměny?
            </h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Vyberte si nabídku</strong> na BONUSLY a klikněte na tlačítko získání bonusu.
              </li>
              <li>
                Díky přihlášení automaticky předáme váš <strong>unikátní měřící kód</strong> partnerovi.
              </li>
              <li>
                Po dokončení registrace nebo objednávky u partnera se odměna objeví v <strong>čekajících</strong>.
              </li>
              <li>
                Jakmile partner objednávku potvrdí, peníze se přesunou do <strong>schválených</strong> a můžete si je vyplatit.
              </li>
            </ol>
          </div>
        </div>

        {/* Right column: Tables */}
        <div className="lg:col-span-2 space-y-8">
          {/* Transactions Table */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-navy flex items-center gap-2">
                <span>📋</span> Historie odměn a transakcí
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {transactions.length} {transactions.length === 1 ? "záznam" : "záznamů"}
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <span className="text-3xl mb-2 block">📭</span>
                <p className="text-sm font-semibold text-navy">Zatím žádné odměny</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Vyberte si zajímavou nabídku nebo produkt a získejte svou první odměnu do peněženky.
                </p>
                <Link
                  href="/nabidky"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-green px-4 py-2 text-xs font-bold text-navy hover:bg-green-light transition-colors"
                >
                  Prozkoumat nabídky
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Datum</th>
                      <th className="px-6 py-3 font-semibold">Zdroj / Nabídka</th>
                      <th className="px-6 py-3 font-semibold text-right">Částka</th>
                      <th className="px-6 py-3 font-semibold text-center">Stav</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-3.5 whitespace-nowrap text-slate-500 text-xs">
                          {new Date(tx.createdAt).toLocaleDateString("cs-CZ", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="font-semibold text-navy">
                            {tx.offer?.name || tx.description || "Affiliate odměna"}
                          </div>
                          {tx.source && (
                            <span className="text-[11px] text-slate-400">
                              Zdroj: {tx.source} {tx.affiliateId ? `(#${tx.affiliateId})` : ""}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-right font-bold text-emerald-600">
                          +{tx.amount.toLocaleString("cs-CZ")} Kč
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-center">
                          <StatusBadge status={tx.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cashouts Table */}
          {cashouts.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-bold text-navy flex items-center gap-2">
                  <span>💸</span> Historie žádostí o výplatu
                </h2>
                <span className="text-xs text-slate-400 font-medium">
                  {cashouts.length} {cashouts.length === 1 ? "žádost" : "žádostí"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Datum žádosti</th>
                      <th className="px-6 py-3 font-semibold">Bankovní účet</th>
                      <th className="px-6 py-3 font-semibold text-right">Částka</th>
                      <th className="px-6 py-3 font-semibold text-center">Stav</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cashouts.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-3.5 whitespace-nowrap text-slate-500 text-xs">
                          {new Date(req.createdAt).toLocaleDateString("cs-CZ", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-3.5 font-mono text-xs text-slate-700">
                          {req.bankAccount}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-right font-bold text-navy">
                          {req.amount.toLocaleString("cs-CZ")} Kč
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-center">
                          <StatusBadge status={req.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
