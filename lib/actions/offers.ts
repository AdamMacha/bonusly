"use server";

import { prisma } from "@/lib/db";
import { offerSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOffer(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const data = offerSchema.parse({
    ...raw,
    requirements: raw.requirements ? String(raw.requirements).split("\n").filter(Boolean) : [],
    pros: raw.pros ? String(raw.pros).split("\n").filter(Boolean) : [],
    cons: raw.cons ? String(raw.cons).split("\n").filter(Boolean) : [],
    featured: raw.featured === "on",
    active: raw.active === "on" || raw.active === undefined,
    verified: raw.verified === "on",
    rating: raw.rating ? parseFloat(String(raw.rating)) : undefined,
  });

  await prisma.offer.create({ data });
  revalidatePath("/admin/nabidky");
  revalidatePath("/nabidky");
  redirect("/admin/nabidky");
}

export async function updateOffer(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const data = offerSchema.parse({
    ...raw,
    requirements: raw.requirements ? String(raw.requirements).split("\n").filter(Boolean) : [],
    pros: raw.pros ? String(raw.pros).split("\n").filter(Boolean) : [],
    cons: raw.cons ? String(raw.cons).split("\n").filter(Boolean) : [],
    featured: raw.featured === "on",
    active: raw.active === "on",
    verified: raw.verified === "on",
    rating: raw.rating ? parseFloat(String(raw.rating)) : undefined,
  });

  await prisma.offer.update({ where: { id }, data });
  revalidatePath("/admin/nabidky");
  revalidatePath("/nabidky");
  revalidatePath(`/nabidky/${data.slug}`);
  redirect("/admin/nabidky");
}

export async function deleteOffer(id: string) {
  await prisma.offer.delete({ where: { id } });
  revalidatePath("/admin/nabidky");
  revalidatePath("/nabidky");
  redirect("/admin/nabidky");
}
