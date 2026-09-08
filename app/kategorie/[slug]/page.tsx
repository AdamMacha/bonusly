import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { OfferGrid } from "@/components/offer-grid";
import { ArticleGrid } from "@/components/article-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};
  return {
    title: category.seoTitle || category.name,
    description: category.seoDescription || `Procházejte nabídky v kategorii ${category.name} na BONUSLY.`,
  };
}

export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({ select: { slug: true } });
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      offers: {
        where: { active: true },
        include: { category: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!category) notFound();

  const articles = await prisma.article.findMany({
    where: { categoryId: category.id, draft: false },
    include: { category: true, author: true },
    take: 6,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.description || `Nabídky v kategorii ${category.name}`,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/kategorie/${category.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: process.env.NEXT_PUBLIC_BASE_URL },
            { "@type": "ListItem", position: 2, name: "Kategorie", item: `${process.env.NEXT_PUBLIC_BASE_URL}/kategorie` },
            { "@type": "ListItem", position: 3, name: category.name, item: `${process.env.NEXT_PUBLIC_BASE_URL}/kategorie/${category.slug}` },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Kategorie", href: "/kategorie" }, { label: category.name }]} />

      <h1 className="text-3xl font-bold text-navy tracking-tight">{category.name}</h1>
      {category.description && (
        <p className="mt-2 text-slate-500 max-w-2xl">{category.description}</p>
      )}

      <div className="mt-10">
        <OfferGrid
          offers={category.offers}
          title={`Nabídky v kategorii ${category.name}`}
          description={`${category.offers.length} ${category.offers.length === 1 ? "nabídka" : "nabídek"} k dispozici.`}
        />
      </div>

      {articles.length > 0 && (
        <div className="mt-16 border-t border-slate-100 pt-12">
          <ArticleGrid articles={articles} title="Související články" />
        </div>
      )}
    </div>
  );
}
