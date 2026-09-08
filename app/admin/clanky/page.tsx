import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminClankyPage() {
  const articles = await prisma.article.findMany({
    include: { category: true, author: true, offer: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Články</h2>
        <Link href="/admin/clanky/novy" className="rounded-lg bg-green px-4 py-2 text-sm font-medium text-navy hover:bg-green-light transition-colors">
          + Nový článek
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Název</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Kategorie</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Propojená nabídka (CTA)</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Datum publikace</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Autor</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy">{article.title}</div>
                    <div className="text-xs text-slate-400">{article.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{article.category.name}</td>
                  <td className="px-4 py-3">
                    {article.offer ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                        <span>🎯</span> {article.offer.name}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Dle kategorie</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {article.draft ? (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">Draft</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green-dark">Publikováno</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("cs-CZ") : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{article.author.name}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/clanky/${article.id}`} className="text-sm text-green-dark hover:text-green transition-colors">
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
