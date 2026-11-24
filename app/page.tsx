import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Hero } from "@/components/hero";
import { OfferGrid } from "@/components/offer-grid";
import { CategoryGrid } from "@/components/category-grid";
import { ArticleGrid } from "@/components/article-grid";
import { TrustBadges } from "@/components/trust-badges";
import { NewsletterForm } from "@/components/newsletter-form";
import { CopyCodeButton } from "@/components/copy-code-button";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import {
  buildCanonical,
  CURATED_COMPARISONS,
  getBaseUrl,
  SOCIAL_LINKS,
} from "@/lib/seo";

const canonical = buildCanonical("/");

export const metadata: Metadata = {
  title: {
    absolute: "BONUSLY — Ověřené bonusy, slevové kódy, investice a extra příjem 2026",
  },
  description:
    "Porovnáváme více než 40 ověřených nabídek v ČR: bankovní bonusy až 3 000 Kč, investice bez poplatků, pojištění se slevou 20 %, tarify, slevové kódy na Apple i extra příjem.",
  alternates: { canonical },
};

export default async function Home() {
  const [featuredOffers, categories, activePromos, latestArticles, heroArticles] =
    await Promise.all([
      prisma.offer.findMany({
        where: { active: true, featured: true },
        include: { category: true },
        take: 9,
        orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
      }),
      prisma.category.findMany({
        include: { _count: { select: { offers: { where: { active: true } } } } },
        orderBy: { order: "asc" },
      }),
      prisma.offerPromo.findMany({
        where: { active: true, offer: { active: true } },
        include: {
          offer: { select: { slug: true, name: true } },
        },
        orderBy: [{ code: "asc" }, { order: "asc" }],
        take: 6,
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

  const baseUrl = getBaseUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "BONUSLY",
          url: baseUrl,
          description:
            "Porovnáváme ověřené bankovní bonusy, investice, pojištění, slevové kódy a možnosti extra příjmu v ČR.",
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/hledani?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BONUSLY",
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          sameAs: SOCIAL_LINKS,
          contactPoint: {
            "@type": "ContactPoint",
            email: "info@bonusly.cz",
            contactType: "customer support",
            areaServed: "CZ",
            availableLanguage: "Czech",
          },
        }}
      />

      <Hero articles={carouselArticles} />

      {/* Hot Active Promos & Discount Codes from Sheet 2 */}
      {activePromos.length > 0 && (
        <section className="bg-slate-50/90 border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-0.5 text-xs font-bold text-green-dark mb-2">
                  <span aria-hidden="true">🔥</span> Aktuálně platné akce a kupóny
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                  Ověřené slevové kódy a časově omezené akce
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-slate-500">
                  Zkopírujte kód jedním kliknutím nebo aktivujte zvýhodněnou online nabídku.
                </p>
              </div>
              <Link
                href="/akce-a-kupony"
                className="inline-flex items-center gap-1 text-sm font-semibold text-green-dark hover:text-green transition-colors whitespace-nowrap"
              >
                Všechny akce a kupóny →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activePromos.map((promo) => (
                <article
                  key={promo.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-green/35 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-navy"
                      >
                        {promo.offer.name}
                      </Link>
                      {promo.badge && (
                        <span className="inline-flex items-center rounded-full bg-green/15 px-2.5 py-0.5 text-xs font-bold text-green-dark">
                          {promo.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-navy leading-snug">
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="hover:text-green-dark transition-colors"
                      >
                        {promo.title}
                      </Link>
                    </h3>
                    {promo.validUntil && (
                      <p className="mt-2 text-xs text-slate-400">
                        Platí do{" "}
                        <time dateTime={promo.validUntil.toISOString()}>
                          {new Date(promo.validUntil).toLocaleDateString("cs-CZ")}
                        </time>
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    {promo.code ? (
                      <CopyCodeButton code={promo.code} size="sm" />
                    ) : (
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="text-xs font-semibold text-slate-500 hover:text-navy"
                      >
                        Detail nabídky →
                      </Link>
                    )}
                    <CtaButton href={`/go/promo/${promo.trackingSlug}`} size="sm">
                      {promo.code ? "Uplatnit" : "Aktivovat"}
                    </CtaButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Offers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Nejzajímavější ověřené nabídky
            </h2>
            <p className="mt-2 text-slate-500">
              Pečlivě vybrané bonusy, slevy, investice a služby s nejvyšší hodnotou pro uživatele.
            </p>
          </div>
          <Link
            href="/nabidky"
            className="hidden sm:inline-flex text-sm font-semibold text-green-dark hover:text-green transition-colors"
          >
            Všechny nabídky →
          </Link>
        </div>
        <OfferGrid offers={featuredOffers} />
        <div className="mt-8 text-center">
          <Link
            href="/nabidky"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy hover:border-green/40 hover:text-green-dark transition-colors shadow-xs"
          >
            Zobrazit kompletní katalog nabídek →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <CategoryGrid categories={categories} title="Procházet podle kategorií" />
        </div>
      </section>

      {/* Popular Comparisons (Internal Linking Hub) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Oblíbená srovnání
            </h2>
            <p className="mt-2 text-slate-500">
              Rozhodujete se mezi dvěma službami? Porovnali jsme bonusy a podmínky za vás.
            </p>
          </div>
          <Link
            href="/porovnani"
            className="hidden sm:inline-flex text-sm font-semibold text-green-dark hover:text-green transition-colors"
          >
            Všechna srovnání →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURATED_COMPARISONS.slice(0, 8).map((item) => (
            <Link
              key={item.slug}
              href={`/porovnani/${item.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-green/35 hover:shadow-md transition-all"
            >
              <span className="inline-block rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 mb-2">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-navy group-hover:text-green-dark transition-colors">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why BONUSLY */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="text-2xl font-bold text-navy tracking-tight text-center mb-10">
            Proč BONUSLY?
          </h2>
          <TrustBadges />
        </div>
      </section>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-navy tracking-tight">Z blogu</h2>
              <p className="mt-2 text-slate-500">Nejnovější články, návody a recenze.</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex text-sm font-semibold text-green-dark hover:text-green transition-colors"
            >
              Všechny články →
            </Link>
          </div>
          <ArticleGrid articles={latestArticles} />
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-navy tracking-tight">
              Chceš vědět o nových nabídkách a slevových kódech?
            </h2>
            <p className="mt-3 text-slate-500">
              Přihlas se k odběru a dozvíš se jako první o nových bonusech a časově omezených akcích.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
