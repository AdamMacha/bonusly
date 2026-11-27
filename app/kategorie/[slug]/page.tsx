import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { OfferCatalogClient } from "@/components/offer-catalog-client";
import { ArticleGrid } from "@/components/article-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CopyCodeButton } from "@/components/copy-code-button";
import { CtaButton } from "@/components/cta-button";
import { buildCanonical, cleanSeoTitle, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

const getCategoryBySlug = cache(async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      offers: {
        where: { active: true },
        include: {
          category: true,
          promos: { where: { active: true }, orderBy: { order: "asc" } },
        },
        orderBy: [{ priority: "desc" }, { featured: "desc" }, { rating: "desc" }, { createdAt: "desc" }],
      },
    },
  });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const title = cleanSeoTitle(category.seoTitle || category.name);
  const description =
    category.seoDescription || `Procházejte ověřené nabídky a bonusy v kategorii ${category.name} na BONUSLY.`;
  const canonical = buildCanonical(`/kategorie/${category.slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | BONUSLY`,
      description,
      locale: "cs_CZ",
      siteName: "BONUSLY",
      images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630, alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BONUSLY`,
      description,
      images: [`${canonical}/opengraph-image`],
    },
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
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const [articles, otherCategories] = await Promise.all([
    prisma.article.findMany({
      where: { categoryId: category.id, draft: false },
      include: { category: true, author: true },
      take: 6,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.category.findMany({
      where: { slug: { not: category.slug } },
      orderBy: { order: "asc" },
      select: { slug: true, name: true, icon: true },
    }),
  ]);

  const baseUrl = getBaseUrl();
  const pageUrl = buildCanonical(`/kategorie/${category.slug}`);
  const categoryPromos = category.offers.flatMap((o) =>
    o.promos.map((p) => ({ ...p, offerName: o.name, offerSlug: o.slug }))
  );

  const countLabel =
    category.offers.length === 1
      ? "ověřená nabídka"
      : category.offers.length < 5
        ? "ověřené nabídky"
        : "ověřených nabídek";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seoDescription || category.description || `Nabídky v kategorii ${category.name}`,
          url: pageUrl,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: category.offers.length,
            itemListElement: category.offers.map((o, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: o.name,
              url: `${baseUrl}/nabidky/${o.slug}`,
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
            { "@type": "ListItem", position: 2, name: "Kategorie", item: `${baseUrl}/kategorie` },
            { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Kategorie", href: "/kategorie" }, { label: category.name }]} />

      <header className="max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          {category.icon && (
            <span aria-hidden="true" className="text-3xl">
              {category.icon}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            {category.name}
          </h1>
        </div>
        {category.description && (
          <p className="mt-2 text-base sm:text-lg text-slate-600 leading-relaxed">
            {category.description}
          </p>
        )}
      </header>

      {/* Active promos & codes in this category */}
      {categoryPromos.length > 0 && (
        <section className="mt-8 rounded-2xl border border-green/25 bg-green/5 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-navy flex items-center gap-2">
              <span aria-hidden="true">🔥</span> Aktuální promo akce a kódy v sekci {category.name}
            </h2>
            <Link href="/akce-a-kupony" className="text-xs font-semibold text-green-dark hover:text-green">
              Všechny kupóny →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryPromos.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/nabidky/${p.offerSlug}`}
                      className="text-xs font-bold text-slate-500 hover:text-navy"
                    >
                      {p.offerName}
                    </Link>
                    {p.badge && (
                      <span className="rounded-full bg-green/15 px-2 py-0.5 text-[11px] font-bold text-green-dark">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-navy line-clamp-1">{p.title}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {p.code && <CopyCodeButton code={p.code} size="sm" />}
                  <CtaButton href={`/go/promo/${p.trackingSlug}`} size="sm">
                    Aktivovat
                  </CtaButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy tracking-tight">
            Nabídky v kategorii {category.name}
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            {category.offers.length} {countLabel} k dispozici.
          </p>
        </div>
        <OfferCatalogClient
          offers={category.offers.map((o) => ({
            slug: o.slug,
            name: o.name,
            shortDescription: o.shortDescription,
            logo: o.logo,
            bonus: o.bonus,
            promoCode: o.promoCode,
            cashbackLabel: o.cashbackAllowed ? o.userCashbackLabel : null,
            rating: o.rating,
            priority: o.priority,
            verified: o.verified,
            featured: o.featured,
            hasPromos: o.promos.length > 0,
            category: {
              name: o.category.name,
              slug: o.category.slug,
              icon: o.category.icon,
            },
          }))}
        />
      </div>

      {articles.length > 0 && (
        <div className="mt-16 border-t border-slate-100 pt-12">
          <ArticleGrid articles={articles} title="Související průvodci a recenze" />
        </div>
      )}

      {/* Cross-linking to other categories */}
      {otherCategories.length > 0 && (
        <nav aria-label="Další kategorie" className="mt-16 border-t border-slate-100 pt-10">
          <h2 className="text-base font-bold text-navy mb-4">Prozkoumejte další kategorie</h2>
          <div className="flex flex-wrap gap-2.5">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategorie/${cat.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-green/40 hover:text-green-dark transition-colors"
              >
                {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
