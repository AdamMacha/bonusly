import type { OfferSeed } from "./types";

export const ESHOP_OFFERS: OfferSeed[] = [
  {
    slug: "jabkolevne",
    name: "Jabkolevně.cz",
    categorySlug: "elektro",
    shortDescription:
      "Nové, zánovní a použité iPhony i Apple příslušenství s garancí kvality a ověřeným slevovým kódem sleva600 na 600 Kč.",
    description: `
**Jabkolevně.cz** je oblíbený český specialista na nové, rozbalené, zánovní i použité **Apple iPhony** a příslušenství s důkladnou kontrolou technického stavu a zárukou. Oproti novému kusu z běžného elektra zde ušetříte tisíce korun a s naším ověřeným kódem získáte **dalších 600 Kč dolů**!

### Exkluzivní slevový kód: \`sleva600\` (sleva 600 Kč!)
- **Výše slevy:** **600 Kč** z vaší objednávky.
- **Podmínka uplatnění:** Objednávka v hodnotě nad **2 000 Kč bez DPH** (tedy prakticky každý iPhone v nabídce).
- **Platnost kódu:** Ověřeno a platné až do **31. 12. 2027**.
- **Důležité:** Nezapomeňte kód **\`sleva600\`** skutečně vložit v nákupním košíku před dokončením objednávky!

### Proč nakoupit iPhone na Jabkolevně.cz?
- **Výrazná úspora** oproti standardním maloobchodním cenám Apple.
- **Prověřená kvalita a garance:** Každý telefon prochází kontrolou funkčnosti a stavu baterie.
- **Rychlé doručení po celé ČR** a široká nabídka příslušenství (kryty, tvrzená skla, nabíječky).
    `.trim(),
    logo: "/logos/jabkolevne.png",
    bonus: "Sleva 600 Kč s kódem sleva600 (nad 2 000 Kč bez DPH)",
    bonusDescription:
      "Zkopírujte slevový kód sleva600 a uplatněte jej v košíku pro okamžitou slevu 600 Kč (platí do 31. 12. 2027).",
    promoCode: "sleva600",
    promoCodeNote: "Zadejte v košíku při nákupu nad 2 000 Kč bez DPH (platí do 31. 12. 2027).",
    ctaLabel: "Uplatnit slevu 600 Kč na Jabkolevně.cz",
    requirements: [
      "Nákup v hodnotě minimálně 2 000 Kč bez DPH",
      "Povinné zadání slevového kódu sleva600 v nákupním košíku",
      "Platnost promo kódu do 31. 12. 2027",
    ],
    pros: [
      "Vysoká okamžitá sleva 600 Kč se slevovým kódem sleva600",
      "Výrazně nižší ceny zánovních a rozbalených iPhonů oproti novým",
      "Garance kvality, ověřená funkčnost a záruka na zařízení",
    ],
    cons: [
      "Slevový kód vyžaduje minimální hodnotu košíku 2 000 Kč bez DPH",
      "Oblíbené konfigurace a barvy zánovních iPhonů se mohou rychle vyprodat",
    ],
    referralUrl:
      "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=85731c2c&desturl=https%3A%2F%2Fwww.jabkolevne.cz%2F",
    affiliateUrl:
      "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=85731c2c&desturl=https%3A%2F%2Fwww.jabkolevne.cz%2F",
    trackingSlug: "jabkolevne",
    partnerNetwork: "ehub",
    rewardAmount: null, // Zákaz cashbacku dle podmínek programu!
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Jabkolevně.cz kód sleva600: Sleva 600 Kč",
    seoDescription:
      "Ověřený slevový kód sleva600 na Jabkolevně.cz — ušetřete okamžitě 600 Kč na nákupu nového či zánovního iPhonu nad 2 000 Kč bez DPH. Recenze a návod.",
    faq: [
      {
        question: "Jaký je aktuální ověřený slevový kód na Jabkolevně.cz?",
        answer:
          "Aktuální ověřený kód je sleva600. Přinese vám okamžitou slevu 600 Kč při objednávce nad 2 000 Kč bez DPH a platí až do 31. 12. 2027.",
      },
      {
        question: "Kam v košíku na Jabkolevně.cz zadat kód sleva600?",
        answer:
          "Po vložení iPhonu do košíku rozklikněte pole pro slevový kupón / promo kód, vložte sleva600 a klikněte na uplatnit — cena se ihned sníží o 600 Kč.",
      },
      {
        question: "Dostanu k zánovnímu iPhonu ze Jabkolevně záruku?",
        answer:
          "Ano, všechny telefony v nabídce procházejí kontrolou kvality a vztahuje se na ně záruka dle konkrétní kategorie stavu telefonu.",
      },
    ],
    promos: [
      {
        trackingSlug: "jabkolevne-sleva600",
        title: "Sleva 600 Kč na celý nákup nad 2 000 Kč bez DPH",
        description:
          "Zadejte v košíku povinný slevový kód sleva600 a ušetřete okamžitě 600 Kč při nákupu iPhonu nebo Apple zařízení.",
        badge: "Sleva 600 Kč",
        code: "sleva600",
        validUntil: "2027-12-31",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=85731c2c&desturl=https%3A%2F%2Fwww.jabkolevne.cz%2F",
        order: 1,
      },
    ],
  },
  {
    slug: "iphonemarket",
    name: "iPhoneMarket.cz",
    categorySlug: "elektro",
    shortDescription:
      "Specialista na zánovní a použité iPhony s precizní diagnostikou každého kusu, zárukou a slevovým kódem SLEVA400 na 400 Kč.",
    description: `
**iPhoneMarket.cz** se dlouhodobě specializuje na prodej prověřených zánovních a použitých telefonů **Apple iPhone**. Každý kus před zařazením do prodeje prochází podrobnou hardwarovou i softwarovou diagnostikou, kontrolou kapacity baterie a pečlivým čištěním — nakupujete tak bezpečněji než na inzerát a s plnou zárukou i možností vrácení.

### Slevový kód \`SLEVA400\` – ušetřete 400 Kč!
- **Výše slevy:** **400 Kč** na celý nákup.
- **Podmínka:** Objednávka v hodnotě nad **2 000 Kč**.
- **Platnost:** Do **31. 12. 2026**.

### Proč si vybrat iPhoneMarket.cz?
- **100% diagnostika každého kusu:** Žádné skryté vady ani blokované iCloudy.
- **Transparentní kategorie stavu:** Přesně víte, jaký vizuální stav kupujete (od stavu nového kusu až po cenově nejvýhodnější).
- **Záruka a bezproblémové vrácení:** Nakupujete od českého obchodníka se zárukou, nikoliv s rizikem bazaru.
    `.trim(),
    logo: "/logos/iphonemarket.png",
    bonus: "Sleva 400 Kč s kódem SLEVA400 (nad 2 000 Kč)",
    bonusDescription:
      "Uplatněte ověřený slevový kód SLEVA400 v košíku na iPhoneMarket.cz a získejte 400 Kč slevu (do 31. 12. 2026).",
    promoCode: "SLEVA400",
    promoCodeNote: "Platí na celý nákup nad 2 000 Kč do 31. 12. 2026.",
    ctaLabel: "Uplatnit slevu 400 Kč na iPhoneMarket.cz",
    requirements: [
      "Objednávka na iPhoneMarket.cz v hodnotě nad 2 000 Kč",
      "Zadání slevového kódu SLEVA400 v nákupním košíku",
      "Platnost slevového kódu do 31. 12. 2026",
    ],
    pros: [
      "Ověřený slevový kód SLEVA400 na 400 Kč na celý nákup nad 2 000 Kč",
      "Podrobná technická diagnostika každého kusu před prodejem",
      "Česká záruka a možnost vrácení zboží bez rizika bazarových podvodů",
    ],
    cons: [
      "U nejžádanějších modelů Pro/Pro Max bývají zásoby omezené počtem kusů",
      "Slevový kód platí od hodnoty nákupu 2 000 Kč",
    ],
    referralUrl:
      "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=2bcd6f9d&desturl=https%3A%2F%2Fwww.iphonemarket.cz%2F",
    affiliateUrl:
      "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=2bcd6f9d&desturl=https%3A%2F%2Fwww.iphonemarket.cz%2F",
    trackingSlug: "iphonemarket",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "iPhoneMarket.cz kód SLEVA400: Sleva 400 Kč",
    seoDescription:
      "Získejte slevu 400 Kč na prověřený zánovní iPhone na iPhoneMarket.cz s kódem SLEVA400 (nad 2 000 Kč). Diagnostika, záruka a recenze e-shopu.",
    faq: [
      {
        question: "Jaký slevový kód funguje na iPhoneMarket.cz?",
        answer:
          "S kódem SLEVA400 získáte okamžitou slevu 400 Kč na celý nákup nad 2 000 Kč. Kód je ověřený a platí do 31. 12. 2026.",
      },
      {
        question: "Jsou telefony z iPhoneMarket.cz odblokované pro české operátory?",
        answer:
          "Ano, každý prodávaný iPhone je plně odblokovaný, odhlášený z iCloudu a otestovaný pro provoz ve všech českých i zahraničních sítích.",
      },
      {
        question: "Mohu telefon vrátit, pokud mi nebude vyhovovat?",
        answer:
          "Ano, při nákupu online máte standardní zákonnou lhůtu pro vrácení zboží a zároveň plnou záruku prodejce.",
      },
    ],
    promos: [
      {
        trackingSlug: "iphonemarket-sleva400",
        title: "Sleva 400 Kč na celý nákup nad 2 000 Kč",
        description:
          "Vložte v košíku kód SLEVA400 a snižte si cenu zánovního či použitého iPhonu s diagnostikou o 400 Kč.",
        badge: "Sleva 400 Kč",
        code: "SLEVA400",
        validUntil: "2026-12-31",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=2bcd6f9d&desturl=https%3A%2F%2Fwww.iphonemarket.cz%2F",
        order: 1,
      },
    ],
  },
  {
    slug: "brilianty",
    name: "Brilianty.cz",
    categorySlug: "nakupy-a-volny-cas",
    shortDescription:
      "České luxusní diamantové šperky ruční výroby Danfil Jewellery s certifikátem pravosti a Black Friday kódem BF2026 na 15 %.",
    description: `
**Brilianty.cz** je prestižní český e-shop s luxusními šperky s přírodními diamanty, drahými kameny a zirkony pocházejícími přímo z vlastní ruční výroby **Danfil Jewellery v Liberci**. Ať už vybíráte zásnubní prsten, zlaté náušnice nebo nadčasový dárek k výročí, získáváte přímou cenu výrobce s certifikátem pravosti.

### Black Friday akce: sleva 15 % s kódem \`BF2026\`
- **Výše slevy:** **15 % na všechny nezlevněné šperky**.
- **Slevový kód:** **\`BF2026\`** (zkopírujte jedním kliknutím níže).
- **Platnost akce:** Do **29. 11. 2026** — ideální příležitost na vánoční dárky nebo zásnubní prsten s výraznou úsporou!

### Proč nakoupit šperky na Brilianty.cz?
- **Vlastní česká zlatnická dílna Danfil Jewellery:** Precizní ruční výroba v Liberci s tradicí.
- **Certifikát pravosti diamantů a doživotní servis:** Bezplatné čištění a kontrola zasazení kamenů.
- **Luxusní dárkové balení a doprava zdarma** včetně pojištěného doručení.
    `.trim(),
    logo: "/logos/brilianty.png",
    bonus: "Black Friday sleva 15 % s kódem BF2026 (do 29. 11. 2026)",
    bonusDescription:
      "Ušetřete 15 % na nezlevněných diamantových a zlatých špercích české výroby s kódem BF2026.",
    promoCode: "BF2026",
    promoCodeNote: "Platí na nezlevněné šperky v rámci Black Friday do 29. 11. 2026.",
    ctaLabel: "Uplatnit slevu 15 % na Brilianty.cz",
    requirements: [
      "Výběr nezlevněného šperku z katalogu Brilianty.cz",
      "Vložení slevového kódu BF2026 v nákupním košíku",
      "Platnost Black Friday slevy do 29. 11. 2026",
    ],
    pros: [
      "Výrazná 15% Black Friday sleva na šperky s kódem BF2026",
      "Tradiční česká ruční výroba Danfil Jewellery s certifikátem pravosti",
      "Doživotní servis šperků a možnost výměny velikosti prstenu",
    ],
    cons: [
      "Kód BF2026 se nevztahuje na již zlevněné zboží",
      "Časově omezená platnost kódu do 29. 11. 2026",
    ],
    referralUrl:
      "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=e6e4bc7a&desturl=https%3A%2F%2Fwww.brilianty.cz%2F",
    affiliateUrl:
      "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=e6e4bc7a&desturl=https%3A%2F%2Fwww.brilianty.cz%2F",
    trackingSlug: "brilianty",
    partnerNetwork: "ehub",
    rating: 4.9,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Brilianty.cz kód BF2026: Sleva 15 % šperky",
    seoDescription:
      "Získejte 15% slevu na luxusní diamantové šperky české výroby Danfil na Brilianty.cz s kódem BF2026 (do 29. 11. 2026). Recenze a tipy k nákupu.",
    faq: [
      {
        question: "Jak uplatnit slevový kód BF2026 na Brilianty.cz?",
        answer:
          "Vložte vybraný nezlevněný šperk do košíku, zadejte kód BF2026 do pole pro slevový kupón a cena se automaticky sníží o 15 %.",
      },
      {
        question: "Jsou diamanty na Brilianty.cz certifikované?",
        answer:
          "Ano, ke každému šperku s přírodními diamanty z výroby Danfil Jewellery obdržíte certifikát pravosti s uvedenými parametry kamenů.",
      },
      {
        question: "Co když netrefím velikost zásnubního prstenu?",
        answer:
          "Brilianty.cz nabízí vstřícnou výměnu či úpravu velikosti prstenu přímo ve své české zlatnické dílně.",
      },
    ],
    promos: [
      {
        trackingSlug: "brilianty-bf2026",
        title: "Black Friday: sleva 15 % na nezlevněné šperky",
        description:
          "Zadejte v košíku promo kód BF2026 a ušetřete 15 % na ručně vyráběných diamantových a zlatých špercích Danfil Jewellery.",
        badge: "Sleva 15 %",
        code: "BF2026",
        validUntil: "2026-11-29",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=e6e4bc7a&desturl=https%3A%2F%2Fwww.brilianty.cz%2F",
        order: 1,
      },
    ],
  },
  {
    slug: "istyle",
    name: "iStyle.cz",
    categorySlug: "elektro",
    shortDescription:
      "Oficiální Apple Premium Partner v ČR s kompletním sortimentem Mac, iPhone, iPad, Apple Watch, výkupem na protiúčet a financováním.",
    description: `
**iStyle.cz** je největší síť prodejen **Apple Premium Partner** v České republice a střední Evropě. Pokud hledáte zcela nový iPhone, MacBook, iPad, Apple Watch nebo originální příslušenství s jistotou autorizovaného původu, odborného poradenství a autorizovaného servisu, iStyle je jasná jednička.

### Hlavní výhody nákupu v iStyle.cz
- **100% oficiální Apple distribuce:** Kompletní portfolio novinek i konfigurací na míru (CTO MacBooky).
- **Výkup starého zařízení na protiúčet (Easy Upgrade):** Odečtěte hodnotu starého iPhonu či Macu přímo z ceny nového a získejte výkupní bonus.
- **Výhodné financování i slevy pro studenty a učitele (ISIC/ITIC):** Pravidelné akce na MacBooky a iPady do školy.
- **Autorizovaný Apple servis a osobní vyzvednutí** na prodejnách po celé ČR.
    `.trim(),
    logo: "/logos/istyle.png",
    bonus: "Výkup na protiúčet, studentské slevy a splátky online",
    bonusDescription:
      "Kompletní originální sortiment Apple s oficiální zárukou, výkupem starého zařízení a autorizovaným servisem.",
    ctaLabel: "Prohlédnout nabídku iStyle.cz",
    requirements: [
      "Standardní online nákup na e-shopu iStyle.cz",
      "Možnost vyzvednutí na prodejnách po ČR nebo doručení kurýrem",
    ],
    pros: [
      "Oficiální status Apple Premium Partner a 100% záruka původu",
      "Výkup starých Apple zařízení na protiúčet s bonusem",
      "Pravidelné studentské slevy a výhodné splátkové programy",
      "Autorizovaný servis a odborný personál",
    ],
    cons: [
      "Ceny novinek Apple jsou zpravidla pevně nastavené výrobcem",
      "Pro maximální úsporu zvažte také zánovní kusy (např. Jabkolevně či iPhoneMarket)",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=92ecd9a4",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=92ecd9a4",
    trackingSlug: "istyle",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "iStyle.cz recenze 2026: Apple a výkup",
    seoDescription:
      "Nakupujte iPhone, MacBook a iPad u oficiálního Apple Premium Partnera iStyle.cz. Výkup na protiúčet, studentské slevy ISIC a výhodné financování.",
    faq: [
      {
        question: "Nabízí iStyle.cz slevy pro studenty a učitele?",
        answer:
          "Ano, s platným průkazem ISIC/ITIC nebo potvrzením o studiu nabízí iStyle speciální vzdělávací slevy zejména na MacBooky a iPady.",
      },
      {
        question: "Jak funguje výkup starého iPhonu na protiúčet?",
        answer:
          "Online kalkulačka na iStyle.cz vám spočítá odhadní výkupní cenu starého zařízení, kterou lze ihned odečíst z ceny nového Apple produktu.",
      },
      {
        question: "Je iStyle autorizovaným prodejcem i servisem Apple?",
        answer:
          "Ano, iStyle drží nejvyšší partnerský status Apple Premium Partner a provozuje i autorizovaný servis s originálními díly.",
      },
    ],
  },
  {
    slug: "sencor",
    name: "Sencor.cz",
    categorySlug: "elektro",
    shortDescription:
      "Oficiální e-shop značky SENCOR: kuchyňské roboty, vysavače, kávovary, audio i osobní péče přímo od výrobce.",
    description: `
**Sencor.cz** je oficiální e-shop oblíbené značky domácích spotřebičů a spotřební elektroniky **SENCOR**, která spojuje moderní design, praktičnost a dostupnou cenu. Nakupujete přímo u zdroje s jistotou originální záruky, plného sortimentu a dostupného příslušenství i náhradních dílů.

### Co nejčastěji lidé kupují na Sencor.cz?
- **Kuchyňské spotřebiče:** Legendární kuchyňské roboty Sencor, automatické kávovary, horkovzdušné fritézy, mixéry a rychlovarné konvice.
- **Úklid domácnosti:** Robotické a tyčové vysavače s dlouhou výdrží.
- **Audio, TV & osobní péče:** Bluetooth reproduktory, sluchátka, elektrické zubní kartáčky a fény.
- **Sezónní akce a sady přímo od značky**, které v běžných řetězcích nenajdete.
    `.trim(),
    logo: "/logos/sencor.png",
    bonus: "Oficiální e-shop výrobce · kompletní sortiment a akce",
    bonusDescription:
      "Kuchyňské roboty, kávovary, vysavače a spotřební elektronika přímo ze skladu oficiálního obchodu Sencor.cz.",
    ctaLabel: "Nakoupit na oficiálním Sencor.cz",
    requirements: [
      "Standardní online nákup na oficiálním e-shopu Sencor.cz",
    ],
    pros: [
      "Kompletní produktová řada a barevné varianty přímo od značky SENCOR",
      "Skvělý poměr cena / výkon u kuchyňských robotů, fritéz i vysavačů",
      "Rychlá dostupnost originálního příslušenství a záručního servisu",
    ],
    cons: [
      "Vybrané limitované barvy mohou být v předvánoční sezóně rychle vyprodané",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=67b5afc3",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=67b5afc3",
    trackingSlug: "sencor",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Sencor.cz e-shop 2026: Spotřebiče a akce",
    seoDescription:
      "Nakupujte kuchyňské roboty, kávovary, horkovzdušné fritézy a vysavače přímo v oficiálním e-shopu Sencor.cz. Přehled výhod, záruky a aktuálních akcí.",
    faq: [
      {
        question: "Proč nakupovat přímo na oficiálním e-shopu Sencor.cz?",
        answer:
          "Získáte přístup ke kompletnímu sortimentu všech barevných variant, oficiálním akčním balíčkům i originálnímu příslušenství s přímou zárukou.",
      },
      {
        question: "Jaké produkty patří na Sencor.cz k nejlépe hodnoceným?",
        answer:
          "Dlouhodobě nejvyšší hodnocení zákazníků mají celokovové kuchyňské roboty řady STM, automatické kávovary, horkovzdušné fritézy a tyčové vysavače.",
      },
    ],
  },
  {
    slug: "dronpro",
    name: "DronPro.cz",
    categorySlug: "elektro",
    shortDescription:
      "Největší český specialista na drony DJI, akční kamery, stabilizátory, servis a profesionální leteckou školu v Praze.",
    description: `
**DronPro.cz** je špičkový český specialista na **drony (zejména DJI), akční kamery, gimball stabilizátory a foto/video příslušenství**. Na rozdíl od anonymních elektro e-shopů zde za každým produktem stojí aktivní piloti, kamenná prodejna v Praze, profesionální servis a vlastní **letecká škola** pomáhající s registrací i zkouškami u ÚCL.

### Proč koupit dron právě na DronPro.cz?
- **Odborné poradenství od skutečných pilotů:** Pomohou vybrat správný dron (do 250 g bez složité legislativy vs. profesionální filmování).
- **Kompletní sortiment DJI a příslušenství:** Drony Mini, Air, Mavic, Avata, akční kamery Osmo Action i mikrofony DJI Mic.
- **Letecká škola a legislativní podpora:** Školení A1/A3, A2 i pokročilé kurzy natáčení.
- **Vlastní servis a kamenná prodejna v Praze** s možností osobního vyzkoušení.
    `.trim(),
    logo: "/logos/dronpro.png",
    bonus: "Odborné poradenství, servis a letecká škola v ČR",
    bonusDescription:
      "Špičková nabídka dronů DJI, stabilizátorů a akčních kamer s českou podporou, servisem a kurzy pilotáže.",
    ctaLabel: "Prohlédnout drony na DronPro.cz",
    requirements: [
      "Standardní online objednávka na e-shopu DronPro.cz",
    ],
    pros: [
      "Špecializace na drony DJI, akční kamery a stabilizátory s odborným poradenstvím",
      "Kamenná prodejna v Praze, vlastní servis a náhradní díly skladem",
      "Letecká škola a praktické návody k české legislativě pro drony",
    ],
    cons: [
      "Specializované profi vybavení má vyšší pořizovací cenu, vyplatí se zvážit Fly More Combo balíčky",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=5889edbd",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=5889edbd",
    trackingSlug: "dronpro",
    partnerNetwork: "ehub",
    rating: 4.9,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "DronPro.cz recenze 2026: Drony DJI a škola",
    seoDescription:
      "Vybíráte dron DJI nebo akční kameru? DronPro.cz nabízí kompletní sortiment, odborné poradenství, servis i leteckou školu v Praze.",
    faq: [
      {
        question: "Potřebuji pilotní průkaz na malý dron do 250 gramů?",
        answer:
          "U dronů do 250 g (např. řada DJI Mini) stačí jednoduchá online registrace provozovatele u ÚCL, protože mají kameru — DronPro k tomu poskytuje přehledné návody a poradenství.",
      },
      {
        question: "Vyplatí se u dronů balíček Fly More Combo?",
        answer:
          "Rozhodně ano — obsahuje zpravidla 3 baterie, nabíjecí hub, náhradní vrtule a brašnu za výrazně nižší cenu než při dokupování po kusech.",
      },
    ],
  },
  {
    slug: "banggood",
    name: "Banggood",
    categorySlug: "elektro",
    shortDescription:
      "Globální e-shop s chytrou elektronikou, nářadím, RC modely a vychytávkami do domácnosti s rychlou dopravou z EU skladů bez cla.",
    description: `
**Banggood** je jeden z nejpopulárnějších mezinárodních e-shopů pro milovníky technologií, chytré domácnosti, 3D tisku, elektrokoloběžek, RC modelů, nářadí i módy. Jeho obrovskou výhodou pro české zákazníky je rozsáhlá síť **evropských skladů (CZ, PL, DE, ES)**, ze kterých zboží dorazí během několika dní **zcela bez cla a doplatků DPH**.

### Jak nakupovat na Banggood chytře a nejlevněji?
- **Filtrujte EU / CZ sklady:** U produktů zvolte sklad v Evropě (často přímo v ČR nebo Polsku) — máte doručení do 3–5 pracovních dní a žádné celní řízení.
- **Bleskové slevy (Flash Deals) a kupony pro nové zákazníky:** Při první objednávce bývají k dispozici uvítací kupony přímo v účtu.
- **Bezpečná platba:** Doporučujeme platit přes PayPal nebo jednorázovou virtuální kartu (např. Revolut).
    `.trim(),
    logo: "/logos/banggood.png",
    bonus: "EU & CZ sklady bez cla a DPH + denní Flash Deals",
    bonusDescription:
      "Tisíce technologických vychytávek, nářadí a chytré elektroniky za zlomek běžných cen s rychlým doručením z EU skladů.",
    ctaLabel: "Prozkoumat akce na Banggood",
    requirements: [
      "Nákup přes náš odkaz na webu nebo v aplikaci Banggood",
      "Pro zachování sledování objednávek neplaťte celou objednávku výhradně dárkovým voucherem",
    ],
    pros: [
      "Rozsáhlé evropské (včetně českého) sklady bez cla a dodatečného DPH",
      "Skvělé ceny chytré elektroniky, 3D tiskáren, nářadí a elektrokoloběžek",
      "Pravidelné bleskové výprodeje a uvítací slevy pro nové zákazníky",
    ],
    cons: [
      "Při objednávce z čínského skladu je delší doba doručení (2–4 týdny)",
      "Reklamace probíhají v angličtině přes online podporu Banggood",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=3fee0b88",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=3fee0b88",
    trackingSlug: "banggood",
    partnerNetwork: "ehub",
    rating: 4.6,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Banggood 2026: EU/CZ sklady bez cla a DPH",
    seoDescription:
      "Jak nakupovat chytrou elektroniku, 3D tiskárny a nářadí na Banggood z evropských skladů bez cla a DPH? Tipy, zkušenosti a aktuální výprodeje.",
    faq: [
      {
        question: "Platí se při nákupu z EU skladu Banggood clo nebo DPH?",
        answer:
          "Ne, při výběru evropského skladu (CZ, PL, DE, ES) je zboží již vycleno v rámci EU a dorazí kurýrem obvykle do 3 až 7 pracovních dní bez dalších poplatků.",
      },
      {
        question: "Jaká je nejbezpečnější platební metoda na Banggood?",
        answer:
          "Nejlepší ochranu kupujícího poskytuje platba přes PayPal nebo platební kartou s výhodným kurzem (např. Revolut).",
      },
    ],
  },
  {
    slug: "aliexpress",
    name: "AliExpress",
    categorySlug: "elektro",
    shortDescription:
      "Největší světové online tržiště s více než 100 miliony produktů, výprodeji až 90 % a rychlým doručením AliExpress Choice.",
    description: `
**AliExpress** je největší světové online tržiště s nabídkou přes **100 milionů produktů** z kategorií elektronika, příslušenství k mobilům, dům a zahrada, sport, nářadí i móda. Díky zavedení programu **AliExpress Choice** a automatickému výběru DPH přímo v košíku (IOSS) dnes balíčky do ČR dorazí často **za 7 až 12 dní bez jakýchkoliv celních doplatků** u objednávek do 150 EUR.

### Tipy pro maximální úsporu na AliExpressu
- **Využívejte sekci Choice:** Garantovaná doprava zdarma od cca 250 Kč a výrazně rychlejší doručení přímo na Zásilkovnu či kurýrem.
- **Sledujte recenze s reálnými fotkami** a vybírejte ověřené prodejce s hodnocením nad 95 %.
- **Plaťte v eurech nebo dolarech kartou bez kurzové přirážky** (např. Revolut), ušetříte další 2–4 % oproti přepočtu do CZK.
    `.trim(),
    logo: "/logos/aliexpress.png",
    bonus: "Výprodeje až 90 % · AliExpress Choice s dopravou zdarma",
    bonusDescription:
      "Přes 100 milionů produktů za bezkonkurenční ceny s rychlým doručením a automaticky vyřešeným DPH (do 150 EUR).",
    ctaLabel: "Nakupovat výhodně na AliExpress",
    requirements: [
      "Standardní nákup na webu nebo v mobilní aplikaci AliExpress",
    ],
    pros: [
      "Bezkonkurenční výběr 100+ milionů produktů a příslušenství za zlomek lokálních cen",
      "Rychlé doručení AliExpress Choice (často do 10 dní) a doprava zdarma",
      "DPH vyřešené přímo v košíku u zásilek do 150 EUR (bez celního poplatku poště)",
      "Ochrana kupujícího při nedoručení nebo poškození zboží",
    ],
    cons: [
      "Kvalita se liší podle konkrétního prodejce — vždy čtěte recenze s fotkami",
      "U zásilek nad 150 EUR se řeší celní řízení v ČR",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=a8c4ae05",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=a8c4ae05",
    trackingSlug: "aliexpress",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "AliExpress česky 2026: Slevy až 90 % a Choice",
    seoDescription:
      "Jak chytře nakupovat na AliExpressu z ČR bez doplatků? Výhody AliExpress Choice, DPH v ceně do 150 EUR a tipy na nejvyšší slevy.",
    faq: [
      {
        question: "Musím při nákupu na AliExpressu řešit clo a DPH na poště?",
        answer:
          "U objednávek do 150 EUR účtuje AliExpress české DPH přímo při placení v košíku (systém IOSS), takže balíček projde celnicí automaticky a nic nedoplácíte.",
      },
      {
        question: "Co znamená štítek Choice u zboží na AliExpressu?",
        answer:
          "Choice označuje prověřené položky expedované přímo ze skladů AliExpressu s rychlejším doručením (často 7–12 dní) a dopravou zdarma při splnění minimální částky.",
      },
    ],
  },
  {
    slug: "spime",
    name: "Spíme.cz",
    categorySlug: "dum-a-zahrada",
    shortDescription:
      "Český výrobce Postelia: poctivé masivní postele, zdravotní matrace, lamelové rošty a lůžkoviny přímo z české dílny.",
    description: `
**Spíme.cz** je e-shop přímého českého výrobce **Postelia**, který se specializuje na kvalitní zdravé spaní. V nabídce najdete bytelné **postele z pravého masivu** (buk, dub, smrk), ortopedické matrace, polohovací lamelové rošty i lůžkoviny a doplňky do ložnice — bez zbytečných prostředníků.

### Proč si vybrat postel a matraci na Spíme.cz?
- **Přímá česká výroba Postelia:** Poctivé řemeslné zpracování, vysoká nosnost a dlouhá životnost nábytku.
- **Výroba i v atypických rozměrech:** Potřebujete prodlouženou postel 210 nebo 220 cm? Žádný problém.
- **Zdravotní a partnerské matrace:** Přehledný výběr tuhosti a certifikované materiály bez škodlivin.
- **Možnost osobního vyzkoušení na prodejnách** i pohodlného doručení až domů s výnosem.
    `.trim(),
    logo: "/logos/spime.png",
    bonus: "České masivní postele a matrace přímo od výrobce",
    bonusDescription:
      "Poctivá česká výroba Postelia: dlouhá záruka, možnost atypických rozměrů a odborné poradenství pro zdravý spánek.",
    ctaLabel: "Prohlédnout postele a matrace Spíme.cz",
    requirements: [
      "Standardní online nákup na e-shopu Spíme.cz",
    ],
    pros: [
      "Přímý český výrobce Postelia se špičkovým zpracováním masivu",
      "Široký výběr zdravotních matrací, roštů i zakázkových rozměrů",
      "Velmi vysoká spokojenost zákazníků a dlouhá životnost produktů",
    ],
    cons: [
      "Zakázková výroba atypických postelí může vyžadovat několik týdnů dodání",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=3cee9c1f",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=3cee9c1f",
    trackingSlug: "spime",
    partnerNetwork: "ehub",
    rating: 4.9,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Spíme.cz recenze 2026: Postele a matrace",
    seoDescription:
      "Hledáte poctivou postel z masivu a kvalitní matraci? Spíme.cz (český výrobce Postelia) nabízí vysokou nosnost, atypické rozměry a skvělé hodnocení.",
    faq: [
      {
        question: "Vyrábí Spíme.cz postele přímo v České republice?",
        answer:
          "Ano, za e-shopem Spíme.cz stojí český výrobce Postelia, který vyrábí masivní postele a nábytek přímo v ČR.",
      },
      {
        question: "Lze objednat postel i v prodloužené délce 210 nebo 220 cm?",
        answer:
          "Ano, díky vlastní české výrobě nabízí Spíme.cz kromě standardních rozměrů také prodloužené délky a zakázkové úpravy.",
      },
    ],
  },
  {
    slug: "marimex",
    name: "Marimex.cz",
    categorySlug: "dum-a-zahrada",
    shortDescription:
      "Česká jednička na zahradní bazény, vířivky, infrasauny, trampolíny, dětská hřiště a kompletní bazénovou chemii.",
    description: `
**Marimex.cz** je největší a nejdéle působící český dodavatel **zahradních bazénů, nafukovacích vířivek, infrasaun, trampolín a dětských hracích sestav**. Vedle samotných produktů nabízí kompletní zázemí — od bazénové chemie, solárních ohřevů a pískových filtrací až po dostupnost náhradních dílů i po mnoha letech.

### Nejoblíbenější kategorie na Marimex.cz
- **Nadzemní i zapuštěné bazény (Orlando, Florida, Tampa)** včetně kompletních sad s filtrací.
- **Infrasauny a mobilní vířivky (PureSpa, MSpa):** Domácí wellness po celý rok za dostupnou cenu.
- **Trampolíny Marimex:** Bezpečnostní sítě, certifikovaná nosnost a náhradní díly skladem.
- **Bazénová chemie a vysavače** pro křišťálově čistou vodu po celé léto.
    `.trim(),
    logo: "/logos/marimex.png",
    bonus: "Kompletní bazénové sety, infrasauny a sezónní výprodeje",
    bonusDescription:
      "Špičkové bazény, vířivky, infrasauny a trampolíny s jistotou českého servisu a dlouhodobé dostupnosti náhradních dílů.",
    ctaLabel: "Prohlédnout nabídku Marimex.cz",
    requirements: [
      "Standardní maloobchodní nákup na e-shopu Marimex.cz (mimo velkoobchodní B2B objednávky)",
    ],
    pros: [
      "Největší specialista na bazény, infrasauny, vířivky a trampolíny v ČR",
      "Dlouhodobá dostupnost náhradních dílů, plachet a filtračního příslušenství",
      "Výhodné kompletní sety a odborná poradna pro údržbu vody",
    ],
    cons: [
      "V hlavní letní sezóně (květen–červenec) bývají nejžádanější bazény rychle vyprodané",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=30a99758",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=30a99758",
    trackingSlug: "marimex",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Marimex.cz recenze 2026: Bazény a infrasauny",
    seoDescription:
      "Vybavte zahradu i domácí wellness na Marimex.cz. Zahradní bazény, vířivky, infrasauny a bezpečné trampolíny s dostupnými náhradními díly v ČR.",
    faq: [
      {
        question: "Kdy je nejlepší doba na nákup bazénu nebo infrasauny na Marimex.cz?",
        answer:
          "Nejvýhodnější akční ceny a plnou skladovou dostupnost na bazény bývá nejlepší využít mimo vrchol léta (jaro či podzim), u infrasaun pak na podzim a v zimě.",
      },
      {
        question: "Dají se u Marimexu dokoupit náhradní díly na starší trampolínu nebo bazén?",
        answer:
          "Ano, právě široká a dlouhodobá dostupnost náhradních pružin, sítí, fólií a filtrací patří k největším výhodám nákupu u Marimexu.",
      },
    ],
  },
  {
    slug: "ventilatory",
    name: "VENTILÁTORY.cz",
    categorySlug: "dum-a-zahrada",
    shortDescription:
      "Specialista na koupelnové, potrubní, průmyslové a krbové ventilátory, rekuperační jednotky a vzduchotechniku skladem.",
    description: `
**VENTILÁTORY.cz** je přední český specializovaný e-shop s kompletním sortimentem **vzduchotechniky pro byty, rodinné domy i komerční prostory**. V přehledném katalogu snadno vyberete tichý koupelnový ventilátor s čidlem vlhkosti, potrubní ventilátor, lokální rekuperaci i krbový rozvod teplého vzduchu.

### Co na VENTILÁTORY.cz oceníte?
- **Tiché koupelnové a WC ventilátory:** Modely s doběhem, hygrostatem (čidlem vlhkosti) i zpětnou klapkou proti zápachu a vlhkosti.
- **Lokální i centrální rekuperace:** Řešení pro zdravé větrání bez tepelných ztrát v zateplených domech.
- **Stropní, krbové i průmyslové ventilátory** a kompletní potrubní komponenty na jednom místě.
- **Odborné technické parametry a rychlé dodání** ze skladu v ČR.
    `.trim(),
    logo: "/logos/ventilatory.png",
    bonus: "Kompletní vzduchotechnika a rekuperace skladem",
    bonusDescription:
      "Tiché koupelnové, potrubní, krbové i stropní ventilátory a lokální rekuperace s rychlým doručením po ČR.",
    ctaLabel: "Vybrat ventilátor na VENTILÁTORY.cz",
    requirements: [
      "Standardní online objednávka na e-shopu VENTILÁTORY.cz",
    ],
    pros: [
      "Obrovský specializovaný výběr ventilátorů a vzduchotechniky skladem",
      "Přehledné technické parametry (hlučnost v dB, průtok m³/h, krytí IP)",
      "Vysoká spolehlivost doručení a kvalitní technické poradenství",
    ],
    cons: [
      "Při výběru potrubní vzduchotechniky je vhodné dopředu znát přesný průměr potrubí",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=20e670a4",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=20e670a4",
    trackingSlug: "ventilatory",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "VENTILÁTORY.cz 2026: Ventilátory a rekuperace",
    seoDescription:
      "Vybíráte tichý koupelnový ventilátor, potrubní vzduchotechniku nebo lokální rekuperaci? Přehled sortimentu a výhod specializovaného e-shopu VENTILÁTORY.cz.",
    faq: [
      {
        question: "Jaký ventilátor vybrat do koupelny proti plísním?",
        answer:
          "Ideální je tichý koupelnový ventilátor (hlučnost pod 30 dB) vybavený čidlem vlhkosti (hygrostatem), časovým doběhem a zpětnou klapkou.",
      },
      {
        question: "Najdu na VENTILÁTORY.cz i lokální rekuperaci do bytu?",
        answer:
          "Ano, v nabídce jsou jak lokální pokojové rekuperační jednotky bez nutnosti složitých rozvodů, tak centrální rekuperační systémy.",
      },
    ],
  },
  {
    slug: "originalnipneu",
    name: "Originálnípneu.cz",
    categorySlug: "dum-a-zahrada",
    shortDescription:
      "Specializovaný e-shop s letními, zimními i celoročními pneumatikami a alu koly předních značek často s uvedeným rokem výroby (DOT).",
    description: `
**Originálnípneu.cz** je prověřený český e-shop s pneumatikami a litými (alu) koly předních světových výrobců — **Michelin, Continental, Goodyear, Bridgestone, Nokian, Hankook, Barum** a dalších. Velkou přidanou hodnotou, kterou řidiči vyhledávají, je **transparentní uvádění roku výroby (DOT)** u mnoha nabízených pneumatik ještě před nákupem.

### Proč objednat pneu na Originálnípneu.cz?
- **Průhlednost u stáří pneu (DOT):** Často přímo v detailu produktu vidíte rok výroby pneumatiky — kupujete čerstvou směs, ne staré skladové ležáky.
- **Kompletní výběr rozměrů a sezón:** Letní, zimní i moderní celoroční pneumatiky pro osobní vozy, SUV i dodávky.
- **Alu kola a ocelové disky:** Snadný konfigurátor podle značky a modelu vašeho vozidla.
- **Rychlá expedice před přezouvací sezónou** přímo k vám domů nebo rovnou do pneuservisu.
    `.trim(),
    logo: "/logos/originalnipneu.png",
    bonus: "Pneumatiky s uvedením DOT a rychlá expedice",
    bonusDescription:
      "Ověřené značky Goodyear, Michelin, Continental, Barum i alu kola za výhodné online ceny.",
    ctaLabel: "Vybrat pneumatiky na Originálnípneu.cz",
    requirements: [
      "Standardní online nákup na e-shopu Originálnípneu.cz",
    ],
    pros: [
      "Často uváděný rok výroby (DOT) přímo u pneumatik",
      "Široká nabídka prémiových i ekonomických značek (Michelin, Continental, Barum)",
      "Konkurenceschopné online ceny a spolehlivé dodání",
    ],
    cons: [
      "V hlavní přezouvací špičce (říjen/listopad a duben) je vhodné objednávat s párdenním předstihem",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=a0f5919e",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=a0f5919e",
    trackingSlug: "originalnipneu",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Originálnípneu.cz 2026: Pneu s uvedeným DOT",
    seoDescription:
      "Kupte letní, zimní nebo celoroční pneumatiky (Michelin, Continental, Barum) a alu kola na Originálnípneu.cz s přehledným uvedením roku výroby DOT.",
    faq: [
      {
        question: "Proč je při nákupu pneumatik důležitý údaj DOT (rok výroby)?",
        answer:
          "Kód DOT prozradí týden a rok výroby pneumatiky. Čerstvá gumová směs má lepší přilnavost na mokru a sněhu a vydrží déle než starší skladové zásoby.",
      },
      {
        question: "Jak zjistím správný rozměr pneumatik pro své auto?",
        answer:
          "Povolené rozměry včetně rychlostního a hmotnostního indexu najdete v technickém průkazu vozidla nebo přímo na bočnici stávajících pneumatik.",
      },
    ],
  },
  {
    slug: "honzovy-longboardy",
    name: "Honzovy-longboardy.cz",
    categorySlug: "nakupy-a-volny-cas",
    shortDescription:
      "Kultovní český e-shop i pražská prodejna a půjčovna longboardů, skateboardů, surfskatů, trekových bruslí a koloběžek.",
    description: `
**Honzovy-longboardy.cz** jsou dlouholetou ikonou české boardové scény. Za e-shopem stojí skuteční nadšenci a pražská kamenná prodejna s **půjčovnou**, kde vám odborně poradí s výběrem prvního cruiseru do města, carvingového longboardu, surfskatu, skateboardu, freestyle koloběžky nebo stylových trekových bruslí.

### Proč nakoupit na Honzovy-longboardy.cz?
- **Odborný výběr ověřených světových značek:** Loaded, Landyachtz, Carver, Arbor, Globe, Impala a další — žádné nekvalitní hračky ze supermarketů.
- **Možnost osobního vyzkoušení a půjčovna v Praze:** Otestujte si prkno před koupí nebo si nechte sestavit komplet na míru.
- **Kompletní náhradní díly a servis:** Kolečka, ložiska, trucky, griptapy, chrániče i helmy skladem.
    `.trim(),
    logo: "/logos/honzovy-longboardy.png",
    bonus: "Odborné poradenství, top značky a půjčovna v Praze",
    bonusDescription:
      "Prověřené longboardy, skateboardy, surfskaty, trekové brusle a koloběžky od nadšenců s tradicí.",
    ctaLabel: "Prohlédnout Honzovy-longboardy.cz",
    requirements: [
      "Standardní online nákup na e-shopu Honzovy-longboardy.cz",
    ],
    pros: [
      "Největší odborný specialista na longboardy, surfskaty a trekové brusle v ČR",
      "Kamenná prodejna a půjčovna v Praze s osobním poradenstvím",
      "Špičkové světové značky a veškeré náhradní díly skladem",
    ],
    cons: [
      "Kvalitní značková prkna jsou dražší než neoznačené modely z řetězců, ale vydrží několikanásobně déle",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=0f3c1cf0",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=0f3c1cf0",
    trackingSlug: "honzovy-longboardy",
    partnerNetwork: "ehub",
    rating: 4.9,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Honzovy-longboardy.cz: Longboardy a brusle",
    seoDescription:
      "Vybíráte longboard, cruiser, surfskate, skateboard nebo trekové brusle? Honzovy-longboardy.cz nabízí top značky, náhradní díly a půjčovnu v Praze.",
    faq: [
      {
        question: "Jaký je rozdíl mezi longboardem, cruiserem a surfskatem?",
        answer:
          "Cruiser je kompaktní do města a na přenášení, longboard nabízí maximální stabilitu na delší vyjížďky a surfskate má speciální přední truck simulující pocit ze surfování.",
      },
      {
        question: "Poradí mi na Honzovy-longboardy.cz s výběrem prkna pro začátečníka?",
        answer:
          "Ano, tým tvoří aktivní jezdci, kteří vám rádi doporučí ideální komplet podle vaší výšky, váhy a stylu jízdy.",
      },
    ],
  },
  {
    slug: "ministerstvo-hracek",
    name: "MinisterstvoHraček.cz",
    categorySlug: "nakupy-a-volny-cas",
    shortDescription:
      "Český e-shop s originálními dětskými hračkami — od licencovaných elektrických autíček až po kvalitní dřevěné a Montessori hračky.",
    description: `
**MinisterstvoHraček.cz** přináší pečlivě vybraný svět dětských hraček pro nejmenší i starší děti. Ať už sháníte vysněný narozeninový či vánoční dárek v podobě **licencovaného elektrického autíčka** (Audi, Mercedes, BMW, traktor), nebo dáváte přednost **ručně vyráběným dřevěným a edukativním hračkám**, na jednom místě najdete stovky originálních tipů.

### Co dělá MinisterstvoHraček.cz oblíbeným u rodičů?
- **Licencovaná elektrická vozítka a odrážedla:** Realistické detaily, dálkové ovládání pro rodiče a bezpečnostní prvky.
- **Dřevěné a rozvojové hračky:** Kvalitní, bezpečné materiály podporující jemnou motoriku a kreativitu.
- **Vše na jednom místě pro všechny věkové kategorie** od miminek až po školáky.
    `.trim(),
    logo: "/logos/ministerstvo-hracek.png",
    bonus: "Elektrická autíčka i ručně vyráběné dřevěné hračky",
    bonusDescription:
      "Široký výběr originálních a bezpečných dětských hraček pro narozeniny, svátky i Vánoce s rychlým doručením.",
    ctaLabel: "Vybrat hračky na MinisterstvoHraček.cz",
    requirements: [
      "Standardní online nákup na e-shopu MinisterstvoHraček.cz",
    ],
    pros: [
      "Široký sortiment od elektrických autíček po poctivé dřevěné hračky",
      "Certifikované a bezpečné hračky přehledně rozdělené podle věku",
      "Rychlé doručení po celé České republice",
    ],
    cons: [
      "Před Vánoci se nejžádanější modely elektrických autíček rychle vyprodávají",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=bfe5db0e",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=bfe5db0e",
    trackingSlug: "ministerstvo-hracek",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "MinisterstvoHraček.cz 2026: Hračky a autíčka",
    seoDescription:
      "Originální dětské hračky na MinisterstvoHraček.cz — licencovaná elektrická autíčka s dálkovým ovládáním i ručně vyráběné dřevěné hračky.",
    faq: [
      {
        question: "Mají elektrická autíčka na MinisterstvoHraček.cz dálkové ovládání pro rodiče?",
        answer:
          "Ano, většina licencovaných elektrických autíček v nabídce je vybavena 2,4GHz dálkovým ovladačem s prioritou rodiče pro maximální bezpečnost menších dětí.",
      },
      {
        question: "Najdu zde i hračky pro nejmenší děti a Montessori pomůcky?",
        answer:
          "Ano, e-shop má samostatné sekce pro miminka, batolata i dřevěné a edukativní hračky rozvíjející motoriku.",
      },
    ],
  },
  {
    slug: "eroticcity",
    name: "EroticCity.cz",
    categorySlug: "nakupy-a-volny-cas",
    shortDescription:
      "Největší česká síť prodejen a e-shop s produkty pro intimní pohodu a wellness pro dospělé (18+) se 100% diskrétním doručením.",
    description: `
**EroticCity.cz** je největší a nejdéle zavedená česká a slovenská síť specializovaných prodejen a e-shop zaměřený na **intimní wellness, partnerské dárky a prémiové pomůcky pro dospělé (18+)**. E-shop klade maximální důraz na zdravotní nezávadnost certifikovaných značek a **100% diskrétní neoznačené balení**.

### Proč zákazníci volí EroticCity.cz?
- **100% diskrétní doručení domů i do výdejních boxů:** Zásilka nemá žádné označení e-shopu ani obsahu a odesílatel je neutrální.
- **Prémiové světové značky:** Certifikovaný lékařský silikon, prodloužené záruky a kompletní sortiment pro páry i jednotlivce.
- **Tip k objednávce:** Pro maximální pohodlí a rychlost zvolte **doručení kurýrem nebo do výdejního boxu** (Z-BOX, AlzaBox apod.).

*Poznámka: Nabídka je určena výhradně osobám starším 18 let.*
    `.trim(),
    logo: "/logos/eroticcity.png",
    bonus: "100% diskrétní doručení a prémiové značky (18+)",
    bonusDescription:
      "Největší český specialista s neoznačeným diskrétním balením a rychlým odesláním do výdejních boxů i domů.",
    ctaLabel: "Přejít na EroticCity.cz (18+)",
    requirements: [
      "Určeno výhradně osobám starším 18 let",
      "Online objednávka s doručením (kurýr / výdejní boxy — nikoliv pouze rezervace na pobočce)",
    ],
    pros: [
      "Největší a léty prověřený český specialista na intimní wellness",
      "100% diskrétní neoznačené balení a neutrální název odesílatele",
      "Široký výběr prémiových zdravotně nezávadných značek skladem",
    ],
    cons: [
      "Nabídka je určena pouze dospělým (18+)",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=fe04fe84",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=fe04fe84",
    trackingSlug: "eroticcity",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "EroticCity.cz 2026: Diskrétní doručení (18+)",
    seoDescription:
      "Největší český e-shop EroticCity.cz (18+) se 100% diskrétním neoznačeným doručením do výdejních boxů i domů. Prémiové značky a zkušenosti.",
    faq: [
      {
        question: "Jak probíhá diskrétní balení na EroticCity.cz?",
        answer:
          "Všechny online objednávky jsou baleny do zcela neutrální krabice bez loga a bez zmínky o obsahu či názvu e-shopu, s neutrálním odesílatelem na štítku.",
      },
      {
        question: "Mohu si nechat zásilku doručit do samoobslužného boxu?",
        answer:
          "Ano, e-shop podporuje doručení do samoobslužných boxů i na výdejní místa pro maximální soukromí při vyzvednutí.",
      },
    ],
  },
];
