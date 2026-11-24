export interface CategorySeed {
  slug: string;
  name: string;
  icon: string;
  order: number;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface OfferFaqSeed {
  question: string;
  answer: string;
}

export interface OfferPromoSeed {
  trackingSlug: string;
  title: string;
  description?: string;
  badge: string;
  code?: string;
  validUntil?: string; // ISO YYYY-MM-DD
  affiliateUrl: string;
  order: number;
}

export interface OfferSeed {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  logo?: string | null;
  bonus?: string | null;
  bonusDescription?: string | null;
  promoCode?: string | null;
  promoCodeNote?: string | null;
  ctaLabel?: string | null;
  requirements: string[];
  pros: string[];
  cons: string[];
  referralUrl: string;
  affiliateUrl?: string | null;
  trackingSlug: string;
  partnerNetwork?: string | null;
  rewardAmount?: number | null;
  rating: number;
  featured: boolean;
  active: boolean;
  verified: boolean;
  seoTitle: string;
  seoDescription: string;
  faq: OfferFaqSeed[];
  promos?: OfferPromoSeed[];
}
