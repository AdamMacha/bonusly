import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { CategoryGrid } from "@/components/category-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Kategorie",
  description: "Procházejte nabídky podle kategorií — přivýdělek, finance, banky a bonusy.",
};

export default async function KategoriePage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { offers: { where: { active: true } } } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Kategorie" }]} />
      <h1 className="text-3xl font-bold text-navy tracking-tight mb-2">Kategorie</h1>
      <p className="text-slate-500 mb-10">Vyberte kategorii a procházejte relevantní nabídky.</p>
      <CategoryGrid categories={categories} />
    </div>
  );
}
