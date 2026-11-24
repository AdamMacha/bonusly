import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { CategoryGrid } from "@/components/category-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

const canonical = buildCanonical("/kategorie");

export const metadata: Metadata = {
  title: "Kategorie nabídek, bonusů a slev",
  description:
    "Procházejte ověřené nabídky podle kategorií — extra příjem, banky a účty, investice, energie a pojištění, Apple a elektro, dům a zahrada i slevové kódy.",
  alternates: { canonical },
};

export default async function KategoriePage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { offers: { where: { active: true } } } } },
    orderBy: { order: "asc" },
  });

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Kategorie nabídek na BONUSLY",
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: categories.length,
            itemListElement: categories.map((c, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: c.name,
              url: `${baseUrl}/kategorie/${c.slug}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Kategorie", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Kategorie" }]} />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-2">
        Kategorie nabídek
      </h1>
      <p className="text-slate-500 mb-10 max-w-2xl">
        Vyberte oblast, ve které chcete ušetřit nebo získat bonus — všechny nabídky pravidelně ověřujeme.
      </p>
      <CategoryGrid categories={categories} />
    </div>
  );
}
