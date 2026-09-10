import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { OfferGrid } from "@/components/offer-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Všechny nabídky",
  description: "Procházejte ověřené nabídky, extra příjem, finanční produkty a bonusy na jednom místě.",
};

export default async function NabidkyPage() {
  const offers = await prisma.offer.findMany({
    where: { active: true },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Všechny nabídky",
          description: "Procházejte ověřené nabídky na BONUSLY.",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/nabidky`,
        }}
      />
      <Breadcrumbs items={[{ label: "Nabídky" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy tracking-tight">Všechny nabídky</h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Procházejte ověřené nabídky, extra příjem, finanční produkty a bonusy.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 hover:border-green/30 hover:text-green-dark transition-colors"
          >
            {cat.name}
          </a>
        ))}
      </div>

      <OfferGrid offers={offers} />
    </div>
  );
}
