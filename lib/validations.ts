import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Zadejte platný email"),
});

export const searchSchema = z.object({
  q: z.string().min(1).max(100),
});

export const offerSchema = z.object({
  name: z.string().min(1, "Název je povinný"),
  slug: z.string().min(1, "Slug je povinný"),
  shortDescription: z.string().min(1, "Krátký popis je povinný"),
  description: z.string().min(1, "Popis je povinný"),
  categoryId: z.string().min(1, "Kategorie je povinná"),
  logo: z.string().optional(),
  bonus: z.string().optional(),
  bonusDescription: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  referralUrl: z.string().url("Zadejte platnou URL"),
  affiliateUrl: z.string().url().optional().or(z.literal("")),
  trackingSlug: z.string().min(1, "Tracking slug je povinný"),
  rating: z.number().min(0).max(5).optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  verified: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const articleSchema = z.object({
  title: z.string().min(1, "Název je povinný"),
  slug: z.string().min(1, "Slug je povinný"),
  excerpt: z.string().min(1, "Výtah je povinný"),
  content: z.string().min(1, "Obsah je povinný"),
  featuredImage: z.string().optional(),
  categoryId: z.string().min(1, "Kategorie je povinná"),
  authorId: z.string().min(1, "Autor je povinný"),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  keywords: z.array(z.string()).default([]),
  publishedAt: z.string().optional().or(z.date()).nullable(),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type OfferInput = z.infer<typeof offerSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
