# BONUSLY — Implementation Plan

## Přehled projektu

BONUSLY je moderní česká platforma pro objevování přivýdělků, referral nabídek, finančních produktů, bankovních účtů, platebních karet, cashbacku a registračních bonusů. Web je primárně affiliate/referral agregátor s důrazem na SEO, důvěryhodnost a konverze.

## Současný stav

Projekt je čerstvě inicializovaný Next.js 16.3.4 app s:
- React 19, TypeScript, Tailwind CSS 4, App Router
- Pouze výchozí boilerplate stránky (layout + page)
- Žádná databáze, komponenty, ani business logika

## Tech Stack

| Technologie | Použití |
|---|---|
| **Next.js 16 (App Router)** | Framework, SSR/SSG, routing |
| **React 19** | UI |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling |
| **Prisma ORM** | Databázová vrstva |
| **PostgreSQL** | Databáze |
| **Resend** | Newsletter emaily |
| **Zod** | Validace |
| **Geist Font** | Typografie (už v projektu) |

## Barevná paleta

| Barva | Hex | Použití |
|---|---|---|
| Dark Navy | `#0B1220` | Pozadí, navbar, footer |
| Green | `#22C55E` | CTA, akcenty, highlights |
| White | `#FFFFFF` | Texty na tmavém, karty |
| Gray tones | `#94A3B8`, `#64748B`, `#1E293B` | Sekundární texty, bordery |

---

## Proposed Changes

### Fáze 1: Databázové schéma (Prisma)

#### [NEW] [prisma/schema.prisma](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/prisma/schema.prisma)

Kompletní Prisma schéma s modely:

