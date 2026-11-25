import { PrismaClient } from "@prisma/client";
import { SEO_ARTICLES } from "./data/articles-seo";

export async function syncSeoArticles(prisma: PrismaClient) {
  console.log("📝 Synchronizuji SEO články do databáze...");

  for (const item of SEO_ARTICLES) {
    const [category, author, offer] = await Promise.all([
      prisma.category.findUnique({ where: { slug: item.categorySlug } }),
      prisma.author.findUnique({ where: { slug: item.authorSlug } }),
      prisma.offer.findUnique({ where: { slug: item.offerSlug } }),
    ]);

    if (!category) {
      throw new Error(`Neznámá kategorie "${item.categorySlug}" u článku "${item.slug}"`);
    }
    if (!author) {
      throw new Error(`Neznámý autor "${item.authorSlug}" u článku "${item.slug}"`);
    }

    await prisma.article.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        featuredImage: item.featuredImage,
        categoryId: category.id,
        authorId: author.id,
        offerId: offer?.id ?? null,
        featured: item.featured,
        draft: item.draft,
        publishedAt: new Date(item.publishedAt),
        keywords: item.keywords,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      },
      create: {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        featuredImage: item.featuredImage,
        categoryId: category.id,
        authorId: author.id,
        offerId: offer?.id ?? null,
        featured: item.featured,
        draft: item.draft,
        publishedAt: new Date(item.publishedAt),
        keywords: item.keywords,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      },
    });

    console.log(`✅ Článek synchronizován: /blog/${item.slug} (${item.seoTitle.length} znaků seoTitle)`);
  }
}

const isDirectRun =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].endsWith("sync-articles.ts");

if (isDirectRun) {
  const prisma = new PrismaClient();
  syncSeoArticles(prisma)
    .catch((e) => {
      console.error("❌ Chyba při synchronizaci článků:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
