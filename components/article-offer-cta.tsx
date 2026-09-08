import Image from "next/image";
import Link from "next/link";

export interface ArticleOfferData {
  id: string;
  name: string;
  slug: string;
  trackingSlug: string;
  logo?: string | null;
  bonus?: string | null;
  bonusDescription?: string | null;
  shortDescription: string;
  rating?: number | null;
  verified: boolean;
  category?: { name: string; slug: string };
}

interface ArticleOfferCtaProps {
  offer: ArticleOfferData;
}

/**
 * Hlavní konverzní box nabídky umístěný v úvodu článku.
 */
export function ArticleOfferHeroCta({ offer }: ArticleOfferCtaProps) {
  return (
    <aside className="my-8 rounded-2xl border-2 border-green/30 bg-gradient-to-br from-emerald-50/60 via-white to-slate-50/50 p-5 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-green/50">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-emerald-100/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-0.5 text-xs font-bold text-green-dark">
            <span className="text-sm">⚡</span> Doporučená nabídka k článku
          </span>
          {offer.verified && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <svg
                className="w-4 h-4 text-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              100% ověřeno
            </span>
          )}
        </div>
        {offer.rating && (
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
            <span>★</span> {offer.rating.toFixed(1)} / 5.0
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        {/* Offer info */}
        <div className="flex items-start gap-4">
          {offer.logo ? (
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex-shrink-0 overflow-hidden p-2">
              <Image
                src={offer.logo}
                alt={offer.name}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
              {offer.name.charAt(0)}
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-navy leading-tight">
              {offer.name}
            </h3>
            {offer.bonus ? (
              <div className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-green-dark bg-green/10 px-2.5 py-0.5 rounded-lg">
                <span>🎁</span> {offer.bonus}
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {offer.shortDescription}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 max-w-md">
              {offer.bonusDescription || offer.shortDescription}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2 flex-shrink-0 pt-2 sm:pt-0">
          <a
            href={`/go/${offer.trackingSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy hover:bg-slate-800 text-white px-6 py-3 text-sm font-bold shadow-md shadow-navy/20 hover:shadow-lg transition-all active:scale-98 text-center"
          >
            <span>Získat bonus a přejít na web</span>
            <svg
              className="w-4 h-4 text-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <Link
            href={`/nabidky/${offer.slug}`}
            className="text-xs font-semibold text-slate-500 hover:text-navy transition-colors text-center sm:text-right"
          >
            Přečíst si celou recenzi nabídky →
          </Link>
        </div>
      </div>
    </aside>
  );
}

/**
 * Závěrečný konverzní box na konci článku s rekapitulací postupu získání bonusu.
 */
export function ArticleOfferBottomCta({ offer }: ArticleOfferCtaProps) {
  return (
    <section className="my-12 rounded-3xl bg-gradient-to-tr from-navy via-slate-900 to-slate-800 text-white p-7 sm:p-10 shadow-xl overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-green mb-4 backdrop-blur-xs">
          <span>✨</span> Závěrečné shrnutí & aktivace bonusu
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              Chcete využít nabídku <span className="text-green">{offer.name}</span>?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {offer.bonus
                ? `Získejte ${offer.bonus}. Pro garanci uvítacího bonusu stačí přejít přes náš ověřený partnerský odkaz.`
                : "Využijte ověřený odkaz s nejvýhodnějšími podmínkami pro nové uživatele."}
            </p>

            {/* Quick steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-3">
                <span className="w-5 h-5 rounded-full bg-green text-navy font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <span>Přejděte přes odkaz níže</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-3">
                <span className="w-5 h-5 rounded-full bg-green text-navy font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <span>Dokončete registraci</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-3">
                <span className="w-5 h-5 rounded-full bg-green text-navy font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <span>Bonus vám bude připsán</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href={`/go/${offer.trackingSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-green hover:bg-green-light px-7 py-4 text-base font-extrabold text-navy shadow-lg shadow-green/30 hover:shadow-green/50 transition-all active:scale-98 text-center"
            >
              <span>Aktivovat bonus na webu</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <Link
              href={`/nabidky/${offer.slug}`}
              className="text-xs text-slate-400 hover:text-white transition-colors text-center"
            >
              Podrobné parametry a recenze nabídky →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
