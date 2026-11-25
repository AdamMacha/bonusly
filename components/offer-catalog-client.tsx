"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OfferCard } from "./offer-card";
import {
  extractBonusValue,
  extractCashbackValue,
  matchesSearchQuery,
  scoreOfferSearchMatch,
} from "@/lib/search";

export interface CatalogOfferItem {
  slug: string;
  name: string;
  shortDescription: string;
  logo?: string | null;
  bonus?: string | null;
  promoCode?: string | null;
  cashbackLabel?: string | null;
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

type SortKey = "featured" | "cashback" | "bonus" | "rating" | "promo" | "alpha";

const PAGE_SIZE = 24;

export function OfferCatalogClient({ offers, categories }: OfferCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [onlyWithCashback, setOnlyWithCashback] = useState(false);
  const [onlyWithPromo, setOnlyWithPromo] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const cashbackOfferCount = useMemo(
    () => offers.filter((o) => Boolean(o.cashbackLabel)).length,
    [offers]
  );

  const filteredOffers = useMemo(() => {
    const q = query.trim();
    const list = offers.filter((offer) => {
      if (selectedCategory !== "all" && offer.category.slug !== selectedCategory) {
        return false;
      }
      if (onlyWithCashback && !offer.cashbackLabel) {
        return false;
      }
      if (onlyWithPromo && !offer.promoCode && !offer.hasPromos) {
        return false;
      }
      if (q) {
        const hay = `${offer.name} ${offer.slug} ${offer.shortDescription} ${offer.bonus || ""} ${offer.promoCode || ""} ${offer.cashbackLabel || ""} ${offer.category.name} ${offer.category.slug}`;
        if (!matchesSearchQuery(hay, q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case "cashback":
        sorted.sort(
          (a, b) =>
            extractCashbackValue(b.cashbackLabel) - extractCashbackValue(a.cashbackLabel) ||
            Number(b.featured) - Number(a.featured) ||
            (b.rating || 0) - (a.rating || 0)
        );
        break;
      case "bonus":
        sorted.sort(
          (a, b) =>
            extractBonusValue(b.bonus) - extractBonusValue(a.bonus) ||
            Number(b.featured) - Number(a.featured) ||
            (b.rating || 0) - (a.rating || 0)
        );
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "promo":
        sorted.sort((a, b) => {
          const scoreA = (a.promoCode ? 2 : 0) + (a.hasPromos ? 1 : 0);
          const scoreB = (b.promoCode ? 2 : 0) + (b.hasPromos ? 1 : 0);
          return scoreB - scoreA || (b.rating || 0) - (a.rating || 0);
        });
        break;
      case "alpha":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "cs"));
        break;
      case "featured":
      default:
        if (q) {
          sorted.sort((a, b) => scoreOfferSearchMatch(b, q) - scoreOfferSearchMatch(a, q));
        } else {
          sorted.sort(
            (a, b) => Number(b.featured) - Number(a.featured) || (b.rating || 0) - (a.rating || 0)
          );
        }
        break;
    }

    return sorted;
  }, [offers, selectedCategory, onlyWithCashback, onlyWithPromo, sortBy, query]);

  const displayedOffers = filteredOffers.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredOffers.length - displayedOffers.length);

  const resetPagination = () => setVisibleCount(PAGE_SIZE);

  return (
    <div>
      {/* Filter & Sort Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <search className="relative flex-1 max-w-md">
            <label htmlFor="catalog-search" className="sr-only">
              Filtrovat nabídky
            </label>
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPagination();
              }}
              placeholder="Hledat značku, bonus, cashback nebo kód..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
            />
          </search>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="catalog-sort" className="sr-only">
              Seřadit nabídky
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortKey);
                resetPagination();
              }}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-navy focus:border-green focus:outline-none cursor-pointer"
            >
              <option value="featured">Řadit: Doporučené</option>
              <option value="cashback">Řadit: Nejvyšší cashback (%)</option>
              <option value="bonus">Řadit: Nejvyšší bonus</option>
              <option value="promo">Řadit: S kupónem první</option>
              <option value="rating">Řadit: Nejvyšší hodnocení</option>
              <option value="alpha">Řadit: Abecedně A–Z</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setOnlyWithCashback((v) => !v);
                resetPagination();
              }}
              aria-pressed={onlyWithCashback}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                onlyWithCashback
                  ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                  : "bg-amber-50/70 text-amber-900 border-amber-200/80 hover:border-amber-400"
              }`}
            >
              <span aria-hidden="true">💰</span>
              <span>Jen s cashbackem ({cashbackOfferCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOnlyWithPromo((v) => !v);
                resetPagination();
              }}
              aria-pressed={onlyWithPromo}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                onlyWithPromo
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-slate-700 border-slate-200 hover:border-green/40"
              }`}
            >
              <span aria-hidden="true">🏷️</span>
              <span>S kódem nebo akcí</span>
            </button>

            <Link
              href="/akce-a-kupony"
              className="inline-flex items-center gap-1 rounded-xl bg-green/15 px-3.5 py-2.5 text-xs font-bold text-green-dark hover:bg-green/25 transition-colors whitespace-nowrap"
            >
              Všechny kupóny →
            </Link>
          </div>
        </div>

        {/* Category Filter Pills (horizontally scrollable on mobile, wrapped on desktop) */}
        <div className="flex flex-nowrap overflow-x-auto pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:overflow-visible gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              resetPagination();
            }}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
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
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  resetPagination();
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
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
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-500">
        <p>
          Zobrazeno <strong className="text-navy">{displayedOffers.length}</strong> z{" "}
          <strong className="text-navy">{filteredOffers.length}</strong> odpovídajících nabídek
          {filteredOffers.length !== offers.length && ` (celkem ${offers.length})`}
        </p>
        {(selectedCategory !== "all" || onlyWithCashback || onlyWithPromo || query.trim()) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setOnlyWithCashback(false);
              setOnlyWithPromo(false);
              setQuery("");
              resetPagination();
            }}
            className="text-green-dark hover:text-green font-semibold cursor-pointer"
          >
            Zrušit filtry ×
          </button>
        )}
      </div>

      {/* Offers Grid */}
      {filteredOffers.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 py-14 px-6 text-center">
          <p className="text-base font-semibold text-navy">Žádná nabídka neodpovídá filtru</p>
          <p className="mt-1 text-sm text-slate-500">Zkuste změnit kategorii nebo smazat hledaný výraz.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setOnlyWithCashback(false);
              setOnlyWithPromo(false);
              setQuery("");
              resetPagination();
            }}
            className="mt-4 inline-flex items-center rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy-light cursor-pointer"
          >
            Zobrazit všech {offers.length} nabídek
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedOffers.map((offer) => (
              <OfferCard
                key={offer.slug}
                slug={offer.slug}
                name={offer.name}
                shortDescription={offer.shortDescription}
                logo={offer.logo}
                bonus={offer.bonus}
                promoCode={offer.promoCode}
                cashbackLabel={offer.cashbackLabel}
                rating={offer.rating}
                categoryName={offer.category.name}
                verified={offer.verified}
                featured={offer.featured}
              />
            ))}
          </div>

          {remainingCount > 0 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light transition-colors shadow-xs cursor-pointer"
              >
                Zobrazit dalších {Math.min(PAGE_SIZE, remainingCount)} nabídek
                <span className="text-slate-300 font-normal">(zbývá {remainingCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(filteredOffers.length)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:border-green/40 hover:text-navy transition-colors cursor-pointer"
              >
                Zobrazit všech {filteredOffers.length}
              </button>
            </div>
          )}
        </>
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
