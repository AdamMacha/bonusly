"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OfferLogo } from "./offer-logo";

interface SearchOffer {
  slug: string;
  name: string;
  bonus?: string | null;
  promoCode?: string | null;
  logo?: string | null;
  rating?: number | null;
  category: { name: string };
}

interface SearchArticle {
  slug: string;
  title: string;
  category: { name: string };
}

interface SearchResults {
  offers: SearchOffer[];
  articles: SearchArticle[];
}

export function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResults>({
    offers: [],
    articles: [],
  });
  const featuredCacheRef = useRef<SearchResults | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Globální klávesová zkratka Cmd/Ctrl + K a Escape
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  // Fokus na input a zamknutí scrollu pozadí při otevřeném modalu
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Živý našeptávač s debouncem 200 ms a keší pro výchozí (prázdný) stav
  useEffect(() => {
    if (!isOpen) return;
    const trimmed = query.trim();

    if (!trimmed && featuredCacheRef.current) {
      setResults(featuredCacheRef.current);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const url = trimmed
          ? `/api/search?q=${encodeURIComponent(trimmed)}`
          : "/api/search";
        const res = await fetch(url, { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          const parsed: SearchResults = {
            offers: Array.isArray(data.offers) ? data.offers : [],
            articles: Array.isArray(data.articles) ? data.articles : [],
          };
          if (!trimmed) {
            featuredCacheRef.current = parsed;
          }
          setResults(parsed);
        }
      } catch {
        // Ignore aborted fetch
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, trimmed ? 200 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/hledani?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  const hasResults = results.offers.length > 0 || results.articles.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-slate-300 hover:text-white hover:border-white/25 transition-colors cursor-pointer whitespace-nowrap"
        aria-label="Hledat nabídky a kódy"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <span className="hidden xl:inline text-xs text-slate-300">Hledat...</span>
        <kbd className="hidden xl:inline-flex items-center rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vyhledávání nabídek a článků"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-navy/65 backdrop-blur-xs px-4 pt-16 sm:pt-24"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
            {/* Search input header */}
            <search>
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-b border-slate-200 px-4 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-slate-400 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hledat banku, iPhone, ETF, slevový kód..."
                  className="w-full bg-transparent text-sm sm:text-base text-navy placeholder-slate-400 focus:outline-none"
                  aria-label="Vyhledávání nabídek a článků"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Smazat dotaz"
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 hover:text-navy transition-colors cursor-pointer shrink-0"
                  >
                    Smazat
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Zavřít vyhledávání"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy transition-colors cursor-pointer shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            </search>

            {/* Subheader */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {query.trim() ? `Výsledky pro „${query.trim()}“` : "Populární nabídky"}
              </span>
              {loading && <span className="text-[11px] text-green-dark font-medium">Hledám...</span>}
            </div>

            {/* Results list */}
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
              {results.offers.map((offer) => (
                <Link
                  key={offer.slug}
                  href={`/nabidky/${offer.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <OfferLogo
                    logo={offer.logo}
                    name={offer.name}
                    size="search"
                    alt={offer.name}
                    fallback="plain"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-navy truncate">{offer.name}</p>
                      {offer.promoCode && (
                        <span className="rounded bg-navy px-1.5 py-0.5 text-[10px] font-mono font-bold text-green shrink-0">
                          {offer.promoCode}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-green-dark font-medium truncate">
                      {offer.bonus || offer.category.name}
                    </p>
                  </div>
                  <span aria-hidden="true" className="text-slate-400 text-xs shrink-0">
                    →
                  </span>
                </Link>
              ))}

              {results.articles.length > 0 && (
                <div className="bg-slate-50/60">
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Články a návody
                  </div>
                  {results.articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      onClick={closeSearch}
                      className="block px-4 py-2.5 hover:bg-white transition-colors"
                    >
                      <p className="text-xs font-semibold text-navy line-clamp-1">{article.title}</p>
                      <span className="text-[11px] text-slate-400">{article.category.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {!loading && !hasResults && query.trim() && (
                <div className="px-4 py-8 text-center text-xs text-slate-500">
                  Pro výraz „{query.trim()}“ jsme nic nenašli. Zkuste např. <strong>banka</strong>, <strong>iPhone</strong> nebo <strong>ETF</strong>.
                </div>
              )}
            </div>

            {query.trim() && (
              <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                <Link
                  href={`/hledani?q=${encodeURIComponent(query.trim())}`}
                  onClick={closeSearch}
                  className="block text-center text-xs font-bold text-green-dark hover:text-green transition-colors"
                >
                  Zobrazit všechny výsledky hledání →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
