import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { ADMIN_COOKIE_NAME, isValidAdminToken } from "@/lib/auth-crypto";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const isAuth = !!req.auth?.user;
  const userRole = req.auth?.user?.role;

  // 1. Ochrana sekce /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isAuth) {
      const loginUrl = new URL("/prihlaseni", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Ochrana sekce /admin
  if (pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const hasAdminPassword = await isValidAdminToken(sessionCookie);
    const hasAdminRole = userRole === "ADMIN";
    const isAuthenticatedAdmin = hasAdminPassword || hasAdminRole;

    // Login stránka do administrace
    if (pathname === "/admin/login") {
      if (isAuthenticatedAdmin) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    // Ostatní chráněné admin routy
    if (!isAuthenticatedAdmin) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/admin/:path*", "/admin"],
};
