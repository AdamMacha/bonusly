"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OfferLogo } from "./offer-logo";
import { CopyCodeButton } from "./copy-code-button";
import { CtaButton } from "./cta-button";
import { matchesSearchQuery } from "@/lib/search";

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

export function PromosHubClient({ promos }: PromosHubClientProps) {
  const [typeFilter, setTypeFilter] = useState<PromoTypeFilter>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

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

  const codePromos = filtered.filter((p) => p.code && p.code.trim().length > 0);
  const dealPromos = filtered.filter((p) => !p.code || p.code.trim().length === 0);

  const totalCodes = promos.filter((p) => p.code && p.code.trim().length > 0).length;
  const totalDeals = promos.length - totalCodes;

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
              onChange={(e) => setQuery(e.target.value)}
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
                onClick={() => setTypeFilter(tab.id)}
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

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
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
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
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
            {codePromos.map((promo) => (
              <article
                key={promo.id}
                className="flex flex-col justify-between rounded-2xl border-2 border-green/25 bg-white p-6 shadow-xs hover:shadow-lg transition-all"
              >
                <div>
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
                  <h3 className="text-lg font-bold text-navy leading-snug">
                    <Link href={`/nabidky/${promo.offer.slug}`} className="hover:text-green-dark transition-colors">
                      {promo.title}
                    </Link>
                  </h3>
                  {promo.description && (
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{promo.description}</p>
                  )}
                  {promo.validUntil && (
                    <p className="mt-3 text-xs text-slate-400">
                      Platnost do:{" "}
                      <time dateTime={promo.validUntil} className="font-medium text-slate-600">
                        {new Date(promo.validUntil).toLocaleDateString("cs-CZ")}
                      </time>
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                  {promo.code && <CopyCodeButton code={promo.code} className="w-full justify-between" />}
                  <div className="flex items-center justify-between gap-2">
                    <CtaButton href={`/go/promo/${promo.trackingSlug}`} size="sm" className="flex-1">
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
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Direct Promo Deals */}
      {dealPromos.length > 0 && (
        <section className="mb-16" aria-labelledby="deals-heading">
          <h2 id="deals-heading" className="text-2xl font-bold text-navy tracking-tight mb-6 flex items-center gap-2">
            <span aria-hidden="true">⚡</span> Časově omezené promo akce ({dealPromos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dealPromos.map((promo) => (
              <article
                key={promo.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 hover:border-green/35 hover:shadow-md transition-all"
              >
                <div>
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
                  <h3 className="text-lg font-bold text-navy leading-snug">{promo.title}</h3>
                  {promo.description && (
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{promo.description}</p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {promo.validUntil ? (
                      <>
                        Platí do{" "}
                        <time dateTime={promo.validUntil} className="font-semibold text-navy">
                          {new Date(promo.validUntil).toLocaleDateString("cs-CZ")}
                        </time>
                      </>
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
                    <CtaButton href={`/go/promo/${promo.trackingSlug}`} size="sm">
                      Aktivovat akci
                    </CtaButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
