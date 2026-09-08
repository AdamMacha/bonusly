import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButton } from "@/components/cta-button";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { JsonLd } from "@/components/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return {};

  const [slugA, slugB] = parts;
  const [offerA, offerB] = await Promise.all([
    prisma.offer.findUnique({ where: { slug: slugA }, select: { name: true } }),
    prisma.offer.findUnique({ where: { slug: slugB }, select: { name: true } }),
  ]);

  if (!offerA || !offerB) return {};

  return {
    title: `${offerA.name} vs ${offerB.name}: Velké srovnání a hodnocení`,
    description: `Podrobné porovnání ${offerA.name} a ${offerB.name}. Která nabídka se vám vyplatí více? Bonusy, podmínky, výhody a nevýhody.`,
    openGraph: {
      title: `${offerA.name} vs ${offerB.name} | BONUSLY`,
      description: `Podrobné srovnání nabídek ${offerA.name} a ${offerB.name} na BONUSLY.`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "wolt-kuryr-vs-foodora-kuryr" },
    { slug: "trading-212-vs-xtb" },
    { slug: "revolut-vs-curve" },
    { slug: "raiffeisenbank-vs-air-bank" },
  ];
}

export default async function PorovnaniSlugPage({ params }: Props) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) notFound();

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

  if (!offerA || !offerB) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "BONUSLY", item: process.env.NEXT_PUBLIC_BASE_URL },
            { "@type": "ListItem", position: 2, name: "Srovnání", item: `${process.env.NEXT_PUBLIC_BASE_URL}/porovnani` },
            { "@type": "ListItem", position: 3, name: `${offerA.name} vs ${offerB.name}`, item: `${process.env.NEXT_PUBLIC_BASE_URL}/porovnani/${slug}` },
          ],
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Srovnání", href: "/porovnani" },
          { label: `${offerA.name} vs ${offerB.name}` },
        ]}
      />

      <div className="max-w-3xl mb-12">
        <span className="inline-block rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 mb-3">
          {offerA.category.name}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
          {offerA.name} vs {offerB.name}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Podrobné a objektivní srovnání parametrů, bonusů a podmínek pro obě služby. Vyberte si tu, která lépe odpovídá vašim preferencím.
        </p>
      </div>

      {/* Side-by-side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Offer A */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                {offerA.logo ? (
                  <Image src={offerA.logo} alt={offerA.name} width={40} height={40} className="h-8 w-8 object-contain" />
                ) : (
                  <span className="text-xl font-bold text-slate-400">{offerA.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy">{offerA.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {offerA.rating && (
                    <span className="text-sm font-semibold text-navy">★ {offerA.rating.toFixed(1)} / 5</span>
                  )}
                  {offerA.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-dark">
                      ✓ Ověřeno
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6">{offerA.shortDescription}</p>

            {offerA.bonus && (
              <div className="rounded-xl bg-green/10 border border-green/20 p-4 mb-6">
                <span className="text-xs font-semibold text-green-dark uppercase tracking-wider block mb-1">Bonus</span>
                <span className="text-base font-bold text-navy">{offerA.bonus}</span>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <CtaButton href={`/go/${offerA.trackingSlug}`} size="md" className="w-full">
              Získat {offerA.name}
            </CtaButton>
            <Link
              href={`/nabidky/${offerA.slug}`}
              className="block text-center text-xs text-slate-500 hover:text-navy font-medium py-1"
            >
              Přečíst celou recenzi →
            </Link>
          </div>
        </div>

        {/* Offer B */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                {offerB.logo ? (
                  <Image src={offerB.logo} alt={offerB.name} width={40} height={40} className="h-8 w-8 object-contain" />
                ) : (
                  <span className="text-xl font-bold text-slate-400">{offerB.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy">{offerB.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {offerB.rating && (
                    <span className="text-sm font-semibold text-navy">★ {offerB.rating.toFixed(1)} / 5</span>
                  )}
                  {offerB.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-dark">
                      ✓ Ověřeno
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6">{offerB.shortDescription}</p>

            {offerB.bonus && (
              <div className="rounded-xl bg-green/10 border border-green/20 p-4 mb-6">
                <span className="text-xs font-semibold text-green-dark uppercase tracking-wider block mb-1">Bonus</span>
                <span className="text-base font-bold text-navy">{offerB.bonus}</span>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <CtaButton href={`/go/${offerB.trackingSlug}`} size="md" className="w-full">
              Získat {offerB.name}
            </CtaButton>
            <Link
              href={`/nabidky/${offerB.slug}`}
              className="block text-center text-xs text-slate-500 hover:text-navy font-medium py-1"
            >
              Přečíst celou recenzi →
            </Link>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-16 shadow-xs">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-navy">Detailní porovnání parametrů</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="p-4 sm:px-6 w-1/3 font-semibold">Parametr</th>
                <th className="p-4 sm:px-6 w-1/3 font-semibold text-navy">{offerA.name}</th>
                <th className="p-4 sm:px-6 w-1/3 font-semibold text-navy">{offerB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Hlavní bonus</td>
                <td className="p-4 sm:px-6 font-semibold text-green-dark">{offerA.bonus || "—"}</td>
                <td className="p-4 sm:px-6 font-semibold text-green-dark">{offerB.bonus || "—"}</td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Hodnocení</td>
                <td className="p-4 sm:px-6 font-medium text-navy">{offerA.rating ? `${offerA.rating} / 5` : "Nehodnoceno"}</td>
                <td className="p-4 sm:px-6 font-medium text-navy">{offerB.rating ? `${offerB.rating} / 5` : "Nehodnoceno"}</td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Kategorie</td>
                <td className="p-4 sm:px-6 text-slate-700">{offerA.category.name}</td>
                <td className="p-4 sm:px-6 text-slate-700">{offerB.category.name}</td>
              </tr>
              <tr>
                <td className="p-4 sm:px-6 font-medium text-slate-500">Hlavní výhody</td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1">
                    {offerA.pros.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-green font-bold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1">
                    {offerB.pros.slice(0, 3).map((p, i) => (
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
                  <ul className="space-y-1">
                    {offerA.cons.slice(0, 2).map((c, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-red-400 font-bold">✕</span> {c}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 sm:px-6">
                  <ul className="space-y-1">
                    {offerB.cons.slice(0, 2).map((c, i) => (
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
      </div>

      <div className="max-w-2xl">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
