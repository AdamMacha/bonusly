import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = await prisma.offer.findUnique({
    where: { slug },
    select: { name: true, seoTitle: true, seoDescription: true, shortDescription: true },
  });

  if (!offer) return {};

  return {
    title: offer.seoTitle || offer.name,
    description: offer.seoDescription || offer.shortDescription,
    openGraph: {
      title: offer.seoTitle || offer.name,
      description: offer.seoDescription || offer.shortDescription,
    },
  };
}

export async function generateStaticParams() {
  const offers = await prisma.offer.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return offers.map((o) => ({ slug: o.slug }));
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const offer = await prisma.offer.findUnique({
    where: { slug },
    include: {
      category: true,
      faq: { orderBy: { order: "asc" } },
    },
  });

  if (!offer || !offer.active) notFound();

  const [relatedOffers, relatedArticles] = await Promise.all([
    prisma.offer.findMany({
      where: { categoryId: offer.categoryId, active: true, slug: { not: offer.slug } },
      include: { category: true },
      take: 3,
    }),
    prisma.article.findMany({
      where: { categoryId: offer.categoryId, draft: false },
      include: { category: true, author: true },
      take: 3,
    }),
  ]);

  const faqItems = offer.faq.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: offer.name,
          description: offer.shortDescription,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/nabidky/${offer.slug}`,
          brand: { "@type": "Brand", name: offer.name },
          ...(offer.rating && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: offer.rating,
              bestRating: 5,
              ratingCount: 1,
            },
          }),
        }}
      />
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
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: process.env.NEXT_PUBLIC_BASE_URL },
            { "@type": "ListItem", position: 2, name: "Nabídky", item: `${process.env.NEXT_PUBLIC_BASE_URL}/nabidky` },
            { "@type": "ListItem", position: 3, name: offer.name, item: `${process.env.NEXT_PUBLIC_BASE_URL}/nabidky/${offer.slug}` },
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
        <div className="lg:col-span-2">
          {/* Offer header */}
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
              {offer.logo ? (
                <Image src={offer.logo} alt={offer.name} width={48} height={48} className="h-10 w-10 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-slate-400">{offer.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-slate-500">{offer.category.name}</span>
                {offer.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                    Ověřeno
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">{offer.name}</h1>
              <p className="mt-2 text-slate-600">{offer.shortDescription}</p>
            </div>
          </div>

          {/* Bonus highlight */}
          {offer.bonus && (
            <div className="mt-8 rounded-xl bg-green/5 border border-green/15 p-5">
              <p className="text-sm font-medium text-green-dark mb-1">Bonus</p>
              <p className="text-lg font-bold text-navy">{offer.bonus}</p>
              {offer.bonusDescription && (
                <p className="mt-1 text-sm text-slate-600">{offer.bonusDescription}</p>
              )}
            </div>
          )}

          {/* Tipsport Lead Capture Form */}
          {offer.slug === "tipsport" && (
            <TipsportLeadForm offerSlug={offer.slug} offerName={offer.name} />
          )}

          {/* CTA */}
          <div className="mt-8">
            <CtaButton href={`/go/${offer.trackingSlug}`} size="lg">
              Získat nabídku
            </CtaButton>
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-navy mb-4">O nabídce</h2>
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-6 [&>strong]:text-navy [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(offer.description) }}
            />
          </div>

          {/* Requirements */}
          {offer.requirements.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-navy mb-4">Podmínky</h2>
              <ul className="space-y-2">
                {offer.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400 shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pros & Cons */}
          {(offer.pros.length > 0 || offer.cons.length > 0) && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offer.pros.length > 0 && (
                <div>
                  <h3 className="font-semibold text-navy mb-3">Výhody</h3>
                  <ul className="space-y-2">
                    {offer.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {offer.cons.length > 0 && (
                <div>
                  <h3 className="font-semibold text-navy mb-3">Nevýhody</h3>
                  <ul className="space-y-2">
                    {offer.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400 shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          {faqItems.length > 0 && (
            <div className="mt-10">
              <Faq items={faqItems} title="Často kladené otázky" />
            </div>
          )}

          {/* Verification date */}
          {offer.lastVerifiedAt && (
            <p className="mt-8 text-sm text-slate-400">
              Ověřeno: {new Date(offer.lastVerifiedAt).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}

          <div className="mt-8">
            <AffiliateDisclosure />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* Quick CTA card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-navy mb-2">{offer.name}</h3>
              {offer.bonus && (
                <p className="text-sm text-green-dark font-medium mb-4">{offer.bonus}</p>
              )}
              <CtaButton href={`/go/${offer.trackingSlug}`} size="md" className="w-full">
                Získat nabídku
              </CtaButton>
            </div>

            {/* Category link */}
            <a
              href={`/kategorie/${offer.category.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-green/20 transition-colors"
            >
              <p className="text-xs text-slate-400 mb-1">Kategorie</p>
              <p className="font-medium text-navy">{offer.category.name}</p>
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="mt-16 space-y-12 border-t border-slate-100 pt-12">
        <RelatedOffers offers={relatedOffers} />
        <RelatedArticles articles={relatedArticles} />
      </div>
    </div>
  );
}
