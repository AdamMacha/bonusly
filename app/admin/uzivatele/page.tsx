import type { Metadata } from "next";
import { requireAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ManualTransactionForm } from "./manual-transaction-form";

export const metadata: Metadata = {
  title: "Správa uživatelů a peněženek",
};

export default async function AdminUzivatelePage() {
  await requireAdminAuth();

  const [users, offers, userCount, totalBalanceAgg] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { transactions: true, cashouts: true, clicks: true },
        },
      },
    }),
    prisma.offer.findMany({
      where: { active: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.user.count(),
    prisma.user.aggregate({
      _sum: { balance: true },
    }),
  ]);

  const totalBalance = totalBalanceAgg._sum.balance || 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-navy">Uživatelé a peněženka</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Přehled všech registrovaných uživatelů, jejich zůstatků a manuální připisování odměn.
          </p>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-1">👥</div>
          <p className="text-2xl font-bold text-navy">{userCount}</p>
          <p className="text-xs text-slate-500">Registrovaných uživatelů</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-1">💰</div>
          <p className="text-2xl font-bold text-navy">
            {totalBalance.toLocaleString("cs-CZ")} Kč
          </p>
          <p className="text-xs text-slate-500">Celkový schválený zůstatek v peněženkách</p>
        </div>
      </div>

      {/* Manual transaction form */}
      <ManualTransactionForm
        users={users.map((u) => ({ id: u.id, email: u.email, name: u.name }))}
        offers={offers}
      />

      {/* Users table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-navy">Seznam uživatelů</h3>
          <span className="text-xs text-slate-400 font-medium">{users.length} uživatelů</span>
        </div>

        {users.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-400">
            Zatím nejsou registrováni žádní uživatelé.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Uživatel</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold text-right">Zůstatek</th>
                  <th className="px-6 py-3 font-semibold">Bankovní účet</th>
                  <th className="px-6 py-3 font-semibold text-center">Transakce</th>
                  <th className="px-6 py-3 font-semibold">Registrace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-navy">{u.email}</div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: {u.id}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${
                          u.role === "ADMIN"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-bold text-emerald-600">
                      {u.balance.toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-600">
                      {u.bankAccount || "—"}
                    </td>
                    <td className="px-6 py-3.5 text-center text-slate-500">
                      {u._count.transactions} transakcí
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString("cs-CZ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
