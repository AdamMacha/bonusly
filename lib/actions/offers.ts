"use server";

import { prisma } from "@/lib/db";
import { offerSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminAuth } from "@/lib/auth";

export async function createOffer(formData: FormData) {
  await requireAdminAuth();

  const raw = Object.fromEntries(formData.entries());

  const data = offerSchema.parse({
    ...raw,
    requirements: raw.requirements ? String(raw.requirements).split("\n").filter(Boolean) : [],
    pros: raw.pros ? String(raw.pros).split("\n").filter(Boolean) : [],
    cons: raw.cons ? String(raw.cons).split("\n").filter(Boolean) : [],
    featured: raw.featured === "on",
    active: raw.active === "on" || raw.active === undefined,
    verified: raw.verified === "on",
    cashbackAllowed: raw.cashbackAllowed === "on",
    ehubCampaignId: raw.ehubCampaignId ? String(raw.ehubCampaignId).trim() : null,
    partnerCommissionRate: raw.partnerCommissionRate ? String(raw.partnerCommissionRate).trim() : null,
    cashbackSharePct: raw.cashbackSharePct ? parseFloat(String(raw.cashbackSharePct)) : null,
    userCashbackLabel: raw.userCashbackLabel ? String(raw.userCashbackLabel).trim() : null,
    rating: raw.rating ? parseFloat(String(raw.rating)) : undefined,
  });

  await prisma.offer.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/nabidky");
  revalidatePath("/admin/provize");
  revalidatePath("/nabidky");
  revalidatePath("/akce-a-kupony");
  revalidatePath("/sitemap.xml");
  revalidatePath("/sitemap_index.xml");
  revalidatePath("/nabidky-sitemap.xml");
  redirect("/admin/nabidky");
}

export async function updateOffer(id: string, formData: FormData) {
  await requireAdminAuth();

  const raw = Object.fromEntries(formData.entries());

  const data = offerSchema.parse({
    ...raw,
    requirements: raw.requirements ? String(raw.requirements).split("\n").filter(Boolean) : [],
    pros: raw.pros ? String(raw.pros).split("\n").filter(Boolean) : [],
    cons: raw.cons ? String(raw.cons).split("\n").filter(Boolean) : [],
    featured: raw.featured === "on",
    active: raw.active === "on",
    verified: raw.verified === "on",
    cashbackAllowed: raw.cashbackAllowed === "on",
    ehubCampaignId: raw.ehubCampaignId ? String(raw.ehubCampaignId).trim() : null,
    partnerCommissionRate: raw.partnerCommissionRate ? String(raw.partnerCommissionRate).trim() : null,
    cashbackSharePct: raw.cashbackSharePct ? parseFloat(String(raw.cashbackSharePct)) : null,
    userCashbackLabel: raw.userCashbackLabel ? String(raw.userCashbackLabel).trim() : null,
    rating: raw.rating ? parseFloat(String(raw.rating)) : undefined,
  });

  await prisma.offer.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/nabidky");
  revalidatePath("/admin/provize");
  revalidatePath("/nabidky");
  revalidatePath("/akce-a-kupony");
  revalidatePath(`/nabidky/${data.slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/nabidky");
}

export async function deleteOffer(id: string) {
  await requireAdminAuth();

  await prisma.offer.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/nabidky");
  revalidatePath("/nabidky");
  revalidatePath("/akce-a-kupony");
  revalidatePath("/sitemap.xml");
  revalidatePath("/sitemap_index.xml");
  revalidatePath("/nabidky-sitemap.xml");
  redirect("/admin/nabidky");
}
