import { PrismaClient } from "@prisma/client";
import { CATEGORIES_DATA } from "./data/categories";
import { CORE_OFFERS } from "./data/offers-core";
import { FINANCE_SERVICES_OFFERS } from "./data/offers-finance-services";
import { ESHOP_OFFERS } from "./data/offers-eshops";
import { NEW_EHUB_OFFERS } from "./data/offers-ehub-new";
import { OFFER_CASHBACK_MAP } from "./data/ehub-cashback-map";
import type { OfferSeed } from "./data/types";

export const ALL_OFFERS: OfferSeed[] = [
  ...CORE_OFFERS,
  ...FINANCE_SERVICES_OFFERS,
  ...ESHOP_OFFERS,
  ...NEW_EHUB_OFFERS,
];

export async function syncCollaborations(prisma: PrismaClient) {
  console.log("🔄 Synchronizuji kategorie, nabídky, promo akce a FAQ z spoluprace.xlsx...");

  // 1. Upsert všech 8 kategorií
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES_DATA) {
    const saved = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        icon: cat.icon,
        order: cat.order,
        description: cat.description,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        icon: cat.icon,
        order: cat.order,
        description: cat.description,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
      },
    });
    categoryMap.set(cat.slug, saved.id);
  }
  console.log(`✅ Synchronizováno kategorií: ${CATEGORIES_DATA.length}`);

  // 2. Upsert všech 41 nabídek + jejich FAQ + Sheet 2 Promo akcí
  let promoCount = 0;
  let faqCount = 0;

  for (const offer of ALL_OFFERS) {
    const categoryId = categoryMap.get(offer.categorySlug);
    if (!categoryId) {
      throw new Error(`Neznámá kategorie "${offer.categorySlug}" u nabídky "${offer.slug}"`);
    }

    const cbMeta = OFFER_CASHBACK_MAP[offer.slug];
    const cashbackAllowed = cbMeta ? cbMeta.cashbackAllowed : Boolean(offer.rewardAmount && offer.rewardAmount > 0);

    const savedOffer = await prisma.offer.upsert({
      where: { slug: offer.slug },
      update: {
        name: offer.name,
        shortDescription: offer.shortDescription,
        description: offer.description,
        categoryId,
        logo: offer.logo ?? null,
        bonus: offer.bonus ?? null,
        bonusDescription: offer.bonusDescription ?? null,
        promoCode: offer.promoCode ?? null,
        promoCodeNote: offer.promoCodeNote ?? null,
        ctaLabel: offer.ctaLabel ?? null,
        requirements: offer.requirements,
        pros: offer.pros,
        cons: offer.cons,
        referralUrl: offer.referralUrl,
        affiliateUrl: offer.affiliateUrl ?? null,
        trackingSlug: offer.trackingSlug,
        partnerNetwork: offer.partnerNetwork ?? null,
        rewardAmount: offer.rewardAmount ?? null,
        ehubCampaignId: cbMeta?.ehubCampaignId ?? null,
        cashbackAllowed,
        partnerCommissionRate: cbMeta?.partnerCommissionRate ?? null,
        cashbackSharePct: cbMeta?.cashbackSharePct ?? null,
        userCashbackLabel: cbMeta?.userCashbackLabel ?? null,
        rating: offer.rating,
        featured: offer.featured,
        active: offer.active,
        verified: offer.verified,
        lastVerifiedAt: new Date(),
        seoTitle: offer.seoTitle,
        seoDescription: offer.seoDescription,
      },
      create: {
        slug: offer.slug,
        name: offer.name,
        shortDescription: offer.shortDescription,
        description: offer.description,
        categoryId,
        logo: offer.logo ?? null,
        bonus: offer.bonus ?? null,
        bonusDescription: offer.bonusDescription ?? null,
        promoCode: offer.promoCode ?? null,
        promoCodeNote: offer.promoCodeNote ?? null,
        ctaLabel: offer.ctaLabel ?? null,
        requirements: offer.requirements,
        pros: offer.pros,
        cons: offer.cons,
        referralUrl: offer.referralUrl,
        affiliateUrl: offer.affiliateUrl ?? null,
        trackingSlug: offer.trackingSlug,
        partnerNetwork: offer.partnerNetwork ?? null,
        rewardAmount: offer.rewardAmount ?? null,
        ehubCampaignId: cbMeta?.ehubCampaignId ?? null,
        cashbackAllowed,
        partnerCommissionRate: cbMeta?.partnerCommissionRate ?? null,
        cashbackSharePct: cbMeta?.cashbackSharePct ?? null,
        userCashbackLabel: cbMeta?.userCashbackLabel ?? null,
        rating: offer.rating,
        featured: offer.featured,
        active: offer.active,
        verified: offer.verified,
        lastVerifiedAt: new Date(),
        seoTitle: offer.seoTitle,
        seoDescription: offer.seoDescription,
      },
    });

    // Bezpečně obnovíme FAQ k této nabídce
    await prisma.offerFaq.deleteMany({ where: { offerId: savedOffer.id } });
    if (offer.faq.length > 0) {
      await prisma.offerFaq.createMany({
        data: offer.faq.map((f, idx) => ({
          offerId: savedOffer.id,
          question: f.question,
          answer: f.answer,
          order: idx + 1,
        })),
      });
      faqCount += offer.faq.length;
    }

    // Upsert Sheet 2 promo akcí & kupónů pro tuto nabídku
    if (offer.promos && offer.promos.length > 0) {
      for (const promo of offer.promos) {
        await prisma.offerPromo.upsert({
          where: { trackingSlug: promo.trackingSlug },
          update: {
            offerId: savedOffer.id,
            title: promo.title,
            description: promo.description ?? null,
            badge: promo.badge,
            code: promo.code ?? null,
            validUntil: promo.validUntil ? new Date(`${promo.validUntil}T23:59:59Z`) : null,
            affiliateUrl: promo.affiliateUrl,
            active: true,
            order: promo.order,
          },
          create: {
            offerId: savedOffer.id,
            trackingSlug: promo.trackingSlug,
            title: promo.title,
            description: promo.description ?? null,
            badge: promo.badge,
            code: promo.code ?? null,
            validUntil: promo.validUntil ? new Date(`${promo.validUntil}T23:59:59Z`) : null,
            affiliateUrl: promo.affiliateUrl,
            active: true,
            order: promo.order,
          },
        });
        promoCount++;
      }
    }
  }

  console.log(`✅ Synchronizováno nabídek: ${ALL_OFFERS.length}`);
  console.log(`✅ Synchronizováno promo akcí a kupónů (Sešit 2): ${promoCount}`);
  console.log(`✅ Synchronizováno FAQ otázek: ${faqCount}`);

  return {
    categories: CATEGORIES_DATA.length,
    offers: ALL_OFFERS.length,
    promos: promoCount,
    faqs: faqCount,
    categoryMap,
  };
}

// Přímé spuštění přes `npx tsx prisma/sync-collaborations.ts`
const isDirectRun =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].endsWith("sync-collaborations.ts");

if (isDirectRun) {
  const prisma = new PrismaClient();
  syncCollaborations(prisma)
    .catch((e) => {
      console.error("❌ Chyba při synchronizaci spoluprací:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
