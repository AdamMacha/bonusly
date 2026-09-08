import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Začíná seedování databáze BONUSLY s reálnými daty z Excelu...");

  // Vyčištění existujících dat (v opačném pořadí závislostí)
  await prisma.lead.deleteMany({});
  await prisma.click.deleteMany({});
  await prisma.offerFaq.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.offer.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.newsletterSubscriber.deleteMany({});

  // 1. Vytvoření autora
  const author = await prisma.author.create({
    data: {
      name: "Redakce BONUSLY",
      slug: "redakce",
      bio: "Tým redaktorů a finančních specialistů portálu BONUSLY. Denně testujeme a ověřujeme výhodné nabídky, bonusy a možnosti přivýdělku v ČR.",
      avatar: "/logo.png",
    },
  });


  // 2. Vytvoření kategorií
  const catPrivydelek = await prisma.category.create({
    data: {
      name: "Přivýdělek",
      slug: "privydelek",
      icon: "🛵",
      order: 1,
      description: "Flexibilní práce, brigády a možnosti rozvozu jídla či nákupů s týdenním vyplácením.",
      seoTitle: "Přivýdělek a flexibilní brigády | BONUSLY",
      seoDescription: "Jak si přivydělat peníze navíc? Objevte nejlépe placené přivýdělky, rozvoz pro Wolt a Foodora s bonusem do začátku.",
    },
  });

  const catFinance = await prisma.category.create({
    data: {
      name: "Finance & Investice",
      slug: "finance",
      icon: "💰",
      order: 2,
      description: "Brokerské účty, robo-advisory platformy, akcie zdarma a investice bez poplatků.",
      seoTitle: "Investiční platformy a akcie zdarma | BONUSLY",
      seoDescription: "Srovnání nejlepších investičních aplikací v ČR. Získejte akcie zdarma za registraci a investujte do ETF s nízkými náklady.",
    },
  });

  const catBanky = await prisma.category.create({
    data: {
      name: "Bankovní účty",
      slug: "banky",
      icon: "🏦",
      order: 3,
      description: "Běžné a spořicí účty bez poplatků s finančním bonusem za založení online.",
      seoTitle: "Nejlepší bankovní účty a karty s bonusem | BONUSLY",
      seoDescription: "Založte si běžný nebo spořicí účet a kartu online a získejte bonus až několik tisíc korun zdarma. Přehled bankovních akcí v ČR.",
    },
  });

  const catBonusy = await prisma.category.create({
    data: {
      name: "Bonusy & Odměny",
      slug: "bonusy",
      icon: "🎁",
      order: 4,
      description: "Registrační odměny zdarma, uvítací kredity, ověřené slevy a časově omezené akce.",
      seoTitle: "Registrační bonusy zdarma | BONUSLY",
      seoDescription: "Kompletní přehled ověřených bonusů zdarma za pouhé dokončení registrace bez nutnosti počátečního vkladu.",
    },
  });

  // 3. Vytvoření nabídek z Excelu
  // 3.1 Wolt kurýr (přesný referral kód CPCJPUX)
  await prisma.offer.create({
    data: {
      slug: "wolt-kuryr",
      name: "Wolt kurýr",
      shortDescription: "Flexibilní rozvoz jídla a nákupů na kole, skútru nebo v autě s týdenní výplatou a bonusem 4 000 Kč pro nováčky.",
      description: `
Wolt je jednou z nejoblíbenějších rozvážkových služeb v České republice. Jako kurýr Woltu máte naprostou volnost v tom, kdy se přihlásíte do aplikace a začnete rozvážet. Nepotřebujete žádné pevné směny ani předem nahlášené hodiny.

### Proč rozvážet pro Wolt?
- **Absolutní flexibilita:** Zapnete aplikaci, kdykoliv máte volno – hodinu odpoledne nebo celou sobotu.
- **Týdenní výplata:** Peníze vám přicházejí na bankovní účet každé úterý za předchozí týden.
- **Dýška jsou vaše:** 100 % dýšek od zákazníků v hotovosti i přes aplikaci náleží vám.
- **Možnost flotily:** Nemáte IČO? Žádný problém – můžete rozvážet přes partnerskou flotilu na DPP.

### Podmínky pro získání bonusu 4 000 Kč:
Zaregistrujte se přes odkaz níže s referral kódem **CPCJPUX** a odjeďte 150 objednávek během prvních 45 dní od aktivace účtu.
      `,
      categoryId: catPrivydelek.id,
      logo: "/logos/wolt.png",
      bonus: "4 000 Kč bonus pro nového kurýra",
      bonusDescription: "Bonus 4 000 Kč po odjetí 150 objednávek během prvních 45 dní s referral kódem CPCJPUX.",
      requirements: [
        "Věk minimálně 18 let",
        "Vlastní dopravní prostředek (kolo, elektrokoloběžka, skútr nebo auto)",
        "Chytrý telefon s iOS nebo Android",
        "Odjet 150 objednávek během prvních 45 dní",
        "Čistý výpis z rejstříku trestů a IČO nebo flotila",
      ],
      pros: [
        "Výplata každý týden v úterý na bankovní účet",
        "Bonus 4 000 Kč za start",
        "Naprostá svoboda plánování času bez šéfa",
        "Moderní a přehledná kurýrní aplikace",
      ],
      cons: [
        "Výdělek závisí na poptávce a počasí",
        "Opotřebení vlastního dopravního prostředku",
      ],
      referralUrl: "https://courier.wolt.com/apply?referral_code=CPCJPUX",
      trackingSlug: "wolt-kuryr",
      rating: 4.8,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Wolt kurýr bonus 4 000 Kč s kódem CPCJPUX | BONUSLY",
      seoDescription: "Staňte se kurýrem Wolt a získejte startovací bonus 4 000 Kč za 150 objednávek. Referral kód CPCJPUX a kompletní návod.",
      faq: {
        create: [
          {
            question: "Jaký referral kód mám použít pro bonus?",
            answer: "Při registraci zadejte referral kód CPCJPUX, nebo jednoduše klikněte na naše tlačítko 'Získat nabídku', které kód automaticky předvyplní.",
            order: 1,
          },
          {
            question: "Musím mít na rozvoz pro Wolt živnostenský list?",
            answer: "Nemusíte. Můžete jezdit i pod partnerskou flotilou na dohodu o provedení práce (DPP).",
            order: 2,
          },
        ],
      },
    },
  });

  // 3.2 foodora kurýr
  await prisma.offer.create({
    data: {
      slug: "foodora-kuryr",
      name: "foodora kurýr",
      shortDescription: "Rozvoz jídla a nákupů s růžovou taškou. Široká síť partnerských restaurací v desítkách měst po celé ČR.",
      description: `
foodora je největší rozvozová služba v ČR s nejširším pokrytím měst. Nabízí stabilní proud objednávek po celý den a garantované minimální hodinové sazby během vybraných špiček.
      `,
      categoryId: catPrivydelek.id,
      logo: "/logos/foodora.png",
      bonus: "Flexibilní přivýdělek a vstupní bonus",
      bonusDescription: "Vstupní bonus a motivační výzvy pro aktivní kurýry po registraci.",
      requirements: [
        "Věk 18+",
        "Chytrý telefon",
        "Vlastní dopravní prostředek",
        "IČO nebo smlouva s flotilou",
      ],
      pros: [
        "Nejširší pokrytí měst v Česku",
        "Pravidelné bonusové výzvy",
        "Příjemná komunita kurýrů",
      ],
      cons: [
        "Plánování zón s předstihem přináší výhodnější směny",
      ],
      referralUrl: "https://kuryr.foodora.cz",
      trackingSlug: "foodora-kuryr",
      rating: 4.6,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "foodora kurýr: Kolik si vyděláte a jak začít | BONUSLY",
      seoDescription: "Chcete rozvážet pro foodora? Přečtěte si hodnocení, požadavky a zaregistrujte se online.",
    },
  });

  // 3.3 Airbnb (Nová nabídka z Excelu)
  await prisma.offer.create({
    data: {
      slug: "airbnb",
      name: "Airbnb Hostitel",
      shortDescription: "Pronajímejte svůj byt, pokoj nebo chalupu na Airbnb. Získejte uvítací odměnu 500 Kč a vydělávejte tisíce korun měsíčně.",
      description: `
Máte volný pokoj, byt nebo chatu? Jako hostitel na Airbnb můžete přeměnit nevyužitý prostor na stabilní zdroj pasivního či aktivního příjmu. Airbnb poskytuje hostitelům kompletní pojištění AirCover až do výše 3 milionů USD zdarma.

### Proč se stát hostitelem na Airbnb?
- **Vysoký výdělek:** V exponovaných lokalitách a sezónách si hostitelé přijdou na desítky tisíc korun měsíčně.
- **Bezpečnost s AirCover:** Špičkové krytí škod a odpovědnosti přímo od Airbnb.
- **Odměna 500 Kč:** Speciální odměna pro nového hostitele po dokončení první rezervace přes náš odkaz.
- **Plná kontrola:** Sami si určujete pravidla domu, kalendář i cenu za noc.
      `,
      categoryId: catPrivydelek.id,
      logo: "/logos/airbnb.svg",
      bonus: "500 Kč uvítací kredit / bonus pro hostitele",
      bonusDescription: "Bonus 500 Kč pro nového hostitele po uskutečnění první rezervace ubytování.",
      requirements: [
        "Věk minimálně 18 let",
        "Disponování nemovitostí či pokojem vhodným k pronájmu",
        "Vytvoření nabídky a hostování prvního hosta",
      ],
      pros: [
        "Garance ochrany AirCover až do 3 mil. USD zdarma",
        "Globální dosah na miliony ověřených cestovatelů",
        "Jednoduchá aplikace a automatizované platby",
      ],
      cons: [
        "Časová náročnost na úklid a komunikaci s hosty",
        "Nutnost dodržovat místní pravidla pro krátkodobé pronájmy",
      ],
      referralUrl: "https://www.airbnb.cz/rp/adamm34364?p=stay&s=67&unique_share_id=fe36d888-1903-4c41-afe9-dedaeffde2a4",
      trackingSlug: "airbnb",
      rating: 4.8,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Airbnb hostitel recenze & 500 Kč bonus | BONUSLY",
      seoDescription: "Jak začít vydělávat pronájmem na Airbnb? Získejte uvítací odměnu 500 Kč a využijte ochranu AirCover. Kompletní průvodce.",
    },
  });

  // 3.4 Booking.com Partner (Nová nabídka z Excelu)
  await prisma.offer.create({
    data: {
      slug: "booking",
      name: "Booking.com Partner",
      shortDescription: "Zaregistrujte své ubytovací zařízení na Booking.com a získejte 0% komisi pro prvních 50 rezervací.",
      description: `
Booking.com je největší rezervační portál na světě. Pokud zaregistrujete své ubytování (apartmán, penzion, chatu) přes náš partnerský odkaz, **nebudete platit žádnou provizi z prvních 50 rezervací**. To znamená úsporu až desítek tisíc korun, které zůstanou přímo vám!
      `,
      categoryId: catPrivydelek.id,
      logo: "/logos/booking.svg",
      bonus: "0% komise pro prvních 50 rezervací",
      bonusDescription: "Ušetřete až desítky tisíc korun na provizích z prvních 50 ubytovaných hostů.",
      requirements: [
        "Vlastnictví nebo správa ubytovacího zařízení",
        "Dokončení registrace partnerského profilu",
      ],
      pros: [
        "0% provize pro prvních 50 rezervací",
        "Obrovská globální návštěvnost a okamžitá poptávka",
        "Synchronizace kalendáře s ostatními platformami",
      ],
      cons: [
        "Standardní provize po vyčerpání bonusu činí 15 %",
      ],
      referralUrl: "https://join.booking.com/r/d/2d2ab7d3?lang=xu",
      trackingSlug: "booking",
      rating: 4.7,
      featured: false,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Booking.com Partner: 0% provize na 50 rezervací | BONUSLY",
      seoDescription: "Zaregistrujte ubytování na Booking.com bez provize na prvních 50 rezervací. Partnerský link a podrobnosti.",
    },
  });

  // 3.5 Raiffeisenbank (přesný referral kód lWcT2P)
  await prisma.offer.create({
    data: {
      slug: "raiffeisenbank",
      name: "Raiffeisenbank Chytrý účet",
      shortDescription: "Běžný účet bez poplatků za vedení a s odměnou 3 000 Kč při založení účtu do 30 dní online.",
      description: `
Chytrý účet od Raiffeisenbank nabízí kompletní bankovní servis zdarma bez skrytých podmínek. K tomu můžete získat finanční odměnu až **3 000 Kč**, pokud si účet založíte online přes odkaz s promo kódem **lWcT2P** a budete jej aktivně využívat.
      `,
      categoryId: catBanky.id,
      logo: "/logos/raiffeisenbank.png",
      bonus: "3 000 Kč finanční bonus",
      bonusDescription: "Bonus 3 000 Kč při založení účtu do 30 dní online přes partnerský kód lWcT2P.",
      requirements: [
        "Nový klient Raiffeisenbank",
        "Věk min. 18 let",
        "Založit si účet do 30 dní online",
      ],
      pros: [
        "Vedení účtu a výběry z bankomatů v ČR i zahraničí zdarma",
        "Odměna 3 000 Kč vyplácená v hotovosti na účet",
        "Špičková a rychlá mobilní aplikace",
      ],
      cons: [
        "Pouze pro nové klienty banky",
      ],
      referralUrl: "https://onb.rb.cz/onb-web?mgm=lWcT2P",
      trackingSlug: "raiffeisenbank",
      rating: 4.8,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Raiffeisenbank bonus 3 000 Kč s kódem lWcT2P | BONUSLY",
      seoDescription: "Získejte 3 000 Kč za založení Chytrého účtu u Raiffeisenbank. Promo kód lWcT2P a jednoduché založení online.",
    },
  });

  // 3.6 mBank (Nová nabídka z Excelu, kód adamm1863)
  await prisma.offer.create({
    data: {
      slug: "mbank",
      name: "mBank mKonto",
      shortDescription: "Založte si účet mKonto zdarma a získejte 100 Kč za každou platbu kartou – celkem až 1 000 Kč.",
      description: `
mKonto od mBank je moderní běžný účet bez poplatků za vedení, s tuzemskými platbami i výběry z bankomatů v ČR i zahraničí nad 1 500 Kč zdarma.

### Jak získat bonus až 1 000 Kč:
1. Založte si účet mKonto přes náš odkaz s kódem **adamm1863**
2. Plaťte kartou (v kamenném obchodě nebo na internetu)
3. Za každou libovolnou platbu kartou získáte odměnu **100 Kč**
4. Limit je 10 plateb, takže můžete snadno získat celkem **1 000 Kč** přímo na svůj nový účet!
      `,
      categoryId: catBanky.id,
      logo: "/logos/mbank.png",
      bonus: "Až 1 000 Kč (100 Kč za platbu kartou)",
      bonusDescription: "Získejte 100 Kč za každou z prvních 10 plateb kartou po založení mKonta (celkem 1 000 Kč).",
      requirements: [
        "Nový klient mBank",
        "Věk min. 18 let",
        "Založení účtu mKonto online s kódem adamm1863",
        "Alespoň 10 plateb kartou pro maximální bonus",
      ],
      pros: [
        "Vedení účtu a tuzemské platby zcela zdarma",
        "100 Kč za každou platbu kartou bez ohledu na výši útraty",
        "Výběry ze všech bankomatů v ČR i cizině od 1 500 Kč zdarma",
      ],
      cons: [
        "Při výběru z bankomatu pod 1 500 Kč je účtován poplatek",
      ],
      referralUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html?numer=adamm1863.",
      trackingSlug: "mbank",
      rating: 4.7,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "mBank bonus až 1 000 Kč za platby kartou | BONUSLY",
      seoDescription: "Založte si mKonto s kódem adamm1863 a získejte 100 Kč za každou platbu kartou, celkem až 1 000 Kč zdarma.",
    },
  });

  // 3.7 Air Bank (přesný kód qupir6)
  await prisma.offer.create({
    data: {
      slug: "air-bank",
      name: "Air Bank běžný účet",
      shortDescription: "Banka, kterou můžete mít rádi. Běžný účet zdarma, odměny My Air a akce Přiveď přítele.",
      description: `
Air Bank patří dlouhodobě k nejoblíbenějším bankám v Česku díky svému lidskému přístupu a absenci nesmyslných poplatků. Využijte doporučení přes náš odkaz s kódem **qupir6** a po 5 platbách kartou získejte odměny.
      `,
      categoryId: catBanky.id,
      logo: "/logos/air-bank.png",
      bonus: "Odměny My Air a bonus za doporučení",
      bonusDescription: "Bonus při založení účtu s kódem qupir6 a zaplacení 5x kartou do 45 dnů.",
      requirements: [
        "Věk 18+",
        "Online založení s referral odkazem",
        "Zaplatit 5x kartou do 45 dnů od registrace",
      ],
      pros: ["Účet i výběry ze všech bankomatů zdarma", "Výhodný cashback program My Air", "Přehledná a moderní aplikace"],
      cons: ["Nutnost splnit 5 plateb kartou do 45 dní"],
      referralUrl: "https://www.airbank.cz/pozvani-pratel?referrer=qupir6",
      trackingSlug: "air-bank",
      rating: 4.8,
      featured: false,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Air Bank doporučení & kód qupir6 | BONUSLY",
      seoDescription: "Založte si Air Bank s kódem qupir6. Zjistěte, jak splnit podmínku 5 plateb kartou a využívat My Air naplno.",
    },
  });

  // 3.8 Investown (Nová nabídka z Excelu, kód 0G1ADBC5)
  await prisma.offer.create({
    data: {
      slug: "investown",
      name: "Investown",
      shortDescription: "Investujte do nemovitostí od 500 Kč s výnosem až 10 % p.a. a získejte bonus 500 Kč do začátku.",
      description: `
Investown je přední česká crowdfundingová platforma licencovaná ČNB, která umožňuje investovat do zajištěných nemovitostních projektů v ČR již od 500 Kč. Každý měsíc vám chodí pravidelný výnos přímo na účet.

### Jak získat bonus 500 Kč:
1. Zaregistrujte se přes náš odkaz s kódem **0G1ADBC5**
2. Do 7 dní investujte alespoň 5 000 Kč do libovolného projektu
3. Na účet vám bude připsán **bonus 500 Kč**
4. *Tip:* Pokud peníze potřebujete, projekt lze na sekundárním trhu obratem bez problémů prodat!
      `,
      categoryId: catFinance.id,
      logo: "/logos/investown.png",
      bonus: "500 Kč bonus pro nového investora",
      bonusDescription: "Bonus 500 Kč při investici min. 5 000 Kč do 7 dní od registrace s kódem 0G1ADBC5.",
      requirements: [
        "Věk 18+",
        "Český bankovní účet",
        "Investovat min. 5 000 Kč do jednoho projektu do 7 dní od registrace",
      ],
      pros: [
        "Pravidelný měsíční výnos až 10 % p.a. zajištěný nemovitostmi",
        "Investice již od 500 Kč",
        "Plně v češtině pod dohledem České národní banky (ČNB)",
        "Možnost prodeje na sekundárním trhu",
      ],
      cons: [
        "Investice není pojištěna jako bankovní vklad",
      ],
      referralUrl: "https://my.investown.cz/referral/0G1ADBC5",
      trackingSlug: "investown",
      rating: 4.8,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Investown bonus 500 Kč s kódem 0G1ADBC5 & recenze | BONUSLY",
      seoDescription: "Investujte do nemovitostí s Investown a získejte bonus 500 Kč s promo kódem 0G1ADBC5. Podrobný návod a zkušenosti.",
    },
  });

  // 3.9 Trading 212
  await prisma.offer.create({
    data: {
      slug: "trading-212",
      name: "Trading 212",
      shortDescription: "Investujte do světových akcií a ETF bez poplatků. Získejte akcii zdarma v hodnotě až 100 EUR.",
      description: `
Trading 212 je přední evropský broker regulovaný ve Velké Británii a EU (CySEC), který nabízí nákup a prodej reálných akcií a ETF zcela bez provizí a s denním úročením volné hotovosti.
      `,
      categoryId: catFinance.id,
      logo: "/logos/trading-212.png",
      bonus: "Akcie v hodnotě až 100 EUR",
      bonusDescription: "Akcie zdarma v hodnotě až 100 EUR po dokončení vkladu na účet.",
      requirements: [
        "Věk minimálně 18 let",
        "Občanský průkaz nebo pas pro ověření online",
        "První vklad na účet",
      ],
      pros: [
        "Nulové poplatky za nákup/prodej akcií a ETF",
        "Výborná mobilní aplikace kompletně v češtině",
        "Denní úročení volných peněz",
      ],
      cons: [
        "Poplatek 0,15 % za měnovou konverzi při nákupu cizích měn",
      ],
      referralUrl: "https://www.trading212.com",
      trackingSlug: "trading-212",
      rating: 4.9,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Trading 212 akcie zdarma až 100 EUR | BONUSLY",
      seoDescription: "Investujte do akcií a ETF bez poplatků s Trading 212. Získejte uvítací akcii zdarma až do 100 EUR.",
    },
  });

  // 3.10 Revolut (přesný referral kód a podmínky)
  await prisma.offer.create({
    data: {
      slug: "revolut",
      name: "Revolut",
      shortDescription: "Globální finanční účet se směnou měn za mezibankovní kurzy, virtuálními kartami a finančním bonusem.",
      description: `
Revolut je nejpopulárnější finanční superaplikace v Evropě. Umožňuje držet a směňovat více než 30 světových měn za férové mezibankovní kurzy, platit bezpečnými virtuálními kartami a investovat.

### Podmínky pro získání odměny:
1. Zaregistrujte se přes odkaz níže s kódem **adamhcyiq!SEP1-26-AR-H2**
2. Ověřte svou totožnost dokladem (OP / Pas)
3. Dobijte peníze na účet bankovním převodem nebo platební kartou
4. Proveďte 3 platby kartou v minimální výši 100 Kč každá (v kamenném obchodě nebo na internetu)
5. Objednejte si fyzickou kartu Revolut (lze přidat do Apple/Google Pay ihned)
      `,
      categoryId: catBanky.id,
      logo: "/logos/revolut.svg",
      bonus: "Finanční odměna za registraci",
      bonusDescription: "Speciální odměna za registraci a splnění podmínek (3 platby min. 100 Kč a objednání karty).",
      requirements: [
        "Věk 18+",
        "Registrace přes referral link",
        "Ověření totožnosti",
        "3 platby kartou min. 100 Kč každá",
        "Objednání fyzické karty",
      ],
      pros: [
        "Nejlepší směnné kurzy na trhu",
        "Jednorázové virtuální karty chránící před podvody",
        "Bleskové platby mezi přáteli",
      ],
      cons: [
        "O víkendech drobný příplatek za směnu měn (1 %)",
      ],
      referralUrl: "https://revolut.com/referral/?referral-code=adamhcyiq!SEP1-26-AR-H2&geo-redirect",
      trackingSlug: "revolut",
      rating: 4.9,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Revolut referral bonus & kód adamhcyiq | BONUSLY",
      seoDescription: "Jak získat bonus k účtu Revolut? Postup krok za krokem: registrace, 3 platby min. 100 Kč a objednání karty.",
    },
  });

  // 3.11 Tipsport (1000 + 300 Kč s formulářem pro zaslání pozvánky)
  await prisma.offer.create({
    data: {
      slug: "tipsport",
      name: "Tipsport bonus 1 300 Kč",
      shortDescription: "Získejte 300 Kč zdarma ihned za registraci bez vkladu a dalších 1 000 Kč přes program Přiveď kamaráda.",
      description: `
Tipsport nabízí skvělý kombinovaný bonus v celkové hodnotě **1 300 Kč** (300 Kč zdarma ihned jen za online ověření přes BankID + 1 000 Kč v rámci partnerského programu Přiveď kamaráda).

### Jak funguje program Přiveď kamaráda:
Tipsport vyžaduje, aby vám stávající ověřený uživatel zaslal osobní pozvánku. 

Vyplňte níže uvedený jednoduchý formulář (vaše jméno a e-mail či telefon) a my vám obratem zašleme oficiální Tipsport pozvánku, se kterou získáte plný nárok na bonus **1 300 Kč**.
      `,
      categoryId: catBonusy.id,
      logo: "/logos/tipsport.png",
      bonus: "1 000 Kč + 300 Kč zdarma (celkem 1 300 Kč)",
      bonusDescription: "300 Kč bez vkladu ihned za BankID + 1 000 Kč přes osobní pozvánku 'Přiveď kamaráda'.",
      requirements: [
        "Věk minimálně 18 let",
        "Trvalý pobyt v ČR",
        "Vyplnění formuláře pro zaslání osobní pozvánky",
        "Dokončení online registrace přes BankID",
      ],
      pros: [
        "300 Kč zdarma bez nutnosti vkládat vlastní peníze",
        "Dalších až 1 000 Kč bonus přes pozvánku",
        "Ověření přes BankID za 2 minuty",
      ],
      cons: [
        "Vyžaduje zaslání osobní pozvánky od stávajícího člena",
        "Zákaz účasti osob mladších 18 let na hazardních hrách",
      ],
      referralUrl: "https://www.tipsport.cz/bonusy/prived-kamarada",
      trackingSlug: "tipsport",
      rating: 4.8,
      featured: true,
      active: true,
      verified: true,
      lastVerifiedAt: new Date(),
      seoTitle: "Tipsport bonus 1 000 + 300 Kč přes pozvánku | BONUSLY",
      seoDescription: "Získejte pozvánku do programu Přiveď kamaráda s bonusem 1 300 Kč od Tipsportu. Vyplňte formulář a pozvánku obdržíte ihned.",
    },
  });

  // 4. Vytvoření SEO článků na blogu
  await prisma.article.create({
    data: {
      slug: "jak-si-privydelat-jako-wolt-kuryr",
      title: "Jak si přivydělat jako Wolt kurýr: Kompletní průvodce a reálné výdělky 2024",
      excerpt: "Přemýšlíte o rozvozu jídla s Woltem? Zjistěte, kolik si reálně vyděláte, jak funguje registrace, zda potřebujete IČO a jak získat vstupní bonus 4 000 Kč s kódem CPCJPUX.",
      content: `
Práce kurýra pro Wolt se v posledních letech stala jedním z nejpopulárnějších způsobů, jak si flexibilně přivydělat peníze ke studiu, zaměstnání nebo podnikání. V tomto podrobném článku se podíváme na vše, co potřebujete vědět, než vyrazíte do ulic.

## Co je to Wolt a jak rozvoz funguje?

Wolt je finská technologická platforma, která propojuje zákazníky s restauracemi a obchody. Jako kurýr dostáváte přes mobilní aplikaci nabídky na vyzvednutí a doručení objednávek.

Velkou výhodou je, že **máte absolutní kontrolu nad svým časem**. Žádný šéf vám neplánuje směny. Ráno se probudíte, zapnete aplikaci a rozvážíte, jak dlouho chcete.

## Kolik si může kurýr Woltu vydělat?

Výdělek kurýra se skládá ze základní odměny za doručení, příplatku za vzdálenost a případných bonusů v exponovaných časech.

- **Běžný průměrný výdělek:** 220 až 350 Kč / hodina
- **Výdělek ve špičkách (obědy, večery, déšť):** 380 až 450+ Kč / hodina
- **Dýška:** Zákazníci mohou nechat dýško hotově i kartou v aplikaci – 100 % zůstává vám.

Při rozvážení na plný úvazek si aktivní kurýři ve velkých městech běžně přijdou na **45 000 až 65 000 Kč měsíčně**.

## Jak získat startovací bonus 4 000 Kč?

Při registraci zadejte referral kód **CPCJPUX**. Po odjetí 150 objednávek během prvních 45 dní vám Wolt automaticky vyplatí bonus 4 000 Kč navíc k vašim běžným výdělkům.
      `,
      featuredImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&auto=format&fit=crop&q=80",
      categoryId: catPrivydelek.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-01"),
      featured: true,
      draft: false,
      keywords: ["wolt kuryr", "privydelek rozvoz", "wolt kód CPCJPUX", "wolt bonus", "prace kuryr"],
      seoTitle: "Jak si přivydělat jako Wolt kurýr: Kód CPCJPUX a bonus 4 000 Kč | BONUSLY",
      seoDescription: "Kompletní průvodce pro kurýry Wolt. Reálné výdělky, zkušenosti a startovací bonus 4 000 Kč s promo kódem CPCJPUX.",
    },
  });

  await prisma.article.create({
    data: {
      slug: "investown-investovani-do-nemovitosti-zkusenosti",
      title: "Investown zkušenosti: Jak investovat do nemovitostí od 500 Kč a získat bonus",
      excerpt: "Otestovali jsme českou platformu Investown. Přečtěte si, jak funguje zajištění úvěrů nemovitostmi, jaké jsou reálné výnosy a jak získat vstupní bonus 500 Kč.",
      content: `
Ceny nemovitostí v ČR jsou rekordně vysoké a nákup celého investičního bytu vyžaduje miliony korun. Crowdfundingová platforma Investown tento problém vyřešila: umožňuje drobným investorům podílet se na financování developerských a nemovitostních projektů už od 500 Kč s ročním výnosem okolo 8 až 10 % p.a.

## Jak Investown funguje?

Developeři potřebují úvěr na rekonstrukci nebo výstavbu nemovitosti. Investown projekt důkladně prověří, zastaví nemovitost a nabídne investorům možnost půjčit část peněz.

- **Minimální investice:** 500 Kč
- **Výnos:** Typicky 8 až 10,5 % ročně, vyplácený každý měsíc
- **Zajištění:** První zástavní právo na nemovitost s konzervativním LTV (Loan-to-Value)

## Jak získat bonus 500 Kč do začátku?

Při registraci zadejte promo kód **0G1ADBC5** a do 7 dní zainvestujte alespoň 5 000 Kč do libovolného projektu. Obratem získáte odměnu 500 Kč připsanou přímo na váš investorský účet.
      `,
      featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
      categoryId: catFinance.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-05"),
      featured: true,
      draft: false,
      keywords: ["investown zkusenosti", "investown bonus 0G1ADBC5", "investice do nemovitosti", "investown recenze"],
      seoTitle: "Investown recenze & bonus 500 Kč s kódem 0G1ADBC5 | BONUSLY",
      seoDescription: "Podrobná recenze platformy Investown. Jak funguje investování do nemovitostí od 500 Kč a jak získat vstupní bonus 500 Kč.",
    },
  });

  await prisma.article.create({
    data: {
      slug: "revolut-recenze-a-zkusenosti",
      title: "Revolut recenze a zkušenosti: Proč je to nejlepší karta na cesty a nákupy",
      excerpt: "Otestovali jsme kartu Revolut v zahraničí i doma. Zjistěte, jak ušetřit tisíce na poplatcích, jak fungují RevPoints a jak získat vstupní odměnu.",
      content: `
Pokud ještě platíte v zahraničí běžnou kartou od tradiční banky, přicházíte o 2 až 4 % z každé platby kvůli skrytým bankovním kurzovým přirážkám. Revolut tento problém odstraňuje.

## Co všechno Revolut umí?
- Směna více než 30 světových měn za mezibankovní středové kurzy
- Jednorázové virtuální karty pro 100% bezpečné nákupy na internetu
- Program RevPoints s možností sbírat body a směňovat je za letecké míle či slevy
- Okamžité platby mezi přáteli zdarma
      `,
      featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
      categoryId: catBanky.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-10"),
      featured: false,
      draft: false,
      keywords: ["revolut recenze", "revolut zkusenosti", "revpoints", "karta do zahranici"],
      seoTitle: "Revolut recenze & zkušenosti 2024 | BONUSLY",
      seoDescription: "Jak ušetřit na směnách měn a jak získat virtuální karty zdarma. Kompletní recenze aplikace Revolut.",
    },
  });

  // 4.4 Wolt vs Foodora (Přivýdělek)
  await prisma.article.create({
    data: {
      slug: "wolt-vs-foodora-kuryr-srovnani",
      title: "Wolt vs. Foodora kurýr: Velké srovnání výdělků a podmínek 2024",
      excerpt: "Kde si jako kurýr vyděláte více peněz? Porovnali jsme hodinové sazby, plánování směn, aplikaci a bonusy obou největších rozvážkových služeb v Česku.",
      content: `
Rozvážení jídla na kole, skútru nebo v autě patří mezi nejoblíbenější flexibilní přivýdělky v Česku. Dvě největší platformy na našem trhu jsou **Wolt** a **Foodora** (dříve Dáme jídlo). Která z nich se vám vyplatí více?

## 1. Plánování směn a flexibilita
- **Wolt:** Maximální volnost. Žádné směny předem nerezervujete. Kdykoliv máte čas, zapnete aplikaci a jedete.
- **Foodora:** Funguje převážně na bázi předem vypsaných bloků směn. Pokud chcete mít garantovaný příjem a vyšší hodinovou sazbu, musíte si směny dopředu rezervovat v kalendáři.

## 2. Reálné hodinové výdělky
- U **Woltu** se průměrný výdělek pohybuje mezi **220 až 350 Kč/hod**, ve špičkách a při deštivém počasí se můžete dostat na **400 až 450+ Kč/hod**.
- U **Foodory** je garantovaná hodinová sazba v blocích, často kolem **200 až 320 Kč/hod** v závislosti na hodnocení kurýra a dopravním prostředku.

## 3. Vstupní bonusy
Wolt aktuálně nabízí startovací bonus **4 000 Kč** pro nové kurýry při zadání kódu **CPCJPUX** a splnění 150 doručení během prvních 45 dní.
      `,
      featuredImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
      categoryId: catPrivydelek.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-12"),
      featured: false,
      draft: false,
      keywords: ["wolt vs foodora", "kurýr srovnání", "kolik bere kurýr", "rozvoz jídla výdělek"],
      seoTitle: "Wolt vs Foodora kurýr: Kde si vyděláte víc? | BONUSLY",
      seoDescription: "Detailní srovnání kurýrů pro Wolt a Foodora. Hodinové sazby, plánování směn, bonus 4 000 Kč a zkušenosti z praxe.",
    },
  });

  // 4.5 mBank mKonto recenze (Bankovní účty)
  await prisma.article.create({
    data: {
      slug: "mbank-mkonto-recenze-bonus-1000",
      title: "mBank mKonto recenze: Jak získat bonus 1 000 Kč za platby kartou",
      excerpt: "Podrobný průvodce běžným účtem mKonto od mBank. Žádné poplatky za vedení, výběry zdarma a odměna 100 Kč za každou platbu kartou až do 1 000 Kč.",
      content: `
Běžný účet **mKonto od mBank** patří dlouhodobě k nejúspěšnějším bezpoplatkovým účtům na českém trhu. Banka nyní nabízí velmi atraktivní uvítací akci: za každou platbu kartou získáte **100 Kč zpět**, a to až do výše **1 000 Kč**.

## Jak získat plný bonus 1 000 Kč krok za krokem:
1. Přejděte na online žádost o mKonto přes náš odkaz a ujistěte se, že máte zadaný promo kód **adamm1863**.
2. Založte účet online za pár minut přes BankID nebo kurýra.
3. Po aktivaci účtu a karty zaplaťte v obchodě nebo na internetu.
4. Za každou z prvních 10 plateb kartou (bez minimální částky!) vám mBank připíše **100 Kč** přímo na účet.

## Hlavní výhody účtu mKonto:
- Vedení účtu zdarma a bez podmínek.
- Výběry ze všech bankomatů v ČR i v zahraničí od 1 500 Kč zdarma.
- Špičková mobilní aplikace s možností okamžitých plateb.
      `,
      featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
      categoryId: catBanky.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-14"),
      featured: true,
      draft: false,
      keywords: ["mbank recenze", "mkonto bonus 1000 kč", "mbank kód adamm1863", "účet bez poplatků"],
      seoTitle: "mBank mKonto recenze: Bonus 1 000 Kč s kódem adamm1863 | BONUSLY",
      seoDescription: "Recenze mKonto od mBank. Jak získat 100 Kč za každou platbu kartou celkem až 1 000 Kč s promo kódem adamm1863.",
    },
  });

  // 4.6 Trading 212 akcie zdarma (Finance & Investice)
  await prisma.article.create({
    data: {
      slug: "trading-212-akcie-zdarma-navod",
      title: "Trading 212 akcie zdarma až do 2 500 Kč: Kompletní návod a tipy",
      excerpt: "Chcete začít investovat bez rizika s akcií zdarma? Zjistěte, jak funguje promo akce brokera Trading 212, jak získat akcii v hodnotě až 100 EUR a jak zhodnocovat volné finance.",
      content: `
Broker **Trading 212** je v Evropě známý svým intuitivním rozhraním a nulovými komisemi za nákup a prodej akcií i ETF. V rámci uvítacího programu navíc nabízí novým uživatelům **náhodnou akcii zdarma v hodnotě až 100 EUR (cca 2 500 Kč)**.

## Jak akcii zdarma získat?
1. Zaregistrujte se na platformě Trading 212 přes promo odkaz.
2. Ověřte svou totožnost (občanský průkaz / pas + selfie).
3. Vložte na účet minimální vklad (stačí 30 Kč nebo 1 EUR).
4. Do 3 pracovních dnů vám broker připíše náhodnou akcii světových gigantů (např. Apple, Tesla, Nike, Disney nebo Pfizer).

## Úročení neinvestovaných peněz
Kromě akcií zdarma nabízí Trading 212 i atraktivní úročení neinvestované hotovosti v CZK i EUR s denním vyplácením úroků.
      `,
      featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
      categoryId: catFinance.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-16"),
      featured: false,
      draft: false,
      keywords: ["trading 212 akcie zdarma", "trading 212 recenze", "akcie zdarma", "jak investovat"],
      seoTitle: "Trading 212 akcie zdarma až 2 500 Kč: Návod krok za krokem | BONUSLY",
      seoDescription: "Získejte akcii zdarma v hodnotě až 100 EUR u brokera Trading 212. Podrobný postup registrace a vkladu.",
    },
  });

  // 4.7 Tipsport bonus 1 300 Kč (Bonusy & Odměny)
  await prisma.article.create({
    data: {
      slug: "jak-ziskat-tipsport-bonus-1300",
      title: "Jak získat Tipsport bonus 1 300 Kč: 300 Kč bez vkladu + 1 000 Kč přes pozvánku",
      excerpt: "Přečtěte si přesný návod, jak bezpečně získat uvítací bonus 1 300 Kč od sázkové kanceláře Tipsport a jak funguje program Přiveď kamaráda.",
      content: `
Sázková kancelář **Tipsport** nabízí jeden z nejštědřejších uvítacích bonusů na českém trhu: **300 Kč zdarma ihned** pouze za dokončení registrace bez nutnosti vkládat vlastní peníze, a navíc dalších **1 000 Kč** v rámci partnerského programu Přiveď kamaráda.

## Část 1: 300 Kč zdarma ihned (bez vkladu)
- Pro získání 300 Kč se stačí zaregistrovat online a ověřit totožnost přes BankID (trvá to cca 2 minuty).
- Peníze jsou připsány v Netech (1 Net = 1 Kč) ihned po schválení účtu.

## Část 2: Dalších 1 000 Kč přes osobní pozvánku
- Program Přiveď kamaráda umožňuje získat další bonus 1 000 Kč.
- Podmínkou je, že vám stávající ověřený člen zašle osobní pozvánku. Na našem webu stačí vyplnit formulář u nabídky Tipsport a pozvánku vám obratem zašleme do e-mailu.
      `,
      featuredImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&auto=format&fit=crop&q=80",
      categoryId: catBonusy.id,
      authorId: author.id,
      publishedAt: new Date("2024-03-18"),
      featured: false,
      draft: false,
      keywords: ["tipsport bonus 1300", "tipsport 300 kč zdarma", "tipsport pozvánka", "peníze zdarma za registraci"],
      seoTitle: "Jak získat Tipsport bonus 1 300 Kč zdarma | BONUSLY",
      seoDescription: "Návod jak získat 300 Kč bez vkladu + 1 000 Kč přes osobní pozvánku od Tipsportu. Ověření přes BankID a okamžitý bonus.",
    },
  });

  console.log("✅ Seedování databáze BONUSLY s daty z Excelu bylo úspěšně dokončeno!");
}


main()
  .catch((e) => {
    console.error("❌ Chyba při seedování:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
