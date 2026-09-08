import { ArticleCard } from "./article-card";
import { calculateReadingTime } from "@/lib/reading-time";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  featuredImage?: string | null;
  publishedAt: Date | null;
  category: { name: string; slug?: string };
  author: { name: string; avatar?: string | null };
}

interface ArticleGridProps {
  articles: Article[];
  title?: string;
}

export function ArticleGrid({ articles, title }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-8">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="font-medium text-navy">Žádné články k zobrazení</p>
        <p className="text-sm text-slate-500 mt-1">Zkuste vybrat jinou kategorii nebo se vrátit k přehledu všech článků.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-navy tracking-tight mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            categoryName={article.category.name}
            categorySlug={article.category.slug}
            featuredImage={article.featuredImage}
            readingTimeMinutes={article.content ? calculateReadingTime(article.content) : 4}
            publishedAt={article.publishedAt}
            authorName={article.author.name}
            authorAvatar={article.author.avatar}
          />
        ))}
      </div>
    </div>
  );
}
