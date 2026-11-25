import type { OfferSeed } from "./types";

export const CORE_OFFERS: OfferSeed[] = [
  {
    slug: "wolt-kuryr",
    name: "Wolt kurýr",
    categorySlug: "extra-prijem",
    shortDescription:
      "Flexibilní rozvoz jídla a nákupů na kole, skútru nebo v autě s týdenní výplatou a startovacím bonusem 4 000 Kč.",
    description: `
Wolt patří mezi nejoblíbenější rozvážkové platformy v České republice. Jako kurýr Woltu si **plánujete pracovní dobu zcela podle sebe** – aplikaci zapnete klidně na hodinu po škole či zaměstnání, nebo jezdíte na plný úvazek bez jakéhokoliv šéfa.

### Proč rozvážet právě pro Wolt?
- **Startovací bonus 4 000 Kč:** Při registraci přes náš odkaz s referral kódem **CPCJPUX** získáte po odjetí 150 objednávek během prvních 45 dní jednorázovou odměnu 4 000 Kč navíc k běžným výdělkům.
- **Výplata každý týden:** Vydělané peníze chodí pravidelně na váš bankovní účet a dýška od zákazníků zůstávají ze 100 % vám.
- **Rozvoz i bez IČO:** Pokud nechcete zakládat živnostenský list, můžete snadno začít jezdit přes partnerskou flotilu na dohodu (DPP/DPČ).
- **Libovolný dopravní prostředek:** Rozvážet lze na kole, elektrokole, skútru i vlastním autě.

### Jak získat bonus 4 000 Kč krok za krokem
1. Klikněte na tlačítko **Získat bonus 4 000 Kč** níže, čímž se automaticky propíše referral kód **CPCJPUX**.
2. Dokončete online registraci kurýra a zvolte formu spolupráce (IČO nebo flotila).
3. Aktivujte kurýrní aplikaci Wolt Partner a během prvních **45 dní doručte 150 objednávek** (průměrně stačí jen 3–4 zakázky denně).
4. Bonus 4 000 Kč se připíše k vaší výplatě po splnění limitu.
    `.trim(),
    logo: "/logos/wolt.png",
    bonus: "4 000 Kč bonus pro nového kurýra",
    bonusDescription:
      "Jednorázový startovací bonus 4 000 Kč po odjetí 150 objednávek během prvních 45 dní s kódem CPCJPUX.",
    promoCode: "CPCJPUX",
    promoCodeNote: "Zadejte při registraci kurýra (při prokliku přes tlačítko se vyplní automaticky).",
    ctaLabel: "Získat bonus 4 000 Kč u Woltu",
    requirements: [
      "Věk minimálně 18 let a chytrý telefon (iOS / Android)",
      "Vlastní kolo, elektrokoloběžka, skútr nebo automobil",
      "Registrace s referral kódem CPCJPUX",
      "Odjet 150 objednávek během prvních 45 dní od aktivace účtu",
      "Živnostenský list (IČO) nebo smlouva přes partnerskou flotilu",
    ],
    pros: [
      "Vysoký startovací bonus 4 000 Kč pro nové kurýry",
      "Naprostá flexibilita bez povinného rezervování směn",
      "Pravidelná týdenní výplata a 100 % spropitného pro kurýra",
      "Intuitivní mobilní aplikace s přehlednými výdělky v reálném čase",
    ],
    cons: [
      "Hodinový výdělek kolísá podle denní špičky a počasí",
      "Náklady na palivo a servis dopravního prostředku jdou za kurýrem",
    ],
    referralUrl: "https://courier.wolt.com/apply?referral_code=CPCJPUX",
    trackingSlug: "wolt-kuryr",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Wolt kurýr bonus 4 000 Kč: Kód CPCJPUX (2026)",
    seoDescription:
      "Staňte se kurýrem Wolt s promo kódem CPCJPUX a získejte startovací bonus 4 000 Kč za 150 objednávek do 45 dní. Reálné výdělky a podmínky.",
    faq: [
      {
        question: "Jaký referral kód mám použít pro získání bonusu 4 000 Kč u Woltu?",
        answer:
          "Při registraci použijte referral kód CPCJPUX. Pokud přejdete přes tlačítko na této stránce, kód se do přihlášky předvyplní automaticky.",
      },
      {
        question: "Musím mít na rozvoz pro Wolt vlastní živnostenský list (IČO)?",
        answer:
          "Ne, IČO není nutností. Noví kurýři mohou začít jezdit přes ověřenou partnerskou flotilu na dohodu (DPP/DPČ), která vyřeší administrativu za vás.",
      },
      {
        question: "Kolik si Wolt kurýr reálně vydělá za hodinu?",
        answer:
          "Ve větších městech se průměrný hrubý výdělek pohybuje mezi 220 až 350 Kč za hodinu, během obědových a večerních špiček nebo deště často i přes 400 Kč/hod.",
      },
      {
        question: "Je 150 objednávek za 45 dní reálně splnitelných?",
        answer:
          "Ano, v průměru jde o 3 až 4 objednávky denně. Při aktivním rozvozu o víkendech a ve špičkách zvládnete limit splnit klidně během 2 až 3 týdnů.",
      },
    ],
  },
  {
    slug: "foodora-kuryr",
    name: "foodora kurýr",
    categorySlug: "extra-prijem",
    shortDescription:
      "Rozvoz jídla a nákupů s nejširším pokrytím měst v Česku, stabilním tokem objednávek a motivačními výzvami.",
    description: `
**foodora** (dříve Dáme jídlo) provozuje nejrozsáhlejší síť partnerských restaurací, obchodů a foodora Marketů napříč Českou republikou. Díky silné poptávce nejen v Praze a Brně, ale i v krajských a okresních městech, představuje spolehlivý způsob pravidelného přivýdělku.

### Hlavní výhody rozvozu pro foodoru
- **Nejširší pokrytí měst v ČR:** Můžete rozvážet i tam, kde konkurence nepůsobí.
- **Garantované směny a motivační výzvy:** V rámci vypsaných zón a špiček nabízí foodora zajímavé příplatky za objem doručených zakázek.
- **Flexibilní spolupráce:** Rozvážejte na kole, skútru či autem na vlastní IČO nebo přes flotilu.
- **Kombinace s jinými aplikacemi:** Mnoho kurýrů úspěšně střídá foodoru a Wolt podle aktuální poptávky v daném městě.
    `.trim(),
    logo: "/logos/foodora.png",
    bonus: "Vstupní bonus a motivační výzvy pro kurýry",
    bonusDescription:
      "Pravidelné bonusové výzvy ve špičkách a náborové akce pro aktivní kurýry po celé ČR.",
    ctaLabel: "Registrovat se jako foodora kurýr",
    requirements: [
      "Věk minimálně 18 let",
      "Chytrý telefon s datovým připojením",
      "Vlastní dopravní prostředek (kolo, skútr nebo auto)",
      "Živnostenský list (IČO) nebo spolupráce přes flotilu",
    ],
    pros: [
      "Nejširší síť měst a partnerských restaurací v ČR",
      "Stabilní poptávka během celého týdne včetně potravin z foodora Marketu",
      "Pravidelné bonusové výzvy a příplatky ve špičkách",
    ],
    cons: [
      "Výhodnější směny je vhodné rezervovat s předstihem v aplikaci",
      "Výdělek závisí na hodnocení kurýra a vytíženosti zóny",
    ],
    referralUrl: "https://kuryr.foodora.cz",
    trackingSlug: "foodora-kuryr",
    partnerNetwork: "direct",
    rating: 4.6,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "foodora kurýr 2026: Výdělky a registrace",
    seoDescription:
      "Jak začít rozvážet pro foodoru v ČR? Zjistěte reálné výdělky, jak funguje rezervace směn, rozvoz bez IČO a aktuální podmínky registrace.",
    faq: [
      {
        question: "V jakých městech mohu pro foodoru rozvážet?",
        answer:
          "foodora pokrývá desítky měst po celé ČR od Prahy, Brna a Ostravy až po menší okresní města, kde jiné služby často nepůsobí.",
      },
      {
        question: "Jaký je rozdíl mezi foodorou a Woltem?",
        answer:
          "foodora klade větší důraz na předem rezervované směny s garantovaným vytížením, zatímco u Woltu se přihlašujete zcela volně kdykoliv bez plánování.",
      },
      {
        question: "Jak probíhá vybavení pro nového kurýra?",
        answer:
          "Po přijetí do programu obdržíte termobox a kurýrní vybavení foodora, se kterým můžete okamžitě vyrazit na první zakázky.",
      },
    ],
  },
  {
    slug: "airbnb",
    name: "Airbnb Hostitel",
    categorySlug: "extra-prijem",
    shortDescription:
      "Pronajímejte volný pokoj, byt nebo chalupu na Airbnb. Získejte uvítací odměnu 500 Kč a ochranu majetku AirCover.",
    description: `
Máte volný pokoj, investiční byt, chatu nebo chalupu? Stát se hostitelem na **Airbnb** je jeden z nejefektivnějších způsobů, jak proměnit nevyužívaný prostor na nadstandardní měsíční příjem v řádu tisíců až desítek tisíc korun.

### Proč začít pronajímat přes Airbnb?
- **Uvítací bonus 500 Kč:** Při založení hostitelského profilu přes náš partnerský odkaz získáte uvítací odměnu po dokončení první kvalifikované rezervace.
- **Ochrana AirCover pro hostitele zdarma:** Každá rezervace automaticky zahrnuje ochranu proti škodám až do 3 mil. USD a pojištění odpovědnosti.
- **Absolutní kontrola nad kalendářem i cenou:** Sami určujete, které dny pronajímáte, jakou máte minimální délku pobytu i domovní řád.
- **Ověření hosté a recenze:** Před příjezdem vidíte hodnocení hostů z předchozích pobytů.

### Jak na první rezervaci bez stresu
1. Zaregistrujte svůj hostitelský profil přes odkaz na této stránce.
2. Nahrajte světlé, kvalitní fotografie prostoru a nastavte férovou úvodní cenu.
3. Po odbavení prvního hosta získáte výplatu na účet i nárok na doporučovací odměnu.
    `.trim(),
    logo: "/logos/airbnb.svg",
    bonus: "500 Kč uvítací bonus pro nového hostitele",
    bonusDescription:
      "Odměna 500 Kč pro nového hostitele po založení nabídky přes partnerský odkaz a dokončení první rezervace.",
    ctaLabel: "Začít pronajímat na Airbnb",
    requirements: [
      "Věk minimálně 18 let",
      "Byt, pokoj, chata nebo chalupa vhodná ke krátkodobému ubytování",
      "Registrace přes partnerský odkaz a dokončení první platné rezervace",
    ],
    pros: [
      "Bezplatná ochrana majetku AirCover až do 3 milionů USD",
      "Globální dosah na miliony cestovatelů po celý rok",
      "Automatizované platby a přehledná mobilní aplikace",
    ],
    cons: [
      "Vyžaduje pravidelný úklid a rychlou komunikaci s hosty",
      "Nutnost dodržovat místní vyhlášky, evidenci hostů a daňové povinnosti",
    ],
    referralUrl:
      "https://www.airbnb.cz/rp/adamm34364?p=stay&s=67&unique_share_id=fe36d888-1903-4c41-afe9-dedaeffde2a4",
    trackingSlug: "airbnb",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Airbnb hostitel 2026: Bonus 500 Kč a návod",
    seoDescription:
      "Proměňte volný byt, pokoj nebo chalupu v pravidelný příjem na Airbnb. Uvítací bonus 500 Kč pro nové hostitele, ochrana AirCover a návod.",
    faq: [
      {
        question: "Kolik stojí registrace nemovitosti na Airbnb?",
        answer:
          "Vytvoření účtu a vystavení inzerátu je zcela zdarma. Airbnb si strhává servisní poplatek až ve chvíli, kdy reálně přijmete placenou rezervaci.",
      },
      {
        question: "Jak funguje ochrana majetku AirCover?",
        answer:
          "AirCover pro hostitele je zdarma součástí každé rezervace a pokrývá ochranu majetku před škodami do 3 mil. USD i pojištění odpovědnosti hostitele.",
      },
      {
        question: "Kdy získám odměnu pro nového hostitele?",
        answer:
          "Odměna se připíše po vytvoření první nabídky přes partnerský odkaz a úspěšném dokončení prvního pobytu splňujícího podmínky programu Airbnb.",
      },
    ],
  },
  {
    slug: "booking",
    name: "Booking.com Partner",
    categorySlug: "extra-prijem",
    shortDescription:
      "Zaregistrujte svůj apartmán, penzion nebo chalupu na Booking.com a získejte 0% provizi z prvních 50 rezervací.",
    description: `
**Booking.com** je nejnavštěvovanější rezervační portál pro ubytování v Evropě i Česku. Pokud máte apartmán, penzion, chalupu nebo rekreační objekt, registrace přes náš partnerský program vám přinese mimořádnou výhodu: **nulovou provizi pro prvních 50 rezervací**.

### Kolik díky 0% provizi ušetříte?
Standardní provize Booking.com se pohybuje kolem 15 %. Při průměrné hodnotě rezervace 4 000 Kč ušetříte na 50 rezervacích **přibližně 30 000 Kč**, které zůstanou přímo ve vaší kapse!

### Proč inzerovat ubytování na Booking.com
- **0 % komise pro prvních 50 rezervací** při registraci přes partnerský odkaz.
- **Okamžitá viditelnost** pro české i zahraniční turisty hledající ubytování v ČR.
- **Synchronizace kalendáře (iCal):** Snadné propojení s Airbnb bez rizika dvojitých rezervací.
- **Automatický systém plateb a fakturace** pro bezstarostnou správu.
    `.trim(),
    logo: "/logos/booking.svg",
    bonus: "0% provize pro prvních 50 rezervací",
    bonusDescription:
      "Ušetřete až desítky tisíc korun na provizích z prvních 50 rezervací po registraci přes partnerský odkaz.",
    ctaLabel: "Zaregistrovat ubytování s 0% provizí",
    requirements: [
      "Vlastnictví nebo oprávnění ke správě ubytovacího zařízení",
      "Nová registrace objektu přes partnerský odkaz Booking.com",
    ],
    pros: [
      "Nulová provize na prvních 50 uskutečněných rezervací",
      "Nejvyšší návštěvnost a důvěra cestovatelů v ČR i EU",
      "Snadná synchronizace obsazenosti s Airbnb a dalšími portály",
    ],
    cons: [
      "Po vyčerpání bonusu se účtuje standardní provize Booking.com",
      "Hosté často očekávají flexibilní storno podmínky",
    ],
    referralUrl: "https://join.booking.com/r/d/2d2ab7d3?lang=xu",
    trackingSlug: "booking",
    partnerNetwork: "direct",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Booking.com Partner: 0% provize (50 rezervací)",
    seoDescription:
      "Zaregistrujte svůj apartmán, chatu nebo penzion na Booking.com přes partnerský odkaz a neplaťte žádnou provizi z prvních 50 rezervací.",
    faq: [
      {
        question: "Opravdu neplatím z prvních 50 rezervací na Booking.com žádnou provizi?",
        answer:
          "Ano, při registraci nového ubytovacího objektu přes náš partnerský odkaz získáváte 0% komisi pro prvních 50 rezervací dle aktuálních podmínek Booking.com.",
      },
      {
        question: "Mohu kombinovat Booking.com a Airbnb zároveň?",
        answer:
          "Ano, většina úspěšných pronajímatelů kombinuje obě platformy a synchronizuje kalendáře přes standard iCal, aby nedošlo k překryvu termínů.",
      },
      {
        question: "Jak rychle může být moje ubytování online?",
        answer:
          "Registrace profilu zabere zhruba 15 minut a po krátkém ověření adresy můžete přijímat první rezervace prakticky ihned.",
      },
    ],
  },
  {
    slug: "tipsport",
    name: "Tipsport bonus 1 300 Kč",
    categorySlug: "bonusy",
    shortDescription:
      "Získejte 300 Kč zdarma ihned za registraci bez vkladu a dalších 1 000 Kč přes program Přiveď kamaráda.",
    description: `
**Tipsport** je největší česká sázková kancelář s licencí Ministerstva financí ČR. Novým plnoletým uživatelům nabízí atraktivní kombinaci: **300 Kč zdarma ihned za dokončení registrace** (bez nutnosti vlastního vkladu) a k tomu **dalších 1 000 Kč** v rámci programu *Přiveď kamaráda*.

### Jak funguje osobní pozvánka Přiveď kamaráda?
Aby vznikl nárok na kompletní kombinovanou odměnu **1 000 + 300 Kč**, vyžaduje Tipsport zaslání oficiální osobní pozvánky od stávajícího ověřeného klienta před samotnou registrací.

### Postup krok za krokem
1. Vyplňte krátký formulář výše (jméno a e-mail/telefon) — vaše údaje slouží výhradně k odeslání oficiální pozvánky z Tipsportu.
2. Do e-mailu vám obratem dorazí oficiální pozvánkový odkaz.
3. Dokončete registraci a rychlé online ověření přes **BankID** (zabere cca 2 minuty).
4. Získáte 300 Kč v Netech ihned bez vkladu + nárok na bonus 1 000 Kč dle podmínek programu.

*Upozornění: Ministerstvo financí varuje: Účastí na hazardní hře může vzniknout závislost! Zákaz účasti osob mladších 18 let.*
    `.trim(),
    logo: "/logos/tipsport.png",
    bonus: "1 000 Kč + 300 Kč zdarma (celkem 1 300 Kč)",
    bonusDescription:
      "300 Kč bez vkladu ihned po ověření přes BankID + 1 000 Kč přes osobní pozvánku Přiveď kamaráda.",
    ctaLabel: "Podmínky Tipsport bonusu",
    requirements: [
      "Věk minimálně 18 let a trvalý pobyt v ČR",
      "Vyplnění formuláře výše pro zaslání oficiální osobní pozvánky",
      "Dokončení registrace a ověření identity přes BankID",
    ],
    pros: [
      "300 Kč zdarma v Netech bez nutnosti vkládat vlastní peníze",
      "Další bonus až 1 000 Kč v rámci programu Přiveď kamaráda",
      "Bleskové online ověření přes BankID z domova za 2 minuty",
    ],
    cons: [
      "Vyžaduje předchozí zaslání osobní pozvánky přes formulář",
      "Pouze pro osoby starší 18 let; účast na hazardních hrách nese riziko",
    ],
    referralUrl: "https://www.tipsport.cz/bonusy/prived-kamarada",
    trackingSlug: "tipsport",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Tipsport bonus 1 300 Kč: Pozvánka a návod 2026",
    seoDescription:
      "Získejte 300 Kč bez vkladu za registraci přes BankID a dalších 1 000 Kč přes oficiální pozvánku Tipsport Přiveď kamaráda. Návod 2026.",
    faq: [
      {
        question: "Proč musím pro Tipsport bonus vyplnit formulář pro pozvánku?",
        answer:
          "Program Přiveď kamaráda vyžaduje, aby nový uživatel obdržel oficiální osobní pozvánku na svůj e-mail ještě před založením účtu. Po vyplnění formuláře vám pozvánku obratem odešleme.",
      },
      {
        question: "Musím vkládat vlastní peníze pro získání prvních 300 Kč?",
        answer:
          "Ne, 300 Kč v Netech získáte zdarma hned po dokončení plné registrace a ověření totožnosti (např. přes BankID) bez nutnosti vkladu.",
      },
      {
        question: "Jak dlouho trvá ověření účtu u Tipsportu?",
        answer:
          "Díky napojení na BankID většiny českých bank zvládnete registraci i ověření online z mobilu během 2 až 3 minut.",
      },
    ],
  },
  {
    slug: "raiffeisenbank",
    name: "Raiffeisenbank Chytrý účet",
    categorySlug: "banky",
    shortDescription:
      "Běžný účet bez poplatků za vedení s výběry ze všech bankomatů zdarma a finančním bonusem až 3 000 Kč za založení online.",
    description: `
**Chytrý účet od Raiffeisenbank** patří k nejštědřejším bankovním účtům na českém trhu. Nabízí vedení účtu i výběry ze všech bankomatů v ČR i zahraničí zcela zdarma a novým klientům navíc vyplácí atraktivní finanční odměnu až **3 000 Kč** přímo na účet.

### Co získáte s Chytrým účtem zdarma?
- **Finanční bonus 3 000 Kč** při založení účtu online do 30 dní přes partnerský odkaz s kódem **lWcT2P**.
- **0 Kč za vedení účtu** bez nutnosti plnit obratové podmínky.
- **Výběry ze všech bankomatů v ČR i po celém světě zdarma** bez limitu počtu výběrů.
- **Okamžité platby v CZK i EUR**, Apple Pay, Google Pay a přehledné mobilní bankovnictví.

### Jak získat bonus 3 000 Kč krok za krokem
1. Klikněte na tlačítko **Založit účet s bonusem 3 000 Kč** (referral kód **lWcT2P** je součástí odkazu).
2. Dokončete online založení Chytrého účtu do **30 dní** (nejrychleji pomocí BankID).
3. Aktivně využívejte novou kartu dle aktuálních podmínek kampaně Raiffeisenbank.
4. Odměna se připisuje v hotovosti přímo na váš nový běžný účet.
    `.trim(),
    logo: "/logos/raiffeisenbank.png",
    bonus: "Až 3 000 Kč finanční bonus na účet",
    bonusDescription:
      "Odměna až 3 000 Kč pro nové klienty při založení Chytrého účtu online do 30 dní přes doporučení (kód lWcT2P).",
    promoCode: "lWcT2P",
    promoCodeNote: "Kód doporučení se aplikuje automaticky při prokliku přes tlačítko.",
    ctaLabel: "Založit Chytrý účet s bonusem 3 000 Kč",
    requirements: [
      "Nový klient Raiffeisenbank (věk 18+)",
      "Online založení Chytrého účtu přes doporučovací odkaz do 30 dní",
      "Splnění podmínek aktivního využívání účtu dle aktuální akce banky",
    ],
    pros: [
      "Jeden z nejvyšších bankovních bonusů v ČR (až 3 000 Kč)",
      "Vedení účtu a výběry ze všech bankomatů v ČR i zahraničí zdarma",
      "Výborné mobilní bankovnictví s podporou více měn i investic",
    ],
    cons: [
      "Bonus platí pouze pro nové klienty Raiffeisenbank",
      "Odměna se vyplácí postupně po splnění měsíčních podmínek plateb kartou",
    ],
    referralUrl: "https://onb.rb.cz/onb-web?mgm=lWcT2P",
    trackingSlug: "raiffeisenbank",
    partnerNetwork: "direct",
    rating: 4.9,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Raiffeisenbank bonus 3 000 Kč: Kód lWcT2P",
    seoDescription:
      "Založte si Chytrý účet Raiffeisenbank online zdarma s kódem lWcT2P a získejte bonus až 3 000 Kč. Výběry ze všech bankomatů zdarma a podmínky.",
    faq: [
      {
        question: "Jak uplatnit kód lWcT2P pro Raiffeisenbank bonus 3 000 Kč?",
        answer:
          "Stačí kliknout na tlačítko na této stránce — unikátní kód lWcT2P je vložen přímo v odkazu pro online založení účtu do 30 dní.",
      },
      {
        question: "Je vedení Chytrého účtu u Raiffeisenbank skutečně zdarma?",
        answer:
          "Ano, vedení Chytrého účtu, tuzemské okamžité platby i výběry z bankomatů všech bank v ČR a zahraničí jsou za 0 Kč bez skrytých podmínek.",
      },
      {
        question: "Jak dlouho trvá online založení účtu?",
        answer:
          "S využitím BankID nebo dvou dokladů totožnosti zvládnete celý proces z mobilu či počítače zhruba za 10 minut bez návštěvy pobočky.",
      },
    ],
  },
  {
    slug: "mbank",
    name: "mBank mKonto",
    categorySlug: "banky",
    shortDescription:
      "Založte si bezpoplatkové mKonto online s kódem adamm1863 a získejte 100 Kč za každou platbu kartou – celkem 1 000 Kč.",
    description: `
**mKonto od mBank** je dlouhodobě jeden z nejpopulárnějších bezpoplatkových účtů v Česku. Prostřednictvím doporučovacího programu nyní získáte **100 Kč zpět za každou libovolnou platbu kartou** – celkem až za 10 plateb, tedy **1 000 Kč přímo na účet**.

### Proč si vybrat mBank mKonto?
- **Snadný bonus 1 000 Kč:** Stačí 10 běžných nákupů kartou (bez minimální částky!) a za každý dostanete 100 Kč.
- **0 Kč za vedení účtu i kartu** při aktivním používání.
- **Výběry ze všech bankomatů zdarma** v ČR i v zahraničí při částce od 1 500 Kč.
- **Výhodná mKarta Svět** pro placení v cizích měnách bez nevýhodných kurzových přirážek.

### Jak získat plných 1 000 Kč krok za krokem
1. Přejděte přes odkaz níže (obsahuje kód doporučení **adamm1863**).
2. Založte si účet mKonto online během několika minut.
3. Zaplaťte kartou v obchodě, přes Apple/Google Pay nebo na internetu.
4. Za každou z prvních 10 plateb vám mBank připíše **100 Kč**, celkem tedy **1 000 Kč**.

*Tip: Hledáte spíše vysoké úročení úspor? Podívejte se také na akci [mBank mKonto + mSpořicí účet Plus 4,41 % p.a.](/nabidky/mbank-sporici-ucet).*
    `.trim(),
    logo: "/logos/mbank.png",
    bonus: "1 000 Kč (100 Kč za každých 10 plateb kartou)",
    bonusDescription:
      "Odměna 100 Kč za libovolnou platbu kartou po založení mKonta s kódem adamm1863 (limit 10 plateb = 1 000 Kč).",
    promoCode: "adamm1863",
    promoCodeNote: "Doporučovací kód se předvyplní automaticky po kliknutí na odkaz.",
    ctaLabel: "Založit mKonto a získat 1 000 Kč",
    requirements: [
      "Nový klient mBank starší 18 let",
      "Založení účtu mKonto online s doporučovacím kódem adamm1863",
      "Uskutečnění až 10 libovolných plateb kartou pro maximální bonus 1 000 Kč",
    ],
    pros: [
      "Velmi snadné splnění podmínek: 100 Kč za každou platbu kartou",
      "Vedení účtu a tuzemské okamžité platby zcela zdarma",
      "Výběry od 1 500 Kč ze všech bankomatů v ČR i zahraničí zdarma",
    ],
    cons: [
      "Výběry z bankomatu pod 1 500 Kč jsou zpoplatněny",
      "Nelze kombinovat s jinými akvizicemi u stávajících klientů",
    ],
    referralUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html?numer=adamm1863.",
    trackingSlug: "mbank",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "mBank mKonto bonus 1 000 Kč: Kód adamm1863",
    seoDescription:
      "Založte si mBank mKonto zdarma s kódem adamm1863 a získejte 100 Kč za každou z prvních 10 plateb kartou (celkem 1 000 Kč). Návod krok za krokem.",
    faq: [
      {
        question: "Existuje minimální částka jedné platby kartou pro bonus u mBank?",
        answer:
          "V rámci doporučovacího programu získáte 100 Kč za libovolnou platbu kartou až do celkového limitu 10 plateb, tedy 1 000 Kč.",
      },
      {
        question: "Počítají se platby mobilem přes Apple Pay a Google Pay?",
        answer:
          "Ano, platby digitalizovanou kartou v telefonu nebo chytrých hodinkách se standardně počítají jako platby kartou.",
      },
      {
        question: "Kolik stojí vedení účtu mKonto?",
        answer:
          "Vedení běžného účtu mKonto, příchozí i odchozí platby v ČR a okamžité platby jsou zcela zdarma.",
      },
    ],
  },
  {
    slug: "air-bank",
    name: "Air Bank běžný účet",
    categorySlug: "banky",
    shortDescription:
      "Oblíbená česká banka bez zbytečných poplatků, chytrý cashback program My Air a odměna za doporučení s kódem qupir6.",
    description: `
**Air Bank** je dlouhodobě nejlépe hodnocenou českou bankou z hlediska klientské spokojenosti a jednoduchosti mobilní aplikace My Air. K běžnému účtu zdarma získáte okamžitý přehled o financích, výhodné spořicí obálky a slevy u desítek partnerů v programu **Odměny za placení**.

### Co získáte založením účtu přes doporučení?
- **Jednoduchá podmínka:** Stačí založit účet online přes náš odkaz s kódem **qupir6** a **zaplatit 5× kartou do 45 dnů** od registrace.
- **Vedení účtu i sdílené bankomaty zdarma** (Air Bank, MONETA, Komerční banka, UniCredit).
- **Cashback a slevy v My Air:** Pravidelné slevy v obchodech, restauracích i na čerpacích stanicích přímo v aplikaci.
- **Rychlé online založení:** Bez papírování z mobilu během několika minut.
    `.trim(),
    logo: "/logos/air-bank.png",
    bonus: "Bonus za doporučení + cashback My Air",
    bonusDescription:
      "Výhody programu Pozvání přátel s kódem qupir6 po zaplacení 5× kartou do 45 dnů od registrace.",
    promoCode: "qupir6",
    promoCodeNote: "Kód doporučení qupir6 se propíše automaticky po kliknutí na odkaz.",
    ctaLabel: "Založit Air Bank účet zdarma",
    requirements: [
      "Věk minimálně 18 let a nový klient Air Bank",
      "Online založení účtu přes doporučovací odkaz (referrer qupir6)",
      "Zaplatit alespoň 5× kartou do 45 dnů od registrace",
    ],
    pros: [
      "Špičková a přehledná mobilní aplikace My Air",
      "Bezplatné výběry ze sdílené sítě více než 2 000 bankomatů v ČR",
      "Program Odměny za placení s pravidelným cashbackem u partnerů",
    ],
    cons: [
      "Nutnost provést 5 plateb kartou během 45 dnů pro splnění doporučení",
      "Výběry z cizích bankomatů mimo sdílenou síť jsou zpoplatněny",
    ],
    referralUrl: "https://www.airbank.cz/pozvani-pratel?referrer=qupir6",
    trackingSlug: "air-bank",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Air Bank účet zdarma: Kód qupir6 a recenze",
    seoDescription:
      "Založte si Air Bank běžný účet zdarma s doporučovacím kódem qupir6. Stačí 5 plateb kartou do 45 dnů. Recenze, poplatky a výhody My Air.",
    faq: [
      {
        question: "Jaká je hlavní podmínka pro splnění doporučení u Air Bank?",
        answer:
          "Stačí si založit účet přes pozvánkový odkaz s kódem qupir6 a do 45 dnů od registrace alespoň 5× zaplatit platební kartou.",
      },
      {
        question: "Ze kterých bankomatů vybírám s Air Bank zdarma?",
        answer:
          "Zdarma vybíráte ze sdílené sítě bankomatů Air Bank, Komerční banky, MONETA Money Bank a UniCredit Bank po celé České republice.",
      },
      {
        question: "Platí se u Air Bank za vedení běžného nebo spořicího účtu?",
        answer:
          "Ne, vedení běžného účtu, spořicího účtu i mobilní aplikace My Air je zcela zdarma.",
      },
    ],
  },
  {
    slug: "revolut",
    name: "Revolut",
    categorySlug: "banky",
    shortDescription:
      "Globální finanční superaplikace se směnou 30+ měn za mezibankovní kurzy, jednorázovými kartami, RevPoints a odměnou od BONUSLY.",
    description: `
**Revolut** je nejoblíbenější cestovatelská a platební aplikace v Evropě. Umožňuje platit v zahraničí i na zahraničních e-shopech bez nevýhodných bankovních přirážek, chránit online nákupy jednorázovými virtuálními kartami a sbírat věrnostní body **RevPoints** směnitelné za letecké míle či slevy na ubytování.

### Speciální odměna do peněženky BONUSLY
Když se přihlásíte do svého účtu na BONUSLY a založíte si Revolut přes náš odkaz a splníte všechny podmínky níže, získáte **peněžitou odměnu do vaší BONUSLY peněženky**!

### Přesné podmínky pro získání odměny krok za krokem
1. **Zaregistrujte se přes náš odkaz** níže a ověřte svou totožnost v aplikaci Revolut.
2. **Dobijte peníze na účet** bankovním převodem nebo debetní kartou.
3. **Proveďte 3 reálné platby kartou v minimální výši 100 Kč každá** (nepočítají se převody, dárkové poukazy ani hazardní transakce).
4. **Objednejte si fyzickou kartu Revolut** (hned ji můžete přidat i do Apple Pay nebo Google Pay a platit bezkontaktně).

### Co jsou RevPoints?
Věrnostní program Revolutu umožňuje automaticky sbírat body z každé platby kartou a proměnit je v letecké míle (Avios, Flying Blue aj.) nebo slevy na pobyty a zážitky přímo v aplikaci.
    `.trim(),
    logo: "/logos/revolut.svg",
    bonus: "Odměna od BONUSLY + nejlepší kurzy měn",
    bonusDescription:
      "Založte Revolut přes náš odkaz, dobijte účet, proveďte 3 platby min. 100 Kč a objednejte fyzickou kartu — získáte odměnu do peněženky.",
    ctaLabel: "Založit Revolut a získat odměnu",
    requirements: [
      "Věk minimálně 18 let a registrace přes náš referral odkaz",
      "Ověření totožnosti (občanský průkaz nebo pas)",
      "Dobití peněz na Revolut účet kartou nebo převodem",
      "3 běžné platby kartou v hodnotě alespoň 100 Kč každá",
      "Objednání fyzické platební karty Revolut",
    ],
    pros: [
      "Směna více než 30 měn za mezibankovní kurzy ve všední dny",
      "Jednorázové virtuální karty pro maximální bezpečnost na internetu",
      "Věrnostní program RevPoints a okamžité platby mezi přáteli",
      "Přímá peněžitá odměna od BONUSLY po splnění podmínek",
    ],
    cons: [
      "O víkendu účtuje standardní tarif 1% přirážku za směnu měn",
      "Pro splnění promo akce je nutné objednat fyzickou kartu (hradí se poštovné)",
    ],
    referralUrl:
      "https://revolut.com/referral/?referral-code=adamhcyiq!SEP1-26-AR-H2&geo-redirect",
    trackingSlug: "revolut",
    partnerNetwork: "direct",
    rewardAmount: 500,
    rating: 4.9,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Revolut recenze 2026: Bonus a RevPoints",
    seoDescription:
      "Založte si Revolut přes náš odkaz, proveďte 3 platby min. 100 Kč, objednejte kartu a získejte odměnu od BONUSLY. Recenze kurzů a RevPoints.",
    faq: [
      {
        question: "Jaké platby se počítají do podmínky 3 plateb po 100 Kč u Revolutu?",
        answer:
          "Počítají se běžné nákupy zboží a služeb v kamenných obchodech nebo e-shopech (včetně Apple/Google Pay). Nepočítají se převody peněz, hazard, krypto ani nákup dárkových poukazů.",
      },
      {
        question: "Musím si u Revolutu skutečně objednat fyzickou kartu?",
        answer:
          "Ano, objednání fyzické karty je povinnou podmínkou doporučovací akce. Ještě než karta dorazí poštou, můžete ale rovnou platit její virtuální verzí v mobilu.",
      },
      {
        question: "Vyplatí se Revolut na dovolenou do zahraničí?",
        answer:
          "Rozhodně. Ve všední dny směňuje měny za středový kurz bez klasické 2–4% přirážky tradičních bank, takže na jedné dovolené snadno ušetříte stovky až tisíce korun.",
      },
    ],
  },
  {
    slug: "investown",
    name: "Investown",
    categorySlug: "finance",
    shortDescription:
      "Investujte do nemovitostí v ČR od 500 Kč s výnosem až 10 % p.a. a získejte vstupní bonus 500 Kč s kódem 0G1ADBC5.",
    description: `
**Investown** je přední česká investiční platforma s licencí České národní banky (ČNB), která zpřístupňuje investice do úvěrů zajištěných nemovitostmi široké veřejnosti už od **500 Kč**. Výnosy chodí pravidelně každý měsíc přímo do vaší investiční peněženky.

### Jak získat vstupní bonus 500 Kč krok za krokem
1. Zaregistrujte se přes náš odkaz níže s promo kódem **0G1ADBC5**.
2. Do **7 dní od registrace** investujte alespoň **5 000 Kč** do jednoho vybraného nemovitostního projektu.
3. Na váš účet bude automaticky připsán **vstupní bonus 500 Kč** (okamžité zhodnocení 10 % navíc!).
4. *Praktický tip:* Investown disponuje **sekundárním tržištěm**, takže pokud budete peníze potřebovat dříve, participaci v projektu lze zpravidla velmi rychle prodat ostatním investorům.

### Proč investoři volí Investown?
- **Licencováno ČNB:** Plně regulovaný poskytovatel skupinového financování v ČR.
- **Zajištění nemovitostí:** Každý projekt je krytý zástavním právem k reálné nemovitosti.
- **Měsíční cashflow:** Úroky se připisují každý měsíc a můžete je ihned reinvestovat (složené úročení) nebo vybrat.
    `.trim(),
    logo: "/logos/investown.png",
    bonus: "500 Kč bonus pro nového investora",
    bonusDescription:
      "Bonus 500 Kč při investici min. 5 000 Kč do jednoho projektu do 7 dní od registrace s kódem 0G1ADBC5.",
    promoCode: "0G1ADBC5",
    promoCodeNote: "Referral kód 0G1ADBC5 se automaticky aktivuje přes naše tlačítko.",
    ctaLabel: "Získat bonus 500 Kč na Investown",
    requirements: [
      "Věk minimálně 18 let a vlastní bankovní účet",
      "Registrace přes referral odkaz s kódem 0G1ADBC5",
      "Zainvestovat min. 5 000 Kč do jednoho projektu do 7 dní od registrace",
    ],
    pros: [
      "Atraktivní vstupní bonus 500 Kč při investici 5 000 Kč",
      "Měsíčně vyplácený výnos typicky 8–10,5 % p.a.",
      "Dohled České národní banky (ČNB) a zástavní právo na nemovitost",
      "Likvidní sekundární trh pro předčasný prodej participace",
    ],
    cons: [
      "Investice není pojištěna jako klasický bankovní vklad",
      "Při opoždění dlužníka se může výplata jistiny prodloužit",
    ],
    referralUrl: "https://my.investown.cz/referral/0G1ADBC5",
    trackingSlug: "investown",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Investown bonus 500 Kč: Kód 0G1ADBC5 (2026)",
    seoDescription:
      "Investujte do nemovitostí přes Investown s kódem 0G1ADBC5 a získejte 500 Kč bonus za investici 5 000 Kč do 7 dní. Recenze výnosů a sekundárního trhu.",
    faq: [
      {
        question: "Jak získám bonus 500 Kč na Investown?",
        answer:
          "Zaregistrujte se přes odkaz s kódem 0G1ADBC5 a do 7 dnů od registrace zainvestujte alespoň 5 000 Kč do jednoho projektu. Bonus 500 Kč se připíše na váš účet.",
      },
      {
        question: "Mohu investici v Investownu prodat před koncem splatnosti?",
        answer:
          "Ano, na integrovaném sekundárním tržišti lze participaci nabídnout ostatním investorům a získat tak peníze zpět dříve (za malý poplatek tržiště).",
      },
      {
        question: "Je Investown bezpečná a regulovaná platforma?",
        answer:
          "Investown vlastní evropskou licenci crowdfundingového poskytovatele pod dohledem ČNB a úvěry zajišťuje zástavním právem na nemovitostech. Každá investice však nese určité riziko.",
      },
    ],
  },
  {
    slug: "trading-212",
    name: "Trading 212",
    categorySlug: "finance",
    shortDescription:
      "Evropský broker pro nákup akcií a ETF bez komisí s českou aplikací a denním úročením neinvestované hotovosti.",
    description: `
**Trading 212** patří mezi nejoblíbenější evropské brokery pro drobné i pokročilé investory. Umožňuje nakupovat a prodávat světové akcie a ETF (včetně zlomkových akcií už od 1 EUR / 30 Kč) zcela **bez poplatků za obchodování**.

### Aktuální stav promo akce (Akcie zdarma)
*Transparentní informace:* Trading 212 spouští kampaň **akcie zdarma v hodnotě až 100 EUR** v pravidelných vlnách — **momentálně je akce dočasně pozastavena**. Platforma přesto zůstává špičkovou volbou díky nulovým komisím, funkcím investičních „koláčů“ (Pies) a dennímu úročení volných peněz.

### Hlavní přednosti Trading 212
- **0 % komise za nákup a prodej** reálných akcií a ETF (S&P 500, MSCI World aj.).
- **Automatické investování (Pies & AutoInvest):** Nastavte si vlastní portfolio a pravidelné trvalé příkazy.
- **Úročení volné hotovosti:** Neinvestované prostředky v CZK, EUR i USD se úročí každý den.
- **Intuitivní mobilní aplikace kompletně v češtině** a regulace v EU (CySEC / FCA).
    `.trim(),
    logo: "/logos/trading-212.png",
    bonus: "0 % komise za akcie & ETF (promo akcie až 100 EUR sezónně)",
    bonusDescription:
      "Momentálně bez aktivního vstupního bonusu — broker spouští akci na akcie zdarma až 100 EUR v periodických vlnách.",
    ctaLabel: "Prohlédnout Trading 212",
    requirements: [
      "Věk minimálně 18 let",
      "Online ověření totožnosti (OP nebo pas)",
      "První vklad již od 30 Kč / 1 EUR",
    ],
    pros: [
      "Nulové poplatky za nákup a prodej akcií i ETF",
      "Zlomkové akcie a automatické investiční koláče (Pies)",
      "Denní úročení neinvestovaných peněz v CZK, EUR i USD",
    ],
    cons: [
      "Uvítací bonus akcie zdarma až 100 EUR momentálně není aktivní",
      "Poplatek 0,15 % za měnovou konverzi při nákupu v cizí měně",
    ],
    referralUrl: "https://www.trading212.com",
    trackingSlug: "trading-212",
    partnerNetwork: "direct",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Trading 212 recenze 2026: ETF bez poplatků",
    seoDescription:
      "Aktuální recenze brokera Trading 212 v češtině. Nulové poplatky na ETF a akcie, denní úročení hotovosti a aktuální stav akce na akcii zdarma.",
    faq: [
      {
        question: "Nabízí Trading 212 právě teď akcii zdarma?",
        answer:
          "V tuto chvíli je referral kampaň na akcii zdarma až 100 EUR ze strany Trading 212 dočasně pozastavena. Jakmile se znovu otevře, tuto stránku okamžitě aktualizujeme.",
      },
      {
        question: "Kolik stojí nákup ETF na Trading 212?",
        answer:
          "Samotný nákup a prodej akcií i ETF je zcela bez provize. Pokud nakupujete aktiva v jiné měně než v měně účtu, platíte jen nízký FX poplatek 0,15 %.",
      },
      {
        question: "Jaká je minimální investice u Trading 212?",
        answer:
          "Díky podpoře zlomkových akcií můžete začít investovat už od 1 EUR (přibližně 30 Kč).",
      },
    ],
  },
];
