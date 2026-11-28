"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OfferLogo } from "./offer-logo";
import { CopyCodeButton } from "./copy-code-button";
import { CtaButton } from "./cta-button";
import { matchesSearchQuery } from "@/lib/search";
import { formatPromoValidUntil } from "@/lib/date";

export interface PromoHubItem {
  id: string;
  trackingSlug: string;
  title: string;
  description: string | null;
  badge: string | null;
  code: string | null;
  validUntil: string | null;
  offer: {
    slug: string;
    name: string;
    logo: string | null;
    category: {
      name: string;
      slug: string;
    };
  };
}

interface PromosHubClientProps {
  promos: PromoHubItem[];
}

type PromoTypeFilter = "all" | "codes" | "deals";

const PROMO_PAGE_SIZE = 18;

/**
 * Rozloží akce rovnoměrně podle značky (round-robin), aby 6 kuponů jednoho
 * e-shopu nezaplavilo horní řádky výpisu.
 */
function interleaveByBrand(items: PromoHubItem[]): PromoHubItem[] {
  const buckets = new Map<string, PromoHubItem[]>();
  for (const item of items) {
    const key = item.offer.slug;
    const list = buckets.get(key);
    if (list) list.push(item);
    else buckets.set(key, [item]);
  }
  const queues = Array.from(buckets.values());
  const result: PromoHubItem[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const q of queues) {
      const next = q.shift();
      if (next) {
        result.push(next);
        added = true;
      }
    }
  }
  return result;
}

