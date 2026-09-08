import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateOffer, deleteOffer } from "@/lib/actions/offers";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOfferPage({ params }: Props) {
  const { id } = await params;
  const [offer, categories] = await Promise.all([
    prisma.offer.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!offer) notFound();

  const updateWithId = updateOffer.bind(null, id);
  const deleteWithId = deleteOffer.bind(null, id);

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Upravit: {offer.name}</h2>
      <form action={updateWithId} className="max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">Název *</label>
            <input id="name" name="name" required defaultValue={offer.name} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-navy mb-1">Slug *</label>
            <input id="slug" name="slug" required defaultValue={offer.slug} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-navy mb-1">Krátký popis *</label>
          <input id="shortDescription" name="shortDescription" required defaultValue={offer.shortDescription} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-navy mb-1">Popis (HTML) *</label>
          <textarea id="description" name="description" required rows={6} defaultValue={offer.description} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-navy mb-1">Kategorie *</label>
            <select id="categoryId" name="categoryId" required defaultValue={offer.categoryId} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="trackingSlug" className="block text-sm font-medium text-navy mb-1">Tracking slug *</label>
            <input id="trackingSlug" name="trackingSlug" required defaultValue={offer.trackingSlug} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="referralUrl" className="block text-sm font-medium text-navy mb-1">Referral URL *</label>
          <input id="referralUrl" name="referralUrl" type="url" required defaultValue={offer.referralUrl} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bonus" className="block text-sm font-medium text-navy mb-1">Bonus</label>
            <input id="bonus" name="bonus" defaultValue={offer.bonus || ""} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-navy mb-1">Logo URL</label>
            <input id="logo" name="logo" defaultValue={offer.logo || ""} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-navy mb-1">Podmínky (řádky)</label>
          <textarea id="requirements" name="requirements" rows={3} defaultValue={offer.requirements.join("\n")} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pros" className="block text-sm font-medium text-navy mb-1">Výhody (řádky)</label>
            <textarea id="pros" name="pros" rows={3} defaultValue={offer.pros.join("\n")} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
          <div>
            <label htmlFor="cons" className="block text-sm font-medium text-navy mb-1">Nevýhody (řádky)</label>
            <textarea id="cons" name="cons" rows={3} defaultValue={offer.cons.join("\n")} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green" />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" className="rounded" defaultChecked={offer.featured} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" className="rounded" defaultChecked={offer.active} /> Aktivní</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="verified" className="rounded" defaultChecked={offer.verified} /> Ověřeno</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="rounded-lg bg-green px-6 py-2.5 text-sm font-semibold text-navy hover:bg-green-light transition-colors">
            Uložit změny
          </button>
        </div>
      </form>
      <form action={deleteWithId} className="mt-6">
        <button type="submit" className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={(e) => { if (!confirm("Opravdu smazat?")) e.preventDefault(); }}>
          Smazat nabídku
        </button>
      </form>
    </div>
  );
}
