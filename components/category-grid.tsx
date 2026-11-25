import Link from "next/link";
import { CategoryCard } from "./category-card";

interface Category {
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  _count: { offers: number };
}

interface CategoryGridProps {
  categories: Category[];
  totalOfferCount?: number;
  title?: string;
}

export function CategoryGrid({ categories, totalOfferCount, title }: CategoryGridProps) {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-navy tracking-tight mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            description={cat.description}
            icon={cat.icon}
            offerCount={cat._count.offers}
          />
        ))}
        {typeof totalOfferCount === "number" && totalOfferCount > 0 && (
          <Link
            href="/nabidky"
            className="group flex flex-col items-center justify-center text-center rounded-xl border border-navy bg-navy text-white p-6 transition-all hover:bg-navy-light hover:shadow-lg hover:shadow-navy/20 hover:-translate-y-0.5"
          >
            <span aria-hidden="true" className="text-3xl mb-3">
              ✨
            </span>
            <h3 className="font-bold text-white group-hover:text-green transition-colors">
              Všechny nabídky →
            </h3>
            <p className="mt-1.5 text-sm text-slate-300 line-clamp-2">
              Kompletní katalog s filtrem cashbacku, bonusů a kupónů.
            </p>
            <span className="mt-3 inline-flex items-center rounded-full bg-green/20 px-2.5 py-0.5 text-xs font-bold text-green">
              {totalOfferCount} ověřených nabídek
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
