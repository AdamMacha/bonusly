export function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://bonusly.cz");

  return raw.replace(/\/+$/, "");
}

export function buildCanonical(path: string): string {
  const base = getBaseUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Odstraní případný duplicitní suffix "| BONUSLY" z titulku,
 * protože šablona v RootLayout přidává "%s | BONUSLY" automaticky.
 */
export function cleanSeoTitle(title: string): string {
  return title.replace(/\s*[|–—-]\s*BONUSLY\s*$/i, "").trim();
}

export const SOCIAL_LINKS = [
  "https://www.instagram.com/bonusly.cz",
  "https://www.facebook.com/bonusly.cz",
  "https://www.tiktok.com/@bonusly.cz",
];

export interface CuratedComparison {
  slug: string;
  slugA: string;
  slugB: string;
  title: string;
  category: string;
  description: string;
}

export const CURATED_COMPARISONS: CuratedComparison[] = [
  {
    slug: "wolt-kuryr-vs-foodora-kuryr",
    slugA: "wolt-kuryr",
    slugB: "foodora-kuryr",
    title: "Wolt kurýr vs. foodora kurýr",
    category: "Extra příjem",
    description:
      "Kde si jako kurýr vyděláte více peněz? Porovnání hodinových sazeb, flexibility směn, aplikace a vstupního bonusu 4 000 Kč.",
  },
  {
    slug: "raiffeisenbank-vs-mbank",
    slugA: "raiffeisenbank",
    slugB: "mbank",
    title: "Raiffeisenbank Chytrý účet vs. mBank mKonto",
    category: "Banky & Účty",
    description:
      "Bonus 3 000 Kč u Raiffeisenbank nebo až 1 000 Kč za platby kartou u mBank? Detailní srovnání poplatků, výběrů a mobilní aplikace.",
  },
  {
    slug: "raiffeisenbank-vs-air-bank",
    slugA: "raiffeisenbank",
    slugB: "air-bank",
    title: "Raiffeisenbank vs. Air Bank",
    category: "Banky & Účty",
    description:
      "Chytrý účet s bonusem 3 000 Kč nebo oblíbená Air Bank s odměnami My Air? Porovnání podmínek a výhod pro nové klienty.",
  },
  {
    slug: "mbank-vs-air-bank",
    slugA: "mbank",
    slugB: "air-bank",
    title: "mBank mKonto vs. Air Bank",
    category: "Banky & Účty",
    description:
      "Který bezpoplatkový účet je lepší pro každodenní placení? Srovnání mKonta s bonusem 1 000 Kč a běžného účtu Air Bank.",
  },
  {
    slug: "raiffeisenbank-vs-revolut",
    slugA: "raiffeisenbank",
    slugB: "revolut",
    title: "Raiffeisenbank vs. Revolut",
    category: "Banky & Účty",
    description:
      "Klasický český účet s bonusem 3 000 Kč vs. cestovatelská superaplikace Revolut s mezibankovními kurzy a jednorázovými kartami.",
  },
  {
    slug: "portu-vs-patria-finance",
    slugA: "portu",
    slugB: "patria-finance",
    title: "Portu vs. Patria Finance",
    category: "Investice & Finance",
    description:
      "Automatizovaná ETF portfolia na Portu nebo klasický český broker Patria Finance s pravidelnými ETF bez nákupních poplatků?",
  },
  {
    slug: "investown-vs-roier",
    slugA: "investown",
    slugB: "roier",
    title: "Investown vs. Roier",
    category: "Investice & Finance",
    description:
      "Srovnání dvou českých platforem pro investice zajištěné nemovitostmi: LTV, výnosy, bonusy a likvidita na sekundárním trhu.",
  },
  {
    slug: "investown-vs-rondainvest",
    slugA: "investown",
    slugB: "rondainvest",
    title: "Investown vs. Ronda Invest",
    category: "Investice & Finance",
    description:
      "Investown s bonusem 500 Kč od 500 Kč vs. Ronda Invest bez poplatků s výnosem až 9 % p.a. a 1% vstupním bonusem.",
  },
  {
    slug: "roier-vs-rondainvest",
    slugA: "roier",
    slugB: "rondainvest",
    title: "Roier vs. Ronda Invest",
    category: "Investice & Finance",
    description:
      "Která platforma na úvěry zajištěné nemovitostmi nabízí lepší měsíční výnos, zabezpečení a bonus pro nové investory?",
  },
  {
    slug: "innogy-vs-eon",
    slugA: "innogy",
    slugB: "eon",
    title: "innogy vs. E.ON",
    category: "Energie, Pojištění & Tarify",
    description:
      "Porovnání dvou největších dodavatelů elektřiny a plynu v ČR. Kdy se vyplatí přejít a jak funguje nezávazná online kalkulace.",
  },
  {
    slug: "jabkolevne-vs-iphonemarket",
    slugA: "jabkolevne",
    slugB: "iphonemarket",
    title: "Jabkolevně.cz vs. iPhoneMarket.cz",
    category: "Elektro & Apple",
    description:
      "Kde koupit zánovní iPhone nejvýhodněji? Srovnání záruky, diagnostiky a ověřených slevových kódů sleva600 a SLEVA400.",
  },
  {
    slug: "istyle-vs-jabkolevne",
    slugA: "istyle",
    slugB: "jabkolevne",
    title: "iStyle.cz vs. Jabkolevně.cz",
    category: "Elektro & Apple",
    description:
      "Nový Apple od oficiálního Apple Premium Partnera iStyle nebo prověřený zánovní iPhone ze Jabkolevně se slevou 600 Kč?",
  },
  {
    slug: "airbnb-vs-booking",
    slugA: "airbnb",
    slugB: "booking",
    title: "Airbnb Hostitel vs. Booking.com Partner",
    category: "Extra příjem",
    description:
      "Kde lépe pronajímat byt, pokoj nebo chalupu? Porovnání ochrany AirCover, bonusu 500 Kč a 0% provize na prvních 50 rezervací.",
  },
  {
    slug: "banggood-vs-aliexpress",
    slugA: "banggood",
    slugB: "aliexpress",
    title: "Banggood vs. AliExpress",
    category: "Elektro & Apple",
    description:
      "Srovnání dvou obřích zahraničních e-shopů: doprava z EU skladů bez cla, ceny elektroniky, doručení do ČR a ochrana kupujícího.",
  },
];

export function getComparisonsForOffer(offerSlug: string): CuratedComparison[] {
  return CURATED_COMPARISONS.filter(
    (c) => c.slugA === offerSlug || c.slugB === offerSlug
  );
}
