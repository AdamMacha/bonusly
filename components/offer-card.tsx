import Link from "next/link";
import Image from "next/image";

interface OfferCardProps {
  slug: string;
  name: string;
  shortDescription: string;
  logo?: string | null;
  bonus?: string | null;
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
  categoryName,
  verified,
  featured,
}: OfferCardProps) {
  return (
    <Link
      href={`/nabidky/${slug}`}
      className={`group relative flex flex-col rounded-xl border bg-white p-5 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 ${
        featured
          ? "border-green/20 shadow-sm shadow-green/5"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {featured && (
        <div className="absolute -top-2.5 left-4 inline-flex items-center rounded-full bg-green px-2.5 py-0.5 text-[10px] font-semibold text-navy uppercase tracking-wider">
          Doporučujeme
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100">
          {logo ? (
            <Image
              src={logo}
              alt={name}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-slate-400">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy group-hover:text-green-dark transition-colors truncate">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500 line-clamp-2">
            {shortDescription}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
          {categoryName}
        </span>
        <div className="flex items-center gap-2">
          {verified && (
            <span className="inline-flex items-center gap-1 text-xs text-green-dark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
              </svg>
              Ověřeno
            </span>
          )}
        </div>
      </div>

      {bonus && (
        <div className="mt-3 rounded-lg bg-green/5 border border-green/10 px-3 py-2">
          <p className="text-sm font-medium text-green-dark">{bonus}</p>
        </div>
      )}
    </Link>
  );
}
