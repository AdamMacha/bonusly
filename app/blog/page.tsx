import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Pagination } from "@/components/pagination";
import { NewsletterForm } from "@/components/newsletter-form";
import { calculateReadingTime } from "@/lib/reading-time";

export const metadata: Metadata = {
  title: "Blog & Magazín | BONUSLY",
  description: "Průvodci, srovnání a tipy ze světa bonusů, extra příjmů a osobních financí. Ověřené návody krok za krokem.",
};

const ARTICLES_PER_PAGE = 9;

interface Props {
  searchParams: Promise<{ kategorie?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { kategorie, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1"));

  // Načtení všech aktivních kategorií s počtem článků
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: {
          articles: {
            where: { draft: false },
          },
        },
      },
    },
  });

  // Režim 1: Filtrování podle jedné kategorie
  if (kategorie) {
    const selectedCategory = categories.find((c) => c.slug === kategorie);

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: {
          draft: false,
          category: { slug: kategorie },
        },
        include: { category: true, author: true },
        orderBy: { publishedAt: "desc" },
        take: ARTICLES_PER_PAGE,
        skip: (currentPage - 1) * ARTICLES_PER_PAGE,
      }),
      prisma.article.count({
        where: {
          draft: false,
          category: { slug: kategorie },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: selectedCategory?.name || "Kategorie" },
          ]}
        />

        {/* Hlavička filtrované kategorie */}
        <div className="mt-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-3xl">{selectedCategory?.icon || "📁"}</span>
            <span className="inline-flex items-center rounded-full bg-green/10 text-green-dark px-3 py-1 text-xs font-semibold">
              Kategorie blogu
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            {selectedCategory ? selectedCategory.name : "Články"}
          </h1>
          {selectedCategory?.description && (
            <p className="mt-2 text-slate-500 max-w-3xl text-base sm:text-lg">
              {selectedCategory.description}
            </p>
          )}
        </div>

        {/* Navigační pilulky kategorií */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-slate-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-navy whitespace-nowrap"
          >
            ← Všechny sekce
          </Link>
          {categories.map((cat) => {
            const isActive = cat.slug === kategorie;
            return (
              <Link
                key={cat.id}
                href={`/blog?kategorie=${cat.slug}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-navy"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat._count.articles}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Seznam článků v kategorii */}
        <ArticleGrid articles={articles} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/blog?kategorie=${kategorie}`}
          />
        )}
      </div>
    );
  }

  // Režim 2: Přehledový magazín se sekcemi
  // 1. Získat nejnovější doporučený (featured) článek do hrdinské sekce
  const featuredArticle = await prisma.article.findFirst({
    where: { draft: false, featured: true },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
  });

  // 2. Načíst články pro jednotlivé kategorie (max 3 pro každou kategorii pro čistý grid)
  const categorySections = await Promise.all(
    categories
      .filter((cat) => cat._count.articles > 0)
      .map(async (cat) => {
        const articles = await prisma.article.findMany({
          where: {
            categoryId: cat.id,
            draft: false,
          },
          include: { category: true, author: true },
          orderBy: { publishedAt: "desc" },
          take: 3,
        });

        return {
          category: cat,
          articles,
          totalCount: cat._count.articles,
        };
      })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Blog & Magazín" }]} />

      {/* Hlavní záhlaví magazínu */}
      <div className="mt-2 mb-8 sm:mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3.5 py-1.5 text-xs font-semibold text-green-dark mb-4">
          <span className="flex h-2 w-2 rounded-full bg-green animate-pulse" />
          BONUSLY Magazín
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Průvodci, srovnání a ověřené tipy
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-2xl">
          Praktické návody krok za krokem, reálná srovnání a postupy, jak vydělat a ušetřit maximum na bonusech v Česku.
        </p>
      </div>

      {/* Filtrovací lišta kategorií */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-slate-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-navy text-white shadow-sm transition-all whitespace-nowrap"
        >
          <span>✨</span>
          <span>Všechny sekce</span>
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog?kategorie=${cat.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-navy hover:bg-slate-50/80 transition-all whitespace-nowrap"
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
              {cat._count.articles}
            </span>
          </Link>
        ))}
      </div>

      {/* HERO FEATURED ČLÁNEK */}
      {featuredArticle && (
        <div className="mb-16">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-slate-300 hover:-translate-y-0.5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Velký obrázek */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 min-h-[260px] lg:min-h-[380px]">
                {featuredArticle.featuredImage ? (
                  <Image
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                    <span className="text-6xl">{featuredArticle.category.icon || "📖"}</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-navy/90 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow border border-white/10">
                    {featuredArticle.category.name}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green px-3 py-1 text-xs font-bold text-navy shadow">
                    ⭐ Doporučujeme
                  </span>
                </div>
              </div>

              {/* Textový obsah */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-5 bg-white">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                    {featuredArticle.publishedAt && (
                      <time dateTime={new Date(featuredArticle.publishedAt).toISOString()}>
                        {new Date(featuredArticle.publishedAt).toLocaleDateString("cs-CZ", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {calculateReadingTime(featuredArticle.content)} min čtení
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight leading-tight group-hover:text-green-dark transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featuredArticle.author.avatar ? (
                      <Image
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        width={36}
                        height={36}
                        className="rounded-full object-contain p-0.5 border border-slate-200 bg-white"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-navy flex items-center justify-center font-bold text-xs border border-slate-200">
                        {featuredArticle.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-navy">{featuredArticle.author.name}</p>
                      <p className="text-[11px] text-slate-400">Ověřený průvodce</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold group-hover:bg-green group-hover:text-navy transition-colors">
                    Přečíst článek
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* TEMATICKÉ SEKCE */}
      <div className="space-y-16">
        {categorySections.map((section, idx) => (
          <div key={section.category.id} className="pt-2">
            {/* Záhlaví sekce */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7 pb-4 border-b border-slate-200/80">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-2xl">{section.category.icon}</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                    {section.category.name}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-500">
                  {section.category.description}
                </p>
              </div>

              <Link
                href={`/blog?kategorie=${section.category.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-green-dark hover:text-green transition-colors self-start sm:self-auto whitespace-nowrap"
              >
                Všechny články ze sekce ({section.totalCount})
                <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mřížka karet v této sekci */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  categoryName={article.category.name}
                  categorySlug={article.category.slug}
                  featuredImage={article.featuredImage}
                  readingTimeMinutes={calculateReadingTime(article.content)}
                  publishedAt={article.publishedAt}
                  authorName={article.author.name}
                  authorAvatar={article.author.avatar}
                />
              ))}
            </div>

            {/* Vložený Newsletter banner po druhé sekci */}
            {idx === 1 && (
              <div className="mt-16 rounded-3xl bg-gradient-to-br from-navy via-navy-light to-navy p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-green/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-green mb-4 border border-white/10">
                    ✉️ BONUSLY Newsletter
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                    Nenechte si ujít žádný nový bonus a tip
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mb-6">
                    Jednou za 14 dní vám zašleme shrnutí nejvýhodnějších časově omezených akcí, kódů a ověřených průvodců.
                  </p>
                  <div className="max-w-md mx-auto">
                    <NewsletterForm />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proč sledovat BONUSLY Magazín */}
      <div className="mt-20 rounded-3xl border border-slate-200/90 bg-slate-50/50 p-8 sm:p-10">
        <h3 className="text-xl font-bold text-navy mb-6 text-center sm:text-left">
          Proč číst návody a testy na BONUSLY?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green/10 text-green-dark flex items-center justify-center font-bold mb-3">
              ✓
            </div>
            <h4 className="font-bold text-navy text-base mb-1">100% testováno v praxi</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Všechny bankovní účty, aplikace i kurýrní služby sami reálně zkoušíme a prověřujeme podmínky výplaty.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green/10 text-green-dark flex items-center justify-center font-bold mb-3">
              ⏱
            </div>
            <h4 className="font-bold text-navy text-base mb-1">Vždy aktuální promo kódy</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pravidelně ověřujeme platnost bonusů a kódů, abyste měli jistotu, že odměnu skutečně získáte.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green/10 text-green-dark flex items-center justify-center font-bold mb-3">
              🛡
            </div>
            <h4 className="font-bold text-navy text-base mb-1">Žádné skryté háčky</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              U každé nabídky detailně uvádíme pro i proti a upozorňujeme na případné poplatky nebo podmínky obratu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
