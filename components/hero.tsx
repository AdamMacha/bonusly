import Link from "next/link";
import { HeroCarousel, type HeroArticle } from "./hero-carousel";

interface HeroProps {
  articles?: HeroArticle[];
}

export function Hero({ articles = [] }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Green glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-green/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6 sm:mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse-green" />
              <span className="text-xs text-slate-400 font-medium">
                Ověřené nabídky · Pravidelně aktualizujeme
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Objev bonusy, přivýdělky{" "}
              <br className="hidden sm:block" />
              a výhody, které se{" "}
              <span className="text-green">vyplatí</span>.
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Porovnáváme zajímavé nabídky, finanční produkty, přivýdělky a bonusy na jednom místě. Vyber si to, co dává smysl právě tobě.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/nabidky"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-6 py-3.5 text-base font-semibold text-navy hover:bg-green-light transition-all hover:shadow-lg hover:shadow-green/20"
              >
                Prozkoumat nabídky
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-base font-medium text-white hover:bg-white/5 transition-colors"
              >
                Přečíst blog
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-500">Populární:</span>
              {[
                { label: "Wolt kurýr", href: "/nabidky/wolt-kuryr" },
                { label: "Trading 212", href: "/nabidky/trading-212" },
                { label: "Revolut", href: "/nabidky/revolut" },
                { label: "Raiffeisenbank", href: "/nabidky/raiffeisenbank" },
                { label: "Přivýdělek", href: "/kategorie/privydelek" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="rounded-full bg-white/5 px-3 py-1 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Auto-rotating Carousel */}
          {articles.length > 0 && (
            <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end">
              <HeroCarousel articles={articles} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