export function PromosHubClient({ promos }: PromosHubClientProps) {
  const [typeFilter, setTypeFilter] = useState<PromoTypeFilter>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [visibleCodes, setVisibleCodes] = useState(PROMO_PAGE_SIZE);
  const [visibleDeals, setVisibleDeals] = useState(PROMO_PAGE_SIZE);

  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; count: number }>();
    for (const p of promos) {
      const existing = map.get(p.offer.category.slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(p.offer.category.slug, {
          slug: p.offer.category.slug,
          name: p.offer.category.name,
          count: 1,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [promos]);

  const filtered = useMemo(() => {
    return promos.filter((p) => {
      const hasCode = Boolean(p.code && p.code.trim().length > 0);
      if (typeFilter === "codes" && !hasCode) return false;
      if (typeFilter === "deals" && hasCode) return false;
      if (selectedCategory !== "all" && p.offer.category.slug !== selectedCategory) {
        return false;
      }
      if (query.trim()) {
        const hay = `${p.offer.name} ${p.title} ${p.description || ""} ${p.code || ""} ${p.badge || ""} ${p.offer.category.name}`;
        if (!matchesSearchQuery(hay, query)) return false;
      }
      return true;
    });
  }, [promos, typeFilter, selectedCategory, query]);

  const codePromos = useMemo(
    () => interleaveByBrand(filtered.filter((p) => p.code && p.code.trim().length > 0)),
    [filtered]
  );
  const dealPromos = useMemo(
    () => interleaveByBrand(filtered.filter((p) => !p.code || p.code.trim().length === 0)),
    [filtered]
  );

  const displayedCodes = codePromos.slice(0, visibleCodes);
  const remainingCodes = Math.max(0, codePromos.length - displayedCodes.length);

  const displayedDeals = dealPromos.slice(0, visibleDeals);
  const remainingDeals = Math.max(0, dealPromos.length - displayedDeals.length);

  const totalCodes = promos.filter((p) => p.code && p.code.trim().length > 0).length;
  const totalDeals = promos.length - totalCodes;

  const resetPagination = () => {
    setVisibleCodes(PROMO_PAGE_SIZE);
    setVisibleDeals(PROMO_PAGE_SIZE);
  };

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-10 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <search className="relative flex-1 max-w-md">
            <label htmlFor="promos-search" className="sr-only">
              Hledat akci nebo slevový kód
            </label>
            <input
              id="promos-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPagination();
              }}
              placeholder="Hledat značku, akci nebo kód..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
            />
          </search>

          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "all", label: `Vše (${promos.length})` },
                { id: "codes", label: `🏷️ Slevové kódy (${totalCodes})` },
                { id: "deals", label: `⚡ Přímé akce (${totalDeals})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setTypeFilter(tab.id);
                  resetPagination();
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                  typeFilter === tab.id
                    ? "bg-navy text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-green/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-nowrap overflow-x-auto pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:overflow-visible gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              resetPagination();
            }}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-navy text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-green/40 hover:text-navy"
            }`}
          >
            Všechny kategorie
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                resetPagination();
              }}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-navy text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green/40 hover:text-navy"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="mb-14 rounded-2xl border border-slate-200 bg-slate-50/70 py-12 px-6 text-center">
          <p className="text-base font-semibold text-navy">Žádná akce neodpovídá filtru</p>
          <p className="mt-1 text-sm text-slate-500">Zkuste jinou kategorii nebo zrušte vyhledávání.</p>
          <button
            type="button"
            onClick={() => {
              setTypeFilter("all");
              setSelectedCategory("all");
              setQuery("");
              resetPagination();
            }}
            className="mt-4 inline-flex items-center rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy-light cursor-pointer"
          >
            Zobrazit všech {promos.length} akcí
          </button>
        </div>
      )}

      {/* Section 1: Discount Codes */}
      {codePromos.length > 0 && (
        <section className="mb-14" aria-labelledby="codes-heading">
          <h2 id="codes-heading" className="text-2xl font-bold text-navy tracking-tight mb-6 flex items-center gap-2">
            <span aria-hidden="true">🏷️</span> Ověřené slevové kódy ({codePromos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCodes.map((promo) => {
              const validity = formatPromoValidUntil(promo.validUntil);
              return (
                <article
                  key={promo.id}
                  className="flex h-full flex-col justify-between rounded-2xl border-2 border-green/25 bg-white p-6 shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="flex items-center gap-3 min-w-0 group"
                      >
                        <OfferLogo
                          logo={promo.offer.logo}
                          name={promo.offer.name}
                          size="search"
                        />
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-navy group-hover:text-green-dark transition-colors truncate">
                            {promo.offer.name}
                          </span>
                          <span className="block text-[11px] text-slate-400 truncate">
                            {promo.offer.category.name}
                          </span>
                        </div>
                      </Link>
                      {promo.badge && (
                        <span className="inline-flex shrink-0 items-center rounded-full bg-green px-2.5 py-0.5 text-xs font-bold text-navy">
                          {promo.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-navy leading-snug line-clamp-2">
                      <Link href={`/nabidky/${promo.offer.slug}`} className="hover:text-green-dark transition-colors">
                        {promo.title}
                      </Link>
                    </h3>
                    {promo.description && (
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {promo.description}
                      </p>
                    )}
                    {validity && (
                      <p className="mt-3 text-xs text-slate-400">
                        {validity.isLongTerm ? (
                          <span className="font-medium text-slate-500">{validity.label}</span>
                        ) : (
                          <>
                            Platnost do:{" "}
                            <time dateTime={validity.iso} className="font-medium text-slate-600">
                              {validity.label}
                            </time>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    {promo.code && (
                      <CopyCodeButton
                        code={promo.code}
                        offerSlug={promo.offer.slug}
                        className="w-full justify-between"
                      />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <CtaButton
                        href={`/go/promo/${promo.trackingSlug}`}
                        size="sm"
                        className="flex-1"
                        gaOfferSlug={promo.offer.slug}
                        gaCategory={promo.offer.category.slug}
                        gaLocation="promos_hub_code"
                      >
                        Přejít a uplatnit kód
                      </CtaButton>
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="text-xs font-semibold text-slate-500 hover:text-navy px-2 py-2"
                      >
                        Recenze
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {remainingCodes > 0 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleCodes((prev) => prev + PROMO_PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-navy hover:border-green/40 hover:text-green-dark transition-colors shadow-xs cursor-pointer"
              >
                Zobrazit další slevové kódy (zbývá {remainingCodes})
              </button>
            </div>
          )}
        </section>
      )}

      {/* Section 2: Direct Promo Deals */}
      {dealPromos.length > 0 && (
        <section className="mb-16" aria-labelledby="deals-heading">
          <h2 id="deals-heading" className="text-2xl font-bold text-navy tracking-tight mb-6 flex items-center gap-2">
            <span aria-hidden="true">⚡</span> Časově omezené promo akce ({dealPromos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedDeals.map((promo) => {
              const validity = formatPromoValidUntil(promo.validUntil);
              return (
                <article
                  key={promo.id}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 hover:border-green/35 hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="flex items-center gap-3 min-w-0 group"
                      >
                        <OfferLogo
                          logo={promo.offer.logo}
                          name={promo.offer.name}
                          size="search"
                        />
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-navy group-hover:text-green-dark transition-colors truncate">
                            {promo.offer.name}
                          </span>
                          <span className="block text-xs text-slate-500 truncate">
                            {promo.offer.category.name}
                          </span>
                        </div>
                      </Link>
                      {promo.badge && (
                        <span className="inline-flex shrink-0 items-center rounded-full bg-green/15 px-2.5 py-0.5 text-xs font-bold text-green-dark">
                          {promo.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-navy leading-snug line-clamp-2">
                      {promo.title}
                    </h3>
                    {promo.description && (
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {promo.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      {validity ? (
                        validity.isLongTerm ? (
                          validity.label
                        ) : (
                          <>
                            Platí do{" "}
                            <time dateTime={validity.iso} className="font-semibold text-navy">
                              {validity.label}
                            </time>
                          </>
                        )
                      ) : (
                        "Aktuální partnerská nabídka"
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="text-xs font-semibold text-slate-500 hover:text-navy"
                      >
                        Podrobnosti →
                      </Link>
                      <CtaButton
                        href={`/go/promo/${promo.trackingSlug}`}
                        size="sm"
                        gaOfferSlug={promo.offer.slug}
                        gaCategory={promo.offer.category.slug}
                        gaLocation="promos_hub_deal"
                      >
                        Aktivovat akci
                      </CtaButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {remainingDeals > 0 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleDeals((prev) => prev + PROMO_PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-navy hover:border-green/40 hover:text-green-dark transition-colors shadow-xs cursor-pointer"
              >
                Zobrazit další promo akce (zbývá {remainingDeals})
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
