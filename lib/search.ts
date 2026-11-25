/**
 * Sdílené pomocné funkce pro vyhledávání nabídek a článků
 * (bez diakritiky + české skloňování a synonyma)
 */

export function normalizeSearchText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const SYNONYM_GROUPS: Array<{ triggers: string[]; expansions: string[] }> = [
  {
    triggers: ["banka", "banky", "bankovni", "bankovnictvi", "ucet", "ucty", "uctu"],
    expansions: ["bank", "ucet", "ucty", "mkonto", "raiffeisenbank", "mbank", "air bank", "revolut"],
  },
  {
    triggers: ["karta", "karty", "kreditka", "kreditni"],
    expansions: ["karta", "kreditni", "revolut", "raiffeisenbank", "mbank"],
  },
  {
    triggers: ["iphone", "iphony", "apple", "macbook", "ipad"],
    expansions: ["iphone", "apple", "istyle", "jabkolevne", "iphonemarket"],
  },
  {
    triggers: ["investice", "investovani", "investovat", "etf", "akcie", "broker", "fondy"],
    expansions: ["invest", "etf", "akcie", "portu", "patria", "roier", "ronda", "trading 212", "investown"],
  },
  {
    triggers: ["pojisteni", "pojistka", "pojistovna", "povinne", "havarijni", "cestovni"],
    expansions: ["pojist", "csob"],
  },
  {
    triggers: ["energie", "elektrina", "plyn", "fve", "fotovoltaika", "cerpadlo"],
    expansions: ["energi", "elektr", "plyn", "eon", "e.on", "innogy"],
  },
  {
    triggers: ["tarif", "tarify", "internet", "mobil", "operator", "sim"],
    expansions: ["tarif", "internet", "vodafone", "mobil"],
  },
  {
    triggers: ["kuryr", "privydelek", "brigada", "rozvoz", "extra prijem", "prace"],
    expansions: ["kuryr", "wolt", "foodora", "airbnb", "booking", "extra prijem"],
  },
  {
    triggers: ["pujcka", "pujcky", "uver", "financovani", "hypoteka"],
    expansions: ["pujck", "uver", "financ", "flowpay", "raiffeisenbank"],
  },
  {
    triggers: ["sperky", "sperk", "prsten", "diamant", "zlato"],
    expansions: ["sperk", "briliant", "diamant"],
  },
  {
    triggers: ["sleva", "slevy", "kupon", "kupony", "kod", "kody", "akce"],
    expansions: ["slev", "kupon", "kod", "akc", "black friday"],
  },
  {
    triggers: ["bazen", "bazeny", "zahrada", "sauna", "virivka"],
    expansions: ["bazen", "zahrad", "marimex", "saun"],
  },
  {
    triggers: ["postel", "postele", "matrace", "spani", "loznice"],
    expansions: ["postel", "matrac", "spime"],
  },
  {
    triggers: ["pneu", "pneumatiky", "auto", "kola"],
    expansions: ["pneu", "auto", "originalnipneu"],
  },
  {
    triggers: ["dron", "drony", "kamera", "dji"],
    expansions: ["dron", "dronpro"],
  },
  {
    triggers: ["hracky", "hracka", "deti", "detske"],
    expansions: ["hrack", "deti", "ministerstvo"],
  },
  {
    triggers: ["longboard", "skate", "skateboard", "sport"],
    expansions: ["longboard", "honzovy", "sport"],
  },
  {
    triggers: ["ventilator", "ventilatory", "rekuperace", "vzduchotechnika"],
    expansions: ["ventilator", "rekuperac"],
  },
  {
    triggers: ["pronajem", "najem", "byt", "nemovitosti"],
    expansions: ["najem", "nemovitost", "stalynajem", "investown", "roier", "ronda"],
  },
  {
    triggers: ["sazky", "sazeni", "tipovani", "bonus"],
    expansions: ["tipsport", "bonus"],
  },
];

/**
 * Vrátí normalizovaný dotaz a související kmeny/synonyma pro vyhledávání.
 */
