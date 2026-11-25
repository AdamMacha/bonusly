import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Faq } from "@/components/faq";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";
import { PromosHubClient } from "@/components/promos-hub-client";
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
          logo: true,
          category: { select: { name: true, slug: true } },
        },
      },
    },
    orderBy: [{ code: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  const serializedPromos = promos.map((p) => ({
    id: p.id,
    trackingSlug: p.trackingSlug,
    title: p.title,
    description: p.description,
    badge: p.badge,
    code: p.code,
    validUntil: p.validUntil ? p.validUntil.toISOString() : null,
    offer: p.offer,
  }));

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

      <header className="max-w-3xl mb-10">
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

      <PromosHubClient promos={serializedPromos} />

      <div className="max-w-3xl mb-12">
        <Faq items={hubFaqs} title="Časté dotazy k akcím a slevovým kódům" />
      </div>

      <div className="max-w-3xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
