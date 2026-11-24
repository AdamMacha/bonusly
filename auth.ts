import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { authConfig } from "./auth.config";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM || "BONUSLY <onboarding@resend.dev>",
    }),
    Credentials({
      id: "credentials",
      name: "Rychlé přihlášení",
      credentials: {
        email: { label: "E-mail", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = (credentials.email as string).toLowerCase().trim();

        // Najít nebo vytvořit uživatele
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: email.split("@")[0],
              role: email.includes("admin") ? "ADMIN" : "USER",
            },
          });
        }
        return user;
      },
    }),
  ],
});
