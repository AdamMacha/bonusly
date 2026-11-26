/**
 * Obchodní a konverzní priorita nabídek na BONUSLY (vyšší číslo = výše v seznamech).
 *
 * Skóre kombinuje:
 * 1) Čistý výnos na 1 dokončenou konverzi (provize/referral po případném 50/50 cashbacku)
 * 2) Očekávaný objem dokončených konverzí a nízkou bariéru vstupu (BankID, účet za 0 Kč,
 *    okamžitý peněžitý bonus pro uživatele, síla značky v ČR).
 */

export const CURATED_OFFER_PRIORITIES: Record<string, number> = {
  // === TIER 1: Banky & účty zdarma (nejvyšší čistý výnos × nejvyšší konverzní poměr) ===
  raiffeisenbank: 1000, // Direct referral + 3 000 Kč bonus pro uživatele (absolutní konverzní lídr)
  revolut: 985, // Referral až 1 750 Kč (čistý zisk ~1 250 Kč), 5 min v mobilu, masová poptávka
  mbank: 970, // Direct referral + 1 000 Kč bonus za platby kartou, účet zdarma
  "raiffeisenbank-podnikatelsky-ucet": 955, // PPA 1 000 Kč + 1 000 Kč bonus pro OSVČ, vedení zdarma
  "mbank-sporici-ucet": 940, // PPL 150 Kč / PPS 500 Kč, top úrok 4,41 % p.a., nízké tření
  "raiffeisenbank-kreditni-karta": 925, // PPA 1 100 Kč (100 % nám — cashback zakázán), 1. rok zdarma
  "air-bank": 910, // Direct referral, nejoblíbenější retailová banka v ČR
  "raiffeisenbank-pujcka": 895, // PPS 2,00 % (100 % nám — až několik tisíc Kč na 1 schválení)

  // === TIER 2: Pojištění, tarify, investice, internet & energie (vysoké fixní PPL/PPA + silná poptávka) ===
  "csob-pojistovna": 880, // PPS 16–65 % + PPL 100 Kč, -20 % online sleva + Alza 500 Kč
  vodafone: 870, // PPL 240–2 000 Kč, masová poptávka (tarify + internet)
  portu: 860, // PPL 150 Kč / PPA 400 Kč, nejsilnější česká ETF/DIP platforma
  "patria-finance": 850, // PPA 625 Kč, ETF bez nákupních poplatků (skupina ČSOB)
  investown: 840, // Direct referral + 500 Kč bonus pro nového investora
  bondster: 835, // PPL 1 000 Kč za investora (500 Kč cashback pro uživatele + 500 Kč nám)
  rondainvest: 830, // PPL 500 Kč za kvalifikovaný lead + 1 % vstupní bonus
  "direct-fondee-cz": 825, // PPL 500 Kč dokončení registrace / 150 Kč lead (100 % nám — cashback zakázán)
  nejpripojeni: 820, // PPA 1 250 Kč internet / 1 000 Kč IPTV (vysoká fixní odměna)
  roier: 810, // PPL 100–300 Kč / PPA 900 Kč
  uvtnet: 800, // PPA 1 000 Kč za optický internet
  eon: 785, // PPL 300 Kč už za nezávaznou kalkulaci energií zdarma
  innogy: 775, // PPL 240 Kč za nezávaznou kalkulaci energií zdarma

  // === TIER 3: Vysoké registrační bonusy, extra příjem & jackpot B2B leady ===
  tipsport: 755, // Direct referral, 300 Kč bez vkladu + 1 000 Kč (rychlá konverze 18+)
  "wolt-kuryr": 745, // Direct referral, 4 000 Kč bonus, vysoká organická hledanost
  stalynajem: 730, // PPL 5 600 Kč (nejvyšší fixní lead provize na webu)
  flowpay: 715, // PPS 0,65 % až 16 250 Kč (100 % nám — cashback zakázán)
  airbnb: 700, // Direct referral + 500 Kč uvítací bonus
  "portu-gallery": 685, // PPL 200 Kč, nízký vstup od 1 Kč
  "trading-212": 675, // Direct referral, 0 % komise ETF/akcie
  "foodora-kuryr": 665, // Direct referral
  booking: 655, // Direct referral

  // === TIER 4: Nejkonverznější masové e-shopy (exkluzivní kódy, známé značky, vysoký košík) ===
  jabkolevne: 640, // PPS 300 Kč celých nám (cashback zakázán) + exkluzivní kód sleva600
  iphonemarket: 630, // PPS 4 % z drahých iPhonů + exkluzivní kód SLEVA400
  douglas: 620, // PPS 7 % + top parfumerie, vysoký objem objednávek
  eobuv: 610, // PPS 7 % nový zákazník + masový módní brand
  "myprotein-cz-sk": 600, // PPS 8 % + silný kód -42 % (MP42EHUB)
  brilianty: 590, // PPS 7,5 % z vysokých objednávek šperků + kód BF2026
  pompo: 585, // Největší česká síť hračkářství (vysoký sezónní objem)
  jbl: 580, // PPS 4,8 % + slevový kód 20 % na sluchátka
  kosmas: 575, // Největší české online knihkupectví, silný objem objednávek
  concept: 570, // PPS 8 % na elektrospotřebiče + 7 aktivních kódů
  istyle: 560, // Apple Premium Partner, vysoký košík
  "lounge-by-zalando": 550, // PPL 30 Kč za pouhou registraci + silný módní brand
  "moje-pradlo": 545, // PPS 8 % + známý český brand
  luxusnipradlo: 542, // PPS 6,4 % + známý český brand
  sencor: 540, // PPS 6,8 % oficiální e-shop elektro
  sevt: 535, // Tradiční český e-shop školních potřeb a knih
  pocitace24: 532, // Repasované notebooky (vysoký košík + kódy až 600 Kč)
  dronpro: 530, // PPS 4,8 % z drahých dronů DJI
  swix: 525, // Silná zimní sportovní značka
  marimex: 520, // Vysoký košík (bazény, vířivky, sauny)
  mikov: 515, // Ikonická česká nožířská značka
  spime: 510, // Vysoký košík (masivní postele a matrace)
  "hot-chip": 505, // PPS 20 % (vysoká provize + dárkový hit)
  originalnipneu: 500, // Vysoký objem sezónních nákupů pneumatik
  smartyhodinky: 495, // PPS 10 % z chytrých hodinek
  smartydum: 492, // PPS 10 % z chytré domácnosti
  blaire: 490, // PPS 8 % celých nám (cashback zakázán) + kód BF15
  ventilatory: 480, // PPS 10 % z vyššího košíku vzduchotechniky
};

