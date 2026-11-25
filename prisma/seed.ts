import { PrismaClient } from "@prisma/client";
import { syncCollaborations } from "./sync-collaborations";
import { ARTICLES_PART_1 } from "./data/articles-part1";
import { ARTICLES_PART_2 } from "./data/articles-part2";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Začíná kompletní seedování databáze BONUSLY...");

  // 1. Vytvoření/aktualizace podepsaného autora (E-E-A-T Person)
  const author = await prisma.author.upsert({
    where: { slug: "adam-macha" },
    update: {
      name: "Adam Mácha",
      bio: "Zakladatel a hlavní analytik portálu BONUSLY.cz. Dlouhodobě testuje české bankovní účty, investiční platformy, slevové akce a možnosti flexibilního přivýdělku v ČR.",
      avatar: null,
    },
    create: {
      name: "Adam Mácha",
      slug: "adam-macha",
      bio: "Zakladatel a hlavní analytik portálu BONUSLY.cz. Dlouhodobě testuje české bankovní účty, investiční platformy, slevové akce a možnosti flexibilního přivýdělku v ČR.",
      avatar: null,
    },
  });

  // 2. Synchronizace všech 8 kategorií, 41 nabídek, 14 promo akcí a 113 FAQ z Excelu
  const { categoryMap } = await syncCollaborations(prisma);

  const offerBySlug = new Map(
    (await prisma.offer.findMany({ select: { id: true, slug: true } })).map((o) => [o.slug, o.id])
  );

  // 3. Synchronizace 7 hloubkových SEO průvodců (1 200+ slov, TOC, tabulky, FAQ)
  const allArticles = [...ARTICLES_PART_1, ...ARTICLES_PART_2];

  for (const a of allArticles) {
    const categoryId = categoryMap.get(a.categorySlug);
    if (!categoryId) continue;
    const offerId = offerBySlug.get(a.offerSlug) ?? null;

    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        featuredImage: a.featuredImage,
        categoryId,
        authorId: author.id,
        offerId,
        publishedAt: new Date(a.publishedAt),
        featured: a.featured,
        draft: false,
        keywords: a.keywords,
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
      },
      create: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        featuredImage: a.featuredImage,
        categoryId,
        authorId: author.id,
        offerId,
        publishedAt: new Date(a.publishedAt),
        featured: a.featured,
        draft: false,
        keywords: a.keywords,
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
      },
    });
  }

  console.log(`✅ Synchronizováno hloubkových SEO článků: ${allArticles.length}`);
  console.log("✅ Kompletní seedování databáze BONUSLY dokončeno!");
}

main()
  .catch((e) => {
    console.error("❌ Chyba při seedování:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
