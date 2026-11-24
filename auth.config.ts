import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
        token.balance = (user as any).balance || 0;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id as string) || token.sub || "";
        session.user.role = (token.role as "USER" | "ADMIN") || "USER";
        session.user.balance = (token.balance as number) || 0;
      }
      return session;
    },
  },
  pages: {
    signIn: "/prihlaseni",
    verifyRequest: "/prihlaseni/overeni",
  },
  trustHost: true,
};
