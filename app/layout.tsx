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

export const metadata: Metadata = {
  title: {
    default: "BONUSLY — Ověřené bonusy, slevové kódy, investice a extra příjem",
    template: "%s | BONUSLY",
  },
  description:
    "Porovnáváme nejvýhodnější bankovní bonusy, investiční platformy, pojištění, energie, ověřené slevové kódy a možnosti extra příjmu v ČR na jednom místě.",
  keywords: [
    "bonusy za registraci",
    "slevové kódy 2026",
    "bankovní účty s bonusem",
    "investiční platformy srovnání",
    "extra příjem",
    "cashback ČR",
    "akce a kupóny",
  ],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: baseUrl,
    siteName: "BONUSLY",
    title: "BONUSLY — Ověřené bonusy, slevové kódy, investice a extra příjem",
    description:
      "Porovnáváme bankovní bonusy, investice, pojištění, energie, ověřené slevové kódy a možnosti extra příjmu v ČR.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BONUSLY — Ověřené bonusy, slevové kódy a extra příjem",
    description:
      "Najdi ověřené bonusy, slevové kódy, finanční produkty a příležitosti v ČR na jednom místě.",
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
