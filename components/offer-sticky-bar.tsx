"use client";

import { useState } from "react";
import { CopyCodeButton } from "./copy-code-button";

interface OfferStickyBarProps {
  name: string;
  bonus?: string | null;
  promoCode?: string | null;
  ctaLabel?: string | null;
  href: string;
}

export function OfferStickyBar({
  name,
  bonus,
  promoCode,
  ctaLabel,
  href,
}: OfferStickyBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const shortCta =
    ctaLabel && ctaLabel.length <= 20 ? ctaLabel : "Získat nabídku";

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-3 py-2.5 shadow-2xl lg:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-navy">{name}</p>
          {bonus && (
            <p className="truncate text-[11px] font-medium text-green-dark">{bonus}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {promoCode && (
            <CopyCodeButton
              code={promoCode}
              size="sm"
              className="hidden sm:inline-flex"
            />
          )}
          <a
            href={href}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-green px-3.5 py-2 text-xs font-bold text-navy shadow-md shadow-green/20 hover:bg-green-light transition-all whitespace-nowrap"
          >
            <span>{shortCta}</span>
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Zavřít lištu"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg shrink-0"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
