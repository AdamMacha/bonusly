import { OfferCard } from "./offer-card";

interface Offer {
  slug: string;
  name: string;
  shortDescription: string;
  logo?: string | null;
  bonus?: string | null;
  verified: boolean;
  featured: boolean;
  category: {
    name: string;
    slug: string;
  };
}

interface OfferGridProps {
  offers: Offer[];
  title?: string;
  description?: string;
}

export function OfferGrid({ offers, title, description }: OfferGridProps) {
  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Žádné nabídky k zobrazení.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy tracking-tight">{title}</h2>
          {description && (
            <p className="mt-2 text-slate-500">{description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <OfferCard
            key={offer.slug}
            slug={offer.slug}
            name={offer.name}
            shortDescription={offer.shortDescription}
            logo={offer.logo}
            bonus={offer.bonus}
            categoryName={offer.category.name}
            verified={offer.verified}
            featured={offer.featured}
          />
        ))}
      </div>
    </div>
  );
}
