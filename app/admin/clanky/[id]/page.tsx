import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateArticle, deleteArticle } from "@/lib/actions/articles";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const [article, categories, authors] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.author.findMany(),
  ]);

  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, id);
  const deleteWithId = deleteArticle.bind(null, id);

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Upravit: {article.title}</h2>
      <form action={updateWithId} className="max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-navy mb-1">Název *</label>
            <input id="title" name="title" required defaultValue={article.title} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-navy mb-1">Slug *</label>
            <input id="slug" name="slug" required defaultValue={article.slug} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-navy mb-1">Výtah *</label>
          <textarea id="excerpt" name="excerpt" required rows={2} defaultValue={article.excerpt} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-navy mb-1">Obsah (HTML) *</label>
          <textarea id="content" name="content" required rows={12} defaultValue={article.content} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green font-mono text-xs" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-navy mb-1">Kategorie *</label>
            <select id="categoryId" name="categoryId" required defaultValue={article.categoryId} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="authorId" className="block text-sm font-medium text-navy mb-1">Autor *</label>
            <select id="authorId" name="authorId" required defaultValue={article.authorId} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green">
              {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-navy mb-1">Klíčová slova (čárkou)</label>
          <input id="keywords" name="keywords" defaultValue={article.keywords.join(", ")} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" className="rounded" defaultChecked={article.featured} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="draft" value="off" className="rounded" defaultChecked={!article.draft} /> Publikovat</label>
        </div>
        <button type="submit" className="rounded-lg bg-green px-6 py-2.5 text-sm font-semibold text-navy hover:bg-green-light transition-colors">
          Uložit změny
        </button>
      </form>
      <form action={deleteWithId} className="mt-6">
        <button type="submit" className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
          Smazat článek
        </button>
      </form>
    </div>
  );
}
