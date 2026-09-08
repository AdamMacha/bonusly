import Link from "next/link";
import { prisma } from "@/lib/db";
import { updateOffer, deleteOffer } from "@/lib/actions/offers";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOfferPage({ params }: Props) {
  const { id } = await params;

  // Vyhledáme nabídku podle ID nebo slugu pro maximální kompatibilitu
  const [offer, categories] = await Promise.all([
    prisma.offer.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!offer) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4 text-xl">
          🔍
        </div>
        <h2 className="text-xl font-bold text-navy mb-2">Nabídka nebyla nalezena</h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Tato nabídka již v databázi neexistuje nebo byla data v databázi nově synchronizována.
        </p>
        <Link
          href="/admin/nabidky"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors"
        >
          ← Zpět na seznam nabídek
        </Link>
      </div>
    );
  }

  const updateWithId = updateOffer.bind(null, offer.id);
  const deleteWithId = deleteOffer.bind(null, offer.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/nabidky" className="text-xs text-slate-400 hover:text-navy transition-colors mb-1 inline-block">
            ← Zpět na nabídky
          </Link>
          <h2 className="text-xl font-bold text-navy">Upravit: {offer.name}</h2>
        </div>
        <Link
          href={`/nabidky/${offer.slug}`}
          target="_blank"
          className="text-xs font-semibold text-green-dark hover:text-green inline-flex items-center gap-1"
        >
          Zobrazit na webu ↗
        </Link>
      </div>

      <form action={updateWithId} className="max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">Název *</label>
            <input
              id="name"
              name="name"
              required
              defaultValue={offer.name}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-navy mb-1">Slug *</label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={offer.slug}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-navy mb-1">Krátký popis *</label>
          <input
            id="shortDescription"
            name="shortDescription"
            required
            defaultValue={offer.shortDescription || ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-navy mb-1">Popis (Markdown / HTML) *</label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            defaultValue={offer.description || ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-navy mb-1">Kategorie *</label>
            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={offer.categoryId}
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
            <label htmlFor="trackingSlug" className="block text-sm font-medium text-navy mb-1">Tracking slug *</label>
            <input
              id="trackingSlug"
              name="trackingSlug"
              required
              defaultValue={offer.trackingSlug || offer.slug}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
        </div>

        <div>
          <label htmlFor="referralUrl" className="block text-sm font-medium text-navy mb-1">Referral URL *</label>
          <input
            id="referralUrl"
            name="referralUrl"
            type="url"
            required
            defaultValue={offer.referralUrl || ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bonus" className="block text-sm font-medium text-navy mb-1">Bonus</label>
            <input
              id="bonus"
              name="bonus"
              defaultValue={offer.bonus || ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-navy mb-1">Logo URL</label>
            <input
              id="logo"
              name="logo"
              defaultValue={offer.logo || ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-navy mb-1">Podmínky (každá na nový řádek)</label>
          <textarea
            id="requirements"
            name="requirements"
            rows={3}
            defaultValue={Array.isArray(offer.requirements) ? offer.requirements.join("\n") : ""}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pros" className="block text-sm font-medium text-navy mb-1">Výhody (každá na nový řádek)</label>
            <textarea
              id="pros"
              name="pros"
              rows={3}
              defaultValue={Array.isArray(offer.pros) ? offer.pros.join("\n") : ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
          <div>
            <label htmlFor="cons" className="block text-sm font-medium text-navy mb-1">Nevýhody (každá na nový řádek)</label>
            <textarea
              id="cons"
              name="cons"
              rows={3}
              defaultValue={Array.isArray(offer.cons) ? offer.cons.join("\n") : ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" name="featured" className="rounded text-green" defaultChecked={offer.featured} />
            <span className="text-navy font-medium">Doporučeno (Featured)</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" name="active" className="rounded text-green" defaultChecked={offer.active} />
            <span className="text-navy font-medium">Aktivní</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" name="verified" className="rounded text-green" defaultChecked={offer.verified} />
            <span className="text-navy font-medium">Ověřeno redakcí</span>
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
            href="/admin/nabidky"
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Zrušit
          </Link>
        </div>
      </form>

      <form action={deleteWithId} className="mt-6 max-w-2xl">
        <button
          type="submit"
          className="rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          onClick={(e) => {
            if (!confirm(`Opravdu chcete smazat nabídku ${offer.name}?`)) e.preventDefault();
          }}
        >
          Smazat nabídku
        </button>
      </form>
    </div>
  );
}
