import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getDefaultCashbackSharePct } from "@/lib/cashback";
import { SyncEhubButton } from "./sync-ehub-button";
import { TransactionStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Provize & Cashback evidence",
};

export default async function AdminProvizePage() {
  await requireAdminAuth();

  const defaultSharePct = getDefaultCashbackSharePct();
  const apiConfigured = Boolean(process.env.EHUB_API_KEY?.trim());

  const [offers, transactions, syncLogs] = await Promise.all([
    prisma.offer.findMany({
      include: {
        category: { select: { name: true } },
        _count: { select: { clicks: true, transactions: true } },
      },
      orderBy: [{ cashbackAllowed: "desc" }, { featured: "desc" }, { name: "asc" }],
    }),
    prisma.transaction.findMany({
      include: {
        user: { select: { email: true } },
        offer: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.ehubSyncLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const approvedTxs = transactions.filter((t) => t.status === TransactionStatus.APPROVED);
  const pendingTxs = transactions.filter((t) => t.status === TransactionStatus.PENDING);

  const sumGross = (list: typeof transactions) =>
    list.reduce((acc, t) => acc + (t.grossCommission ?? t.amount), 0);
  const sumUser = (list: typeof transactions) =>
    list.reduce((acc, t) => acc + t.amount, 0);
  const sumProfit = (list: typeof transactions) =>
    list.reduce((acc, t) => acc + (t.platformProfit ?? Math.max(0, (t.grossCommission ?? t.amount) - t.amount)), 0);

  const grossApproved = sumGross(approvedTxs);
  const grossPending = sumGross(pendingTxs);
  const userApproved = sumUser(approvedTxs);
  const userPending = sumUser(pendingTxs);
  const profitApproved = sumProfit(approvedTxs);
  const profitPending = sumProfit(pendingTxs);

  // Agregace provizí po jednotlivých nabídkách
  const txByOffer = new Map<
    string,
    { gross: number; user: number; profit: number; count: number }
  >();
  for (const t of transactions) {
    if (!t.offerId || t.status === TransactionStatus.REJECTED) continue;
    const prev = txByOffer.get(t.offerId) || { gross: 0, user: 0, profit: 0, count: 0 };
    const gross = t.grossCommission ?? t.amount;
    const profit = t.platformProfit ?? Math.max(0, gross - t.amount);
    txByOffer.set(t.offerId, {
      gross: prev.gross + gross,
      user: prev.user + t.amount,
      profit: prev.profit + profit,
      count: prev.count + 1,
    });
  }

  const cashbackEnabledCount = offers.filter((o) => o.cashbackAllowed).length;
  const cashbackDisabledCount = offers.length - cashbackEnabledCount;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy">Provize partnerů & Cashback marže</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Evidence hrubých provizí z eHUBu, automatického rozdělení ({defaultSharePct} % uživatel / {100 - defaultSharePct} % BONUSLY) a trackování přes <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">data1=userId</code> &amp; <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">data2=clickId</code>.
          </p>
        </div>
        <SyncEhubButton configured={apiConfigured} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Hrubé provize od partnerů
          </p>
          <p className="mt-2 text-2xl font-black text-navy">
            {grossApproved.toLocaleString("cs-CZ")} Kč
          </p>
          <p className="mt-1 text-xs text-amber-600 font-medium">
            + {grossPending.toLocaleString("cs-CZ")} Kč čeká na schválení
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Cashback pro uživatele
          </p>
          <p className="mt-2 text-2xl font-black text-emerald-600">
            {userApproved.toLocaleString("cs-CZ")} Kč
          </p>
          <p className="mt-1 text-xs text-slate-500">
            + {userPending.toLocaleString("cs-CZ")} Kč čekající v peněženkách
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Čistý zisk BONUSLY
          </p>
          <p className="mt-2 text-2xl font-black text-navy">
            {profitApproved.toLocaleString("cs-CZ")} Kč
          </p>
          <p className="mt-1 text-xs text-emerald-700 font-medium">
            + {profitPending.toLocaleString("cs-CZ")} Kč z čekajících
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Aktivní cashback režim
          </p>
          <p className="mt-2 text-2xl font-black text-navy">
            {defaultSharePct} % / {100 - defaultSharePct} %
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {cashbackEnabledCount} povoleno · {cashbackDisabledCount} bez cashbacku
          </p>
        </div>
      </div>

      {/* Partner Commission Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-navy">Evidence provizí podle partnerů ({offers.length})</h3>
            <p className="text-xs text-slate-500">
              Přehled provizních podmínek, stavu povolení cashbacku a zobrazované sazby pro uživatele.
            </p>
          </div>
          <Link
            href="/admin/uzivatele"
            className="text-xs font-semibold text-green-dark hover:text-green"
          >
            CSV import &amp; manuální transakce →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Partner</th>
                <th className="px-4 py-3 font-semibold">eHUB ID</th>
                <th className="px-4 py-3 font-semibold">Naše provize</th>
                <th className="px-4 py-3 font-semibold text-center">Cashback</th>
                <th className="px-4 py-3 font-semibold">Podíl / Štítek pro uživatele</th>
                <th className="px-4 py-3 font-semibold text-right">Kliky</th>
                <th className="px-4 py-3 font-semibold text-right">Hrubá provize</th>
                <th className="px-4 py-3 font-semibold text-right">Zisk BONUSLY</th>
                <th className="px-4 py-3 font-semibold text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offers.map((offer) => {
                const agg = txByOffer.get(offer.id);
                const effShare = offer.cashbackSharePct ?? defaultSharePct;
                return (
                  <tr key={offer.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-navy">{offer.name}</div>
                      <div className="text-[11px] text-slate-400">{offer.category.name}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500">
                      {offer.ehubCampaignId || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">
                      {offer.partnerCommissionRate || "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {offer.cashbackAllowed ? (
                        <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          Povolen
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                          Vypnut
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {offer.cashbackAllowed ? (
                        <div>
                          <span className="font-semibold text-emerald-700">
                            {offer.userCashbackLabel || `${effShare} % z provize`}
                          </span>
                          <span className="ml-1.5 text-[11px] text-slate-400">
                            ({effShare} %)
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {offer._count.clicks}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-navy">
                      {agg ? `${agg.gross.toLocaleString("cs-CZ")} Kč` : "0 Kč"}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-700">
                      {agg ? `${agg.profit.toLocaleString("cs-CZ")} Kč` : "0 Kč"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/nabidky/${offer.id}`}
                        className="font-semibold text-navy hover:text-green-dark"
                      >
                        Upravit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions Ledger */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-navy">Poslední transakce &amp; rozpočet provizí</h3>
          <span className="text-xs text-slate-400">{transactions.length} záznamů</span>
        </div>
        {transactions.length === 0 ? (
          <div className="px-6 py-10 text-center text-xs text-slate-400">
            Zatím nejsou evidovány žádné transakce. Jakmile přihlášení uživatelé nakoupí přes eHUB odkazy, Cron je automaticky stáhne.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Datum</th>
                  <th className="px-4 py-3 font-semibold">Uživatel</th>
                  <th className="px-4 py-3 font-semibold">Partner / ID</th>
                  <th className="px-4 py-3 font-semibold text-right">Objednávka</th>
                  <th className="px-4 py-3 font-semibold text-right">Naše provize</th>
                  <th className="px-4 py-3 font-semibold text-right">Uživatel</th>
                  <th className="px-4 py-3 font-semibold text-right">Zisk BONUSLY</th>
                  <th className="px-4 py-3 font-semibold text-center">Stav</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((t) => {
                  const gross = t.grossCommission ?? t.amount;
                  const profit = t.platformProfit ?? Math.max(0, gross - t.amount);
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {new Date(t.createdAt).toLocaleDateString("cs-CZ")}
                      </td>
                      <td className="px-4 py-3 font-medium text-navy">{t.user.email}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-navy">
                          {t.offer?.name || t.description || "Transakce"}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {t.source} {t.affiliateId ? `#${t.affiliateId}` : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {t.orderAmount ? `${t.orderAmount.toLocaleString("cs-CZ")} Kč` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-navy">
                        {gross.toLocaleString("cs-CZ")} Kč
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">
                        {t.amount.toLocaleString("cs-CZ")} Kč
                        {t.cashbackSharePct ? (
                          <span className="ml-1 text-[10px] text-slate-400">
                            ({t.cashbackSharePct} %)
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-700">
                        {profit.toLocaleString("cs-CZ")} Kč
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            t.status === TransactionStatus.APPROVED
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : t.status === TransactionStatus.REJECTED
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sync Logs */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-navy">Historie synchronizací eHUB API v3</h3>
          <span className="text-xs text-slate-400">Automatický Cron (denně) + volitelný 30min externí cron</span>
        </div>
        {syncLogs.length === 0 ? (
          <div className="px-6 py-8 text-center text-xs text-slate-400">
            Zatím neproběhla žádná synchronizace přes eHUB API.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {syncLogs.map((log) => (
              <div
                key={log.id}
                className="px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      log.status === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {log.trigger} · {log.status}
                  </span>
                  <span className="text-slate-700">{log.message || "—"}</span>
                </div>
                <span className="text-slate-400 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString("cs-CZ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
