"use client";

import { useState } from "react";
import { OfferLogo } from "./offer-logo";

interface ArticleStickyBarProps {
  offer: {
    name: string;
    slug: string;
    trackingSlug: string;
    logo?: string | null;
    bonus?: string | null;
  };
}

export function ArticleStickyBar({ offer }: ArticleStickyBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-all animate-in slide-in-from-bottom duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2.5 sm:gap-6">
        {/* Left: Offer info */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="hidden sm:block shrink-0">
            <OfferLogo
              logo={offer.logo}
              name={offer.name}
              size="sticky"
              alt={offer.name}
              fallback="none"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-green-dark">
                Bonus k článku
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-navy truncate">
              {offer.name}
              {offer.bonus && (
                <span className="hidden sm:inline font-normal text-slate-500 ml-2">
                  — {offer.bonus}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: CTA Button & Dismiss */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <a
            href={`/go/${offer.trackingSlug}`}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-green px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-navy shadow-md shadow-green/20 hover:bg-green-light hover:shadow-lg transition-all whitespace-nowrap active:scale-95"
          >
            <span className="sm:hidden">Získat bonus</span>
            <span className="hidden sm:inline">Aktivovat bonus</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Zavřít lištu"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
