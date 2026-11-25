import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferLogo } from "@/components/offer-logo";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButton } from "@/components/cta-button";
import { CopyCodeButton } from "@/components/copy-code-button";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { buildCanonical, CURATED_COMPARISONS, getBaseUrl } from "@/lib/seo";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

const getComparisonOffers = cache(async (slug: string) => {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;

  const [slugA, slugB] = parts;
  const [offerA, offerB] = await Promise.all([
    prisma.offer.findUnique({
      where: { slug: slugA },
      include: { category: true },
    }),
    prisma.offer.findUnique({
      where: { slug: slugB },
      include: { category: true },
    }),
  ]);

  if (!offerA || !offerB || !offerA.active || !offerB.active) return null;
  return { offerA, offerB };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pair = await getComparisonOffers(slug);
  if (!pair) return {};

  const { offerA, offerB } = pair;
  const shortA = offerA.name.replace(/\s+(Chytrý účet|běžný účet|Partner|Hostitel)$/i, "");
  const shortB = offerB.name.replace(/\s+(Chytrý účet|běžný účet|Partner|Hostitel)$/i, "");
  const rawTitle = `${shortA} vs. ${shortB}: Srovnání 2026`;
  const title = rawTitle.length > 51 ? `${shortA} vs. ${shortB} (2026)` : rawTitle;
  const description = `Porovnání ${shortA} a ${shortB} v roce 2026. Zjistěte, kde získáte vyšší bonus, lepší podmínky, nižší poplatky a ověřené výhody.`;
  const canonical = buildCanonical(`/porovnani/${slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | BONUSLY`,
      description,
      images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BONUSLY`,
      description,
      images: [`${canonical}/opengraph-image`],
    },
  };
}

export async function generateStaticParams() {
  return CURATED_COMPARISONS.map((c) => ({ slug: c.slug }));
}

export default async function PorovnaniSlugPage({ params }: Props) {
  const { slug } = await params;
  const pair = await getComparisonOffers(slug);
  if (!pair) notFound();

  const { offerA, offerB } = pair;
  const baseUrl = getBaseUrl();
  const pageUrl = buildCanonical(`/porovnani/${slug}`);

  const faqItems = [
    {
      question: `Co je výhodnější v roce 2026: ${offerA.name} nebo ${offerB.name}?`,
      answer: `${offerA.name} vyniká především nabídkou „${offerA.bonus || offerA.shortDescription}“, zatímco ${offerB.name} boduje díky „${offerB.bonus || offerB.shortDescription}“. Obě služby patří k prověřeným řešením a nic nebrání využít je i současně.`,
    },
    {
      question: `Jaký bonus nabízí ${offerA.name} oproti ${offerB.name}?`,
      answer: `U ${offerA.name} aktuálně získáte: ${offerA.bonus || "standardní zvýhodněnou nabídku"}. U ${offerB.name} je aktuálně k dispozici: ${offerB.bonus || "standardní zvýhodněná nabídka"}.`,
    },
  ];

  const otherComparisons = CURATED_COMPARISONS.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Srovnání", item: `${baseUrl}/porovnani` },
            { "@type": "ListItem", position: 3, name: `${offerA.name} vs. ${offerB.name}`, item: pageUrl },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Srovnání", href: "/porovnani" },
          { label: `${offerA.name} vs. ${offerB.name}` },
        ]}
      />

      <header className="max-w-3xl mb-12">
        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 mb-3">
          {offerA.category.name}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          {offerA.name} vs. {offerB.name}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Objektivní srovnání parametrů, bonusů, slevových kódů a podmínek pro obě služby. Zjistěte, která lépe odpovídá vašim potřebám.
        </p>
      </header>

      {/* Side-by-side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[offerA, offerB].map((offer) => (
          <div
            key={offer.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <OfferLogo logo={offer.logo} name={offer.name} size="comparison" fallback="plain" />
                <div>
                  <h2 className="text-2xl font-bold text-navy">{offer.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {offer.rating && (
                      <span className="text-sm font-semibold text-amber-600">
                        ★ {offer.rating.toFixed(1)} / 5
                      </span>
                    )}
                    {offer.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-dark">
                        ✓ Ověřeno
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6">{offer.shortDescription}</p>

              {offer.bonus && (
                <div className="rounded-xl bg-green/10 border border-green/20 p-4 mb-4">
                  <span className="text-xs font-semibold text-green-dark uppercase tracking-wider block mb-1">
                    Hlavní výhoda / Bonus
                  </span>
                  <span className="text-base font-bold text-navy">{offer.bonus}</span>
                </div>
              )}

              {offer.promoCode && (
                <div className="mb-6">
                  <CopyCodeButton code={offer.promoCode} size="sm" />
                </div>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <CtaButton href={`/go/${offer.trackingSlug}`} size="md" className="w-full">
                {offer.ctaLabel || `Získat ${offer.name}`}
              </CtaButton>
              <Link
                href={`/nabidky/${offer.slug}`}
                className="block text-center text-xs text-slate-500 hover:text-navy font-medium py-1"
              >
                Přečíst celou recenzi a FAQ →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-14 shadow-xs">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-navy">Detailní porovnání parametrů</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="p-4 sm:px-6 w-1/4 font-semibold">Parametr</th>
                <th className="p-4 sm:px-6 w-[37.5%] font-semibold text-navy">{offerA.name}</th>
                <th className="p-4 sm:px-6 w-[37.5%] font-semibold text-navy">{offerB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Hlavní bonus / výhoda</td>
                <td className="p-4 sm:px-6 font-semibold text-green-dark">{offerA.bonus || "—"}</td>
                <td className="p-4 sm:px-6 font-semibold text-green-dark">{offerB.bonus || "—"}</td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Slevový / Promo kód</td>
                <td className="p-4 sm:px-6 font-mono font-bold text-navy">{offerA.promoCode || "Bez kódu"}</td>
                <td className="p-4 sm:px-6 font-mono font-bold text-navy">{offerB.promoCode || "Bez kódu"}</td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Hodnocení redakce</td>
                <td className="p-4 sm:px-6 font-medium text-navy">
                  {offerA.rating ? `★ ${offerA.rating.toFixed(1)} / 5` : "Ověřeno"}
                </td>
                <td className="p-4 sm:px-6 font-medium text-navy">
                  {offerB.rating ? `★ ${offerB.rating.toFixed(1)} / 5` : "Ověřeno"}
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Hlavní výhody</td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1.5">
                    {offerA.pros.slice(0, 4).map((p, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-green font-bold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1.5">
                    {offerB.pros.slice(0, 4).map((p, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-green font-bold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Na co si dát pozor</td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1.5">
                    {offerA.cons.slice(0, 3).map((c, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-red-400 font-bold">✕</span> {c}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1.5">
                    {offerB.cons.slice(0, 3).map((c, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-red-400 font-bold">✕</span> {c}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="max-w-3xl mb-14">
        <Faq items={faqItems} title="Často kladené otázky k tomuto srovnání" />
      </div>

      {/* Other Comparisons */}
      <nav aria-label="Další srovnání" className="mb-12 pt-10 border-t border-slate-100">
        <h2 className="text-lg font-bold text-navy mb-4">Další populární srovnání</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherComparisons.map((item) => (
            <Link
              key={item.slug}
              href={`/porovnani/${item.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:border-green/35 transition-colors"
            >
              <span className="text-[11px] font-medium text-slate-400">{item.category}</span>
              <p className="mt-1 text-sm font-bold text-navy hover:text-green-dark">{item.title}</p>
            </Link>
          ))}
        </div>
      </nav>

      <div className="max-w-2xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
