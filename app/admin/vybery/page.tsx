import type { Metadata } from "next";
import { requireAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CashoutActions } from "./cashout-actions";
import { CashoutStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Správa žádostí o výběr",
};

export default async function AdminVyberyPage() {
  await requireAdminAuth();

  const [cashouts, pendingAgg, approvedAgg] = await Promise.all([
    prisma.cashoutRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    }),
    prisma.cashoutRequest.aggregate({
      where: { status: CashoutStatus.PENDING },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.cashoutRequest.aggregate({
      where: { status: CashoutStatus.APPROVED },
      _sum: { amount: true },
      _count: true,
    }),
  ]);

  const pendingAmount = pendingAgg._sum.amount || 0;
  const pendingCount = pendingAgg._count;
  const approvedAmount = approvedAgg._sum.amount || 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-navy">Žádosti o výběr odměn</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Schvalování a správa výplat z peněženek uživatelů na bankovní účty.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="text-2xl mb-1">⏳</div>
          <p className="text-2xl font-bold text-navy">
            {pendingAmount.toLocaleString("cs-CZ")} Kč
          </p>
          <p className="text-xs text-amber-800 font-semibold">
            {pendingCount} {pendingCount === 1 ? "žádost čeká" : pendingCount < 5 ? "žádosti čekají" : "žádostí čeká"} na zpracování
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-1">✅</div>
          <p className="text-2xl font-bold text-navy">
            {approvedAmount.toLocaleString("cs-CZ")} Kč
          </p>
          <p className="text-xs text-slate-500">Úspěšně vyplaceno celkem</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-1">📋</div>
          <p className="text-2xl font-bold text-navy">{cashouts.length}</p>
          <p className="text-xs text-slate-500">Všech podaných žádostí</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-navy">Seznam všech žádostí</h3>
          <span className="text-xs text-slate-400 font-medium">{cashouts.length} záznamů</span>
        </div>

        {cashouts.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-400">
            Zatím nebyly podány žádné žádosti o výběr.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Datum</th>
                  <th className="px-6 py-3 font-semibold">Uživatel</th>
                  <th className="px-6 py-3 font-semibold">Bankovní účet</th>
                  <th className="px-6 py-3 font-semibold text-right">Částka</th>
                  <th className="px-6 py-3 font-semibold text-center">Stav</th>
                  <th className="px-6 py-3 font-semibold text-right">Akce</th>
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
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-navy">{req.user.email}</div>
                      {req.user.name && (
                        <div className="text-[11px] text-slate-400">{req.user.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs text-navy font-semibold">
                      {req.bankAccount}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-right font-black text-navy text-sm">
                      {req.amount.toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-center">
                      {req.status === "APPROVED" && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          Vyplaceno
                        </span>
                      )}
                      {req.status === "PENDING" && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-700 animate-pulse">
                          Čeká na vyplacení
                        </span>
                      )}
                      {req.status === "REJECTED" && (
                        <div>
                          <span className="inline-flex items-center rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[11px] font-bold text-red-700">
                            Zamítnuto
                          </span>
                          {req.note && (
                            <div className="text-[10px] text-slate-400 mt-0.5 max-w-xs truncate" title={req.note}>
                              {req.note}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-right">
                      {req.status === "PENDING" ? (
                        <CashoutActions cashoutId={req.id} amount={req.amount} />
                      ) : (
                        <span className="text-xs text-slate-400">
                          {req.processedAt
                            ? `Zpracováno ${new Date(req.processedAt).toLocaleDateString("cs-CZ")}`
                            : "—"}
                        </span>
                      )}
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
