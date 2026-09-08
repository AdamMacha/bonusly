import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { AdminCarouselToggle } from "@/components/admin-carousel-toggle";

export default async function AdminClankyPage() {
  const articles = await prisma.article.findMany({
    include: { category: true, author: true, offer: true },
    orderBy: { publishedAt: "desc" },
  });

  const carouselArticles = articles.filter((a) => a.featured);

  return (
    <div className="space-y-8">
      {/* Hero Carousel Management Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎡</span>
              <h3 className="text-lg font-bold text-navy">Karty v 3D Hero Carouselu na hlavní stránce</h3>
              <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                {carouselArticles.length} {carouselArticles.length === 1 ? "karta" : carouselArticles.length < 5 ? "karty" : "karet"} aktivních
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Tyto články se právě teď rotují v úvodním 3D carouselu na homepage. Doporučujeme vybrat 3 až 6 článků pro nejlepší prostorový efekt.
            </p>
          </div>
          <Link
            href="/#hero"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-dark hover:text-green self-start sm:self-center"
          >
            Zobrazit na webu ↗
          </Link>
        </div>

        {carouselArticles.length === 0 ? (
          <div className="py-8 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200 mt-5">
            <span className="text-2xl mb-1 block">📌</span>
            <p className="text-sm font-medium text-navy">V carouselu zatím nemáte explicitně vybraný žádný článek</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Web nyní v carouselu automaticky zobrazuje nejnovější publikované články. Klikněte níže v tabulce na <strong>+ Do carouselu</strong> pro zařazení konkrétních článků.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {carouselArticles.map((article, index) => (
              <div
                key={article.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                  {article.featuredImage ? (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">
                      #{index + 1}
                    </div>
                  )}
                  <span className="absolute top-1 left-1 bg-navy/80 backdrop-blur-xs text-white text-[10px] font-bold w-4 h-4 rounded flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {article.category.name}
                    </span>
                    {article.draft && (
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-navy truncate leading-snug" title={article.title}>
                    {article.title}
                  </h4>
                  {article.offer && (
                    <p className="text-[11px] text-emerald-600 truncate mt-0.5 font-medium">
                      🎯 {article.offer.bonus || article.offer.name}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <AdminCarouselToggle articleId={article.id} isFeatured={true} size="sm" />
                    <Link
                      href={`/admin/clanky/${article.id}`}
                      className="text-[11px] text-slate-500 hover:text-navy underline"
                    >
                      Upravit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Articles Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-navy">Všechny články</h2>
            <p className="text-xs text-slate-500 mt-0.5">Kompletní přehled publikovaných článků a konceptů</p>
          </div>
          <Link
            href="/admin/clanky/novy"
            className="rounded-lg bg-green px-4 py-2 text-sm font-medium text-navy hover:bg-green-light transition-colors"
          >
            + Nový článek
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Název</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Hero Carousel</th>
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
                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-medium text-navy truncate" title={article.title}>
                        {article.title}
                      </div>
                      <div className="text-xs text-slate-400">{article.slug}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <AdminCarouselToggle articleId={article.id} isFeatured={article.featured} />
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{article.category.name}</td>
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
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                          Draft
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green-dark">
                          Publikováno
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("cs-CZ") : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{article.author.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/admin/clanky/${article.id}`}
                        className="text-sm font-medium text-green-dark hover:text-green transition-colors"
                      >
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
    </div>
  );
}
