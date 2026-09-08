import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminLeadyPage() {
  const leads = await prisma.lead.findMany({
    include: { offer: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-navy">Zájemci o bonusy (Leady)</h2>
          <p className="text-sm text-slate-500 mt-1">
            Kontakty z formulářů (např. Tipsport „Přiveď kamaráda“) připravené pro odeslání pozvánek.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/admin/leady/export"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Exportovat do CSV ({leads.length})
          </a>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3 text-2xl">
            📋
          </div>
          <p className="font-semibold text-navy">Zatím žádní zájemci</p>
          <p className="mt-1 text-sm text-slate-400">
            Jakmile návštěvník vyplní formulář u nabídky Tipsport, kontakt se zobrazí zde.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-semibold">Jméno</th>
                  <th className="p-4 font-semibold">E-mail</th>
                  <th className="p-4 font-semibold">Telefon</th>
                  <th className="p-4 font-semibold">Nabídka</th>
                  <th className="p-4 font-semibold">Datum přijetí</th>
                  <th className="p-4 font-semibold">Stav</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium text-navy">{lead.name}</td>
                    <td className="p-4 text-slate-600">
                      <a href={`mailto:${lead.email}`} className="hover:text-green-dark hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="p-4 text-slate-600">{lead.phone || "—"}</td>
                    <td className="p-4">
                      {lead.offer ? (
                        <Link href={`/nabidky/${lead.offer.slug}`} className="text-slate-700 hover:text-green-dark font-medium">
                          {lead.offer.name}
                        </Link>
                      ) : (
                        <span className="text-slate-400">Tipsport</span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleString("cs-CZ")}
                    </td>
                    <td className="p-4">
                      <span className="inline-block rounded-md bg-green/10 text-green-dark px-2 py-0.5 text-xs font-semibold">
                        {lead.status === "NEW" ? "Nový" : lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
