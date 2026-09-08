import Link from "next/link";
import Image from "next/image";

export interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  categoryName: string;
  categorySlug?: string;
  featuredImage?: string | null;
  readingTimeMinutes?: number;
  publishedAt?: Date | null;
  authorName: string;
  authorAvatar?: string | null;
  priority?: boolean;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  categoryName,
  featuredImage,
  readingTimeMinutes,
  publishedAt,
  authorName,
  authorAvatar,
  priority = false,
}: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 hover:border-slate-300"
    >
      {/* Obrázek nebo gradient fallback */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-500/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Odznak kategorie */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-navy/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm border border-white/10">
            {categoryName}
          </span>
        </div>

        {/* Doba čtení pill na obrázku */}
        {readingTimeMinutes && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-xs text-white/90">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTimeMinutes} min
            </span>
          </div>
        )}
      </div>

      {/* Tělo karty */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Meta: datum */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2.5">
          {publishedAt && (
            <time dateTime={new Date(publishedAt).toISOString()}>
              {new Date(publishedAt).toLocaleDateString("cs-CZ", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          )}
          {!readingTimeMinutes && publishedAt && <span>·</span>}
          {!readingTimeMinutes && (
            <span>Průvodce</span>
          )}
        </div>

        {/* Titulek */}
        <h3 className="text-lg font-bold text-navy group-hover:text-green-dark transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Perex */}
        <p className="mt-2.5 text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {excerpt}
        </p>

        {/* Spodní řádek s autorem a CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={authorName}
                width={26}
                height={26}
                className="rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[11px] border border-slate-200">
                {authorName.charAt(0)}
              </div>
            )}
            <span className="font-medium text-slate-600 truncate max-w-[120px]">{authorName}</span>
          </div>

          <span className="inline-flex items-center font-semibold text-green-dark group-hover:translate-x-0.5 transition-transform duration-200">
            Číst
            <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
