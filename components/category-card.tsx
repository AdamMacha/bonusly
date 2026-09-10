import Link from "next/link";

const categoryIcons: Record<string, string> = {
  "extra-prijem": "🛵",
  privydelek: "🛵",
  finance: "💰",
  banky: "🏦",
  karty: "💳",
  bonusy: "🎁",
};

interface CategoryCardProps {
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  offerCount: number;
}

export function CategoryCard({ name, slug, description, icon, offerCount }: CategoryCardProps) {
  const emoji = icon || categoryIcons[slug] || "📦";

  return (
    <Link
      href={`/kategorie/${slug}`}
      className="group flex flex-col items-center text-center rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 hover:border-green/20"
    >
      <span className="text-3xl mb-3">{emoji}</span>
      <h3 className="font-semibold text-navy group-hover:text-green-dark transition-colors">
        {name}
      </h3>
      {description && (
        <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{description}</p>
      )}
      <span className="mt-3 text-xs font-medium text-slate-400">
        {offerCount} {offerCount === 1 ? "nabídka" : offerCount < 5 ? "nabídky" : "nabídek"}
      </span>
    </Link>
  );
}
