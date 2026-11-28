"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  setGaDisabledForPath,
  trackAffiliateClick,
  trackSignUp,
  trackSignUpInitiated,
} from "@/lib/analytics";

/**
 * Globální GA4 tracker:
 * 1) Vypíná měření GA4 na /admin a /admin/* (včetně klientské navigace).
 * 2) Automaticky zachytává 100 % affiliate prokliků na /go/... a /go/promo/...
 *    včetně Server Components a přiložených data-ga-* atributů.
 */
export function GaTracker() {
  const pathname = usePathname();

  useEffect(() => {
    setGaDisabledForPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href") || "";
      if (!rawHref.startsWith("/go/")) return;

      const cleanPath = rawHref.split("?")[0].split("#")[0];
      const isPromo = cleanPath.startsWith("/go/promo/");
      const slugFromHref = isPromo
        ? cleanPath.slice("/go/promo/".length)
        : cleanPath.slice("/go/".length);

      const offerSlug =
        anchor.dataset.gaOffer || (isPromo ? slugFromHref : slugFromHref);
      const promoSlug = isPromo ? slugFromHref : undefined;
      const offerCategory = anchor.dataset.gaCategory || undefined;
      const hasCashback =
        anchor.dataset.gaCashback === "true"
          ? true
          : anchor.dataset.gaCashback === "false"
            ? false
            : undefined;
      const ctaLocation = anchor.dataset.gaLocation || undefined;

      trackAffiliateClick({
        offerSlug,
        promoSlug,
        linkUrl: rawHref,
        sourcePage: window.location.pathname,
        offerCategory,
        hasCashback,
        ctaLocation,
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}

export function TrackSignUp({
  userId,
  createdAtIso,
}: {
  userId: string;
  createdAtIso: string;
}) {
  useEffect(() => {
    const createdAtMs = Date.parse(createdAtIso);
    if (Number.isNaN(createdAtMs) || Date.now() - createdAtMs > 24 * 60 * 60 * 1000) {
      return;
    }
    const storageKey = `bonusly_ga_signup_${userId}`;
    try {
      if (window.localStorage.getItem(storageKey)) return;
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // Ignore storage access errors in private browsing
    }
    trackSignUp({ method: "magic_link", sourcePage: "/dashboard" });
  }, [userId, createdAtIso]);

  return null;
}

export function TrackSignUpInitiated() {
  useEffect(() => {
    trackSignUpInitiated("/prihlaseni/overeni");
  }, []);

  return null;
}
