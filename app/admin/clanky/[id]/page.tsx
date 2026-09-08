import Link from "next/link";
import { prisma } from "@/lib/db";
import { updateArticle, deleteArticle } from "@/lib/actions/articles";
import { AdminDeleteButton } from "@/components/admin-delete-button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;

  // Vyhledáme článek podle ID nebo slugu pro maximální kompatibilitu
  const [article, categories, authors, offers] = await Promise.all([
    prisma.article.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.author.findMany(),
    prisma.offer.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
  ]);

  if (!article) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4 text-xl">
          🔍
        </div>
        <h2 className="text-xl font-bold text-navy mb-2">Článek nebyl nalezen</h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Tento článek již v databázi neexistuje nebo byla data v databázi nově synchronizována.
        </p>
        <Link
          href="/admin/clanky"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors"
        >
          ← Zpět na seznam článků
        </Link>
      </div>
    );
  }

  const updateWithId = updateArticle.bind(null, article.id);
  const deleteWithId = deleteArticle.bind(null, article.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/clanky" className="text-xs text-slate-400 hover:text-navy transition-colors mb-1 inline-block">
            ← Zpět na články
          </Link>
          <h2 className="text-xl font-bold text-navy">Upravit: {article.title}</h2>
        </div>
        <Link
          href={`/blog/${article.slug}`}
          target="_blank"
          className="text-xs font-semibold text-green-dark hover:text-green inline-flex items-center gap-1"
        >
          Zobrazit na webu ↗
        </Link>
      </div>

      <form action={updateWithId} className="max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-navy mb-1">Název *</label>
            <input
              id="title"
              name="title"
              required
              defaultValue={article.title}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-navy mb-1">Slug *</label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={article.slug}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-navy mb-1">Výňatek (perex) *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            defaultValue={article.excerpt}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
          />
        </div>

        <div>
          <label htmlFor="featuredImage" className="block text-sm font-medium text-navy mb-1">URL náhledového obrázku</label>
          <input
            id="featuredImage"
            name="featuredImage"
            defaultValue={article.featuredImage || ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-navy mb-1">Obsah (Markdown / HTML) *</label>
          <textarea
            id="content"
            name="content"
            required
            rows={14}
            defaultValue={article.content}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-navy mb-1">Kategorie *</label>
            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={article.categoryId}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="authorId" className="block text-sm font-medium text-navy mb-1">Autor *</label>
            <select
              id="authorId"
              name="authorId"
              required
              defaultValue={article.authorId}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            >
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium text-navy mb-1">Datum publikace</label>
            <input
              type="date"
              id="publishedAt"
              name="publishedAt"
              defaultValue={article.publishedAt ? new Date(article.publishedAt).toISOString().split("T")[0] : ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
        </div>

        <div>
          <label htmlFor="offerId" className="block text-sm font-medium text-navy mb-1">
            Propojená nabídka (pro referral tlačítko a konverze)
          </label>
          <select
            id="offerId"
            name="offerId"
            defaultValue={article.offerId || ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green bg-white"
          >
            <option value="">— Žádná (automaticky vybrat nejlepší nabídku z kategorie) —</option>
            {offers.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} {o.bonus ? `— [${o.bonus}]` : ""}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">
            Vybraná nabídka se v článku zobrazí jako zvýrazněný konverzní box, spodní souhrn a plovoucí lišta s tlačítkem na sledovací odkaz /go/{article.offerId ? offers.find(o => o.id === article.offerId)?.trackingSlug : "..."}.
          </p>
        </div>

        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-navy mb-1">Klíčová slova (oddělená čárkou)</label>
          <input
            id="keywords"
            name="keywords"
            defaultValue={Array.isArray(article.keywords) ? article.keywords.join(", ") : ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                className="mt-1 h-4 w-4 rounded text-green focus:ring-green border-slate-300"
                defaultChecked={article.featured}
              />
              <div>
                <span className="text-sm font-semibold text-navy flex items-center gap-1.5">
                  🎡 Zobrazit v 3D Hero Carouselu na hlavní stránce
                </span>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Zařadí kartu článku do rotujícího 3D carouselu v úvodní sekci homepage (s odznakem Top tip a přímým proklikem).
                </p>
              </div>
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer px-1">
            <input type="checkbox" name="draft" value="off" className="rounded text-green" defaultChecked={!article.draft} />
            <span className="text-navy font-medium">Publikováno (odškrtnout pro koncept)</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="rounded-xl bg-green px-6 py-2.5 text-sm font-semibold text-navy hover:bg-green-light transition-colors"
          >
            Uložit změny
          </button>
          <Link
            href="/admin/clanky"
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Zrušit
          </Link>
        </div>
      </form>

      <form action={deleteWithId} className="mt-6 max-w-2xl">
        <AdminDeleteButton
          label="Smazat článek"
          confirmMessage={`Opravdu chcete smazat článek ${article.title}?`}
        />
      </form>
    </div>
  );
}
