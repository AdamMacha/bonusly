"use server";

import { prisma } from "@/lib/db";
import { articleSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminAuth } from "@/lib/auth";

export async function createArticle(formData: FormData) {
  await requireAdminAuth();

  const raw = Object.fromEntries(formData.entries());

  const data = articleSchema.parse({
    ...raw,
    keywords: raw.keywords ? String(raw.keywords).split(",").map((k) => k.trim()).filter(Boolean) : [],
    featured: raw.featured === "on",
    draft: raw.draft !== "off",
    offerId: raw.offerId && raw.offerId !== "" && raw.offerId !== "none" ? String(raw.offerId) : null,
  });

  let publishedDate: Date | null = null;
  if (!data.draft) {
    if (raw.publishedAt && String(raw.publishedAt).trim() !== "") {
      publishedDate = new Date(String(raw.publishedAt));
    } else {
      publishedDate = new Date();
    }
  } else if (raw.publishedAt && String(raw.publishedAt).trim() !== "") {
    publishedDate = new Date(String(raw.publishedAt));
  }

  await prisma.article.create({
    data: {
      ...data,
      publishedAt: publishedDate,
    },
  });

  revalidatePath("/admin/clanky");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/clanky");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdminAuth();

  const raw = Object.fromEntries(formData.entries());

  const data = articleSchema.parse({
    ...raw,
    keywords: raw.keywords ? String(raw.keywords).split(",").map((k) => k.trim()).filter(Boolean) : [],
    featured: raw.featured === "on",
    draft: raw.draft !== "off",
    offerId: raw.offerId && raw.offerId !== "" && raw.offerId !== "none" ? String(raw.offerId) : null,
  });

  const existing = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true } });

  let publishedDate: Date | null = null;
  if (!data.draft) {
    if (raw.publishedAt && String(raw.publishedAt).trim() !== "") {
      publishedDate = new Date(String(raw.publishedAt));
    } else {
      publishedDate = existing?.publishedAt || new Date();
    }
  } else if (raw.publishedAt && String(raw.publishedAt).trim() !== "") {
    publishedDate = new Date(String(raw.publishedAt));
  }

  await prisma.article.update({
    where: { id },
    data: {
      ...data,
      publishedAt: publishedDate,
    },
  });

  revalidatePath("/admin/clanky");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/clanky");
}

export async function deleteArticle(id: string) {
  await requireAdminAuth();

  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/clanky");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/clanky");
}
