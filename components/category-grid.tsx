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
  title?: string;
}

export function CategoryGrid({ categories, title }: CategoryGridProps) {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-navy tracking-tight mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
      </div>
    </div>
  );
}
