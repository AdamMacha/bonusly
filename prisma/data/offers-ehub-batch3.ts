import type { OfferSeed } from "./types";

// Batch 3 schválených partnerů ze sítě eHUB.cz (27. 11. 2026)
export const EHUB_BATCH3_OFFERS: OfferSeed[] = [
  {
    slug: "pomelobox",
    name: "Pomelobox.cz",
    categorySlug: "krasa-a-zdravi",
    shortDescription:
      "Krabičková dieta na míru Pomelobox – chutné a vyvážené celodenní menu s rozvozem až ke dveřím bez vaření.",
    description: [
      "**Pomelobox.cz** je oblíbená česká krabičková dieta na míru, která nabízí chutná a nutričně vyvážená jídla na celý den s pohodlným rozvozem. Vyberete si program přesně podle svého cíle – hubnutí, nabírání svalů, vegetariánská strava nebo zdravé stravování bez starostí s vařením.",
      "",
      "### Jak získat slevu 20 % a cashback 6 % na Pomelobox.cz",
      "1. Přihlaste se ke svému účtu na **BONUSLY.cz** (registrace je zdarma).",
      "2. Klikněte na tlačítko **Využít kód VITEJ** a objednejte si vybraný stravovací program na Pomelobox.cz.",
      "3. V košíku zadejte ověřený kód **VITEJ** pro **20 % slevu pro nové zákazníky** a navíc po dokončení objednávky získáte **6 % cashback** zpět do své BONUSLY peněženky.",
    ].join("\n"),
    logo: "/logos/pomelobox.png",
    bonus: "Cashback 6 % + kód VITEJ (-20 %)",
    bonusDescription:
      "Získejte 20 % slevu pro nové zákazníky s kódem VITEJ a k tomu 6 % cashback zpět z každé objednávky přes BONUSLY.",
    promoCode: "VITEJ",
    promoCodeNote: "Sleva 20 % pro nové zákazníky na první objednávku",
    ctaLabel: "Využít kód VITEJ",
    requirements: [
      "Prokliknout se na Pomelobox.cz přes tlačítko na BONUSLY.cz (pro cashback být přihlášený).",
      "Kód VITEJ platí pro nové zákazníky při první objednávce krabičkové diety.",
      "Povolit cookies v prohlížeči a dokončit objednávku bez přerušení.",
    ],
    pros: [
      "Vysoký 6 % cashback zpět z celého programu (průměrná provize patří k nejvyšším v kategorii).",
      "Ověřený dlouhodobý slevový kód VITEJ na 20 % slevu pro nové zákazníky.",
      "100 % historická schvalovatelnost objednávek a pohodlný rozvoz po ČR.",
    ],
    cons: [
      "Slevový kód VITEJ lze uplatnit pouze na první objednávku nového zákazníka.",
      "Schválení cashbacku trvá zpravidla do 50 dnů od dokončení objednávky.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=6fdf8410",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=6fdf8410",
    trackingSlug: "pomelobox",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.9,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Pomelobox.cz – kód VITEJ (-20 %) a cashback 6 %",
    seoDescription:
      "Krabičková dieta Pomelobox se slevovým kódem VITEJ (-20 % pro nové zákazníky) a 6 % cashbackem zpět přes BONUSLY.cz.",
    faq: [
      {
        question: "Jak uplatním kód VITEJ na Pomelobox.cz?",
        answer:
          "Zkopírujte kód VITEJ, přejděte na Pomelobox.cz přes tlačítko na BONUSLY.cz, vyberte si program krabičkové diety a zadejte kód v košíku pro okamžitou 20 % slevu.",
      },
      {
        question: "Dostanu k slevovému kódu i cashback?",
        answer:
          "Ano! Kód VITEJ je oficiální affiliate kupón, takže kromě 20 % slevy získáte i 6 % cashback z výsledné zaplacené částky (50 % naší partnerské provize).",
      },
      {
        question: "Jak dlouho trvá schválení cashbacku z Pomelobox.cz?",
        answer:
          "Proklik evidujeme ihned a schválení transakce partnerem probíhá standardně do 50 dnů po úhradě a realizaci objednávky.",
      },
    ],
    promos: [
      {
        trackingSlug: "ehub-pomelobox-vitej",
        title: "Sleva 20 % pro nové zákazníky s kódem VITEJ",
        description: "Ověřený vstupní slevový kód 20 % na první objednávku krabičkové diety Pomelobox.",
        badge: "Kód VITEJ",
        code: "VITEJ",
        validUntil: "2028-10-31",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=6fdf8410&desturl=https%3A%2F%2Fpomelobox.cz%2F",
        order: 1,
      },
    ],
  },
  {
    slug: "tentino",
    name: "TENTino.cz",
    categorySlug: "dum-a-zahrada",
    shortDescription:
      "Český výrobce profesionálních nůžkových párty stanů do extrémních podmínek, skládacích stolů, židlí a ubrusů.",
    description: [
      "**TENTino.cz** vyrábí a dodává profesionální nůžkové párty stany, prodejní stánky, skládací stoly, židle a ubrusy v široké nabídce rozměrů a barev skladem. Ideální pro zahradní oslavy, svatby, firemní akce i stánkový prodej.",
      "",
      "### Jak získat cashback až 3,2 % na TENTino.cz",
      "1. Přihlaste se na **BONUSLY.cz** a klikněte na tlačítko **Přejít na TENTino.cz**.",
      "2. Dokončete objednávku v otevřeném okně prohlížeče.",
      "3. Po potvrzení nákupu vám připíšeme **až 3,2 % cashback** (2 % u velkých párty stanů a hal).",
    ].join("\n"),
    logo: "/logos/tentino.png",
    bonus: "Cashback až 3,2 %",
    bonusDescription:
      "Získejte zpět 3,2 % z nákupu nůžkových stanů a příslušenství (2 % u velkých párty stanů a hal).",
    promoCode: null,
    promoCodeNote: null,
    ctaLabel: "Přejít na TENTino.cz",
    requirements: [
      "Prokliknout se přes BONUSLY.cz v přihlášeném prohlížeči s povolenými cookies.",
      "Objednávka musí být řádně zaplacena a nesmí být vrácena (cookies 30 dní).",
    ],
    pros: [
      "Až 3,2 % cashback zpět u vysokých hodnot objednávek stanů a eventového vybavení.",
      "Přímý český výrobce s náhradními díly a špičkovým hodnocením zákazníků.",
      "Široký výběr rozměrů, barev a potisků skladem.",
    ],
    cons: [
      "Na kategorii Velké párty stany a haly je nižší sazba cashbacku (2 %).",
      "Schválení transakce trvá do 50 dnů od dokončení objednávky.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=451d22f2",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=451d22f2",
    trackingSlug: "tentino",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "TENTino.cz – cashback až 3,2 % na párty stany",
    seoDescription:
      "Nakupujte profi nůžkové párty stany, skládací stoly a židle na TENTino.cz s cashbackem až 3,2 % přes BONUSLY.cz.",
    faq: [
      {
        question: "Kolik cashbacku získám na TENTino.cz?",
        answer:
          "Získáte 3,2 % z běžného sortimentu a 2 % z kategorie Velké párty stany a haly (50 % naší partnerské provize).",
      },
      {
        question: "Jaká je délka cookies u TENTino.cz?",
        answer: "Cookies platí 30 dnů a objednávky se schvalují nejpozději do 50 dnů.",
      },
    ],
  },
  {
    slug: "vse-pro-strechu",
    name: "Vše-pro-střechu.cz",
    categorySlug: "dum-a-zahrada",
    shortDescription:
      "Specializovaný e-shop JOKL se střešními krytinami, fóliemi, protisněhovými háky a kompletním příslušenstvím pro střechy.",
    description: [
      "**Vše-pro-střechu.cz** (JOKL) nabízí kompletní sortiment střešních materiálů, betonových krytin, střešních fólií, pochůzných systémů a ochranných prvků skladem na jednom místě.",
      "",
      "### Jak ušetřit a získat cashback 3 % na Vše-pro-střechu.cz",
      "1. Přihlaste se na **BONUSLY.cz** a vyberte si některý z aktivních slevových kódů (5–11 % sleva) nebo klikněte na **Přejít na Vše-pro-střechu.cz**.",
      "2. Dokončete objednávku v otevřeném okně.",
      "3. Po schválení objednávky vám připíšeme **3 % cashback** přímo do vaší BONUSLY peněženky.",
    ].join("\n"),
    logo: "/logos/vse-pro-strechu.png",
    bonus: "Cashback 3 % + kódy až -11 %",
    bonusDescription:
      "Získejte 3 % cashback zpět z nákupu střešních materiálů a využijte aktivní slevové kódy 5–11 %.",
    promoCode: "JOKLBONUS SNIH",
    promoCodeNote: "Sleva 11 % na protisněhové háky",
    ctaLabel: "Využít kód JOKLBONUS SNIH",
    requirements: [
      "Prokliknout se přes BONUSLY.cz s povolenými cookies (platnost cookies 30 dní).",
      "Vybrané kódy JOKLBONUS platí na příslušné kategorie střešního materiálu.",
    ],
    pros: [
      "3 % cashback zpět u drahých stavebních a střešních objednávek.",
      "5 aktivních slevových kódů na konkrétní střešní sortiment (slevy 5–11 %).",
      "Vysoká schvalovatelnost objednávek (téměř 95 %).",
    ],
    cons: [
      "Slevové kódy JOKLBONUS platí jen na vybrané kategorie (krytiny, fólie, háky, pochůzné systémy).",
      "Schválení cashbacku trvá do 50 dnů.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794",
    trackingSlug: "vse-pro-strechu",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Vše-pro-střechu.cz – cashback 3 % a kódy až -11 %",
    seoDescription:
      "Střešní krytiny, fólie a příslušenství na Vše-pro-střechu.cz s cashbackem 3 % a ověřenými kódy JOKLBONUS na BONUSLY.cz.",
    faq: [
      {
        question: "Jaké slevové kódy fungují na Vše-pro-střechu.cz?",
        answer:
          "K dispozici jsou kódy JOKLBONUS SNIH (-11 % na protisněhové háky), JOKLBONUS8 (-8 % na střešní fólie), JOKLBONUS7 (-7 % na pás proti ptákům), JOKLBONUS6 (-6 % na pochůzný systém) a JOKLBONUS5 (-5 % na betonové krytiny).",
      },
      {
        question: "Kolik cashbacku získám z nákupu?",
        answer: "Z každé schválené objednávky získáte zpět 3 % cashback na svůj BONUSLY účet.",
      },
    ],
    promos: [
      {
        trackingSlug: "ehub-vse-pro-strechu-snih",
        title: "Sleva 11 % na protisněhové háky",
        badge: "Kód JOKLBONUS SNIH",
        code: "JOKLBONUS SNIH",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794&desturl=https%3A%2F%2Fwww.vse-pro-strechu.cz%2FProtisnehove-haky-c60_0_1.htm",
        order: 1,
      },
      {
        trackingSlug: "ehub-vse-pro-strechu-folie",
        title: "Sleva 8 % na střešní fólii KOMFORTFOL",
        badge: "Kód JOKLBONUS8",
        code: "JOKLBONUS8",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794&desturl=https%3A%2F%2Fwww.vse-pro-strechu.cz%2FKOMFORTFOL-220-PLUS-Stresni-membrana-folie-se-2-samolepicimi-paskami-75-m2-d1319.htm",
        order: 2,
      },
      {
        trackingSlug: "ehub-vse-pro-strechu-ptaci",
        title: "Sleva 7 % na hliníkový pás proti ptákům",
        badge: "Kód JOKLBONUS7",
        code: "JOKLBONUS7",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794&desturl=https%3A%2F%2Fwww.vse-pro-strechu.cz%2FALUPTAK-5-Ochranny-hlinikovy-pas-proti-ptakum-10-cm-5-m-RAL-8004-RAL-9005-d1373.htm",
        order: 3,
      },
      {
        trackingSlug: "ehub-vse-pro-strechu-pochuzny",
        title: "Sleva 6 % na střešní pochůzný systém",
        badge: "Kód JOKLBONUS6",
        code: "JOKLBONUS6",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794&desturl=https%3A%2F%2Fwww.vse-pro-strechu.cz%2FStresni-pochuzny-system-c49_0_1.htm",
        order: 4,
      },
      {
        trackingSlug: "ehub-vse-pro-strechu-krytiny",
        title: "Sleva 5 % na betonové střešní krytiny",
        badge: "Kód JOKLBONUS5",
        code: "JOKLBONUS5",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794&desturl=https%3A%2F%2Fwww.vse-pro-strechu.cz%2FBetonove-stresni-krytiny-c53_11_2.htm",
        order: 5,
      },
      {
        trackingSlug: "ehub-vse-pro-strechu-doporuc",
        title: "Program Doporuč a získej na Vše-pro-střechu.cz",
        badge: "Akce",
        validUntil: "2026-12-31",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=644ca794&desturl=https%3A%2F%2Fwww.vse-pro-strechu.cz%2Fdoporuc-a-ziskej",
        order: 6,
      },
    ],
  },
  {
    slug: "armyfantasy",
    name: "ArmyFantasy.cz",
    categorySlug: "nakupy-a-volny-cas",
    shortDescription:
      "Přední český e-shop se sběratelskými replikami zbraní, mečů a předmětů z videoher, filmů, seriálů a anime.",
    description: [
      "**ArmyFantasy.cz** nabízí nejširší výběr sběratelských replik, mečů, katan, cosplay doplňků a dárků ze známých videoher, filmů, seriálů i anime (Zaklínač, Pán prstenů, Demon Slayer, One Piece a další).",
      "",
      "### Jak získat cashback 3,5 % na ArmyFantasy.cz",
      "1. Přihlaste se na **BONUSLY.cz** a klikněte na tlačítko **Přejít na ArmyFantasy.cz**.",
      "2. Dokončete objednávku v otevřeném okně prohlížeče.",
      "3. Po schválení nákupu (do 30 dnů) vám připíšeme **3,5 % cashback** zpět na váš BONUSLY účet.",
    ].join("\n"),
    logo: "/logos/armyfantasy.png",
    bonus: "Cashback 3,5 %",
    bonusDescription:
      "Získejte zpět 3,5 % z každého nákupu sběratelských replik a cosplay doplňků na ArmyFantasy.cz.",
    promoCode: null,
    promoCodeNote: null,
    ctaLabel: "Přejít na ArmyFantasy.cz",
    requirements: [
      "Prokliknout se přes BONUSLY.cz (nadstandardní délka cookies 50 dní).",
      "Objednávka musí být uhrazena a nesmí být vrácena.",
    ],
    pros: [
      "3,5 % cashback a nadstandardně dlouhé cookies (50 dní).",
      "Rychlé schvalování transakcí (do 30 dnů).",
      "Unikátní sortiment filmových, herních a anime replik skladem v ČR.",
    ],
    cons: [
      "Aktuálně bez dodatečného slevového kódu.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=d08355ae",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=d08355ae",
    trackingSlug: "armyfantasy",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "ArmyFantasy.cz – cashback 3,5 % na repliky a cosplay",
    seoDescription:
      "Sběratelské repliky z her, filmů a anime na ArmyFantasy.cz s cashbackem 3,5 % a 50denními cookies přes BONUSLY.cz.",
    faq: [
      {
        question: "Kolik cashbacku získám na ArmyFantasy.cz?",
        answer: "Z každé schválené objednávky získáte 3,5 % zpět do své BONUSLY peněženky.",
      },
      {
        question: "Jak rychle se schvaluje odměna?",
        answer: "ArmyFantasy.cz má zkrácenou lhůtu schválení transakcí do 30 dnů.",
      },
    ],
  },
  {
    slug: "cernyrytir",
    name: "ČernýRytíř.cz",
    categorySlug: "nakupy-a-volny-cas",
    shortDescription:
      "Největší specializovaný český obchod s kartami Magic: The Gathering, Pokémon, boostery, Commander decky a deskovkami.",
    description: [
      "**ČernýRytíř.cz** je legendární specializovaný obchod se sběratelskými karetními hrami **Magic: The Gathering**, **Pokémon**, **Yu-Gi-Oh!**, deskovými hrami a herními doplňky s kamennou hernou v Praze 8.",
      "",
      "### Výhodné nákupy a akce na ČernýRytíř.cz",
      "Proklikněte se přes BONUSLY.cz na aktuální akční nabídku a výprodeje karet, boosterů i herního příslušenství. *(Poznámka: podmínky programu ČernýRytíř.cz neumožňují poskytovat z nákupů finanční slevu zpět.)*",
    ].join("\n"),
    logo: "/logos/cernyrytir.png",
    bonus: "Black Friday slevy až 92 %",
    bonusDescription:
      "Využijte aktuální výprodeje a speciální akce na Magic: The Gathering, Pokémon karty a deskové hry.",
    promoCode: null,
    promoCodeNote: null,
    ctaLabel: "Přejít na ČernýRytíř.cz",
    requirements: [
      "Přejděte na e-shop ČernýRytíř.cz přes odkaz výše a vyberte si z aktuální nabídky.",
      "Možnost online doručení i osobního odběru na prodejně v Praze 8.",
    ],
    pros: [
      "Největší specializovaná nabídka kusových karet Magic: The Gathering a boosterů v ČR.",
      "Pravidelné výprodeje a sezónní akce (Black Friday až -92 %).",
      "Tradiční český obchod s vlastní hernou a turnaji v Praze.",
    ],
    cons: [
      "Podmínky partnerského programu neumožňují vyplácet z objednávek dodatečnou finanční odměnu.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=eb29b5d4",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=eb29b5d4",
    trackingSlug: "cernyrytir",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "ČernýRytíř.cz – Magic, Pokémon a akce až -92 %",
    seoDescription:
      "Největší český obchod s Magic: The Gathering, Pokémon kartami a deskovkami. Sledujte aktuální akce a výprodeje ČernýRytíř.cz.",
    faq: [
      {
        question: "Jaký sortiment najdu na ČernýRytíř.cz?",
        answer:
          "Kompletní nabídku kusových karet, boosterů, Commander decků a obalů pro Magic: The Gathering, Pokémon TCG, deskové hry a figurky.",
      },
      {
        question: "Lze si objednávku vyzvednout osobně?",
        answer: "Ano, Černý Rytíř má vlastní kamennou prodejnu a hernu v Praze 8.",
      },
    ],
    promos: [
      {
        trackingSlug: "ehub-cernyrytir-black-friday",
        title: "BLACK FRIDAY se slevou až 92 % na vybrané karty a hry",
        badge: "Sleva až 92 %",
        validUntil: "2026-11-29",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=eb29b5d4&desturl=https%3A%2F%2Fcernyrytir.cz%2Fblack-friday-2026.html",
        order: 1,
      },
    ],
  },
  {
    slug: "rucedozadu",
    name: "rucedozadu.cz",
    categorySlug: "moda-a-doplnky",
    shortDescription:
      "Český e-shop s ochrannou pracovní obuví, pracovními oděvy, rukavicemi a ochrannými pracovními pomůckami (OOPP).",
    description: [
      "**rucedozadu.cz** se specializuje na kvalitní pracovní oděvy, certifikovanou bezpečnostní obuv, pracovní rukavice a ochranné pomůcky pro řemeslníky, kutily i firemní zákazníky.",
      "",
      "### Jak získat cashback 4 % na rucedozadu.cz",
      "1. Přihlaste se na **BONUSLY.cz** a klikněte na tlačítko **Přejít na rucedozadu.cz**.",
      "2. Dokončete objednávku v otevřeném okně.",
      "3. Po potvrzení nákupu vám připíšeme **4 % cashback** přímo do vaší BONUSLY peněženky.",
    ].join("\n"),
    logo: "/logos/rucedozadu.png",
    bonus: "Cashback 4 %",
    bonusDescription:
      "Získejte zpět 4 % z každého nákupu pracovní obuvi, montérek a ochranných pomůcek na rucedozadu.cz.",
    promoCode: null,
    promoCodeNote: null,
    ctaLabel: "Přejít na rucedozadu.cz",
    requirements: [
      "Prokliknout se přes BONUSLY.cz v přihlášeném prohlížeči (cookies 30 dní).",
      "Objednávka musí být řádně zaplacena a nesmí být vrácena.",
    ],
    pros: [
      "Atraktivní 4 % cashback na celý sortiment pracovních oděvů a obuvi.",
      "Široký výběr certifikovaných OOPP pro profíky i domácí dílnu.",
    ],
    cons: [
      "Schválení transakce trvá do 50 dnů.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=c70a115d",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=c70a115d",
    trackingSlug: "rucedozadu",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "rucedozadu.cz – cashback 4 % na pracovní oděvy a obuv",
    seoDescription:
      "Pracovní obuv, oděvy, rukavice a OOPP na rucedozadu.cz se 4 % cashbackem zpět z každého nákupu přes BONUSLY.cz.",
    faq: [
      {
        question: "Jak získám 4 % cashback na rucedozadu.cz?",
        answer:
          "Přihlaste se na BONUSLY.cz, klikněte na tlačítko Přejít na rucedozadu.cz a dokončete nákup. Odměnu 4 % vám připíšeme po schválení objednávky.",
      },
    ],
  },
  {
    slug: "svetfyzioterapie",
    name: "Svetfyzioterapie.cz",
    categorySlug: "krasa-a-zdravi",
    shortDescription:
      "Odborný portál a e-shop s fyzioterapeutickými pomůckami, tejpy, masážními válci a kurzy pro fyzioterapeuty i sportovce.",
    description: [
      "**Svetfyzioterapie.cz** propojuje odborné vzdělávání s e-shopem ověřených pomůcek pro fyzioterapii, rehabilitaci, kineziotejping a zdravý pohyb bez bolesti.",
      "",
      "### Jak získat cashback 4 % na Svetfyzioterapie.cz",
      "1. Přihlaste se na **BONUSLY.cz** a klikněte na **Přejít na Svetfyzioterapie.cz**.",
      "2. Dokončete objednávku pomůcek nebo kurzu v otevřeném okně.",
      "3. Po schválení transakce získáte **4 % cashback** zpět na svůj BONUSLY účet.",
    ].join("\n"),
    logo: "/logos/svetfyzioterapie.png",
    bonus: "Cashback 4 %",
    bonusDescription:
      "Získejte zpět 4 % z každého nákupu fyzioterapeutických pomůcek, tejpů a kurzů na Svetfyzioterapie.cz.",
    promoCode: null,
    promoCodeNote: null,
    ctaLabel: "Přejít na Svetfyzioterapie.cz",
    requirements: [
      "Prokliknout se přes BONUSLY.cz v přihlášeném prohlížeči (cookies 30 dní).",
      "Objednávka musí být řádně zaplacena.",
    ],
    pros: [
      "4 % cashback zpět a špičková schvalovatelnost objednávek (97,4 %).",
      "Odborně vybraný sortiment doporučený profesionálními fyzioterapeuty.",
    ],
    cons: [
      "Schválení cashbacku trvá do 50 dnů.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=4b7ba687",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=4b7ba687",
    trackingSlug: "svetfyzioterapie",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Svetfyzioterapie.cz – cashback 4 % na pomůcky a kurzy",
    seoDescription:
      "Fyzioterapeutické pomůcky, tejpy a odborné kurzy na Svetfyzioterapie.cz se 4 % cashbackem zpět přes BONUSLY.cz.",
    faq: [
      {
        question: "Kolik cashbacku získám na Svetfyzioterapie.cz?",
        answer: "Z každé schválené objednávky získáte 4 % zpět na svůj BONUSLY účet (50 % naší provize).",
      },
    ],
  },
  {
    slug: "trikon",
    name: "Trikon.cz",
    categorySlug: "moda-a-doplnky",
    shortDescription:
      "Český e-shop s kvalitním textilem a odolným potiskem na bavlnu, softshell i funkční oblečení bez praskání.",
    description: [
      "**Trikon.cz** nabízí kvalitní oblečení a profesionální potisk textilu se sytými, odolnými barvami na bavlnu, polyester, softshell, elastan i froté pro jednotlivce, týmy i firmy.",
      "",
      "### Jak získat cashback 4 % na Trikon.cz",
      "1. Přihlaste se na **BONUSLY.cz** a klikněte na tlačítko **Přejít na Trikon.cz**.",
      "2. Dokončete objednávku v otevřeném okně prohlížeče.",
      "3. Po potvrzení nákupu vám připíšeme **4 % cashback** zpět do vaší BONUSLY peněženky.",
    ].join("\n"),
    logo: "/logos/trikon.png",
    bonus: "Cashback 4 %",
    bonusDescription:
      "Získejte zpět 4 % z každé objednávky textilu a potisku na Trikon.cz přes BONUSLY.",
    promoCode: null,
    promoCodeNote: null,
    ctaLabel: "Přejít na Trikon.cz",
    requirements: [
      "Prokliknout se přes BONUSLY.cz v přihlášeném prohlížeči (cookies 30 dní).",
      "Objednávka musí být uhrazena a nesmí být vrácena.",
    ],
    pros: [
      "4 % cashback a 100 % historická schvalovatelnost objednávek.",
      "Kvalitní a odolný potisk na všechny typy materiálů včetně softshellu.",
    ],
    cons: [
      "Schválení transakce trvá do 50 dnů.",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=7fbcc85d",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=7fbcc85d",
    trackingSlug: "trikon",
    partnerNetwork: "ehub",
    rewardAmount: null,
    rating: 4.8,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Trikon.cz – cashback 4 % na textil a potisk oblečení",
    seoDescription:
      "Objednejte si kvalitní textil a odolný potisk na Trikon.cz se 4 % cashbackem zpět přes BONUSLY.cz.",
    faq: [
      {
        question: "Kolik cashbacku získám na Trikon.cz?",
        answer: "Z každé schválené objednávky získáte 4 % zpět do své BONUSLY peněženky.",
      },
    ],
  },
];