export function expandSearchTerms(rawQuery: string): string[] {
  const norm = normalizeSearchText(rawQuery);
  if (!norm) return [];

  const terms = new Set<string>([norm]);
  const words = norm.split(/\s+/).filter((w) => w.length >= 2);
  for (const w of words) {
    terms.add(w);
    // Základní český kmen pro delší slova (např. "banka" -> "bank", "kupony" -> "kupon")
    if (w.length >= 5) {
      terms.add(w.slice(0, -1));
    }
  }

  for (const group of SYNONYM_GROUPS) {
    const matched = group.triggers.some(
      (t) => norm === t || words.includes(t) || (norm.length >= 3 && t.startsWith(norm))
    );
    if (matched) {
      for (const exp of group.expansions) {
        terms.add(exp);
      }
    }
  }

  return Array.from(terms);
}

/**
 * Otestuje, zda textový záznam odpovídá dotazu (diakritika + synonyma + více slov).
 */
export function matchesSearchQuery(haystack: string, rawQuery: string): boolean {
  const normQuery = normalizeSearchText(rawQuery);
  if (!normQuery) return true;

  const normHaystack = normalizeSearchText(haystack);
  if (normHaystack.includes(normQuery)) return true;

  const terms = expandSearchTerms(normQuery);
  // Pokud má dotaz jedno slovo, stačí shoda s libovolným synonymem / kmenem
  const words = normQuery.split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return terms.some((term) => normHaystack.includes(term));
  }

  // U víceslovného dotazu musí každé slovo (nebo jeho synonyma) sedět
  return words.every((word) => {
    const wordTerms = expandSearchTerms(word);
    return wordTerms.some((term) => normHaystack.includes(term));
  });
}

export interface SearchableOfferFields {
  name: string;
  slug: string;
  shortDescription?: string | null;
  bonus?: string | null;
  promoCode?: string | null;
  featured?: boolean;
  rating?: number | null;
  category: {
    name: string;
    slug?: string;
  };
}

/**
 * Ohodnotí relevanci nabídky vůči dotazu (název > kategorie/kód > bonus > popis).
 * Zajistí, že např. dotaz „banka“ řadí banky a účty (Raiffeisenbank, mBank, Air Bank,
 * Revolut) vysoko nad e-shopy, které slovo zmiňují jen v popisu.
 */
export function scoreOfferSearchMatch(
  offer: SearchableOfferFields,
  rawQuery: string
): number {
  const normQ = normalizeSearchText(rawQuery);
  if (!normQ) return (offer.featured ? 10 : 0) + (offer.rating || 0);

  const terms = expandSearchTerms(normQ);
  const directStem = normQ.length >= 5 ? normQ.slice(0, -1) : normQ;

  const normName = normalizeSearchText(offer.name);
  const normSlug = normalizeSearchText(offer.slug);
  const normCat = normalizeSearchText(`${offer.category.name} ${offer.category.slug || ""}`);
  const normCode = normalizeSearchText(offer.promoCode || "");
  const normBonus = normalizeSearchText(offer.bonus || "");
  const normDesc = normalizeSearchText(offer.shortDescription || "");

  let score = 0;

  if (normName === normQ || normSlug === normQ) {
    score += 140;
  } else if (normName.startsWith(normQ) || normSlug.startsWith(normQ)) {
    score += 115;
  } else if (normName.includes(normQ) || normName.includes(directStem)) {
    score += 95;
  } else if (terms.some((t) => t.length >= 3 && normName.includes(t))) {
    score += 70;
  }

  if (normCat.includes(normQ) || normCat.includes(directStem)) {
    score += 75;
  } else if (terms.some((t) => t.length >= 3 && normCat.includes(t))) {
    score += 45;
  }

  if (normCode && (normCode === normQ || normCode.includes(normQ))) {
    score += 65;
  }

  if (normBonus.includes(normQ) || normBonus.includes(directStem)) {
    score += 25;
  } else if (terms.some((t) => t.length >= 3 && normBonus.includes(t))) {
    score += 12;
  }

  if (normDesc.includes(normQ)) {
    score += 15;
  } else if (terms.some((t) => t.length >= 3 && normDesc.includes(t))) {
    score += 5;
  }

  if (offer.featured) score += 8;
  score += offer.rating || 0;

  return score;
}

