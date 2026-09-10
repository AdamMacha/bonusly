import { prisma } from "@/lib/db";
import { Hero } from "@/components/hero";
import { OfferGrid } from "@/components/offer-grid";
import { CategoryGrid } from "@/components/category-grid";
import { ArticleGrid } from "@/components/article-grid";
import { TrustBadges } from "@/components/trust-badges";
import { NewsletterForm } from "@/components/newsletter-form";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";

export default async function Home() {
  const [featuredOffers, categories, latestArticles, heroArticles] = await Promise.all([
    prisma.offer.findMany({
      where: { active: true, featured: true },
      include: { category: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      include: { _count: { select: { offers: { where: { active: true } } } } },
      orderBy: { order: "asc" },
    }),
    prisma.article.findMany({
      where: { draft: false },
      include: { category: true, author: true },
      take: 3,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.article.findMany({
      where: { draft: false },
      include: { category: true, author: true, offer: true },
      take: 12,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
  ]);

  const explicitlyFeatured = heroArticles.filter((a) => a.featured);
  const carouselArticles =
    explicitlyFeatured.length > 0 ? explicitlyFeatured : heroArticles.slice(0, 5);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "BONUSLY",
          url: process.env.NEXT_PUBLIC_BASE_URL,
          description: "Porovnáváme nabídky, extra příjem a finanční produkty na jednom místě.",
          potentialAction: {
            "@type": "SearchAction",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/hledani?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BONUSLY",
          url: process.env.NEXT_PUBLIC_BASE_URL,
          logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`,
        }}
      />

      <Hero articles={carouselArticles} />

      {/* Featured Offers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy tracking-tight">Nejzajímavější nabídky</h2>
            <p className="mt-2 text-slate-500">Pečlivě vybrané nabídky, které stojí za pozornost.</p>
          </div>
          <Link href="/nabidky" className="hidden sm:inline-flex text-sm font-medium text-green-dark hover:text-green transition-colors">
            Všechny nabídky →
          </Link>
        </div>
        <OfferGrid offers={featuredOffers} />
        <div className="mt-6 text-center sm:hidden">
          <Link href="/nabidky" className="text-sm font-medium text-green-dark hover:text-green transition-colors">
            Zobrazit všechny nabídky →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <CategoryGrid categories={categories} title="Procházet podle kategorií" />
        </div>
      </section>

      {/* Why BONUSLY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h2 className="text-2xl font-bold text-navy tracking-tight text-center mb-10">Proč BONUSLY?</h2>
        <TrustBadges />
      </section>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-navy tracking-tight">Z blogu</h2>
                <p className="mt-2 text-slate-500">Nejnovější články a průvodci.</p>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex text-sm font-medium text-green-dark hover:text-green transition-colors">
                Všechny články →
              </Link>
            </div>
            <ArticleGrid articles={latestArticles} />
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-navy tracking-tight">
            Chceš vědět o nových nabídkách?
          </h2>
          <p className="mt-3 text-slate-500">
            Přihlas se k odběru a dozvíš se o nových bonusech a zajímavých příležitostech.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
