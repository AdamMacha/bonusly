import Image from "next/image";

export type OfferLogoSize =
  | "card"
  | "detail"
  | "search"
  | "comparison"
  | "cta"
  | "sticky";

interface OfferLogoProps {
  logo?: string | null;
  name: string;
  size?: OfferLogoSize;
  preload?: boolean;
  alt?: string;
  fallback?: "monogram" | "navy-initial" | "plain" | "none";
}

const WIDE_LOGOS = new Set([
  "/logos/brilianty.png",
  "/logos/iphonemarket.png",
  "/logos/jabkolevne.png",
  "/logos/vodafone.png",
  "/logos/csob-pojistovna.png",
  "/logos/stalynajem.png",
  "/logos/rondainvest.png",
  "/logos/patria-finance.png",
  "/logos/spime.png",
  "/logos/dronpro.png",
  "/logos/ministerstvo-hracek.png",
  "/logos/originalnipneu.png",
  "/logos/ventilatory.png",
  "/logos/marimex.png",
  "/logos/istyle.png",
  "/logos/eroticcity.png",
  "/logos/aliexpress.png",
  "/logos/sencor.png",
  "/logos/eon.png",
  "/logos/innogy.png",
  "/logos/flowpay.png",
  "/logos/roier.png",
  "/logos/banggood.png",
  "/logos/portu-gallery.png",
  "/logos/portu-ehub.png",
  "/logos/mbank-ehub.png",
  "/logos/raiffeisenbank-ehub.png",
]);

const DARK_LOGOS = new Set([
  "/logos/iphonemarket.png",
  "/logos/jabkolevne.png",
]);

// Některá starší loga mají příponu .png, ale uvnitř jsou vektorová SVG —
// bez unoptimized je Next.js Image proxy zbytečně tahá jako w=3840.
const SVG_CONTENT_LOGOS = new Set([
  "/logos/mbank.png",
  "/logos/portu.png",
  "/logos/wolt.png",
  "/logos/xtb.png",
]);

const monogramColors = [
  "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  "bg-sky-50 text-sky-700 border-sky-200/70",
  "bg-indigo-50 text-indigo-700 border-indigo-200/70",
  "bg-amber-50 text-amber-700 border-amber-200/70",
  "bg-rose-50 text-rose-700 border-rose-200/70",
];

function getMonogramStyle(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % monogramColors.length;
  }
  return monogramColors[Math.abs(hash) % monogramColors.length];
}

const SIZE_CONFIG: Record<
  OfferLogoSize,
  {
    square: string;
    wide: string;
    squareSizes: string;
    wideSizes: string;
    fallbackBox: string;
    fallbackText: string;
  }
> = {
  card: {
    square: "h-12 w-12 rounded-lg p-2",
    wide: "h-12 w-24 sm:w-28 rounded-lg px-2 py-1.5",
    squareSizes: "48px",
    wideSizes: "(max-width: 640px) 96px, 112px",
    fallbackBox: "h-12 w-12 rounded-lg",
    fallbackText: "text-base font-extrabold",
  },
  detail: {
    square: "h-16 w-16 rounded-xl p-2.5 shadow-xs",
    wide: "h-16 w-36 sm:w-40 rounded-xl px-3 py-2 shadow-xs",
    squareSizes: "64px",
    wideSizes: "(max-width: 640px) 144px, 160px",
    fallbackBox: "h-16 w-16 rounded-xl shadow-xs",
    fallbackText: "text-xl font-extrabold",
  },
  search: {
    square: "h-9 w-9 rounded-lg p-1.5",
    wide: "h-9 w-20 rounded-lg px-1.5 py-1",
    squareSizes: "36px",
    wideSizes: "80px",
    fallbackBox: "h-9 w-9 rounded-lg",
    fallbackText: "text-xs font-extrabold",
  },
  comparison: {
    square: "h-14 w-14 rounded-xl p-2",
    wide: "h-14 w-32 rounded-xl px-2.5 py-1.5",
    squareSizes: "56px",
    wideSizes: "128px",
    fallbackBox: "h-14 w-14 rounded-xl",
    fallbackText: "text-lg font-extrabold",
  },
  cta: {
    square: "h-14 w-14 sm:h-16 sm:w-16 rounded-2xl p-2.5 shadow-xs",
    wide: "h-14 w-32 sm:h-16 sm:w-36 rounded-2xl px-3 py-2 shadow-xs",
    squareSizes: "64px",
    wideSizes: "(max-width: 640px) 128px, 144px",
    fallbackBox: "h-14 w-14 rounded-2xl",
    fallbackText: "text-lg font-bold",
  },
  sticky: {
    square: "h-10 w-10 sm:h-11 sm:w-11 rounded-xl p-1.5 shadow-xs",
    wide: "h-10 w-24 sm:h-11 sm:w-28 rounded-xl px-2 py-1 shadow-xs",
    squareSizes: "44px",
    wideSizes: "(max-width: 640px) 96px, 112px",
    fallbackBox: "h-10 w-10 rounded-xl",
    fallbackText: "text-xs font-extrabold",
  },
};

export function OfferLogo({
  logo,
  name,
  size = "card",
  preload = false,
  alt,
  fallback = "monogram",
}: OfferLogoProps) {
  const cfg = SIZE_CONFIG[size];

  if (!logo) {
    if (fallback === "none") return null;

    if (fallback === "navy-initial") {
      return (
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center bg-navy text-white ${cfg.fallbackBox} ${cfg.fallbackText}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      );
    }

    if (fallback === "plain") {
      return (
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center bg-slate-50 border border-slate-200/80 text-navy ${cfg.fallbackBox} ${cfg.fallbackText}`}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
    }

    return (
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center border ${cfg.fallbackBox} ${cfg.fallbackText} ${getMonogramStyle(name)}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  const normalized = logo.split("?")[0];
  const isWide = WIDE_LOGOS.has(normalized);
  const isDark = DARK_LOGOS.has(normalized);
  const surfaceClass = isDark
    ? "bg-black border border-slate-900"
    : "bg-white border border-slate-200/80";

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden ${surfaceClass} ${isWide ? cfg.wide : cfg.square}`}
    >
      <span className="relative block h-full w-full">
        <Image
          src={logo}
          alt={alt ?? `Logo ${name}`}
          fill
          sizes={isWide ? cfg.wideSizes : cfg.squareSizes}
          preload={preload}
          unoptimized={normalized.endsWith(".svg") || SVG_CONTENT_LOGOS.has(normalized)}
          className="object-contain"
        />
      </span>
    </div>
  );
}
