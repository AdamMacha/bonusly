import { prisma } from "@/lib/db";
import { createOffer } from "@/lib/actions/offers";

export default async function NovaOfferPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Nová nabídka</h2>
      <form action={createOffer} className="max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">Název *</label>
            <input id="name" name="name" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-navy mb-1">Slug *</label>
            <input id="slug" name="slug" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-navy mb-1">Krátký popis *</label>
          <input id="shortDescription" name="shortDescription" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-navy mb-1">Popis (HTML) *</label>
          <textarea id="description" name="description" required rows={6} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-navy mb-1">Kategorie *</label>
            <select id="categoryId" name="categoryId" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green">
              <option value="">Vyberte...</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="trackingSlug" className="block text-sm font-medium text-navy mb-1">Tracking slug *</label>
            <input id="trackingSlug" name="trackingSlug" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="referralUrl" className="block text-sm font-medium text-navy mb-1">Referral URL *</label>
          <input id="referralUrl" name="referralUrl" type="url" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bonus" className="block text-sm font-medium text-navy mb-1">Bonus</label>
            <input id="bonus" name="bonus" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-navy mb-1">Logo URL</label>
            <input id="logo" name="logo" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-navy mb-1">Podmínky (každý řádek = 1 položka)</label>
          <textarea id="requirements" name="requirements" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pros" className="block text-sm font-medium text-navy mb-1">Výhody (řádky)</label>
            <textarea id="pros" name="pros" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="cons" className="block text-sm font-medium text-navy mb-1">Nevýhody (řádky)</label>
            <textarea id="cons" name="cons" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" className="rounded" /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" className="rounded" defaultChecked /> Aktivní</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="verified" className="rounded" /> Ověřeno</label>
        </div>
        <button type="submit" className="rounded-lg bg-green px-6 py-2.5 text-sm font-semibold text-navy hover:bg-green-light transition-colors">
          Vytvořit nabídku
        </button>
      </form>
    </div>
  );
}
