"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const leadSchema = z.object({
  name: z.string().min(2, "Zadejte prosím své jméno a příjmení"),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
  phone: z.string().optional(),
  offerSlug: z.string().default("tipsport"),
});

export async function submitLead(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    offerSlug: formData.get("offerSlug") || "tipsport",
  };

  const parsed = leadSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Chyba ve formuláři" };
  }

  const { name, email, phone, offerSlug } = parsed.data;

  // Find offer if exists
  const offer = await prisma.offer.findUnique({
    where: { slug: offerSlug },
    select: { id: true },
  });

  await prisma.lead.create({
    data: {
      name,
      email,
      phone: phone || null,
      offerId: offer?.id || null,
      status: "NEW",
    },
  });

  revalidatePath("/admin/leady");
  return { success: true, message: "Pozvánka byla úspěšně vyžádána! Obratem ji zpracujeme a odešleme." };
}
