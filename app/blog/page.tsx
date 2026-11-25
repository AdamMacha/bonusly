import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsletterForm } from "@/components/newsletter-form";
import { JsonLd } from "@/components/json-ld";
import { BlogHubClient } from "@/components/blog-hub-client";
import { calculateReadingTime } from "@/lib/reading-time";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/blog");

export const metadata: Metadata = {
  title: "Blog & Magazín — Průvodci a recenze 2026",
  description:
    "Hloubkové průvodce, recenze a srovnání ze světa bankovních bonusů, investic, slevových kódů a extra příjmů v ČR. Praktické návody krok za krokem.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Blog & Magazín — Průvodci a recenze 2026 | BONUSLY",
    description:
      "Hloubkové průvodce, výpočty výdělků a srovnání bankovních bonusů, investic a možností přivýdělku v ČR.",
    images: [{ url: `${getBaseUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const [categories, articles] = await Promise.all([
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { articles: { where: { draft: false } } } },
      },
    }),
    prisma.article.findMany({
      where: { draft: false },
      include: { category: true, author: true },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
  ]);

  const baseUrl = getBaseUrl();

  const serializedArticles = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    featuredImage: a.featuredImage,
    featured: a.featured,
    publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
    readingTimeMinutes: calculateReadingTime(a.content),
    category: {
      id: a.category.id,
      name: a.category.name,
      slug: a.category.slug,
      icon: a.category.icon,
      description: a.category.description,
    },
    author: {
      name: a.author.name,
      avatar: a.author.avatar,
    },
  }));

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    description: c.description,
    articleCount: c._count.articles,
  }));

  const featuredArticle = serializedArticles.find((a) => a.featured) || serializedArticles[0] || null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "BONUSLY Magazín",
          description:
            "Praktické průvodce, recenze a srovnání bankovních bonusů, investic a extra příjmů v ČR.",
          url: canonical,
          inLanguage: "cs-CZ",
          publisher: {
            "@type": "Organization",
            name: "BONUSLY",
            url: `${baseUrl}/`,
            logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` },
          },
          blogPost: articles.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            url: `${baseUrl}/blog/${a.slug}`,
            datePublished: a.publishedAt?.toISOString(),
            dateModified: a.updatedAt.toISOString(),
            author: { "@type": "Person", name: a.author.name },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: canonical },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Blog & Magazín" }]} />

      <header className="mt-2 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3.5 py-1.5 text-xs font-semibold text-green-dark mb-4">
          <span className="flex h-2 w-2 rounded-full bg-green animate-pulse" />
          BONUSLY Magazín
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Průvodci, srovnání a ověřené návody
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-2xl">
          Detailní návody krok za krokem, reálné výpočty výdělků a zkušenosti z praxe, jak vytěžit maximum z bonusů a osobních financí v ČR.
        </p>
      </header>

      <BlogHubClient
        articles={serializedArticles}
        categories={serializedCategories}
        featuredArticle={featuredArticle}
      />

      {/* Newsletter banner */}
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-navy via-navy-light to-navy p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-green mb-4 border border-white/10">
            ✉️ BONUSLY Newsletter
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Nenechte si ujít žádný nový bonus a návod
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6">
            Jednou za 14 dní posíláme shrnutí nejvýhodnějších časově omezených akcí, kódů a ověřených průvodců.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
