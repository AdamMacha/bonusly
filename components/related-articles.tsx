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

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-navy tracking-tight mb-6">Související články</h2>
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
    </section>
  );
}