```prisma
model Category {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  icon        String?
  order       Int      @default(0)
  seoTitle    String?
  seoDescription String?
  offers      Offer[]
  articles    Article[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Offer {
  id               String    @id @default(cuid())
  slug             String    @unique
  name             String
  shortDescription String
  description      String
  categoryId       String
  category         Category  @relation(fields: [categoryId], references: [id])
  logo             String?
  bonus            String?
  bonusDescription String?
  requirements     String[]
  pros             String[]
  cons             String[]
  referralUrl      String
  affiliateUrl     String?
  trackingSlug     String    @unique
  rating           Float?
  featured         Boolean   @default(false)
  active           Boolean   @default(true)
  verified         Boolean   @default(false)
  lastVerifiedAt   DateTime?
  seoTitle         String?
  seoDescription   String?
  clicks           Click[]
  faq              OfferFaq[]
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}

model OfferFaq {
  id       String @id @default(cuid())
  offerId  String
  offer    Offer  @relation(fields: [offerId], references: [id])
  question String
  answer   String
  order    Int    @default(0)
}

model Article {
  id             String    @id @default(cuid())
  slug           String    @unique
  title          String
  excerpt        String
  content        String
  featuredImage  String?
  categoryId     String
  category       Category  @relation(fields: [categoryId], references: [id])
  authorId       String
  author         Author    @relation(fields: [authorId], references: [id])
  publishedAt    DateTime?
  featured       Boolean   @default(false)
  draft          Boolean   @default(true)
  keywords       String[]
  canonicalUrl   String?
  seoTitle       String?
  seoDescription String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

model Author {
  id       String    @id @default(cuid())
  name     String
  slug     String    @unique
  bio      String?
  avatar   String?
  articles Article[]
}

model Click {
  id          String   @id @default(cuid())
  offerId     String
  offer       Offer    @relation(fields: [offerId], references: [id])
  referrer    String?
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  userAgent   String?
  createdAt   DateTime @default(now())
}

model NewsletterSubscriber {
  id            String   @id @default(cuid())
  email         String   @unique
  confirmed     Boolean  @default(false)
  unsubscribed  Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

#### [NEW] [lib/db.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/lib/db.ts)

Singleton Prisma client instance.

#### [NEW] [prisma/seed.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/prisma/seed.ts)

Seed data s 5 kategoriemi a ~18 nabídkami (Wolt, foodora, Bolt, Trading 212, Revolut, XTB, Portu, Raiffeisenbank, Air Bank, ČS, ČSOB, MONETA, Revolut karty, Curve, Wise) + 1 vzorový autor + 2–3 ukázkové články.

---

### Fáze 2: Design System & Layout

#### [MODIFY] [globals.css](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/globals.css)

Kompletní design tokens: barvy BONUSLY (dark navy, green, white), typografická škála, utility třídy pro spacing, breakpointy.

#### [MODIFY] [layout.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/layout.tsx)

Root layout s `lang="cs"`, Geist fontem, Navbar + Footer wrappery, metadata template BONUSLY.

#### [NEW] [components/navbar.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/navbar.tsx)

Sticky navbar: Logo "BONUSLY", navigace (Nabídky, Přivýdělek, Finance, Banky, Karty, Bonusy, Blog), CTA "Prozkoumat nabídky", mobile hamburger menu.

#### [NEW] [components/footer.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/footer.tsx)

Footer se sloupci: Nabídky, Kategorie, Blog, O BONUSLY + právní links (Podmínky, Ochrana soukromí, Cookies) + affiliate disclosure.

#### [NEW] [components/mobile-nav.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/mobile-nav.tsx)

Client component pro mobile navigation (hamburger menu s animací).

---

### Fáze 3: Homepage

#### [MODIFY] [page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/page.tsx)

Kompletní homepage se sekcemi:
1. **Hero** — Hlavní headline + CTA
2. **Featured Offers** — 3–6 doporučených nabídek z DB
3. **Categories** — 5 karet kategorií
4. **Proč BONUSLY** — Trust section (Ověřené nabídky, Přehledně, Aktualizujeme, Bez hledání)
5. **Latest Articles** — Poslední 3 články z blogu
6. **Newsletter** — Signup formulář

#### [NEW] [components/hero.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/hero.tsx)
#### [NEW] [components/offer-card.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/offer-card.tsx)
#### [NEW] [components/offer-grid.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/offer-grid.tsx)
#### [NEW] [components/category-card.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/category-card.tsx)
#### [NEW] [components/category-grid.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/category-grid.tsx)
#### [NEW] [components/article-card.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/article-card.tsx)
#### [NEW] [components/newsletter-form.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/newsletter-form.tsx)
#### [NEW] [components/trust-badges.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/trust-badges.tsx)
#### [NEW] [components/json-ld.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/json-ld.tsx)

---

### Fáze 4: Kategorie

#### [NEW] [app/kategorie/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/kategorie/page.tsx)

Přehled všech kategorií.

#### [NEW] [app/kategorie/[slug]/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/kategorie/[slug]/page.tsx)

Detail kategorie s: H1, popis, nabídky dané kategorie, relevantní články, FAQ, breadcrumbs, JSON-LD (CollectionPage + BreadcrumbList), `generateMetadata`, `generateStaticParams`.

#### [NEW] [components/breadcrumbs.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/breadcrumbs.tsx)

---

### Fáze 5: Nabídky

#### [NEW] [app/nabidky/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/nabidky/page.tsx)

Přehled všech aktivních nabídek s filtrováním podle kategorií.

#### [NEW] [app/nabidky/[slug]/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/nabidky/[slug]/page.tsx)

Detail nabídky — kvalitní landing page: breadcrumb, logo, název, krátký popis, hlavní benefit, CTA, podmínky, jak to funguje, výhody/nevýhody, FAQ, datum ověření, související nabídky, související články. JSON-LD (Product/Service + FAQPage + BreadcrumbList). `generateMetadata`, `generateStaticParams`.

#### [NEW] [components/offer-hero.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/offer-hero.tsx)
#### [NEW] [components/related-offers.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/related-offers.tsx)
#### [NEW] [components/related-articles.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/related-articles.tsx)
#### [NEW] [components/faq.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/faq.tsx)
#### [NEW] [components/affiliate-disclosure.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/affiliate-disclosure.tsx)
#### [NEW] [components/cta-button.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/cta-button.tsx)

---

### Fáze 6: Affiliate Tracking (`/go/[slug]`)

#### [NEW] [app/go/[slug]/route.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/go/[slug]/route.ts)

Route handler (GET): najde nabídku podle `trackingSlug`, uloží Click do DB (offerId, referrer, UTM params, user agent), redirectne na `referralUrl`. Pokud nabídka neexistuje → redirect na `/nabidky`.

---

### Fáze 7: Blog

#### [NEW] [app/blog/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/blog/page.tsx)

Přehled článků s filtrováním, paginací.

#### [NEW] [app/blog/[slug]/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/blog/[slug]/page.tsx)

Detail článku: breadcrumbs, title, excerpt, author info, published date, obsah, related articles, related offers, newsletter CTA. JSON-LD (Article + BreadcrumbList). `generateMetadata`, `generateStaticParams`.

#### [NEW] [components/article-grid.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/article-grid.tsx)
#### [NEW] [components/pagination.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/pagination.tsx)

---

### Fáze 8: Vyhledávání

#### [NEW] [app/hledani/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/hledani/page.tsx)

Search results page.

#### [NEW] [components/search.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/components/search.tsx)

Search component v navbaru — client component, debounced input. Prohledává nabídky + články přes server action / API endpoint s PostgreSQL `ILIKE` nebo full-text search.

#### [NEW] [app/api/search/route.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/api/search/route.ts)

Search API endpoint.

---

### Fáze 9: Newsletter (Resend)

#### [NEW] [app/api/newsletter/route.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/api/newsletter/route.ts)

API endpoint pro newsletter signup: validace emailu (Zod), uložení do DB, odeslání welcome emailu přes Resend.

#### [NEW] [lib/resend.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/lib/resend.ts)

Resend client singleton.

#### [NEW] [lib/validations.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/lib/validations.ts)

Zod schémata pro validaci (email, search query atd.).

---

### Fáze 10: SEO infrastruktura

#### [NEW] [app/sitemap.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/sitemap.ts)

Dynamický sitemap.xml z DB (homepage, kategorie, nabídky, blog články).

#### [NEW] [app/robots.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/robots.ts)

robots.txt — povolení crawlingu veřejných stránek, blokování admin/api.

---

### Fáze 11: Statické stránky

#### [NEW] [app/o-nas/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/o-nas/page.tsx)
#### [NEW] [app/kontakt/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/kontakt/page.tsx)
#### [NEW] [app/podminky/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/podminky/page.tsx)
#### [NEW] [app/ochrana-soukromi/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/ochrana-soukromi/page.tsx)
#### [NEW] [app/cookies/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/cookies/page.tsx)

---

### Fáze 12: Admin

#### [NEW] [app/admin/layout.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/layout.tsx)

Admin layout — jednoduchý sidebar, neindexovaný (noindex meta).

#### [NEW] [app/admin/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/page.tsx)

Dashboard: počet nabídek, článků, kliknutí, newsletter subscribers.

#### [NEW] [app/admin/nabidky/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/nabidky/page.tsx)
#### [NEW] [app/admin/nabidky/[id]/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/nabidky/[id]/page.tsx)
#### [NEW] [app/admin/nabidky/nova/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/nabidky/nova/page.tsx)
#### [NEW] [app/admin/clanky/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/clanky/page.tsx)
#### [NEW] [app/admin/clanky/[id]/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/clanky/[id]/page.tsx)
#### [NEW] [app/admin/clanky/novy/page.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/admin/clanky/novy/page.tsx)

#### [NEW] [lib/actions/offers.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/lib/actions/offers.ts)

Server actions pro CRUD nabídek.

#### [NEW] [lib/actions/articles.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/lib/actions/articles.ts)

Server actions pro CRUD článků.

#### [NEW] [lib/actions/newsletter.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/lib/actions/newsletter.ts)

Server actions pro newsletter.

---

### Fáze 13: Error / Empty States

#### [NEW] [app/not-found.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/not-found.tsx)

Custom 404 stránka v designu BONUSLY.

#### [NEW] [app/loading.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/loading.tsx)

Global loading state.

#### [NEW] [app/error.tsx](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/app/error.tsx)

Global error boundary.

---

### Fáze 14: Config & Tooling

#### [MODIFY] [package.json](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/package.json)

Přidání závislostí: `prisma`, `@prisma/client`, `resend`, `zod`.

#### [NEW] [.env.example](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/.env.example)

Template pro environment variables:
```
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
NEXT_PUBLIC_BASE_URL=https://bonusly.cz
```

#### [MODIFY] [next.config.ts](file:///Users/adammacha/Projekty%20práce%20-%20programování/bonusly/next.config.ts)

Konfigurace pro remote images (loga nabídek), security headers.

---

## Architektonická rozhodnutí

| Rozhodnutí | Volba | Důvod |
|---|---|---|
| Content storage | Databáze (Prisma) | Snadná správa přes admin, dynamické SEO |
| Blog content format | HTML string v DB | Jednodušší než MDX pro admin UI, budoucí WYSIWYG editor |
| Search | PostgreSQL ILIKE + full-text | Dostatečné pro start, arch. umožní Algolia later |
| Auth pro admin | Jednoduchý env-based password (middleware) | Rychlé, bezpečné pro single-user admin |
| Newsletter | Resend API | Dle specifikace |
| Hosting target | Vercel | Dle specifikace |

---

## Open Questions

> [!IMPORTANT]
> **PostgreSQL databáze**: Máš připravenou PostgreSQL databázi? Potřebuji `DATABASE_URL` connection string. Případně mohu nakonfigurovat projekt pro lokální Docker PostgreSQL nebo pro Vercel Postgres / Neon / Supabase.

> [!IMPORTANT]
> **Resend API key**: Máš Resend účet a API klíč? Bez něj newsletter nebude funkční (ale zbytek webu ano).

> [!NOTE]
> **Admin autentizace**: Plán počítá s jednoduchým env-based heslem pro admin panel (middleware kontrola). Pokud chceš sofistikovanější auth (NextAuth atd.), dej vědět.

> [!NOTE]
> **Loga nabídek**: Plán počítá s tím, že loga (Wolt, Revolut atd.) budou SVG/PNG soubory v `/public/logos/`. V seed datech budou placeholder cesty. Reálná loga dodáš ty.

---

## Verification Plan

### Automated Tests
```bash
npx prisma validate          # Prisma schéma je validní
npx prisma generate          # Client se vygeneruje
npm run build                # Next.js build projde bez chyb
npx tsc --noEmit             # TypeScript bez chyb
npm run lint                 # ESLint bez chyb
```

### Manual Verification
- Spuštění `npm run dev` a procházení všech stránek
- Ověření responsive designu na mobile/tablet/desktop
- Ověření SEO metadata (title, description, OG, JSON-LD) na každé stránce
- Testování vyhledávání
- Testování newsletter signup
- Testování affiliate tracking (`/go/[slug]`)
- Testování admin CRUD operací
- Ověření 404 stránky
- Lighthouse audit (Performance, SEO, Accessibility)

---

## Odhadovaný rozsah

| Fáze | Soubory | Složitost |
|---|---|---|
| DB schéma + seed | ~4 | Střední |
| Design system + layout | ~5 | Střední |
| Homepage | ~10 | Střední |
| Kategorie | ~3 | Nízká |
| Nabídky | ~8 | Vysoká |
| Tracking | ~1 | Nízká |
| Blog | ~4 | Střední |
| Search | ~3 | Střední |
| Newsletter | ~3 | Nízká |
| SEO | ~2 | Nízká |
| Statické stránky | ~5 | Nízká |
| Admin | ~10 | Vysoká |
| Error states | ~3 | Nízká |
| Config | ~3 | Nízká |
| **Celkem** | **~64** | — |
