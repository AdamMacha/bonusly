import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminNabidkyPage() {
  const offers = await prisma.offer.findMany({
    include: { category: true, _count: { select: { clicks: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Nabídky</h2>
        <Link
          href="/admin/nabidky/nova"
          className="rounded-lg bg-green px-4 py-2 text-sm font-medium text-navy hover:bg-green-light transition-colors"
        >
          + Nová nabídka
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Název</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Kategorie</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Kliknutí</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy">{offer.name}</div>
                    <div className="text-xs text-slate-400">{offer.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{offer.category.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {offer.active ? (
                        <span className="inline-flex items-center rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green-dark">Aktivní</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">Neaktivní</span>
                      )}
                      {offer.featured && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{offer._count.clicks}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/nabidky/${offer.id}`} className="text-sm text-green-dark hover:text-green transition-colors">
                      Upravit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
