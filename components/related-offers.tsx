import { OfferCard } from "./offer-card";

interface Offer {
  slug: string;
  name: string;
  shortDescription: string;
  logo?: string | null;
  bonus?: string | null;
  verified: boolean;
  featured: boolean;
  category: { name: string; slug: string };
}

export function RelatedOffers({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-navy tracking-tight mb-5">Podobné nabídky</h2>
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
    </section>
  );
}
