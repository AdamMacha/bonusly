"use server";

import { redirect } from "next/navigation";
import { verifyAdminPassword, createAdminSession, destroyAdminSession } from "@/lib/auth";

export interface LoginActionState {
  error?: string;
  success?: boolean;
}

export async function loginAdmin(
  prevState: LoginActionState | null,
  formData: FormData
): Promise<LoginActionState> {
  const password = formData.get("password") as string;
  const from = (formData.get("from") as string) || "/admin";

  if (!password || password.trim() === "") {
    return { error: "Zadejte heslo administrátora." };
  }

  if (!verifyAdminPassword(password)) {
    return { error: "Nesprávné heslo. Zkuste to prosím znovu." };
  }

  await createAdminSession(password);

  // Bezpečné přesměrování pouze na interní URL v rámci /admin
  const safeRedirect = from.startsWith("/admin") ? from : "/admin";
  redirect(safeRedirect);
}

export async function logoutAdmin() {
  await destroyAdminSession();
  redirect("/admin/login");
}
