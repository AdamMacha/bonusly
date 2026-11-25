import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CopyCodeButton } from "@/components/copy-code-button";
import { CtaButton } from "@/components/cta-button";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

const canonical = buildCanonical("/akce-a-kupony");

export const metadata: Metadata = {
  title: "Aktuální akce a ověřené slevové kódy 2026",
  description:
    "Ověřené slevové kódy bez registrace (sleva600, SLEVA400, BF2026) a časově omezené akce ČSOB, Vodafone, Patria Finance, mBank a Raiffeisenbank.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Aktuální akce a ověřené slevové kódy 2026 | BONUSLY",
    description:
      "Ověřené slevové kupóny a časově omezené akce na iPhony, šperky, pojištění, tarify, spořicí účty a ETF bez poplatků.",
    images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aktuální akce a ověřené slevové kódy 2026 | BONUSLY",
    description:
      "Ověřené slevové kódy (sleva600, SLEVA400, BF2026) a časově omezené promo akce bez registrace.",
    images: [`${canonical}/opengraph-image`],
  },
};

const hubFaqs = [
  {
    question: "Jsou všechny slevové kódy na této stránce ověřené a funkční?",
    answer:
      "Ano, uvádíme výhradně oficiální partnerské slevové kódy (např. sleva600 na Jabkolevně.cz, SLEVA400 na iPhoneMarket.cz nebo BF2026 na Brilianty.cz) a aktuální promo akce s jasně uvedeným datem platnosti.",
  },
  {
    question: "Jak správně uplatnit slevový kód, aby sleva fungovala?",
    answer:
      "Nejprve zkopírujte slevový kód tlačítkem Kopírovat, přejděte na web partnera přes přiložené zelené tlačítko a kód vložte v nákupním košíku před dokončením objednávky.",
  },
  {
    question: "Musím zadávat kód i u akcí bez uvedeného kupónu?",
    answer:
      "Ne, u promo akcí (např. online sleva 20 % u ČSOB Pojišťovny, Vodafone tarif BezLimitu M nebo Patria ETF bez poplatku) se zvýhodněná nabídka aktivuje automaticky po přechodu přes partnerský odkaz.",
  },
];

export default async function AkceAKuponyPage() {
  const promos = await prisma.offerPromo.findMany({
    where: { active: true, offer: { active: true } },
    include: {
      offer: {
        select: {
          slug: true,
          name: true,
          category: { select: { name: true, slug: true } },
        },
      },
    },
    orderBy: [{ code: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  const codePromos = promos.filter((p) => p.code && p.code.trim().length > 0);
  const dealPromos = promos.filter((p) => !p.code || p.code.trim().length === 0);
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Aktuální akce, promo nabídky a ověřené slevové kódy",
          description:
            "Kompletní seznam ověřených slevových kódů a časově omezených akcí na BONUSLY.",
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: promos.length,
            itemListElement: promos.map((p, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: `${p.offer.name}: ${p.title}`,
              url: `${baseUrl}/nabidky/${p.offer.slug}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Akce a kupóny", item: canonical },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hubFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs items={[{ label: "Akce a kupóny" }]} />

      <header className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3.5 py-1 text-xs font-bold text-green-dark mb-4">
          <span aria-hidden="true">🔥</span> {promos.length} ověřených akcí & kupónů
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
          Aktuální akce a ověřené slevové kódy
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Všechny platné partnerské slevové kódy, Black Friday a vánoční slevy, pojištění se slevou 20 %, výhodné tarify i investice bez poplatků na jednom místě.
        </p>
      </header>

      {/* Section 1: Discount Codes */}
      {codePromos.length > 0 && (
        <section className="mb-14" aria-labelledby="codes-heading">
          <h2 id="codes-heading" className="text-2xl font-bold text-navy tracking-tight mb-6 flex items-center gap-2">
            <span aria-hidden="true">🏷️</span> Ověřené slevové kódy ({codePromos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codePromos.map((promo) => (
              <article
                key={promo.id}
                className="flex flex-col justify-between rounded-2xl border-2 border-green/25 bg-white p-6 shadow-xs hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Link
                      href={`/nabidky/${promo.offer.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-navy"
                    >
                      {promo.offer.name}
                    </Link>
                    {promo.badge && (
                      <span className="inline-flex items-center rounded-full bg-green px-2.5 py-0.5 text-xs font-bold text-navy">
                        {promo.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-navy leading-snug">
                    <Link href={`/nabidky/${promo.offer.slug}`} className="hover:text-green-dark transition-colors">
                      {promo.title}
                    </Link>
                  </h3>
                  {promo.description && (
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{promo.description}</p>
                  )}
                  {promo.validUntil && (
                    <p className="mt-3 text-xs text-slate-400">
                      Platnost do:{" "}
                      <time dateTime={promo.validUntil.toISOString()} className="font-medium text-slate-600">
                        {new Date(promo.validUntil).toLocaleDateString("cs-CZ")}
                      </time>
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                  {promo.code && <CopyCodeButton code={promo.code} className="w-full justify-between" />}
                  <div className="flex items-center justify-between gap-2">
                    <CtaButton href={`/go/promo/${promo.trackingSlug}`} size="sm" className="flex-1">
                      Přejít a uplatnit kód
                    </CtaButton>
                    <Link
                      href={`/nabidky/${promo.offer.slug}`}
                      className="text-xs font-semibold text-slate-500 hover:text-navy px-2 py-2"
                    >
                      Recenze
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Direct Promo Deals */}
      {dealPromos.length > 0 && (
        <section className="mb-16" aria-labelledby="deals-heading">
          <h2 id="deals-heading" className="text-2xl font-bold text-navy tracking-tight mb-6 flex items-center gap-2">
            <span aria-hidden="true">⚡</span> Časově omezené promo akce ({dealPromos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dealPromos.map((promo) => (
              <article
                key={promo.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 hover:border-green/35 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/nabidky/${promo.offer.slug}`}
                        className="text-xs font-bold text-navy hover:text-green-dark"
                      >
                        {promo.offer.name}
                      </Link>
                      <span className="text-slate-300">·</span>
                      <Link
                        href={`/kategorie/${promo.offer.category.slug}`}
                        className="text-xs text-slate-500 hover:text-navy"
                      >
                        {promo.offer.category.name}
                      </Link>
                    </div>
                    {promo.badge && (
                      <span className="inline-flex items-center rounded-full bg-green/15 px-2.5 py-0.5 text-xs font-bold text-green-dark">
                        {promo.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-navy leading-snug">{promo.title}</h3>
                  {promo.description && (
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{promo.description}</p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {promo.validUntil ? (
                      <>
                        Platí do{" "}
                        <time dateTime={promo.validUntil.toISOString()} className="font-semibold text-navy">
                          {new Date(promo.validUntil).toLocaleDateString("cs-CZ")}
                        </time>
                      </>
                    ) : (
                      "Aktuální partnerská nabídka"
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/nabidky/${promo.offer.slug}`}
                      className="text-xs font-semibold text-slate-500 hover:text-navy"
                    >
                      Podrobnosti →
                    </Link>
                    <CtaButton href={`/go/promo/${promo.trackingSlug}`} size="sm">
                      Aktivovat akci
                    </CtaButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-3xl mb-12">
        <Faq items={hubFaqs} title="Časté dotazy k akcím a slevovým kódům" />
      </div>

      <div className="max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