/**
 * Spočítá automatickou prioritu (50–450) pro zbývající e-shopy podle výše provize,
 * přítomnosti aktivního kódu/akce a hodnocení.
 */
export function computeOfferPriority(params: {
  slug: string;
  partnerCommissionRate?: string | null;
  cashbackAllowed?: boolean;
  promoCode?: string | null;
  hasPromos?: boolean;
  rating?: number | null;
}): number {
  const curated = CURATED_OFFER_PRIORITIES[params.slug];
  if (curated !== undefined) return curated;

  let score = 100;
  const comm = params.partnerCommissionRate || "";

  // Fixní provize v Kč (PPL/PPA)
  const kcMatch = comm.match(/(\d[\d\s]*)(?:[.,]\d+)?\s*Kč/i);
  if (kcMatch) {
    const kc = parseInt(kcMatch[1].replace(/\s+/g, ""), 10) || 0;
    score += Math.min(220, Math.round(kc * 0.25));
  }

  // Procentní provize (PPS)
  const pctMatches = Array.from(comm.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g));
  if (pctMatches.length > 0) {
    const maxPct = Math.max(
      ...pctMatches.map((m) => parseFloat(m[1].replace(",", ".")) || 0)
    );
    score += Math.min(180, Math.round(maxPct * 12));
  }

  // Pokud si necháváme 100 % provize (cashback zakázán partnerem), lehký bonus k výnosnosti
  if (params.cashbackAllowed === false && comm) {
    score += 20;
  }

  // Aktivní slevový kód nebo promo akce výrazně zvyšuje konverzní poměr
  if (params.promoCode) score += 55;
  else if (params.hasPromos) score += 25;

  // Hodnocení jako jemný tiebreaker
  score += Math.round((params.rating || 4.5) * 10);

  return Math.min(460, score);
}
