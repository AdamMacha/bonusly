import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedOffers } from "@/components/related-offers";
import { RelatedArticles } from "@/components/related-articles";
import { NewsletterForm } from "@/components/newsletter-form";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { parseArticleMarkdown } from "@/lib/markdown";
import { calculateReadingTime } from "@/lib/reading-time";
import { ArticleOfferHeroCta, ArticleOfferBottomCta } from "@/components/article-offer-cta";
import { ArticleStickyBar } from "@/components/article-sticky-bar";
import {
  buildCanonical,
  cleanSeoTitle,
  getBaseUrl,
  getComparisonsForOffer,
} from "@/lib/seo";
import { formatCzDate } from "@/lib/date";

export const revalidate = 3600;

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

  const rawTitle = cleanSeoTitle(article.seoTitle || article.title);
  const title = rawTitle.length > 52 ? `${rawTitle.slice(0, 49).trim()}...` : rawTitle;
  const description = article.seoDescription || article.excerpt;
  const canonical = article.canonicalUrl || buildCanonical(`/blog/${article.slug}`);
  const baseUrl = getBaseUrl();
  const ogImage = article.featuredImage
    ? article.featuredImage.startsWith("http")
      ? article.featuredImage
      : `${baseUrl}${article.featuredImage}`
    : `${baseUrl}/opengraph-image`;

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
      images: [{ url: ogImage, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BONUSLY`,
      description,
      images: [ogImage],
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
      orderBy: [{ priority: "desc" }, { featured: "desc" }, { rating: "desc" }],
      take: 3,
    }),
    prisma.article.findMany({
      where: { categoryId: article.categoryId, draft: false, slug: { not: article.slug } },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  const baseUrl = getBaseUrl();
  const pageUrl = buildCanonical(`/blog/${article.slug}`);
  const schemaImage = article.featuredImage
    ? article.featuredImage.startsWith("http")
      ? article.featuredImage
      : `${baseUrl}${article.featuredImage}`
    : `${baseUrl}/opengraph-image`;
  const { html, toc, faqs, wordCount } = parseArticleMarkdown(article.content);
  const readingTime = calculateReadingTime(article.content);
  const comparisons = targetOffer ? getComparisonsForOffer(targetOffer.slug) : [];
  const isOrgAuthor = /redakce|bonusly/i.test(article.author.name);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.seoDescription || article.excerpt,
          image: [schemaImage],
          author: isOrgAuthor
            ? { "@type": "Organization", name: article.author.name, url: `${baseUrl}/o-nas` }
            : {
                "@type": "Person",
                name: article.author.name,
                jobTitle: "Zakladatel a finanční analytik BONUSLY",
                url: `${baseUrl}/o-nas`,
              },
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
            url: `${baseUrl}/`,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          url: pageUrl,
        }}
      />
      {faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
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
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: `${baseUrl}/` },
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
        <header className="mb-8">
          <Link
            href={`/kategorie/${article.category.slug}`}
            className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200/70 transition-colors mb-4"
          >
            {article.category.name}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Link href="/o-nas" className="flex items-center gap-2.5 hover:text-navy transition-colors">
              <div className="w-8 h-8 rounded-full bg-navy text-green flex items-center justify-center font-bold text-xs">
                {article.author.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <span className="font-semibold text-navy">{article.author.name}</span>
            </Link>
            <span>·</span>
            {article.publishedAt && (
              <time dateTime={article.publishedAt.toISOString()}>
                Aktualizováno:{" "}
                {formatCzDate(article.updatedAt, {
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
              {readingTime} min čtení ({wordCount} slov)
            </span>
          </div>
        </header>

        {article.featuredImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-8 shadow-md border border-slate-100">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              preload
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Table of Contents (Obsah článku) */}
        {toc.length >= 2 && (
          <nav
            aria-label="Obsah článku"
            className="my-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Obsah průvodce
            </p>
            <ol className="space-y-1.5 text-sm list-decimal list-inside">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-medium text-navy hover:text-green-dark transition-colors underline-offset-2 hover:underline"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
              {faqs.length > 0 && (
                <li>
                  <a
                    href="#faq-heading"
                    className="font-medium text-navy hover:text-green-dark transition-colors underline-offset-2 hover:underline"
                  >
                    Často kladené otázky ({faqs.length})
                  </a>
                </li>
              )}
            </ol>
          </nav>
        )}

        {/* Hero Conversion CTA Box */}
        {targetOffer && <ArticleOfferHeroCta offer={targetOffer} />}

        <div
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&>h2]:scroll-mt-24 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-navy [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:mb-6 [&>table]:w-full [&>table]:text-sm [&>table]:border-collapse [&>table]:my-6 [&>table_th]:bg-slate-50 [&>table_th]:text-left [&>table_th]:p-3 [&>table_th]:border [&>table_th]:border-slate-200 [&>table_td]:p-3 [&>table_td]:border [&>table_td]:border-slate-200 [&>blockquote]:border-l-4 [&>blockquote]:border-green [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>strong]:text-navy [&>strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Article FAQ Section with FAQPage JSON-LD */}
        {faqs.length > 0 && (
          <div className="mt-12">
            <Faq items={faqs} title="Často kladené otázky" />
          </div>
        )}

        {/* Topical Triangle: Direct links to relevant comparisons */}
        {comparisons.length > 0 && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
            <h2 className="text-base font-bold text-navy mb-3">
              Související srovnání s konkurencí
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/porovnani/${c.slug}`}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy hover:border-green/40 hover:text-green-dark transition-colors flex items-center justify-between"
                >
                  <span>{c.title}</span>
                  <span aria-hidden="true" className="text-green-dark">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Conversion CTA Box */}
        {targetOffer && <ArticleOfferBottomCta offer={targetOffer} />}

        {/* Author E-E-A-T Bio Card */}
        <aside className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-navy text-green flex items-center justify-center font-black text-base">
            {article.author.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Autor článku</p>
            <Link href="/o-nas" className="text-base font-bold text-navy hover:text-green-dark">
              {article.author.name}
            </Link>
            {article.author.bio && (
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">{article.author.bio}</p>
            )}
            <Link
              href="/jak-hodnotime"
              className="mt-2 inline-block text-xs font-semibold text-green-dark hover:text-green"
            >
              Jak ověřujeme fakta a bonusy →
            </Link>
          </div>
        </aside>
      </article>

      {targetOffer && <ArticleStickyBar offer={targetOffer} />}

      <div className="max-w-3xl mt-12 rounded-xl bg-slate-50 border border-slate-100 p-8">
        <h2 className="text-lg font-bold text-navy mb-2">Líbil se vám průvodce?</h2>
        <p className="text-sm text-slate-500 mb-4">
          Přihlaste se k odběru novinek a nepropásněte žádný nový bonus ani slevový kód.
        </p>
        <NewsletterForm />
      </div>

      <div className="mt-16 space-y-12 border-t border-slate-100 pt-12">
        <RelatedOffers offers={relatedOffers} />
        <RelatedArticles articles={relatedArticles} />
      </div>
    </div>
  );
}
