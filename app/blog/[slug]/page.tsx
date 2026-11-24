import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedOffers } from "@/components/related-offers";
import { RelatedArticles } from "@/components/related-articles";
import { NewsletterForm } from "@/components/newsletter-form";
import { JsonLd } from "@/components/json-ld";
import { renderMarkdown } from "@/lib/markdown";
import { calculateReadingTime } from "@/lib/reading-time";
import { ArticleOfferHeroCta, ArticleOfferBottomCta } from "@/components/article-offer-cta";
import { ArticleStickyBar } from "@/components/article-sticky-bar";
import { buildCanonical, cleanSeoTitle, getBaseUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

const getArticleBySlug = cache(async (slug: string) => {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
      offer: {
        include: { category: true },
      },
    },
  });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.draft) return {};

  const title = cleanSeoTitle(article.seoTitle || article.title);
  const description = article.seoDescription || article.excerpt;
  const canonical = article.canonicalUrl || buildCanonical(`/blog/${article.slug}`);

  return {
    title,
    description,
    keywords: article.keywords.length > 0 ? article.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${title} | BONUSLY`,
      description,
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author.name],
      ...(article.featuredImage && {
        images: [{ url: article.featuredImage, alt: article.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BONUSLY`,
      description,
      ...(article.featuredImage && { images: [article.featuredImage] }),
    },
  };
}

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({ where: { draft: false }, select: { slug: true } });
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.draft) notFound();

  let targetOffer = article.offer;
  if (!targetOffer) {
    targetOffer = await prisma.offer.findFirst({
      where: { categoryId: article.categoryId, active: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  }

  const [relatedOffers, relatedArticles] = await Promise.all([
    prisma.offer.findMany({
      where: {
        categoryId: article.categoryId,
        active: true,
        id: targetOffer ? { not: targetOffer.id } : undefined,
      },
      include: { category: true },
      take: 3,
    }),
    prisma.article.findMany({
      where: { categoryId: article.categoryId, draft: false, slug: { not: article.slug } },
      include: { category: true, author: true },
      take: 3,
    }),
  ]);

  const baseUrl = getBaseUrl();
  const pageUrl = buildCanonical(`/blog/${article.slug}`);
  const wordCount = article.content.trim().split(/\s+/).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.seoDescription || article.excerpt,
          ...(article.featuredImage && { image: [article.featuredImage] }),
          author: { "@type": "Person", name: article.author.name },
          datePublished: article.publishedAt?.toISOString(),
          dateModified: article.updatedAt.toISOString(),
          wordCount,
          ...(article.keywords.length > 0 && { keywords: article.keywords.join(", ") }),
          inLanguage: "cs-CZ",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "BONUSLY",
            url: baseUrl,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          url: pageUrl,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
            {
              "@type": "ListItem",
              position: 3,
              name: article.category.name,
              item: `${baseUrl}/kategorie/${article.category.slug}`,
            },
            { "@type": "ListItem", position: 4, name: article.title, item: pageUrl },
          ],
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: article.category.name, href: `/kategorie/${article.category.slug}` },
          { label: article.title },
        ]}
      />

      <article className="max-w-3xl">
        <header className="mb-10">
          <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 mb-4">
            {article.category.name}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-slate-500">{article.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-2.5">
              {article.author.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={30}
                  height={30}
                  className="rounded-full object-contain p-0.5 border border-slate-200 bg-white"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-100 text-navy flex items-center justify-center font-bold text-xs border border-slate-200">
                  {article.author.name.charAt(0)}
                </div>
              )}
              <span className="font-semibold text-navy">{article.author.name}</span>
            </div>
            <span>·</span>
            {article.publishedAt && (
              <time dateTime={article.publishedAt.toISOString()}>
                {new Date(article.publishedAt).toLocaleDateString("cs-CZ", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <svg aria-hidden="true" className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {calculateReadingTime(article.content)} min čtení
            </span>
          </div>
        </header>

        {article.featuredImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-8 shadow-md border border-slate-100">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Hero Conversion CTA Box */}
        {targetOffer && <ArticleOfferHeroCta offer={targetOffer} />}

        <div
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-navy [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-green [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>strong]:text-navy [&>strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
        />

        {/* Bottom Conversion CTA Box */}
        {targetOffer && <ArticleOfferBottomCta offer={targetOffer} />}
      </article>

      {/* Floating Sticky Conversion Bar */}
      {targetOffer && <ArticleStickyBar offer={targetOffer} />}

      {/* Newsletter CTA */}
      <div className="max-w-3xl mt-12 rounded-xl bg-slate-50 border border-slate-100 p-8">
        <h2 className="text-lg font-bold text-navy mb-2">Líbil se vám článek?</h2>
        <p className="text-sm text-slate-500 mb-4">Přihlaste se k odběru novinek a nepropásněte žádný nový článek ani bonus.</p>
        <NewsletterForm />
      </div>

      {/* Related */}
      <div className="mt-16 space-y-12 border-t border-slate-100 pt-12">
        <RelatedOffers offers={relatedOffers} />
        <RelatedArticles articles={relatedArticles} />
      </div>
    </div>
  );
}
