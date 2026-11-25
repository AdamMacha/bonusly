"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

export function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ offers: SearchOffer[]; articles: SearchArticle[] }>({
    offers: [],
    articles: [],
  });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Zavření kliknutím mimo nebo klávesou Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Živý našeptávač s debouncem 180 ms
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setResults({
            offers: Array.isArray(data.offers) ? data.offers : [],
            articles: Array.isArray(data.articles) ? data.articles : [],
          });
        }
      } catch {
        // Ignore aborted fetch
      } finally {
        setLoading(false);
      }
    }, query.trim() ? 180 : 0);

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

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-slate-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
        aria-label="Hledat nabídky a kódy"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <span className="hidden xl:inline text-xs text-slate-400">Hledat...</span>
      </button>
    );
  }

  const hasResults = results.offers.length > 0 || results.articles.length > 0;

  return (
    <div ref={containerRef} className="relative">
      <search>
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat Revolut, iPhone, bonus..."
            className="w-56 lg:w-72 rounded-lg bg-white/15 border border-green/40 px-3 py-1.5 text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green/40 transition-all"
            aria-label="Vyhledávání nabídek a článků"
            autoComplete="off"
          />
        </form>
      </search>

      {/* Instant Live Dropdown */}
      <div
        role="region"
        aria-label="Výsledky vyhledávání"
        className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50"
      >
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {query.trim() ? `Výsledky pro „${query.trim()}“` : "Populární nabídky"}
          </span>
          {loading && <span className="text-[11px] text-green-dark font-medium">Hledám...</span>}
        </div>

        <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100">
          {results.offers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/nabidky/${offer.slug}`}
              onClick={closeSearch}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 border border-slate-200/70">
                {offer.logo ? (
                  <Image
                    src={offer.logo}
                    alt={offer.name}
                    width={24}
                    height={24}
                    unoptimized={offer.logo.endsWith(".svg")}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-xs font-extrabold text-navy">
                    {offer.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy truncate">{offer.name}</p>
                  {offer.promoCode && (
                    <span className="rounded bg-navy px-1.5 py-0.5 text-[10px] font-bold text-green shrink-0">
                      {offer.promoCode}
                    </span>
                  )}
                </div>
                <p className="text-xs text-green-dark font-medium truncate">
                  {offer.bonus || offer.category.name}
                </p>
              </div>
              <span aria-hidden="true" className="text-slate-300 text-xs">
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
            <div className="px-4 py-6 text-center text-xs text-slate-500">
              Pro výraz „{query.trim()}“ jsme nic nenašli.
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
  );
}
