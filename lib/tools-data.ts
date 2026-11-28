export interface ToolDefinition {
  id: string;
  href: string;
  name: string;
  shortName: string;
  icon: string;
  category: "Bydlení & Úvěry" | "Investice & Spoření" | "Příjmy & Bonusy";
  badge?: string;
  description: string;
  highlights: string[];
}

export const BONUSLY_TOOLS: ToolDefinition[] = [
  {
    id: "hypotecni-kalkulacka",
    href: "/nastroje/hypotecni-kalkulacka",
    name: "Hypoteční kalkulačka 2026",
    shortName: "Hypoteční kalkulačka",
    icon: "🏠",
    category: "Bydlení & Úvěry",
    badge: "Nejoblíbenější",
    description:
      "Spočítejte si přesnou měsíční splátku hypotéky, LTV dle limitů ČNB, celkové přeplacení, stresový test sazby po fixaci i roční splátkový kalendář.",
    highlights: ["LTV & pravidla ČNB", "Roční splátkový kalendář", "Stresový test +1 % / +2 %"],
  },
  {
    id: "kalkulacka-slozeneho-uroceni",
    href: "/nastroje/kalkulacka-slozeneho-uroceni",
    name: "Kalkulačka složeného úročení & DIP",
    shortName: "Složené úročení & ETF",
    icon: "📈",
    category: "Investice & Spoření",
    badge: "Včetně DIP",
    description:
      "Zjistěte, jak zhodnotíte pravidelné investice do ETF nebo DIP. Zobrazí nominální i reálnou hodnotu po inflaci, daňovou úsporu a budoucí rentu.",
    highlights: ["Očištění o inflaci", "Daňová úspora DIP až 7 200 Kč/rok", "Renta dle pravidla 4 %"],
  },
  {
    id: "kalkulacka-ciste-mzdy",
    href: "/nastroje/kalkulacka-ciste-mzdy",
    name: "Kalkulačka čisté mzdy 2026",
    shortName: "Čistá mzda 2026",
    icon: "💼",
    category: "Příjmy & Bonusy",
    badge: "Aktuální 2026",
    description:
      "Rychlý výpočet čisté mzdy z hrubé pro rok 2026 včetně 7,1 % sociálního a 4,5 % zdravotního pojištění, slevy na poplatníka, dětí a daňového bonusu.",
    highlights: ["Sazby a slevy ČR 2026", "Daňové zvýhodnění na děti", "Cena práce pro zaměstnavatele"],
  },
  {
    id: "kalkulacka-pujcky",
    href: "/nastroje/kalkulacka-pujcky",
    name: "Kalkulačka půjčky a refinancování",
    shortName: "Kalkulačka půjčky",
    icon: "💳",
    category: "Bydlení & Úvěry",
    description:
      "Spočítejte si splátku spotřebitelské půjčky, orientační RPSN, celkové přeplacení a přesnou úsporu při refinancování nebo konsolidaci dražších úvěrů.",
    highlights: ["Výpočet splátky a RPSN", "Srovnání refinancování", "Přehled přeplacení"],
  },
  {
    id: "kalkulacka-sporiciho-uctu",
    href: "/nastroje/kalkulacka-sporiciho-uctu",
    name: "Kalkulačka spořicího účtu 2026",
    shortName: "Spořicí účet",
    icon: "🏦",
    category: "Investice & Spoření",
    description:
      "Výpočet čistého výnosu na spořicím účtu nebo termínovaném vkladu po odečtení 15% srážkové daně z úroků v ČR a porovnání s inflací.",
    highlights: ["Čistý úrok po 15 % dani", "Měsíční i roční připisování", "Pravidelné spoření"],
  },
  {
    id: "kalkulacka-bonusu",
    href: "/kalkulacka-bonusu",
    name: "Kalkulačka bankovních a investičních bonusů",
    shortName: "Kalkulačka bonusů",
    icon: "🧮",
    category: "Příjmy & Bonusy",
    badge: "Až 15 000+ Kč",
    description:
      "Zaškrtněte banky, investiční platformy a slevy, které ještě nemáte, a okamžitě si sestavte osobní akční plán s přesným finančním ziskem.",
    highlights: ["Bankovní účty zdarma", "Investiční odměny", "Cashback z nákupů"],
  },
];

export const TOOL_URLS_FOR_SITEMAP = [
  "/nastroje",
  "/nastroje/hypotecni-kalkulacka",
  "/nastroje/kalkulacka-slozeneho-uroceni",
  "/nastroje/kalkulacka-ciste-mzdy",
  "/nastroje/kalkulacka-pujcky",
  "/nastroje/kalkulacka-sporiciho-uctu",
] as const;

export function formatCzk(value: number): string {
  return `${Math.round(value).toLocaleString("cs-CZ")} Kč`;
}

export function formatPercent(value: number, digits = 2): string {
  return `${value.toLocaleString("cs-CZ", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} %`;
}
