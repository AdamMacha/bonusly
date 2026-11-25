import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getBaseUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const baseUrl = getBaseUrl();

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

// DŮLEŽITÉ: V root layoutu NENASTAVUJEME alternates.canonical ani openGraph.url,
// aby je nedědily podstránky (/podminky, /hledani, 404 aj.). Každá stránka si je nastavuje sama.
export const metadata: Metadata = {
  title: {
    default: "BONUSLY — Ověřené bonusy, slevové kódy a investice",
    template: "%s | BONUSLY",
  },
  description:
    "Porovnáváme nejvýhodnější bankovní bonusy, investiční platformy, pojištění, energie, ověřené slevové kódy a možnosti extra příjmu v ČR.",
  keywords: [
    "bonusy za registraci",
    "slevové kódy 2026",
    "bankovní účty s bonusem",
    "investiční platformy srovnání",
    "extra příjem",
    "akce a kupóny",
  ],
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "BONUSLY",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "finance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
