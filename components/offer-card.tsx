import Link from "next/link";
import { OfferLogo } from "./offer-logo";

interface OfferCardProps {
  slug: string;
  name: string;
  shortDescription: string;
  logo?: string | null;
  bonus?: string | null;
  promoCode?: string | null;
  rating?: number | null;
  categoryName: string;
  verified: boolean;
  featured?: boolean;
}

export function OfferCard({
  slug,
  name,
  shortDescription,
  logo,
  bonus,
  promoCode,
  rating,
  categoryName,
  verified,
  featured,
}: OfferCardProps) {
  return (
    <Link
      href={`/nabidky/${slug}`}
      className={`group relative flex flex-col justify-between rounded-xl border bg-white p-5 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 ${
        featured
          ? "border-green/25 shadow-sm shadow-green/5"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {featured && (
        <div className="absolute -top-2.5 left-4 inline-flex items-center rounded-full bg-green px-2.5 py-0.5 text-[10px] font-bold text-navy uppercase tracking-wider shadow-xs">
          Doporučujeme
        </div>
      )}

      {promoCode && (
        <div className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold text-green uppercase tracking-wider shadow-xs">
          <span>Kód: {promoCode}</span>
        </div>
      )}

      <div>
        <div className="flex items-start gap-3.5">
          <OfferLogo logo={logo} name={name} size="card" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-navy group-hover:text-green-dark transition-colors truncate">
              {name}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500 line-clamp-2">
              {shortDescription}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 truncate">
            {categoryName}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {rating && (
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-amber-600">
                <span aria-hidden="true">★</span> {rating.toFixed(1)}
              </span>
            )}
            {verified && (
              <span className="inline-flex items-center gap-1 text-xs text-green-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Ověřeno
              </span>
            )}
          </div>
        </div>
      </div>

      {bonus && (
        <div className="mt-3 rounded-lg bg-green/5 border border-green/15 px-3 py-2 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-green-dark line-clamp-1">{bonus}</p>
          <span
            aria-hidden="true"
            className="text-green-dark text-xs font-bold shrink-0 transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      )}
    </Link>
  );
}
