"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleCard } from "./article-card";
import { formatCzDate } from "@/lib/date";

export interface BlogArticleItem {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  featured: boolean;
  publishedAt: string | null;
  readingTimeMinutes: number;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    description: string | null;
  };
  author: {
    name: string;
    avatar: string | null;
  };
}

export interface BlogCategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  articleCount: number;
}

interface BlogHubClientProps {
  articles: BlogArticleItem[];
  categories: BlogCategoryItem[];
  featuredArticle: BlogArticleItem | null;
}

export function BlogHubClient({
  articles,
  categories,
  featuredArticle,
}: BlogHubClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visibleArticles =
    activeCategory === "all"
      ? featuredArticle
        ? articles.filter((a) => a.slug !== featuredArticle.slug)
        : articles
      : articles.filter((a) => a.category.slug === activeCategory);

  return (
    <div>
      {/* Filtrovací lišta kategorií */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === "all"
              ? "bg-navy text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-navy"
          }`}
        >
          <span aria-hidden="true">✨</span>
          <span>Všechny články ({articles.length})</span>
        </button>

        {categories
          .filter((c) => c.articleCount > 0)
          .map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-navy"
                }`}
              >
                {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                <span>{cat.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat.articleCount}
                </span>
              </button>
            );
          })}
      </div>

      {/* Hero Featured Article (only in "all" view) */}
      {activeCategory === "all" && featuredArticle && (
        <div className="mb-14">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-slate-300 hover:-translate-y-0.5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 min-h-[260px] lg:min-h-[360px]">
                {featuredArticle.featuredImage ? (
                  <Image
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    fill
                    priority
                    fetchPriority="high"
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

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-5 bg-white">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                    {featuredArticle.publishedAt && (
                      <time dateTime={featuredArticle.publishedAt}>
                        {formatCzDate(featuredArticle.publishedAt, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    <span>·</span>
                    <span className="text-slate-500">{featuredArticle.readingTimeMinutes} min čtení</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight leading-tight group-hover:text-green-dark transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-navy">{featuredArticle.author.name}</p>
                    <p className="text-[11px] text-slate-400">Ověřený průvodce</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold group-hover:bg-green group-hover:text-navy transition-colors">
                    Přečíst článek →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            categoryName={article.category.name}
            categorySlug={article.category.slug}
            featuredImage={article.featuredImage}
            readingTimeMinutes={article.readingTimeMinutes}
            publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
            authorName={article.author.name}
            authorAvatar={article.author.avatar}
          />
        ))}
      </div>
    </div>
  );
}
