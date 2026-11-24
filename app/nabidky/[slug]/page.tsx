import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Faq } from "@/components/faq";
import { RelatedOffers } from "@/components/related-offers";
import { RelatedArticles } from "@/components/related-articles";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { CtaButton } from "@/components/cta-button";
import { renderMarkdown } from "@/lib/markdown";
import { TipsportLeadForm } from "@/components/tipsport-lead-form";
import { CashbackBanner } from "@/components/cashback-banner";
import { CopyCodeButton } from "@/components/copy-code-button";
import { OfferStickyBar } from "@/components/offer-sticky-bar";
import {
  buildCanonical,
  cleanSeoTitle,
  getBaseUrl,
  getComparisonsForOffer,
} from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

// React cache() sdílí 1 DB dotaz mezi generateMetadata a OfferPage
const getOfferBySlug = cache(async (slug: string) => {
  return prisma.offer.findUnique({
    where: { slug },
    include: {
      category: true,
      faq: { orderBy: { order: "asc" } },
      promos: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
    },
  });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);

  if (!offer || !offer.active) return {};

  const title = cleanSeoTitle(offer.seoTitle || `${offer.name}: Recenze, bonus a podmínky`);
  const description = offer.seoDescription || offer.shortDescription;
  const canonical = buildCanonical(`/nabidky/${offer.slug}`);

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BONUSLY`,
      description,
    },
  };
}

export async function generateStaticParams() {
  try {
    const offers = await prisma.offer.findMany({
      where: { active: true },
      select: { slug: true },
    });
    return offers.map((o) => ({ slug: o.slug }));
  } catch {
    return [];
  }
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);

  if (!offer || !offer.active) notFound();

  const [relatedOffers, relatedArticles] = await Promise.all([
    prisma.offer.findMany({
      where: { categoryId: offer.categoryId, active: true, slug: { not: offer.slug } },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
      take: 3,
    }),
    prisma.article.findMany({
      where: {
        draft: false,
        OR: [{ offerId: offer.id }, { categoryId: offer.categoryId }],
      },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  const baseUrl = getBaseUrl();
  const pageUrl = buildCanonical(`/nabidky/${offer.slug}`);
  const faqItems = offer.faq.map((f) => ({ question: f.question, answer: f.answer }));
  const comparisons = getComparisonsForOffer(offer.slug);
  const ctaText = offer.ctaLabel || `Získat nabídku u ${offer.name}`;
  const verifiedDateFormatted = offer.lastVerifiedAt
    ? new Date(offer.lastVerifiedAt).toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.name,
    description: offer.seoDescription || offer.shortDescription,
    url: pageUrl,
    image: offer.logo ? `${baseUrl}${offer.logo}` : `${pageUrl}/opengraph-image`,
    category: offer.category.name,
    brand: {
      "@type": "Brand",
      name: offer.name,
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      price: "0",
      priceCurrency: "CZK",
      availability: "https://schema.org/InStock",
      ...(offer.bonus && { description: offer.bonus }),
    },
    ...(offer.rating && {
      review: {
        "@type": "Review",
        author: {
          "@type": "Organization",
          name: "Redakce BONUSLY",
          url: baseUrl,
        },
        datePublished: (offer.lastVerifiedAt || offer.updatedAt).toISOString(),
        reviewBody: offer.shortDescription,
        reviewRating: {
          "@type": "Rating",
          ratingValue: offer.rating,
          bestRating: 5,
          worstRating: 1,
        },
        ...(offer.pros.length > 0 && {
          positiveNotes: {
            "@type": "ItemList",
            itemListElement: offer.pros.map((pro, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: pro,
            })),
          },
        }),
        ...(offer.cons.length > 0 && {
          negativeNotes: {
            "@type": "ItemList",
            itemListElement: offer.cons.map((con, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: con,
            })),
          },
        }),
      },
    }),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14 pb-24 lg:pb-14">
      <JsonLd data={productSchema} />

      {faqItems.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Nabídky", item: `${baseUrl}/nabidky` },
            {
              "@type": "ListItem",
              position: 3,
              name: offer.category.name,
              item: `${baseUrl}/kategorie/${offer.category.slug}`,
            },
            { "@type": "ListItem", position: 4, name: offer.name, item: pageUrl },
          ],
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Nabídky", href: "/nabidky" },
          { label: offer.category.name, href: `/kategorie/${offer.category.slug}` },
          { label: offer.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
        {/* Main content */}
        <article className="lg:col-span-2">
          {/* Offer header */}
          <header className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
              {offer.logo ? (
                <Image
                  src={offer.logo}
                  alt={`Logo ${offer.name}`}
                  width={48}
                  height={48}
                  priority
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <span aria-hidden="true" className="text-xl font-extrabold text-navy">
                  {offer.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Link
                  href={`/kategorie/${offer.category.slug}`}
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-200/70 transition-colors"
                >
                  {offer.category.name}
                </Link>
                {offer.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-semibold text-green-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ověřeno redakcí
                  </span>
                )}
                {offer.rating && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                    <span aria-hidden="true">★</span> {offer.rating.toFixed(1)} / 5
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
                {offer.name}
              </h1>
              <p className="mt-2 text-base text-slate-600 leading-relaxed">
                {offer.shortDescription}
              </p>
            </div>
          </header>

          {/* Primary Bonus & Promo Code Box */}
          {(offer.bonus || offer.promoCode) && (
            <section className="mt-8 rounded-2xl bg-gradient-to-br from-green/10 via-emerald-50/40 to-white border-2 border-green/25 p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-dark mb-1">
                    <span aria-hidden="true">🎁</span> Aktuální výhoda / Bonus
                  </span>
                  {offer.bonus && (
                    <p className="text-xl font-extrabold text-navy leading-snug">{offer.bonus}</p>
                  )}
                  {offer.bonusDescription && (
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      {offer.bonusDescription}
                    </p>
                  )}
                </div>
                {offer.promoCode && (
                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Ověřený kód
                    </span>
                    <CopyCodeButton code={offer.promoCode} />
                    {offer.promoCodeNote && (
                      <p className="text-[11px] text-slate-500 sm:text-right max-w-[230px]">
                        {offer.promoCodeNote}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-green/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <CtaButton href={`/go/${offer.trackingSlug}`} size="lg" className="sm:w-auto">
                  {ctaText}
                </CtaButton>
                {verifiedDateFormatted && (
                  <span className="text-xs text-slate-500 sm:ml-2">
                    Naposledy ověřeno: <strong className="text-slate-700">{verifiedDateFormatted}</strong>
                  </span>
                )}
              </div>
            </section>
          )}

          {/* Fallback CTA if offer has neither bonus nor promoCode */}
          {!offer.bonus && !offer.promoCode && (
            <div className="mt-6">
              <CtaButton href={`/go/${offer.trackingSlug}`} size="lg">
                {ctaText}
              </CtaButton>
            </div>
          )}

          {/* Tipsport Lead Capture Form */}
          {offer.slug === "tipsport" && (
            <TipsportLeadForm offerSlug={offer.slug} offerName={offer.name} />
          )}

          {/* Cashback Banner (strictly rendered only when rewardAmount > 0) */}
          <CashbackBanner rewardAmount={offer.rewardAmount} className="mt-6" />

          {/* Sheet 2 Active Promo Offers & Coupons */}
          {offer.promos.length > 0 && (
            <section className="mt-10" aria-labelledby="promos-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="promos-heading" className="text-xl font-bold text-navy flex items-center gap-2">
                  <span aria-hidden="true">🔥</span>
                  Aktuální promo akce a slevové kódy ({offer.promos.length})
                </h2>
                <Link
                  href="/akce-a-kupony"
                  className="text-xs font-semibold text-green-dark hover:text-green transition-colors"
                >
                  Všechny akce →
                </Link>
              </div>
              <div className="space-y-4">
                {offer.promos.map((promo) => (
                  <div
                    key={promo.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-green/35 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {promo.badge && (
                            <span className="inline-flex items-center rounded-full bg-green/15 px-2.5 py-0.5 text-xs font-bold text-green-dark">
                              {promo.badge}
                            </span>
                          )}
                          {promo.validUntil && (
                            <span className="text-xs text-slate-500">
                              Platí do{" "}
                              <time dateTime={promo.validUntil.toISOString()}>
                                {new Date(promo.validUntil).toLocaleDateString("cs-CZ")}
                              </time>
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-navy">{promo.title}</h3>
                        {promo.description && (
                          <p className="text-sm text-slate-600">{promo.description}</p>
                        )}
                      </div>

                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        {promo.code && <CopyCodeButton code={promo.code} size="sm" />}
                        <CtaButton href={`/go/promo/${promo.trackingSlug}`} size="sm">
                          {promo.code ? "Uplatnit kód" : "Aktivovat akci"}
                        </CtaButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Summary Facts Table (great for Google Featured Snippets & AI Overviews) */}
          <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <h2 className="text-base font-bold text-navy mb-4">Rychlý přehled: {offer.name}</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex justify-between sm:block border-b border-slate-200/70 pb-2">
                <dt className="text-slate-500 text-xs uppercase tracking-wider">Kategorie</dt>
                <dd className="font-semibold text-navy mt-0.5">{offer.category.name}</dd>
              </div>
              <div className="flex justify-between sm:block border-b border-slate-200/70 pb-2">
                <dt className="text-slate-500 text-xs uppercase tracking-wider">Hodnocení redakce</dt>
                <dd className="font-semibold text-navy mt-0.5">
                  {offer.rating ? `${offer.rating.toFixed(1)} / 5,0 ★` : "Ověřeno"}
                </dd>
              </div>
              {offer.bonus && (
                <div className="flex justify-between sm:block border-b border-slate-200/70 pb-2">
                  <dt className="text-slate-500 text-xs uppercase tracking-wider">Hlavní výhoda</dt>
                  <dd className="font-semibold text-green-dark mt-0.5">{offer.bonus}</dd>
                </div>
              )}
              {offer.promoCode && (
                <div className="flex justify-between sm:block border-b border-slate-200/70 pb-2">
                  <dt className="text-slate-500 text-xs uppercase tracking-wider">Slevový / Referral kód</dt>
                  <dd className="font-mono font-bold text-navy mt-0.5">{offer.promoCode}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Editorial Description */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-navy mb-4">
              Recenze, zkušenosti a návod: {offer.name}
            </h2>
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:mb-6 [&>strong]:text-navy [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(offer.description) }}
            />
          </section>

          {/* Requirements */}
          {offer.requirements.length > 0 && (
            <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-navy mb-4">Podmínky pro získání výhody</h2>
              <ul className="space-y-2.5">
                {offer.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5 text-green shrink-0 mt-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pros & Cons */}
          {(offer.pros.length > 0 || offer.cons.length > 0) && (
            <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offer.pros.length > 0 && (
                <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/30 p-5">
                  <h2 className="text-base font-bold text-navy mb-3">Hlavní výhody</h2>
                  <ul className="space-y-2">
                    {offer.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4 text-green shrink-0 mt-0.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {offer.cons.length > 0 && (
                <div className="rounded-xl border border-red-200/60 bg-red-50/20 p-5">
                  <h2 className="text-base font-bold text-navy mb-3">Na co si dát pozor</h2>
                  <ul className="space-y-2">
                    {offer.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Bottom Conversion Box inside article */}
          <section className="mt-10 rounded-2xl bg-navy p-6 sm:p-8 text-white">
            <h2 className="text-xl font-bold text-white">
              Připraveni využít nabídku {offer.name}?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {offer.bonus
                ? `${offer.bonus}. Přejděte přes náš ověřený partnerský odkaz níže.`
                : `Přejděte na oficiální stránky ${offer.name} přes náš ověřený odkaz.`}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CtaButton href={`/go/${offer.trackingSlug}`} size="md">
                {ctaText}
              </CtaButton>
              {offer.promoCode && <CopyCodeButton code={offer.promoCode} />}
            </div>
          </section>

          {/* Indexable Native FAQ */}
          {faqItems.length > 0 && (
            <div className="mt-12">
              <Faq items={faqItems} title={`Často kladené otázky — ${offer.name}`} />
            </div>
          )}

          {/* Verification date */}
          {offer.lastVerifiedAt && verifiedDateFormatted && (
            <p className="mt-8 text-sm text-slate-400">
              Naposledy ověřeno redakcí BONUSLY:{" "}
              <time dateTime={offer.lastVerifiedAt.toISOString()}>{verifiedDateFormatted}</time>
            </p>
          )}

          <div className="mt-8">
            <AffiliateDisclosure />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* Quick CTA card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-navy">{offer.name}</h2>
                {offer.rating && (
                  <span className="text-xs font-bold text-amber-600">
                    ★ {offer.rating.toFixed(1)}
                  </span>
                )}
              </div>
              {offer.bonus && (
                <p className="text-sm text-green-dark font-semibold mb-4">{offer.bonus}</p>
              )}
              {offer.promoCode && (
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Promo kód
                  </p>
                  <CopyCodeButton code={offer.promoCode} className="w-full justify-between" />
                </div>
              )}
              <CtaButton href={`/go/${offer.trackingSlug}`} size="md" className="w-full">
                {ctaText}
              </CtaButton>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                Ověřený partnerský odkaz · Bez navýšení ceny
              </p>
            </div>

            {/* Category link */}
            <Link
              href={`/kategorie/${offer.category.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-green/30 transition-colors"
            >
              <p className="text-xs text-slate-400 mb-1">Další nabídky v kategorii</p>
              <p className="font-semibold text-navy flex items-center justify-between">
                <span>
                  {offer.category.icon} {offer.category.name}
                </span>
                <span aria-hidden="true" className="text-green-dark">
                  →
                </span>
              </p>
            </Link>

            {/* Internal links to relevant comparisons */}
            {comparisons.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Srovnání s konkurencí
                </p>
                <ul className="space-y-2.5">
                  {comparisons.map((comp) => (
                    <li key={comp.slug}>
                      <Link
                        href={`/porovnani/${comp.slug}`}
                        className="text-sm font-medium text-navy hover:text-green-dark transition-colors flex items-center justify-between gap-2"
                      >
                        <span>{comp.title}</span>
                        <span aria-hidden="true" className="text-slate-400 shrink-0">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Related */}
      <div className="mt-16 space-y-12 border-t border-slate-100 pt-12">
        <RelatedOffers offers={relatedOffers} />
        <RelatedArticles articles={relatedArticles} />
      </div>

      {/* Mobile sticky CTA bar */}
      <OfferStickyBar
        name={offer.name}
        bonus={offer.bonus}
        promoCode={offer.promoCode}
        ctaLabel={offer.ctaLabel}
        href={`/go/${offer.trackingSlug}`}
      />
    </div>
  );
}
