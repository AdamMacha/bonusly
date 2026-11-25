import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Přihlášení a registrace",
  description: "Přihlaste se do BONUSLY a získejte přístup k peněžence, cashbacku a přehledu svých odměn.",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function PrihlaseniPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl = "/dashboard", error } = await searchParams;
  const showDemoLogin =
    process.env.ENABLE_DEMO_LOGIN === "true" || process.env.NODE_ENV !== "production";

  if (session?.user) {
    redirect(callbackUrl);
  }

  async function handleMagicLink(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const targetUrl = (formData.get("callbackUrl") as string) || "/dashboard";
    await signIn("resend", { email, redirectTo: targetUrl });
  }

  async function handleQuickLogin(formData: FormData) {
    "use server";
    if (process.env.ENABLE_DEMO_LOGIN !== "true" && process.env.NODE_ENV === "production") {
      return;
    }
    const email = formData.get("email") as string;
    const targetUrl = (formData.get("callbackUrl") as string) || "/dashboard";
    await signIn("credentials", { email, redirectTo: targetUrl });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Přihlášení" }]} />

      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green/10 text-green mb-4 text-2xl shadow-inner">
            💰
          </div>
          <h1 className="text-3xl font-bold text-navy tracking-tight">Vítej v BONUSLY</h1>
          <p className="mt-2 text-sm text-slate-500">
            Přihlas se do své BONUSLY peněženky pro sledování cashback odměn u vybraných nabídek (většinu slevových kódů a partnerských bonusů můžeš využít i bez přihlášení).
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-2">
            <span className="text-red-500 font-bold">⚠️</span>
            <span>Při přihlašování došlo k chybě. Zkontrolujte zadaný e-mail a zkuste to prosím znovu.</span>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* Magic Link Form */}
          <form action={handleMagicLink} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">
                Váš e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jan.novak@email.cz"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green px-5 py-3.5 text-sm font-bold text-navy hover:bg-green-light transition-all shadow-md shadow-green/20 hover:shadow-lg cursor-pointer"
            >
              <span>Poslat přihlašovací odkaz (Magic Link)</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {showDemoLogin && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400 font-medium">nebo testovací režim</span>
                </div>
              </div>

              <form action={handleQuickLogin}>
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
                <input type="hidden" name="email" value="uzivatel@bonusly.cz" />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-navy transition-colors cursor-pointer"
                >
                  <span>⚡ Vyzkoušet demo účet (uzivatel@bonusly.cz)</span>
                </button>
              </form>
            </>
          )}

          {/* Value Props */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-green font-bold">✓</span>
              <span>Žádná složitá hesla – bezpečné přihlášení jednorázovým odkazem na e-mail</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green font-bold">✓</span>
              <span>Připsání extra BONUSLY cashbacku u nabídek označených štítkem odměny</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green font-bold">✓</span>
              <span>Výplata schválených odměn přímo na bankovní účet v ČR od 500 Kč</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Přihlášením souhlasíte s našimi{" "}
          <Link href="/podminky" className="text-slate-600 hover:text-navy underline">
            obchodními podmínkami
          </Link>{" "}
          a{" "}
          <Link href="/ochrana-soukromi" className="text-slate-600 hover:text-navy underline">
            ochranou soukromí
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
