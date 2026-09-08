import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { OfferGrid } from "@/components/offer-grid";
import { ArticleGrid } from "@/components/article-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Hledání",
  robots: { index: false, follow: true },
};

type SearchOffer = Prisma.OfferGetPayload<{ include: { category: true } }>;
type SearchArticle = Prisma.ArticleGetPayload<{ include: { category: true; author: true } }>;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function HledaniPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let offers: SearchOffer[] = [];
  let articles: SearchArticle[] = [];

  if (query) {
    [offers, articles] = await Promise.all([
      prisma.offer.findMany({
        where: {
          active: true,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { shortDescription: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        include: { category: true },
        take: 20,
      }),
      prisma.article.findMany({
        where: {
          draft: false,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        include: { category: true, author: true },
        take: 20,
      }),
    ]);
  }

  const totalResults = offers.length + articles.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Hledání" }]} />

      <h1 className="text-3xl font-bold text-navy tracking-tight mb-2">
        {query ? `Výsledky pro „${query}"` : "Hledání"}
      </h1>

      {query ? (
        <p className="text-slate-500 mb-10">
          {totalResults === 0
            ? "Nebyla nalezena žádná nabídka ani článek."
            : `Nalezeno ${totalResults} ${totalResults === 1 ? "výsledek" : "výsledků"}.`}
        </p>
      ) : (
        <p className="text-slate-500 mb-10">Zadejte hledaný výraz do vyhledávacího pole v navigaci.</p>
      )}

      {offers.length > 0 && (
        <div className="mb-12">
          <OfferGrid offers={offers} title="Nabídky" />
        </div>
      )}

      {articles.length > 0 && (
        <ArticleGrid articles={articles} title="Články" />
      )}

      {query && totalResults === 0 && (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-slate-200 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-lg font-medium text-slate-600">Nic jsme nenašli</p>
          <p className="mt-2 text-sm text-slate-400">Zkuste upravit hledaný výraz nebo procházejte nabídky.</p>
        </div>
      )}
    </div>
  );
}
