export const GA_MEASUREMENT_ID = "G-GBRBJQJMVY";
export const GTM_CONTAINER_ID = "GTM-P2DX3ZQB";

type GaParamValue = string | number | boolean | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function isAdminPath(pathname?: string | null): boolean {
  const path =
    pathname ??
    (typeof window !== "undefined" ? window.location.pathname : "");
  return path === "/admin" || path.startsWith("/admin/");
}

export function setGaDisabledForPath(pathname?: string | null): void {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = isAdminPath(pathname);
}

export function trackEvent(
  eventName: string,
  params?: Record<string, GaParamValue>
): void {
  if (typeof window === "undefined" || isAdminPath()) return;

  const cleanParams: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        cleanParams[key] = value;
      }
    }
  }

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanParams);
  } else {
    // GTM / gtag.js processes queued Arguments-like commands in dataLayer
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("event", eventName, cleanParams);
  }
}

export interface AffiliateClickPayload {
  offerSlug: string;
  promoSlug?: string;
  linkUrl: string;
  sourcePage?: string;
  offerCategory?: string;
  hasCashback?: boolean;
  ctaLocation?: string;
}

export function trackAffiliateClick(payload: AffiliateClickPayload): void {
  const sourcePage =
    payload.sourcePage ??
    (typeof window !== "undefined" ? window.location.pathname : undefined);

  trackEvent("affiliate_click", {
    offer_slug: payload.offerSlug,
    promo_slug: payload.promoSlug,
    link_url: payload.linkUrl,
    source_page: sourcePage,
    offer_category: payload.offerCategory,
    has_cashback:
      payload.hasCashback !== undefined
        ? payload.hasCashback
          ? "true"
          : "false"
        : undefined,
    cta_location: payload.ctaLocation,
  });
}

export function trackPromoCodeCopy(payload: {
  promoCode: string;
  offerSlug?: string;
  sourcePage?: string;
}): void {
  const sourcePage =
    payload.sourcePage ??
    (typeof window !== "undefined" ? window.location.pathname : undefined);

  trackEvent("promo_code_copy", {
    promo_code: payload.promoCode,
    offer_slug: payload.offerSlug,
    source_page: sourcePage,
  });
}

export function trackSignUp(payload?: {
  method?: string;
  sourcePage?: string;
}): void {
  const sourcePage =
    payload?.sourcePage ??
    (typeof window !== "undefined" ? window.location.pathname : undefined);

  trackEvent("sign_up", {
    method: payload?.method ?? "magic_link",
    source_page: sourcePage,
  });
}

export function trackSignUpInitiated(sourcePage?: string): void {
  trackEvent("sign_up_initiated", {
    method: "magic_link",
    source_page:
      sourcePage ??
      (typeof window !== "undefined" ? window.location.pathname : undefined),
  });
}

export function trackCalculatorCalculate(payload: {
  selectedCount: number;
  totalBonus: number;
  oneTimeBonus: number;
  yearlyCashback: number;
  monthlySpend: number;
}): void {
  trackEvent("calculator_calculate", {
    selected_count: payload.selectedCount,
    total_bonus_czk: payload.totalBonus,
    one_time_bonus_czk: payload.oneTimeBonus,
    yearly_cashback_czk: payload.yearlyCashback,
    monthly_spend_czk: payload.monthlySpend,
    source_page:
      typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

export function trackNewsletterSignup(sourcePage?: string): void {
  trackEvent("newsletter_signup", {
    source_page:
      sourcePage ??
      (typeof window !== "undefined" ? window.location.pathname : undefined),
  });
}

export function trackLeadSubmit(payload: {
  offerSlug: string;
  sourcePage?: string;
}): void {
  trackEvent("lead_submit", {
    offer_slug: payload.offerSlug,
    source_page:
      payload.sourcePage ??
      (typeof window !== "undefined" ? window.location.pathname : undefined),
  });
}
