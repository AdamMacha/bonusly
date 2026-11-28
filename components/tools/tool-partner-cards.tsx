import Link from "next/link";
import { prisma } from "@/lib/db";
import { OfferLogo } from "@/components/offer-logo";
import { CtaButton } from "@/components/cta-button";

interface ToolPartnerCardsProps {
  slugs: string[];
  title: string;
  subtitle: string;
  gaLocation: string;
}

export async function ToolPartnerCards({
  slugs,
  title,
  subtitle,
  gaLocation,
}: ToolPartnerCardsProps) {
  const offers = await prisma.offer.findMany({
    where: {
      active: true,
      slug: { in: slugs },
    },
    select: {
      id: true,
      slug: true,
      trackingSlug: true,
      name: true,
      logo: true,
      bonus: true,
      shortDescription: true,
      cashbackAllowed: true,
      userCashbackLabel: true,
      ctaLabel: true,
      category: { select: { name: true } },
    },
  });

  if (offers.length === 0) return null;

  const ordered = slugs
    .map((slug) => offers.find((o) => o.slug === slug))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  return (
    <section className="mt-14" aria-labelledby="tool-partners-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-0.5 text-xs font-bold text-green-dark mb-2">
            ✨ Ověřené nabídky k tomuto nástroji
          </span>
          <h2 id="tool-partners-heading" className="text-2xl font-extrabold text-navy tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        <Link
          href="/nabidky"
          className="text-sm font-semibold text-green-dark hover:text-green transition-colors whitespace-nowrap"
        >
          Všechny nabídky →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ordered.map((offer) => (
          <article
            key={offer.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-green/40 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <OfferLogo logo={offer.logo} name={offer.name} size="search" />
                <div className="min-w-0">
                  <Link
                    href={`/nabidky/${offer.slug}`}
                    className="block text-sm font-bold text-navy hover:text-green-dark transition-colors truncate"
                  >
                    {offer.name}
                  </Link>
                  <span className="block text-[11px] text-slate-400 truncate">
                    {offer.category.name}
                  </span>
                </div>
              </div>

              <p className="text-sm font-bold text-green-dark leading-snug">{offer.bonus}</p>

              {offer.cashbackAllowed && offer.userCashbackLabel && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                  💰 {offer.userCashbackLabel}
                </span>
              )}

              <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                {offer.shortDescription}
              </p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href={`/nabidky/${offer.slug}`}
                className="text-xs font-semibold text-slate-500 hover:text-navy transition-colors"
              >
                Detail & podmínky →
              </Link>
              <CtaButton
                href={`/go/${offer.trackingSlug}`}
                size="sm"
                gaOfferSlug={offer.slug}
                gaCategory={offer.category.name}
                gaHasCashback={Boolean(offer.cashbackAllowed && offer.userCashbackLabel)}
                gaLocation={gaLocation}
              >
                {offer.ctaLabel || "Získat nabídku"}
              </CtaButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
