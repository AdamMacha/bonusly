"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OfferCard } from "./offer-card";

export interface CatalogOfferItem {
  slug: string;
  name: string;
  shortDescription: string;
  logo?: string | null;
  bonus?: string | null;
  promoCode?: string | null;
  rating?: number | null;
  verified: boolean;
  featured: boolean;
  hasPromos: boolean;
  category: {
    name: string;
    slug: string;
    icon?: string | null;
  };
}

interface CategoryFilterItem {
  slug: string;
  name: string;
  icon?: string | null;
  count: number;
}

interface OfferCatalogClientProps {
  offers: CatalogOfferItem[];
  categories: CategoryFilterItem[];
}

export function OfferCatalogClient({ offers, categories }: OfferCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [onlyWithPromo, setOnlyWithPromo] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOffers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return offers.filter((offer) => {
      if (selectedCategory !== "all" && offer.category.slug !== selectedCategory) {
        return false;
      }
      if (onlyWithPromo && !offer.promoCode && !offer.hasPromos) {
        return false;
      }
      if (q) {
        const hay = `${offer.name} ${offer.shortDescription} ${offer.bonus || ""} ${offer.promoCode || ""} ${offer.category.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [offers, selectedCategory, onlyWithPromo, query]);

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <search className="relative flex-1 max-w-md">
            <label htmlFor="catalog-search" className="sr-only">
              Filtrovat nabídky
            </label>
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat značku, bonus nebo kód (např. iPhone, banka, ETF)..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
            />
          </search>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyWithPromo((v) => !v)}
              aria-pressed={onlyWithPromo}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                onlyWithPromo
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-slate-700 border-slate-200 hover:border-green/40"
              }`}
            >
              <span aria-hidden="true">🏷️</span>
              <span>S kódem nebo promo akcí</span>
            </button>
            <Link
              href="/akce-a-kupony"
              className="inline-flex items-center gap-1 rounded-xl bg-green/15 px-3.5 py-2.5 text-xs font-bold text-green-dark hover:bg-green/25 transition-colors whitespace-nowrap"
            >
              Všechny kupóny →
            </Link>
          </div>
        </div>

        {/* Category Filter Pills (with native SEO links fallback below / beside) */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-navy text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-green/40 hover:text-navy"
            }`}
          >
            <span>Všechny</span>
            <span className={`text-xs ${selectedCategory === "all" ? "text-slate-300" : "text-slate-400"}`}>
              ({offers.length})
            </span>
          </button>

          {categories.map((cat) => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? "bg-navy text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-green/40 hover:text-navy"
                }`}
              >
                {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                <span>{cat.name}</span>
                <span className={`text-xs ${active ? "text-slate-300" : "text-slate-400"}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-5 text-xs font-medium text-slate-500">
        Zobrazeno <strong className="text-navy">{filteredOffers.length}</strong> z {offers.length} ověřených nabídek
      </p>

      {/* Offers Grid */}
      {filteredOffers.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 py-14 px-6 text-center">
          <p className="text-base font-semibold text-navy">Žádná nabídka neodpovídá filtru</p>
          <p className="mt-1 text-sm text-slate-500">Zkuste změnit kategorii nebo smazat hledaný výraz.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setOnlyWithPromo(false);
              setQuery("");
            }}
            className="mt-4 inline-flex items-center rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy-light cursor-pointer"
          >
            Zobrazit všech {offers.length} nabídek
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.slug}
              slug={offer.slug}
              name={offer.name}
              shortDescription={offer.shortDescription}
              logo={offer.logo}
              bonus={offer.bonus}
              promoCode={offer.promoCode}
              rating={offer.rating}
              categoryName={offer.category.name}
              verified={offer.verified}
              featured={offer.featured}
            />
          ))}
        </div>
      )}

      {/* Crawl-friendly direct category links */}
      <nav aria-label="Kategorie nabídek" className="mt-14 pt-8 border-t border-slate-100">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Procházet podle samostatných kategorií
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-green/40 hover:text-green-dark transition-colors"
            >
              {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
