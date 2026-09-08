"use server";

import { prisma } from "@/lib/db";
import { articleSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const data = articleSchema.parse({
    ...raw,
    keywords: raw.keywords ? String(raw.keywords).split(",").map((k) => k.trim()).filter(Boolean) : [],
    featured: raw.featured === "on",
    draft: raw.draft !== "off",
  });

  await prisma.article.create({
    data: {
      ...data,
      publishedAt: data.draft ? null : new Date(),
    },
  });
  revalidatePath("/admin/clanky");
  revalidatePath("/blog");
  redirect("/admin/clanky");
}

export async function updateArticle(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const data = articleSchema.parse({
    ...raw,
    keywords: raw.keywords ? String(raw.keywords).split(",").map((k) => k.trim()).filter(Boolean) : [],
    featured: raw.featured === "on",
    draft: raw.draft !== "off",
  });

  const existing = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true } });

  await prisma.article.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.draft ? null : existing?.publishedAt || new Date(),
    },
  });
  revalidatePath("/admin/clanky");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/clanky");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/clanky");
  revalidatePath("/blog");
  redirect("/admin/clanky");
}