/**
 * Extrahuje hodnotu cashbacku pro řazení „Nejvyšší cashback (%)“.
 * Procentní cashback vrací přímo jako číslo (např. „Cashback až 12,5 %“ -> 12.5),
 * pevný Kč cashback zařadí za procenta s váhou podle částky.
 */
export function extractCashbackValue(cashbackLabel?: string | null): number {
  if (!cashbackLabel) return 0;

  const pctMatches = Array.from(cashbackLabel.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g));
  if (pctMatches.length > 0) {
    return (
      100 +
      Math.max(...pctMatches.map((m) => parseFloat(m[1].replace(",", ".")) || 0))
    );
  }

  const kcMatch = cashbackLabel.match(/(\d[\d\s]*)\s*Kč/i);
  if (kcMatch) {
    const kc = parseInt(kcMatch[1].replace(/\s+/g, ""), 10) || 0;
    return Math.min(99, kc / 100);
  }

  return 0;
}

/**
 * Extrahuje reálnou peněžní hodnotu bonusu/slevy v Kč pro řazení "Nejvyšší bonus".
 * Ignoruje prahové částky jako "nad 2 000 Kč", "od 500 Kč", měsíční tarify "za 299 Kč",
 * sezónní/pozastavené poznámky v závorce, LTV poměry a úvěrové limity typu "2,5 mil. Kč".
 */
export function extractBonusValue(bonus?: string | null): number {
  if (!bonus) return 0;

  // Odstraníme závorky s podmínkami minimální útraty, LTV nebo sezónními/neaktivními poznámkami
  const cleaned = bonus
    .replace(/\([^)]*(?:nad|od|min\.?|měs|do\s+\d|sezónn|LTV|dočasně)[^)]*\)/gi, " ")
    .replace(/(?:při\s+nákupu\s+nad|nad|od|min\.?)\s*\d[\d\s.,]*\s*(?:mil\.?\s*)?Kč/gi, " ")
    .replace(/\bza\s+\d[\d\s.,]*\s*Kč(?:\s*\/\s*měs\.?)?/gi, " ")
    .replace(/\d[\d\s.,]*\s*mil\.?\s*Kč/gi, " ")
    .replace(/\b100\s*%\s*diskrétn\w*/gi, " ");

  // Priorita 1: Explicitní součet "celkem X Kč"
  const totalMatch = cleaned.match(/celkem\s+(\d[\d\s]*)\s*Kč/i);
  if (totalMatch) {
    return parseInt(totalMatch[1].replace(/\s+/g, ""), 10) || 0;
  }

  // Priorita 2: Částky v Kč po odstranění podmínek (např. "Až 3 000 Kč", "Sleva 600 Kč", "1 000 Kč")
  const kcMatches = Array.from(cleaned.matchAll(/(\d[\d\s]*)\s*Kč/gi));
  if (kcMatches.length > 0) {
    return Math.max(
      ...kcMatches.map((m) => parseInt(m[1].replace(/\s+/g, ""), 10) || 0)
    );
  }

  // Priorita 3: EUR částky mimo závorku (např. "až 100 EUR" -> orientační přepočet pro řazení)
  const eurMatch = cleaned.match(/(\d[\d\s]*)\s*EUR/i);
  if (eurMatch) {
    return (parseInt(eurMatch[1].replace(/\s+/g, ""), 10) || 0) * 25;
  }

  // Priorita 4: Procentuální slevy / výnosy (řazeno pod pevné peněžní bonusy)
  const pctMatch = cleaned.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (pctMatch) {
    return Math.min(250, Math.round(parseFloat(pctMatch[1].replace(",", ".")) * 5));
  }

  return 0;
}
