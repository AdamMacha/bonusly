import type { OfferSeed } from "./types";

export const FINANCE_SERVICES_OFFERS: OfferSeed[] = [
  {
    slug: "patria-finance",
    name: "Patria Finance",
    categorySlug: "finance",
    shortDescription:
      "Přední český broker ze skupiny ČSOB: pravidelné investice do ETF bez nákupních poplatků a Investice pro mladé bez vstupního poplatku.",
    description: `
**Patria Finance (Patria.cz)** je nejznámější český obchodník s cennými papíry patřící do finanční skupiny ČSOB. Nabízí investování do světových akcií, ETF fondů, dluhopisů i komodit s plnou českou zákaznickou podporou, moderní platformou **WebTrader** i mobilní aplikací a přehlednými **podklady pro české daňové přiznání**.

### Aktuální akce Patria Finance platné do 31. 12. 2026
- **Pravidelné investice do ETF bez nákupních poplatků:** Vybudujte si dlouhodobé ETF portfolio (např. S&P 500, MSCI World) pravidelně každý měsíc bez poplatku za nákup.
- **Investice pro mladé bez vstupního poplatku:** Speciální zvýhodněné podmínky pro mladé investory s nulovým vstupním poplatkem a výhodami navíc pro klienty ČSOB Premium.

### Pro koho je Patria Finance ideální?
- Pro dlouhodobé investory, kteří chtějí **českého brokera pod dohledem ČNB** se zázemím silné bankovní skupiny ČSOB.
- Pro investory do pravidelných ETF a DIP (Dlouhodobý investiční produkt) s možností daňového odpočtu.
- Pro ty, kdo oceňují analytický servis, české podklady k daním a možnost snadného napojení na účet u ČSOB.

### Jak otevřít investiční účet online
1. Vyberte si níže hlavní nabídku nebo jednu z akčních kampaní (Pravidelné ETF zdarma / Investice pro mladé).
2. Dokončete online registraci přímo ve webovém prohlížeči a ověřte svůj e-mail i totožnost (např. přes BankID).
3. Nastavte si pravidelný investiční příkaz a využívejte akční podmínky bez zbytečných poplatků.
    `.trim(),
    logo: "/logos/patria-finance.png",
    bonus: "Pravidelné ETF bez nákupních poplatků (do 31. 12. 2026)",
    bonusDescription:
      "Do 31. 12. 2026 pravidelné investice do ETF bez nákupních poplatků + Investice pro mladé bez vstupního poplatku.",
    ctaLabel: "Otevřít účet u Patria Finance",
    requirements: [
      "Věk minimálně 18 let a dokončení online registrace ve webovém prohlížeči",
      "Ověření e-mailu a totožnosti (BankID nebo dva doklady)",
      "Účet je schválen a aktivován po podpisu online smlouvy",
    ],
    pros: [
      "Silné české zázemí finanční skupiny ČSOB a regulace ČNB",
      "Pravidelné investice do ETF bez nákupních poplatků do 31. 12. 2026",
      "Kompletní česká podpora, kvalitní analýzy a podklady pro daňové přiznání",
      "Zvýhodněné podmínky pro mladé investory a klienty ČSOB Premium",
    ],
    cons: [
      "Jednorázové obchody na zahraničních burzách mají vyšší poplatek než nízkonákladoví zahraniční brokeři",
      "Registraci je potřeba dokončit přes webový prohlížeč (nikoliv z mobilní aplikace)",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=0ca65dab",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=0ca65dab",
    trackingSlug: "patria-finance",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Patria Finance 2026: Pravidelné ETF zdarma",
    seoDescription:
      "Investujte s českým brokerem Patria Finance ze skupiny ČSOB. Akce do 31. 12. 2026: pravidelné ETF bez nákupních poplatků a Investice pro mladé zdarma.",
    faq: [
      {
        question: "Do kdy platí akce Patria Finance na pravidelné ETF bez poplatků?",
        answer:
          "Obě aktuální akce — Pravidelné investice do ETF bez nákupních poplatků i Investice pro mladé bez vstupního poplatku — platí do 31. 12. 2026.",
      },
      {
        question: "Je Patria Finance regulovaný a bezpečný český broker?",
        answer:
          "Ano, Patria Finance je přední český obchodník s cennými papíry ze skupiny ČSOB, regulovaný Českou národní bankou (ČNB), s majetkem klientů odděleným od majetku brokera.",
      },
      {
        question: "Pomůže mi Patria Finance s daňovým přiznáním?",
        answer:
          "Ano, Patria poskytuje přehledné roční výpisy a podklady uzpůsobené české daňové legislativě včetně dividend a kurzových přepočtů.",
      },
    ],
    promos: [
      {
        trackingSlug: "patria-etf-zdarma",
        title: "Pravidelné investice do ETF bez nákupních poplatků",
        description:
          "Založte si pravidelné investování do vybraných světových ETF fondů u Patria Finance bez nákupních poplatků.",
        badge: "0 Kč nákupní poplatek",
        validUntil: "2026-12-31",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=0ca65dab&desturl=https%3A%2F%2Ffinance.patria.cz%2Fprodukty-a-sluzby%2FETF-pravidelne-zdarma",
        order: 1,
      },
      {
        trackingSlug: "patria-investice-pro-mlade",
        title: "Investice pro mladé – bez vstupního poplatku",
        description:
          "Speciální nabídka Patria Finance pro mladé investory s nulovým vstupním poplatkem a výhodnějšími podmínkami pro ČSOB Premium.",
        badge: "Bez vstupního poplatku",
        validUntil: "2026-12-31",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=0ca65dab&desturl=https%3A%2F%2Ffinance.patria.cz%2Fprodukty-a-sluzby%2Finvestice-pro-mlade",
        order: 2,
      },
    ],
  },
  {
    slug: "portu",
    name: "Portu.cz",
    categorySlug: "finance",
    shortDescription:
      "Největší česká investiční platforma pro jednoduché automatizované investování do ETF, DIP na důchod i krátkodobé rezervy.",
    description: `
**Portu.cz** (ze skupiny WOOD & Company) je největší česká online investiční platforma určená pro každého, kdo chce zhodnocovat své peníze chytře, transparentně a bez složitého studování burz. Stačí pár minut online a Portu vám na základě vašeho rizikového profilu sestaví diverzifikované portfolio světových ETF.

### Co vše na Portu najdete?
- **Portfolia na míru:** Automaticky rebalancovaná globální ETF portfolia (akcie, dluhopisy) již od 500 Kč.
- **Investiční rezerva:** Konzervativnější nástroj pro krátkodobé zhodnocení volných peněz s úročenou hotovostí.
- **Důchodový účet DIP:** Dlouhodobý investiční produkt s možností odečíst si až 48 000 Kč ročně od základu daně a se sníženým poplatkem.
- **Dětské účty:** Zvýhodněné investování pro budoucnost dětí s poplatkem jen 0,25 % ročně.

### Jak založit účet na Portu krok za krokem
1. Klikněte na tlačítko níže a otevřete registraci **v internetovém prohlížeči** (nepřecházejte během registrace do mobilní aplikace).
2. Vyplňte krátký investiční dotazník a ověřte totožnost online.
3. Podepište smlouvu elektronicky a nastavte si jednorázový nebo pravidelný měsíční vklad.
    `.trim(),
    logo: "/logos/portu.svg",
    bonus: "Automatizované ETF investice od 500 Kč + DIP",
    bonusDescription:
      "Diverzifikovaná ETF portfolia, Investiční rezerva a daňově zvýhodněný důchodový účet DIP pod dohledem ČNB.",
    ctaLabel: "Začít investovat na Portu.cz",
    requirements: [
      "Věk minimálně 18 let a vlastní bankovní účet",
      "Online registrace a podpis smlouvy přes webový prohlížeč",
      "Minimální vklad již od 500 Kč (nebo od 100 Kč u dětských účtů)",
    ],
    pros: [
      "Největší a léty prověřená česká investiční platforma pod dohledem ČNB",
      "Plně automatizované investování a rebalancování bez starostí",
      "Podpora DIP (daňový odpočet) i extrémně levných dětských účtů (0,25 % p.a.)",
      "Přehledné rozhraní v češtině a podklady pro daně",
    ],
    cons: [
      "Standardní správcovský poplatek až 1 % ročně (lze snížit fixací na 0,6 % p.a. či u DIP na 0,5 %)",
      "Investice na finančních trzích podléhají kolísání hodnoty",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=d8a5d6b0",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=d8a5d6b0",
    trackingSlug: "portu",
    partnerNetwork: "ehub",
    rating: 4.9,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Portu.cz recenze 2026: ETF portfolia a DIP",
    seoDescription:
      "Podrobná recenze investiční platformy Portu.cz. Jak fungují automatizovaná ETF portfolia od 500 Kč, Investiční rezerva a důchodový účet DIP.",
    faq: [
      {
        question: "Od kolika korun mohu na Portu začít investovat?",
        answer:
          "U standardních portfolií na míru můžete začít investovat již od 500 Kč, u dětských účtů dokonce už od 100 Kč měsíčně.",
      },
      {
        question: "Nabízí Portu daňově zvýhodněný Důchodový účet (DIP)?",
        answer:
          "Ano, Portu bylo jednou z prvních platforem s DIP v ČR. Umožňuje uplatnit daňový odpočet až 48 000 Kč ročně a přijímat příspěvky zaměstnavatele se sníženým správcovským poplatkem.",
      },
      {
        question: "Jak jsou chráněny moje peníze na Portu?",
        answer:
          "Portu provozuje licencovaný obchodník WOOD & Company pod dohledem ČNB. Majetek klientů je oddělen od majetku společnosti a podléhá ochraně Garančního fondu obchodníků s cennými papíry.",
      },
    ],
  },
  {
    slug: "portu-gallery",
    name: "Portu Gallery",
    categorySlug: "finance",
    shortDescription:
      "Alternativní online investiční galerie umožňující investovat již od 1 Kč do vzácných sběratelských aktiv, veteránů a umění.",
    description: `
**Portu Gallery (PortuGallery.cz)** otevírá svět alternativních investic do unikátních sběratelských předmětů každému investorovi. Místo milionů korun na nákup celého veterána, vzácných hodinek nebo investičního vína si zde pořídíte investiční certifikát **již od 1 Kč**.

### Do čeho lze na Portu Gallery investovat?
- **Historické automobily a veterány** (Ferrari, Porsche, klasické sběratelské vozy)
- **Výtvarné umění, vzácné hudební nástroje a známky**
- **Investiční alkohol a víno** (vzácné whisky, archivní ročníky)
- **Luxusní hodinky a numismatika**

### Výhody alternativních investic přes Portu Gallery
- **Nízká korelace s akciovými trhy:** Skvělý doplněk pro diverzifikaci investičního portfolia.
- **Kompletní péče a pojištění:** Portu Gallery zajišťuje odborné posouzení pravosti, bezpečné uskladnění i pojištění předmětů.
- **Propojení s ekosystémem Portu:** Transparentní česká platforma skupiny WOOD & Company.
    `.trim(),
    logo: "/logos/portu-gallery.png",
    bonus: "Investice do sběratelských aktiv již od 1 Kč",
    bonusDescription:
      "Založte účet online zdarma a diverzifikujte portfolio investicí do veteránů, umění, hodinek či archivních vín.",
    ctaLabel: "Prozkoumat Portu Gallery",
    requirements: [
      "Věk minimálně 18 let",
      "Online registrace a schválení investičního účtu na Portu Gallery",
      "Minimální investice do úpisu již od 1 Kč",
    ],
    pros: [
      "Přístup k unikátním sběratelským předmětům již od 1 Kč",
      "Skvělá diverzifikace portfolia mimo klasické akcie a dluhopisy",
      "Odborná kurace, certifikace pravosti, uskladnění i pojištění v ceně",
    ],
    cons: [
      "Delší doporučený investiční horizont a nižší likvidita než u akcií",
      "Alternativní aktiva jsou vhodná pouze jako doplněk (cca 5–10 %) portfolia",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=52935970",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=52935970",
    trackingSlug: "portu-gallery",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Portu Gallery recenze 2026: Investice od 1 Kč",
    seoDescription:
      "Jak funguje Portu Gallery? Investujte od 1 Kč do veteránů, umění, vzácných hodinek a archivního alkoholu. Výhody, rizika a zkušenosti.",
    faq: [
      {
        question: "Jaká je minimální částka pro investici na Portu Gallery?",
        answer:
          "Do vypsaných sběratelských předmětů můžete na Portu Gallery investovat prostřednictvím investičních certifikátů už od 1 Kč.",
      },
      {
        question: "Jak se realizuje zisk z investice na Portu Gallery?",
        answer:
          "Zisk vzniká při budoucím prodeji sběratelského předmětu po uplynutí investičního horizontu, kdy je výnos rozdělen mezi držitele certifikátů, případně při prodeji na aukcích či sekundárním trhu.",
      },
      {
        question: "Kdo se stará o uložení a pojištění předmětů?",
        answer:
          "O bezpečné uskladnění ve specializovaných trezorech či halách, pravidelnou údržbu i pojištění se kompletně stará tým Portu Gallery.",
      },
    ],
  },
  {
    slug: "roier",
    name: "Roier.cz",
    categorySlug: "finance",
    shortDescription:
      "Česká investiční platforma zaměřená na projekty zajištěné nemovitostmi (LTV max. 70 %) s měsíčně vyplácenými výnosy.",
    description: `
**Roier.cz** je česká investiční platforma umožňující drobným i větším investorům zhodnocovat úspory prostřednictvím participací na podnikatelských úvěrech **zajištěných reálnými nemovitostmi v ČR**. Platforma klade silný důraz na konzervativní poměr úvěru k hodnotě zástavy (**LTV maximálně 70 %**).

### Proč investoři zařazují Roier do svého portfolia?
- **Měsíční výplata výnosů:** Úroky chodí na váš účet pravidelně každý měsíc.
- **Konzervativní zajištění (LTV max. 70 %):** Nemovitosti jsou oceněny nezávislým znalcem a zajištěny zástavním právem v katastru nemovitostí.
- **Žádné vstupní ani správcovské poplatky pro investory:** Celý sjednaný úrok patří vám.
- **Přehledná online správa:** Registrace, ověření AML i první investice od 5 000 Kč probíhají 100 % online.

### Jak začít na Roier.cz
1. Vytvořte si účet přes náš odkaz a ověřte e-mail a telefon.
2. Dokončete rychlé online AML ověření identity a smluvní dokumentaci.
3. Vyberte si ze seznamu aktuálních nemovitostních projektů a zainvestujte již od 5 000 Kč.
    `.trim(),
    logo: "/logos/roier.png",
    bonus: "Měsíční výnosy zajištěné nemovitostmi (LTV max. 70 %)",
    bonusDescription:
      "Investice bez vstupních poplatků do pečlivě prověřených úvěrů krytých nemovitostmi s pravidelnou měsíční výplatou výnosů.",
    ctaLabel: "Založit investorský účet na Roier.cz",
    requirements: [
      "Věk minimálně 18 let a vlastní bankovní účet",
      "Online registrace, ověření kontaktu a dokončení AML identifikace",
      "První investice od 5 000 Kč do vybraného projektu",
    ],
    pros: [
      "Přísný limit LTV maximálně 70 % zvyšující bezpečnost zástavy",
      "Pravidelné měsíční vyplácení úroků přímo na účet",
      "Nulové vstupní a správcovské poplatky pro investory",
      "Detailní karty projektů včetně znaleckých posudků",
    ],
    cons: [
      "Minimální investice do jednoho projektu je vyšší (5 000 Kč) než u Investownu",
      "Investice není pojištěna ze zákona jako bankovní vklad",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=de29b6e6",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=de29b6e6",
    trackingSlug: "roier",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Roier.cz recenze 2026: Investice s LTV 70 %",
    seoDescription:
      "Jak funguje investiční platforma Roier.cz? Konzervativní LTV max. 70 %, měsíční výplata výnosů a nulové poplatky. Kompletní recenze a podmínky.",
    faq: [
      {
        question: "Co znamená limit LTV max. 70 % u Roier.cz?",
        answer:
          "LTV (Loan-to-Value) max. 70 % znamená, že výše poskytnutého úvěru nikdy nepřekročí 70 % odhadní hodnoty zastavené nemovitosti, čímž vzniká min. 30% bezpečnostní polštář.",
      },
      {
        question: "Jak často Roier vyplácí výnosy investorům?",
        answer:
          "Úrokové výnosy jsou na investorský účet připisovány pravidelně každý měsíc po celou dobu trvání participace.",
      },
      {
        question: "Platí investoři na Roier.cz nějaké poplatky?",
        answer:
          "Ne, registrace, vedení účtu ani samotné investování do participací jsou pro investory bez vstupních a správcovských poplatků.",
      },
    ],
  },
  {
    slug: "rondainvest",
    name: "Ronda Invest",
    categorySlug: "finance",
    shortDescription:
      "Online investice do podnikatelských úvěrů zajištěných nemovitostmi s výnosem až 9 % p.a., bez poplatků a se vstupním bonusem 1 %.",
    description: `
**Ronda Invest (Rondainvest.cz)** je zavedená česká investiční platforma, která propojuje investory s podnikatelskými úvěry zajištěnými kvalitními nemovitostmi v Česku a na Slovensku. Každý úvěr nejprve financuje ze svých prostředků samotná skupina Ronda a teprve následně jej nabízí investorům — nese tak kůži na trhu společně s vámi.

### Vstupní bonus 1 % pro nové investory
Noví investoři registrovaní přes náš odkaz získají **vstupní bonus 1 % z celkové zainvestované částky během prvních 30 dnů od registrace**! Například při investici 50 000 Kč dostanete navíc **500 Kč bonusu** k běžnému ročnímu výnosu až 9 % p.a.

### Hlavní výhody Ronda Invest
- **Výnos až 9 % p.a.** vyplácený pravidelně každý měsíc na váš účet.
- **0 Kč poplatky:** Neplatíte žádné vstupní, správcovské ani výstupní poplatky.
- **Zajištění nemovitostí v ČR/SR:** Zástavní právo a notářský zápis s přímou vykonatelností.
- **Vstupní bonus 1 %** ze všech investic provedených v prvních 30 dnech od registrace.
    `.trim(),
    logo: "/logos/rondainvest.png",
    bonus: "Vstupní bonus 1 % + výnos až 9 % p.a.",
    bonusDescription:
      "Získejte vstupní bonus 1 % ze zainvestované částky v prvních 30 dnech od registrace + měsíční výnosy bez poplatků.",
    ctaLabel: "Získat 1% bonus na Ronda Invest",
    requirements: [
      "Věk minimálně 18 let a vlastní bankovní účet",
      "Online registrace a podpis smluv k 1. participaci do 30 dnů od registrace",
      "Pro získání 1% bonusu stačí zainvestovat libovolnou částku v prvních 30 dnech",
    ],
    pros: [
      "Vstupní bonus 1 % ze všech investic v prvních 30 dnech",
      "Pravidelné měsíční výnosy až 9 % p.a. zcela bez poplatků",
      "Každý úvěr je zajištěn nemovitostí a předfinancován samotnou Rondou",
      "Dlouhá historie a transparentní statistiky portfolia",
    ],
    cons: [
      "Participace nemají okamžitý sekundární trh — vhodné držet do splatnosti",
      "Investice není pojištěna jako vklad v bance",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=5f0f59a2",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=5f0f59a2",
    trackingSlug: "rondainvest",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Ronda Invest 2026: Výnos 9 % + bonus 1 %",
    seoDescription:
      "Investujte do nemovitostních úvěrů bez poplatků s Ronda Invest. Výnos až 9 % p.a. měsíčně a vstupní bonus 1 % z investic v prvních 30 dnech.",
    faq: [
      {
        question: "Jak funguje vstupní bonus 1 % u Ronda Invest?",
        answer:
          "Všichni noví investoři získají bonus ve výši 1 % z celkové částky, kterou zainvestují do vybraných projektů během prvních 30 dnů od registrace.",
      },
      {
        question: "Jaké poplatky si Ronda Invest účtuje?",
        answer:
          "Pro investory je platforma kompletně bez vstupních, pravidelných správcovských i výstupních poplatků.",
      },
      {
        question: "Jak jsou úvěry na Ronda Invest zajištěné?",
        answer:
          "Všechny nabízené podnikatelské úvěry jsou zajištěny zástavním právem k nemovitostem v ČR či SR a předfinancovány ze zdrojů společnosti.",
      },
    ],
  },
  {
    slug: "flowpay",
    name: "Flowpay.io",
    categorySlug: "finance",
    shortDescription:
      "Rychlé online podnikatelské financování pro OSVČ a malé a střední firmy až do 2,5 mil. Kč bez zástavy majetku.",
    description: `
**Flowpay.io** je moderní český fintech zaměřený na **online provozní financování pro malé a střední firmy (s.r.o.) a živnostníky (OSVČ)**. Na rozdíl od zdlouhavého bankovního schvalování vyhodnocuje Flowpay skutečná data vašeho podnikání (např. z e-shopu, pokladního systému či bankovního účtu) a dokáže nabídnout financování **až do 2 500 000 Kč bez nutnosti zástavy nemovitosti**.

### Klíčové výhody financování od Flowpay
- **Až 2,5 mil. Kč bez zástavy majetku:** Využijte kapitál na nákup zásob před sezónou, marketing, vybavení provozovny nebo překlenutí cashflow.
- **Předčasné splacení zdarma:** Pokud peníze vrátíte dříve, neplatíte žádné sankce ani skryté poplatky.
- **Možnost odkladu splátky:** Flexibilita pro případ sezónních výkyvů v podnikání.
- **100 % online bez papírování:** Žádost podáte během několika minut a rozhodnutí získáte výrazně rychleji než v tradiční bance.

### Pro koho je Flowpay nejvhodnější?
E-shopy, restaurace, kavárny, služby a rostoucí OSVČ s prokazatelnou historií tržeb, které potřebují rychle a flexibilně podpořit svůj růst.
    `.trim(),
    logo: "/logos/flowpay.png",
    bonus: "Až 2,5 mil. Kč bez zástavy · předčasné splacení zdarma",
    bonusDescription:
      "Rychlé online financování pro OSVČ a firmy s možností předčasného splacení zdarma i odkladu splátky.",
    ctaLabel: "Nezávazně zjistit nabídku financování",
    requirements: [
      "Aktivní podnikání (OSVČ nebo právnická osoba) s historií tržeb",
      "Online registrace nového klienta a propojení dat o podnikání",
      "Posouzení bonity a individuální schválení úvěrového limitu",
    ],
    pros: [
      "Financování až do 2,5 mil. Kč bez zástavy osobního či firemního majetku",
      "Předčasné splacení kdykoliv a zcela zdarma",
      "Možnost odkladu splátky a bleskové online vyřízení",
    ],
    cons: [
      "Určeno výhradně pro podnikatele a firmy (nikoliv spotřebitelské půjčky)",
      "Cena financování je individuální dle rizikového profilu firmy",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=6194bb0d",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=6194bb0d",
    trackingSlug: "flowpay",
    partnerNetwork: "ehub",
    rewardAmount: null, // Zákaz cashbacku dle podmínek programu!
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "Flowpay.io 2026: Financování firem až 2,5 mil.",
    seoDescription:
      "Online financování pro firmy a OSVČ od Flowpay až do 2,5 mil. Kč bez zástavy majetku. Předčasné splacení zdarma, možnost odkladu splátky a rychlé schválení.",
    faq: [
      {
        question: "Kolik si mohu u Flowpay jako firma nebo OSVČ půjčit?",
        answer:
          "Flowpay poskytuje provozní financování až do výše 2,5 milionu korun na základě reálných tržeb a finanční historie vašeho podnikání.",
      },
      {
        question: "Musím u Flowpay ručit nemovitostí?",
        answer:
          "Ne, financování od Flowpay je poskytováno bez nutnosti zástavy nemovitosti či jiného fyzického majetku.",
      },
      {
        question: "Mohu úvěr u Flowpay splatit předčasně?",
        answer:
          "Ano, předčasné splacení je u Flowpay zcela zdarma a navíc je k dispozici možnost odkladu splátky při nenadálých situacích.",
      },
    ],
  },
  {
    slug: "raiffeisenbank-podnikatelsky-ucet",
    name: "Raiffeisenbank Podnikatelský účet",
    categorySlug: "banky",
    shortDescription:
      "CHYTRÝ podnikatelský účet od Raiffeisenbank zdarma bez podmínek + uvítací bonus 1 000 Kč při zřízení online.",
    description: `
**CHYTRÝ podnikatelský účet od Raiffeisenbank** patří mezi nejvýhodnější firemní účty pro OSVČ i menší firmy v Česku. Získáte vedení účtu **zcela zdarma bez jakýchkoliv obratových podmínek**, neomezené tuzemské platby a k tomu **vstupní bonus 1 000 Kč** za jeho zřízení.

### Co získáte k CHYTRÉMU podnikatelskému účtu?
- **Bonus 1 000 Kč** při založení nového CHYTRÉHO podnikatelského účtu.
- **0 Kč za vedení účtu** bez nutnosti minimálního měsíčního obratu.
- **Neomezené příchozí i odchozí tuzemské platby** v CZK a výběry z bankomatů v ČR i v zahraničí zdarma.
- **Multiměnový účet:** Možnost vést až 19 cizích měn na jednom účtu (skvělé pro fakturaci v EUR či USD).
- **Přehledné internetové a mobilní bankovnictví** s exporty pro účetní programy.

### Jak účet založit online
1. Klikněte na tlačítko níže a vyplňte krátkou online žádost ve webovém prohlížeči.
2. Ověřte svou totožnost a dokončete otevření účtu bez nutnosti chodit na pobočku.
3. Splňte základní podmínky akce a získejte odměnu **1 000 Kč** přímo na účet.
    `.trim(),
    logo: "/logos/raiffeisenbank.png",
    bonus: "Bonus 1 000 Kč + vedení účtu zdarma bez podmínek",
    bonusDescription:
      "Získejte bonus 1 000 Kč při zřízení CHYTRÉHO podnikatelského účtu od Raiffeisenbank online.",
    ctaLabel: "Zřídit podnikatelský účet s bonusem 1 000 Kč",
    requirements: [
      "Platné IČO (OSVČ nebo podnikatel) a věk minimálně 18 let",
      "Nový podnikatelský účet zřízený online přes webový prohlížeč",
      "Dokončení a schválení otevření CHYTRÉHO účtu",
    ],
    pros: [
      "Vstupní odměna 1 000 Kč pro nové podnikatele",
      "Vedení účtu, tuzemské platby i výběry z bankomatů zdarma bez podmínek",
      "Podpora cizích měn (EUR, USD aj.) v rámci jednoho účtu",
      "Jednoduché online založení bez papírování",
    ],
    cons: [
      "Žádost je nutné dokončit přes webový prohlížeč (nikoliv mobilní aplikaci)",
      "U vybraných zahraničních mimo-SEPA převodů platí standardní sazebník",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=53811bcd",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=53811bcd",
    trackingSlug: "raiffeisenbank-podnikatelsky-ucet",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Raiffeisenbank podnikatelský účet + 1 000 Kč",
    seoDescription:
      "CHYTRÝ podnikatelský účet od Raiffeisenbank zdarma bez podmínek s bonusem 1 000 Kč za založení. Multiměnový účet, výběry zdarma a recenze.",
    faq: [
      {
        question: "Je CHYTRÝ podnikatelský účet od Raiffeisenbank opravdu bez podmínek zdarma?",
        answer:
          "Ano, vedení CHYTRÉHO podnikatelského účtu je zdarma bez nutnosti plnit minimální měsíční obrat či počet transakcí.",
      },
      {
        question: "Jak získám bonus 1 000 Kč k podnikatelskému účtu?",
        answer:
          "Stačí přejít přes náš online odkaz, podat žádost a dokončit otevření nového CHYTRÉHO podnikatelského účtu dle aktuálních podmínek banky.",
      },
      {
        question: "Mohu na podnikatelském účtu přijímat platby v eurech?",
        answer:
          "Ano, účet je multiměnový a umožňuje vést vedle korun také EUR, USD a další světové měny pod jedním číslem účtu.",
      },
    ],
  },
  {
    slug: "raiffeisenbank-kreditni-karta",
    name: "Raiffeisenbank Kreditní karta STYLE",
    categorySlug: "banky",
    shortDescription:
      "Nákupní kreditní karta STYLE na první rok zcela zdarma s cashbackem, slevami za nákupy a bezúročným obdobím až 55 dní.",
    description: `
**Kreditní karta STYLE od Raiffeisenbank** promění vaše každodenní nákupy v pravidelné úspory. V rámci aktuální akce platné **do 31. 12. 2026** získáte vedení karty **na celý první rok zdarma** a zároveň můžete čerpat cashback, věrnostní slevy u partnerů a bezpečné placení na internetu či v zahraničí.

### Proč se kreditní karta STYLE vyplatí?
- **První rok vedení zdarma (akce do 31. 12. 2026):** Vyzkoušejte všechny výhody bez měsíčního poplatku.
- **Cashback a odměny z nákupů:** Peníze zpět a slevy v programu RB Club u desítek obchodníků.
- **Bezúročné období až 55 dní:** Pokud vyčerpanou částku splatíte včas (ideálně automatickým 100% inkasem), neplatíte ani korunu na úrocích.
- **Ideální na cestování:** Skvělá pro rezervace hotelů a půjčoven aut v zahraničí, kde debetní karty často nefungují.

*Upozornění: Kreditní karta je úvěrový produkt — pro maximální výhodnost doporučujeme nastavit automatické 100% splácení v bezúročném období.*
    `.trim(),
    logo: "/logos/raiffeisenbank.png",
    bonus: "Kreditní karta STYLE na 1 rok zdarma (do 31. 12. 2026)",
    bonusDescription:
      "Vedení nákupní kreditní karty STYLE na první rok za 0 Kč + cashback a slevy v programu RB Club.",
    ctaLabel: "Požádat o kreditku STYLE na rok zdarma",
    requirements: [
      "Věk minimálně 18 let a pravidelný doložitelný příjem",
      "Online žádost ve webovém prohlížeči a posouzení bonity bankou",
      "Schválení a aktivace kreditní karty Raiffeisenbank",
    ],
    pros: [
      "První rok vedení kreditní karty STYLE zcela zdarma (do 31. 12. 2026)",
      "Cashback a atraktivní slevy u partnerů v programu RB Club",
      "Bezúročné období až 55 dní pro nákupy bez úroků",
      "Bezproblémové blokace depozitů v autopůjčovnách a hotelech po celém světě",
    ],
    cons: [
      "Při nesplacení v bezúročném období naskakují vysoké kreditní úroky",
      "Výběry hotovosti z bankomatu kreditní kartou se úročí ihned",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=86a048b9",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=86a048b9",
    trackingSlug: "raiffeisenbank-kreditni-karta",
    partnerNetwork: "ehub",
    rewardAmount: null, // Zákaz cashbacku dle podmínek programu!
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "RB kreditní karta STYLE: 1 rok zdarma (2026)",
    seoDescription:
      "Získejte kreditní kartu STYLE od Raiffeisenbank na první rok zdarma (do 31. 12. 2026). Cashback, slevy RB Club a až 55 dní bez úroků.",
    faq: [
      {
        question: "Jak dlouho platí akce na kreditní kartu STYLE na rok zdarma?",
        answer:
          "Akční nabídka vedení kreditní karty STYLE na první rok zdarma platí při sjednání do 31. 12. 2026.",
      },
      {
        question: "Jak s kreditní kartou nezaplatit ani korunu na úrocích?",
        answer:
          "Stačí využívat kartu jen na bezhotovostní platby a nastavit si 100% automatické splacení vyčerpané částky v rámci bezúročného období (až 55 dní).",
      },
      {
        question: "Mohu kartu přidat do Apple Pay a Google Pay?",
        answer:
          "Ano, kreditní karta STYLE plně podporuje bezkontaktní placení mobilem přes Apple Pay i Google Pay.",
      },
    ],
    promos: [
      {
        trackingSlug: "rb-kreditka-style-zdarma",
        title: "Kreditní karta STYLE na první rok zdarma",
        description:
          "Sjednejte si nákupní kreditní kartu STYLE od Raiffeisenbank online s vedením na 12 měsíců zdarma a získejte slevy za nákupy.",
        badge: "1 rok zdarma",
        validUntil: "2026-12-31",
        affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=86a048b9",
        order: 1,
      },
    ],
  },
  {
    slug: "raiffeisenbank-pujcka",
    name: "Raiffeisenbank Půjčka",
    categorySlug: "banky",
    shortDescription:
      "Online spotřebitelská RB Půjčka s úrokem od 4,8 % p.a. a akcí Minutová půjčka: první 3 měsíce bez úroků.",
    description: `
**Online RB Půjčka od Raiffeisenbank** nabízí rychlé a transparentní financování vašich plánů, rekonstrukce nebo konsolidace nevýhodných úvěrů. S úrokovou sazbou **již od 4,8 % p.a.** a speciální akcí **Minutová půjčka (první 3 měsíce bez úroků)** patří mezi nejkonkurenceschopnější bankovní půjčky na trhu.

### Hlavní výhody RB Půjčky
- **Akce Minutová půjčka:** První 3 měsíce splácíte bez úroků dle podmínek kampaně.
- **Výhodný úrok od 4,8 % p.a.:** Sjednání i vedení úvěrového účtu online za 0 Kč.
- **Rychlé schválení online:** Peníze můžete mít na svém účtu během několika minut po schválení žádosti.
- **Flexibilní nastavení splátek:** Přizpůsobte si délku splácení svému rozpočtu bez zbytečné zátěže.

*Odpovědné půjčování: Před podáním žádosti si vždy porovnejte RPSN a ověřte, že měsíční splátka bezpečně zapadá do vašeho rodinného rozpočtu.*
    `.trim(),
    logo: "/logos/raiffeisenbank.png",
    bonus: "Úrok od 4,8 % p.a. · První 3 měsíce bez úroků",
    bonusDescription:
      "Akce Minutová půjčka od Raiffeisenbank: první 3 měsíce bez úroků a kompletní sjednání online zdarma.",
    ctaLabel: "Spočítat splátku RB Půjčky online",
    requirements: [
      "Věk minimálně 18 let a trvalý/přechodný pobyt v ČR",
      "Pravidelný prokazatelný příjem a bezdlužnost v registrech",
      "Online žádost ve webovém prohlížeči a posouzení bonity bankou",
    ],
    pros: [
      "Nízká úroková sazba od 4,8 % p.a. a akce 3 měsíce bez úroků",
      "0 Kč za sjednání i správu půjčky",
      "Bleskové online vyřízení s penězi na účtu během několika minut",
    ],
    cons: [
      "Konkrétní úroková sazba vždy závisí na individuálním posouzení bonity",
      "Nutnost pečlivého posouzení schopnosti splácet",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=5b4b99ee",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=5b4b99ee",
    trackingSlug: "raiffeisenbank-pujcka",
    partnerNetwork: "ehub",
    rewardAmount: null, // Zákaz cashbacku dle podmínek programu!
    rating: 4.6,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "RB Půjčka 2026: Od 4,8 % a 3 měs. bez úroků",
    seoDescription:
      "Online RB Půjčka od Raiffeisenbank od 4,8 % p.a. s akcí Minutová půjčka – první 3 měsíce bez úroků. Sjednání zdarma, kalkulačka a podmínky.",
    faq: [
      {
        question: "Jak funguje akce první 3 měsíce bez úroků u RB Půjčky?",
        answer:
          "V rámci akce Minutová půjčka vrací či odpouští Raiffeisenbank úroky za první 3 měsíce splácení při řádném dodržení podmínek smlouvy.",
      },
      {
        question: "Platí se za vyřízení nebo vedení RB Půjčky nějaké poplatky?",
        answer:
          "Ne, podání žádosti, sjednání i měsíční vedení úvěru u Raiffeisenbank jsou zdarma.",
      },
      {
        question: "Jak rychle obdržím peníze na účet?",
        answer:
          "Po schválení žádosti a elektronickém podpisu smlouvy jsou peníze u Minutové půjčky převedeny zpravidla během několika minut.",
      },
    ],
  },
  {
    slug: "mbank-sporici-ucet",
    name: "mBank mKonto + mSpořicí účet Plus",
    categorySlug: "banky",
    shortDescription:
      "Založte si bezpoplatkové mKonto a získejte k němu mSpořicí účet Plus se zvýhodněným úrokem až 4,41 % p.a. (do 31. 1. 2027).",
    description: `
Hledáte kombinaci bezplatného běžného účtu a nadprůměrného zhodnocení volných úspor bez rizika? **mBank** v aktuální kampani platné až **do 31. 1. 2027** nabízí k nově založenému účtu **mKonto** také **mSpořicí účet Plus s atraktivním úrokem až 4,41 % p.a.**

### Proč se tato kombinace od mBank vyplatí?
- **Úrok až 4,41 % p.a.** na mSpořicím účtu Plus pro zhodnocení vaší finanční rezervy.
- **Vedení mKonta za 0 Kč:** Osobní účet, dětský účet / účet pro mladé i podnikatelský účet bez zbytečných poplatků.
- **Peníze kdykoliv k dispozici:** Ze spořicího účtu převedete peníze na běžný účet obratem bez výpovědní lhůty.
- **Zákonné pojištění vkladů** do 100 000 EUR u Garančního systému.

### Jak akci aktivovat?
1. Přejděte přes tlačítko níže na oficiální stránku mBank (používejte přímý online formulář ve webovém prohlížeči).
2. Založte si nové mKonto spolu s mSpořicím účtem Plus online během několika minut.
3. Převeďte svou finanční rezervu a nechte ji pracovat s úrokem až **4,41 % p.a.**
    `.trim(),
    logo: "/logos/mbank.svg",
    bonus: "mSpořicí účet Plus s úrokem až 4,41 % p.a. (do 31. 1. 2027)",
    bonusDescription:
      "K nově založenému účtu mKonto získáte mSpořicí účet Plus s úrokovou sazbou až 4,41 % p.a.",
    ctaLabel: "Založit mKonto + mSpořicí účet 4,41 %",
    requirements: [
      "Nový klient mBank (osobní, pro mladé nebo podnikatelský účet)",
      "Online založení smlouvy ve webovém prohlížeči",
      "Splnění akčních podmínek pro zvýhodněnou sazbu mSpořicího účtu Plus",
    ],
    pros: [
      "Nadstandardní úrok až 4,41 % p.a. na spořicím účtu až do 31. 1. 2027",
      "Běžný účet mKonto zdarma bez poplatků za vedení",
      "Volný přístup k penězům bez vázací lhůty",
      "Dostupné také varianty účtu pro děti, studenty a podnikatele",
    ],
    cons: [
      "Zvýhodněná sazba je časově omezena podmínkami kampaně a limitem vkladu",
      "Žádost je nutné dokončit přes prohlížeč, nikoliv mobilní aplikaci",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=cb64a4ba",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=cb64a4ba",
    trackingSlug: "mbank-sporici-ucet",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "mBank mSpořicí účet 4,41 % p.a. + mKonto",
    seoDescription:
      "Založte si mBank mKonto zdarma a získejte mSpořicí účet Plus s úrokem až 4,41 % p.a. Akce platí do 31. 1. 2027. Podmínky a online sjednání.",
    faq: [
      {
        question: "Do kdy platí akce na mSpořicí účet Plus s úrokem 4,41 % p.a.?",
        answer:
          "Akční nabídka k novému účtu mKonto s úrokem až 4,41 % p.a. na mSpořicím účtu Plus platí do 31. 1. 2027.",
      },
      {
        question: "Jsou moje úspory u mBank pojištěny?",
        answer:
          "Ano, všechny vklady na běžných i spořicích účtech u mBank jsou ze zákona pojištěny až do ekvivalentu 100 000 EUR na jednoho vkladatele.",
      },
      {
        question: "Platí nabídka i pro mladé nebo podnikatele?",
        answer:
          "mBank nabízí bezpoplatkové účty mKonto pro dospělé, mKonto #navlastnitriko pro mladé i mKonto Business pro podnikatele.",
      },
    ],
    promos: [
      {
        trackingSlug: "mbank-sporici-441",
        title: "mKonto + mSpořicí účet Plus s úrokem až 4,41 % p.a.",
        description:
          "Založte si bezpoplatkové mKonto online a získejte zvýhodněné úročení úspor až 4,41 % p.a. na mSpořicím účtu Plus.",
        badge: "Úrok 4,41 % p.a.",
        validUntil: "2027-01-31",
        // Dle podmínek eHUB používat POUZE defaultní odkaz bez deeplinků!
        affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=cb64a4ba",
        order: 1,
      },
    ],
  },
  {
    slug: "stalynajem",
    name: "Stálýnájem.cz",
    categorySlug: "extra-prijem",
    shortDescription:
      "Garantovaný pronájem bytu bez starostí: pevný měsíční nájem na účet každý měsíc i v případě neobsazenosti či neplatičů.",
    description: `
Vlastníte byt k pronájmu, ale nechcete řešit shánění nájemníků, neplatiče, opravy ani ztracený čas na prohlídkách? **Stálýnájem.cz** si váš byt dlouhodobě pronajme, postará se o kompletní správu i prověřené podnájemníky a vám každý měsíc **garantovaně vyplatí domluvený nájem**.

### Jak funguje garantovaný pronájem od Stálýnájem.cz?
- **Jistota pravidelného příjmu:** Peníze chodí v přesný den v měsíci bez ohledu na to, zda je byt zrovna obsazený nebo zda podnájemník zaplatil včas.
- **0 hodin starostí se správou:** Stálýnájem řeší inzerci, prohlídky, smlouvy, přepis energií, vyúčtování i drobnou údržbu.
- **Ochrana stavu bytu:** Na konci smlouvy vám byt vrátí ve stejném stavu (s přihlédnutím k běžnému opotřebení).
- **Nezávazná kalkulace online zdarma:** Během 1 minuty si přes formulář **„Spočítat nájemné“** ověříte, kolik vám Stálýnájem měsíčně garantuje.

### Pro koho je služba nejlepší?
Pro majitele investičních bytů v Praze, Brně a dalších velkých městech, kteří chtějí skutečně pasivní příjem bez rizika a časové zátěže.
    `.trim(),
    logo: "/logos/stalynajem.png",
    bonus: "Garantovaný měsíční nájem + bezplatná kalkulace online",
    bonusDescription:
      "Spočítejte si zdarma garantovaný měsíční příjem z vašeho bytu a předejte kompletní správu profesionálům.",
    ctaLabel: "Spočítat garantované nájemné zdarma",
    requirements: [
      "Vlastnictví bytu určeného k dlouhodobému pronájmu",
      "Vyplnění nezávazného online formuláře „Spočítat nájemné“",
      "Osobní prohlídka bytu a uzavření smlouvy o garantovaném nájmu",
    ],
    pros: [
      "100% garantovaný měsíční nájem i při výpadku podnájemníka",
      "Kompletní správa bytu, komunikace, vyúčtování i drobné opravy v ceně",
      "Právní a finanční ochrana proti neplatičům",
      "Rychlá nezávazná kalkulace výše nájemného online zdarma",
    ],
    cons: [
      "Garantovaný nájem bývá mírně nižší než maximální tržní nájem při správě svépomocí (poplatek za jistotu a servis)",
      "Působnost se soustředí především na větší města a žádané lokality v ČR",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=afb2ec2f",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=afb2ec2f",
    trackingSlug: "stalynajem",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Stálýnájem.cz recenze 2026: Garantovaný nájem",
    seoDescription:
      "Pronajímejte byt bez rizika neplatičů se Stálýnájem.cz. Garantovaný měsíční nájem, kompletní správa a nezávazná online kalkulačka nájemného.",
    faq: [
      {
        question: "Dostanu nájem opravdu každý měsíc, i když v bytě zrovna nikdo nebydlí?",
        answer:
          "Ano, hlavní výhodou služby Stálýnájem.cz je smluvní garance pravidelné měsíční platby nájemného i v době hledání nového podnájemníka.",
      },
      {
        question: "Je vyplnění formuláře Spočítat nájemné závazné?",
        answer:
          "Ne, online výpočet i následná konzultace jsou zcela nezávazné a zdarma — rozhodnete se až na základě konkrétní finanční nabídky.",
      },
      {
        question: "Kdo hradí případné škody způsobené podnájemníkem?",
        answer:
          "Stálýnájem přebírá odpovědnost za byt a po skončení nájemního vztahu garantuje vrácení bytu v původním stavu s přihlédnutím k běžnému opotřebení.",
      },
    ],
  },
  {
    slug: "csob-pojistovna",
    name: "ČSOB Pojišťovna",
    categorySlug: "pojisteni-a-sluzby",
    shortDescription:
      "Online slevy až 20 % na cestovní a autopojištění, 10 % na odpovědnost a Alza poukázka 500 Kč k pojištění majetku.",
    description: `
**ČSOB Pojišťovna** patří mezi největší a nejstabilnější pojišťovny na českém trhu. Při sjednání pojištění online přímo přes web získáte výrazné cenové zvýhodnění a dárkové poukázky — u vybraných produktů ušetříte **až 20 % oproti pobočkové ceně**.

### Všechny aktuální online akce ČSOB Pojišťovny (platí do 30. 11. 2026)
- **Pojištění majetku (Náš domov):** Online sleva **10 %** a navíc **Alza poukázka v hodnotě 500 Kč**!
- **Cestovní pojištění:** Okamžitá **online sleva 20 %** pro krátkodobé i celoroční cesty do zahraničí.
- **Autopojištění (povinné ručení & havarijní):** **Online sleva 20 %** s non-stop asistencí.
- **Pojištění odpovědnosti („pojistka na blbost“):** **Online sleva 10 %** pro celou domácnost.

### Jak získat online slevu naplno?
Vyberte si konkrétní typ pojištění v přehledu akcí výše a sjednejte pojistku přímo v online kalkulačce na webu ČSOB Pojišťovny (nepřecházejte během procesu do mobilní aplikace ČSOB SMART, aby zůstala online sleva korektně připsána).
    `.trim(),
    logo: "/logos/csob-pojistovna.png",
    bonus: "Online sleva až 20 % + Alza poukázka 500 Kč",
    bonusDescription:
      "Do 30. 11. 2026: sleva 20 % na cestovní a autopojištění, 10 % na odpovědnost a Alza poukázka 500 Kč k pojištění majetku.",
    ctaLabel: "Spočítat pojištění se slevou až 20 %",
    requirements: [
      "Sjednání pojištění online přes webovou kalkulačku ČSOB Pojišťovny",
      "Pro zachování podmínek dokončete sjednání přímo na webu (ne přes ČSOB SMART app)",
      "Akční nabídky platí při sjednání do 30. 11. 2026",
    ],
    pros: [
      "Okamžitá online sleva 20 % na autopojištění a cestovní pojištění",
      "Alza poukázka 500 Kč + 10% online sleva u pojištění majetku",
      "Silná a spolehlivá pojišťovna s rychlou online likvidací škod",
      "Smlouva i zelená karta / pojistka dorazí do e-mailu během pár minut",
    ],
    cons: [
      "Akční slevy a poukázky jsou časově omezené (do 30. 11. 2026)",
      "Sjednání přes mobilní bankovnictví ČSOB SMART se nemusí započítat do online promo akce",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=f5e0f8fb",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=f5e0f8fb",
    trackingSlug: "csob-pojistovna",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "ČSOB Pojišťovna: Sleva 20 % + Alza 500 Kč",
    seoDescription:
      "Sjednejte pojištění ČSOB online se slevou 20 % (cestovní a autopojištění), 10 % na odpovědnost a získejte Alza poukázku 500 Kč k pojištění majetku.",
    faq: [
      {
        question: "Jak získám Alza poukázku 500 Kč od ČSOB Pojišťovny?",
        answer:
          "Při online sjednání pojištění majetku (nemovitosti či domácnosti) přes promo odkaz na této stránce do 30. 11. 2026 získáte 10% online slevu a nárok na Alza poukázku v hodnotě 500 Kč.",
      },
      {
        question: "Na jaké pojištění platí 20% online sleva?",
        answer:
          "Online sleva 20 % platí při sjednání cestovního pojištění a autopojištění (povinné ručení i havarijní pojištění) přímo přes webovou kalkulačku.",
      },
      {
        question: "Kdy začne online sjednané cestovní pojištění platit?",
        answer:
          "Cestovní pojištění můžete sjednat i na poslední chvíli těsně před odjezdem — po zaplacení kartou online začíná platit prakticky ihned a asistenční kartičku máte hned v e-mailu.",
      },
    ],
    promos: [
      {
        trackingSlug: "csob-pojisteni-majetku",
        title: "Pojištění majetku – Alza poukázka 500 Kč / online sleva 10 %",
        description:
          "Pojistěte byt, dům nebo domácnost online a získejte 10% slevu a poukázku 500 Kč na Alza.cz.",
        badge: "Alza 500 Kč + -10 %",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=f5e0f8fb&desturl=https%3A%2F%2Fwww.csobpoj.cz%2Fpojisteni%2Fpojisteni-majetku",
        order: 1,
      },
      {
        trackingSlug: "csob-cestovni-pojisteni",
        title: "Cestovní pojištění – online sleva 20 %",
        description:
          "Komplexní cestovní pojištění do zahraničí s vysokými limity léčebných výloh a okamžitou 20% slevou online.",
        badge: "Online sleva 20 %",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=f5e0f8fb&desturl=https%3A%2F%2Fwww.csobpoj.cz%2Fpojisteni%2Fcestovni-pojisteni",
        order: 2,
      },
      {
        trackingSlug: "csob-autopojisteni",
        title: "Autopojištění (povinné ručení & havarijní) – online sleva 20 %",
        description:
          "Spočítejte si povinné ručení nebo havarijní pojištění auta online a ušetřete 20 % z ceny pojistného.",
        badge: "Online sleva 20 %",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=f5e0f8fb&desturl=https%3A%2F%2Fwww.csobpoj.cz%2Fpojisteni%2Fpojisteni-vozidel",
        order: 3,
      },
      {
        trackingSlug: "csob-pojisteni-odpovednosti",
        title: "Pojištění odpovědnosti – online sleva 10 %",
        description:
          "Pojistka na škody způsobené třetím osobám v běžném životě („pojistka na blbost“) pro celou rodinu se slevou 10 %.",
        badge: "Online sleva 10 %",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=f5e0f8fb&desturl=https%3A%2F%2Fwww.csobpoj.cz%2Fpojisteni%2Fpojisteni-odpovednosti",
        order: 4,
      },
    ],
  },
  {
    slug: "vodafone",
    name: "Vodafone.cz",
    categorySlug: "pojisteni-a-sluzby",
    shortDescription:
      "Akční tarify a internet od Vodafone: Black Friday BezLimitu M za 472 Kč, internet na 12 měsíců za 299 Kč a Vánoce s Disney+ na 3 měsíce zdarma.",
    description: `
**Vodafone.cz** nabízí jedny z nejvýhodnějších akcí na mobilní neomezené tarify, pevný vysokorychlostní internet na doma i Vodafone TV. Právě teď můžete využít trojici exkluzivních online nabídek platných **do 30. 11. 2026** a ušetřit tisíce korun ročně na telekomunikačních službách.

### Přehled aktuálních akcí Vodafone (do 30. 11. 2026)
- **Black Friday – Neomezený tarif BezLimitu M za 472 Kč/měs.:** Neomezená data, volání i SMS za zlomkovou cenu.
- **Vysokorychlostní internet na doma za 299 Kč na 12 měsíců:** Stabilní kabelové, optické či 5G připojení pro celou domácnost.
- **Vánoční nabídka – Disney+ na 3 měsíce zdarma & sleva až 17 000 Kč:** Získejte předplatné Disney+ zdarma k nové službě nebo obří slevu na pár telefonů k tarifům Extra.

### Jak objednat nejvýhodněji?
Klikněte na vybranou promo kartu výše, zkontrolujte dostupnost internetu nebo si nakonfigurujte tarif přímo na webu Vodafone.cz (v prohlížeči) a odešlete nezávaznou objednávku či žádost o zavolání operátora.
    `.trim(),
    logo: "/logos/vodafone.png",
    bonus: "BezLimitu M za 472 Kč · Internet za 299 Kč · Disney+ zdarma",
    bonusDescription:
      "Do 30. 11. 2026: Black Friday tarif za 472 Kč, internet na rok za 299 Kč/měs. a sleva až 17 000 Kč na telefony + Disney+ na 3 měsíce zdarma.",
    ctaLabel: "Zobrazit akční nabídky Vodafone",
    requirements: [
      "Online objednávka nebo vyplnění platného kontaktního telefonu na webu Vodafone.cz",
      "Sjednání ve webovém prohlížeči (nikoliv přes mobilní aplikaci Můj Vodafone)",
      "Akční ceny platí pro objednávky do 30. 11. 2026",
    ],
    pros: [
      "Mimořádně výhodný neomezený tarif BezLimitu M za 472 Kč v Black Friday akci",
      "Pevný internet na doma na celý první rok jen za 299 Kč měsíčně",
      "Vánoční bonus: Disney+ na 3 měsíce zdarma a až 17 000 Kč sleva na dva telefony",
      "Jednoduchý přenos telefonního čísla zdarma z jiného operátora",
    ],
    cons: [
      "Akční ceny internetu platí prvních 12 měsíců, poté dle standardního ceníku",
      "Vánoční a Black Friday nabídky jsou striktně časově omezené do 30. 11. 2026",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=aface625",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=aface625",
    trackingSlug: "vodafone",
    partnerNetwork: "ehub",
    rating: 4.8,
    featured: true,
    active: true,
    verified: true,
    seoTitle: "Vodafone akce 2026: Tarif 472 Kč, net 299 Kč",
    seoDescription:
      "Využijte Black Friday a Vánoce u Vodafone: neomezený tarif za 472 Kč, internet na rok za 299 Kč/měs., Disney+ na 3 měsíce zdarma a až 17 000 Kč sleva na telefony.",
    faq: [
      {
        question: "Do kdy platí Vodafone Black Friday tarif BezLimitu M za 472 Kč?",
        answer:
          "Všechny tři hlavní promo akce (Black Friday BezLimitu M za 472 Kč, internet za 299 Kč i vánoční akce s Disney+ a telefony) jsou platné do 30. 11. 2026.",
      },
      {
        question: "Mohu si k tarifu Vodafone přenést své stávající číslo od jiného operátora?",
        answer:
          "Ano, přenos čísla od jiného operátora probíhá jednoduše pomocí kódu OKU a Vodafone vše vyřídí za vás během několika pracovních dní.",
      },
      {
        question: "Jak ověřím, zda je na mé adrese dostupný internet za 299 Kč?",
        answer:
          "Stačí přejít přes promo odkaz Internet na 12 měsíců za 299 Kč a na webu Vodafone zadat svou přesnou adresu — ověření dostupnosti trvá pár sekund.",
      },
    ],
    promos: [
      {
        trackingSlug: "vodafone-black-friday-bezlimitu",
        title: "Black Friday – neomezený tarif BezLimitu M za 472 Kč",
        description:
          "Neomezená data, volání a SMS do všech sítí za výjimečnou Black Friday cenu 472 Kč měsíčně.",
        badge: "472 Kč / měs.",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=aface625&desturl=https%3A%2F%2Fwww.vodafone.cz%2Fblack-friday%2F%3Fpromo%3Dcbu%3Ahero1%3Adefault%3Ablack-friday-2026",
        order: 1,
      },
      {
        trackingSlug: "vodafone-internet-299",
        title: "Internet na doma na 12 měsíců jen za 299 Kč",
        description:
          "Vysokorychlostní připojení k internetu od Vodafone po celý první rok za akčních 299 Kč měsíčně.",
        badge: "299 Kč / měs.",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=aface625&desturl=https%3A%2F%2Fwww.vodafone.cz%2Finternet%2F",
        order: 2,
      },
      {
        trackingSlug: "vodafone-vanoce-disney",
        title: "Vánoce – Disney+ na 3 měsíce zdarma / sleva až 17 000 Kč na telefony",
        description:
          "K nové službě získáte Disney+ na 3 měsíce zdarma a k tarifům Extra slevu až 17 000 Kč na dvojici telefonů.",
        badge: "Disney+ zdarma",
        validUntil: "2026-11-30",
        affiliateUrl:
          "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=aface625&desturl=https%3A%2F%2Fwww.vodafone.cz%2Fvanoce%2F%3Fpromo%3Dcbu%3Ahero1%3Adefault%3Avanoce",
        order: 3,
      },
    ],
  },
  {
    slug: "innogy",
    name: "innogy.cz",
    categorySlug: "pojisteni-a-sluzby",
    shortDescription:
      "Stabilní dodavatel elektřiny a plynu pro více než 1,5 milionu zákazníků v ČR s nezávaznou online kalkulací úspory.",
    description: `
**innogy.cz** je jeden z nejvýznamnějších a nejdůvěryhodnějších dodavatelů **elektřiny a zemního plynu v České republice**, kterému důvěřuje více než **1,5 milionu domácností a firem**. Kromě spolehlivých dodávek energií s možností fixace ceny nabízí také moderní zákaznický portál innosvět a řešení pro energetickou soběstačnost.

### Proč si nechat nezávazně spočítat cenu energií u innogy?
- **Jistota velkého dodavatele:** Dlouholetá stabilita na českém energetickém trhu bez rizika krachu dodavatele.
- **Možnost fixace i klesajících ceníků:** Zafixujte si cenu elektřiny nebo plynu a mějte rozpočet domácnosti pod kontrolou.
- **Vyřízení přechodu zdarma:** Při změně dodavatele vyřídí innogy veškerou administrativu i výpověď u stávajícího dodavatele za vás.
- **Rychlá online poptávka:** Stačí zanechat kontakt v online formuláři a specialista vám připraví srovnání na míru vaší spotřebě.
    `.trim(),
    logo: "/logos/innogy.png",
    bonus: "Nezávazná kalkulace levnější elektřiny a plynu zdarma",
    bonusDescription:
      "Porovnejte své stávající zálohy za elektřinu a plyn s nabídkou jednoho z největších dodavatelů v ČR.",
    ctaLabel: "Nezávazně poptat elektřinu a plyn",
    requirements: [
      "Vyplnění online formuláře na elektřinu nebo plyn včetně telefonního čísla",
      "Připravte si orientační roční spotřebu z posledního vyúčtování",
      "Online poptávka je 100 % nezávazná a bez poplatků",
    ],
    pros: [
      "Spolehlivý dodavatel pro více než 1,5 milionu zákazníků v ČR",
      "Kompletní vyřízení přechodu od stávajícího dodavatele zdarma",
      "Přehledná online samoobsluha pro správu záloh a samoodečtů",
    ],
    cons: [
      "Při sjednání smlouvy na dobu určitou je potřeba hlídat konec fixace",
      "Nejvýhodnější ceny vyžadují porovnání s vaší aktuální fakturou",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=b8822518",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=b8822518",
    trackingSlug: "innogy",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "innogy elektřina a plyn 2026: Recenze a ceník",
    seoDescription:
      "Ověřte si, kolik můžete ušetřit za elektřinu a plyn u innogy. Stabilní dodavatel pro 1,5 mil. zákazníků v ČR, nezávazná online nabídka zdarma.",
    faq: [
      {
        question: "Je vyplnění poptávkového formuláře na innogy.cz závazné?",
        answer:
          "Ne, vyplnění kontaktního formuláře slouží pouze k přípravě nezávazné cenové nabídky na elektřinu či plyn podle vaší spotřeby.",
      },
      {
        question: "Musím při přechodu k innogy řešit výpověď u starého dodavatele sám?",
        answer:
          "Ne, na základě plné moci vyřídí innogy celý proces změny dodavatele zdarma za vás a pohlídá navazující termín bez přerušení dodávek.",
      },
      {
        question: "Dodává innogy elektřinu i plyn po celé ČR?",
        answer:
          "Ano, innogy dodává elektřinu a zemní plyn domácnostem i firmám na celém území České republiky bez ohledu na regionálního distributora.",
      },
    ],
  },
  {
    slug: "eon",
    name: "E.ON.cz",
    categorySlug: "pojisteni-a-sluzby",
    shortDescription:
      "Dodavatel elektřiny a plynu pro domácnosti i firmy a špičkový specialista na fotovoltaiku (FVE) a tepelná čerpadla na klíč.",
    description: `
**E.ON.cz** je silný energetický partner pro domácnosti, firmy i obce v celé České republice. Vedle spolehlivých dodávek **elektřiny a plynu** za férové ceny patří E.ON také k lídrům v oblasti **fotovoltaických elektráren (FVE), tepelných čerpadel a domácího nabíjení elektromobilů** včetně vyřízení dotací Nová zelená úsporám.

### Co u E.ON vyřídíte online na pár kliknutí?
- **Elektřina a plyn pro domácnost:** Nezávazná cenová nabídka s možností dlouhodobé i krátkodobé fixace.
- **Fotovoltaika (FVE) na klíč:** Návrh řešení pro rodinný dům, instalace, servis i maximální využití státních dotací.
- **Tepelná čerpadla:** Úsporné vytápění domu s garancí profesionální montáže a následného servisu.
- **Přehledná aplikace Energie24:** Kontrola spotřeby, plateb i záloh z mobilu.

### Jak získat individuální nabídku?
Vyplňte krátký nezávazný poptávkový formulář na webu E.ON.cz s platným telefonním číslem. Energetický poradce s vámi probere vaše potřeby a spočítá konkrétní roční úsporu.
    `.trim(),
    logo: "/logos/eon.png",
    bonus: "Nezávazná nabídka energií, FVE i tepelných čerpadel",
    bonusDescription:
      "Srovnejte cenu elektřiny a plynu nebo získejte bezplatný návrh fotovoltaiky či tepelného čerpadla s dotací.",
    ctaLabel: "Získat nezávaznou nabídku od E.ON",
    requirements: [
      "Vyplnění nezávazného poptávkového formuláře na elektřinu, plyn, FVE nebo tepelné čerpadlo",
      "Uvedení reálného telefonního čísla pro telefonickou konzultaci nabídky",
      "Vyřízení poptávky ve webovém prohlížeči",
    ],
    pros: [
      "Jeden z největších a nejstabilnějších dodavatelů energií v ČR",
      "Komplexní služby pod jednou střechou: elektřina, plyn, FVE i tepelná čerpadla",
      "Pomoc s vyřízením dotací a bezplatný přechod od jiného dodavatele",
      "Kvalitní online správa účtu Energie24",
    ],
    cons: [
      "Pro přesnou kalkulaci FVE či tepelného čerpadla je nutná krátká konzultace",
      "Ceníky energií je vždy vhodné porovnat podle distribuční sazby",
    ],
    referralUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=87497054",
    affiliateUrl: "https://ehub.cz/system/scripts/click.php?a_aid=2eb84bd5&a_bid=87497054",
    trackingSlug: "eon",
    partnerNetwork: "ehub",
    rating: 4.7,
    featured: false,
    active: true,
    verified: true,
    seoTitle: "E.ON.cz 2026: Elektřina, plyn a fotovoltaika",
    seoDescription:
      "Nezávazná poptávka elektřiny, plynu, fotovoltaiky (FVE) a tepelných čerpadel u E.ON.cz. Stabilní dodavatel, pomoc s dotacemi a přehled výhod.",
    faq: [
      {
        question: "Mohu u E.ON poptat i fotovoltaiku nebo tepelné čerpadlo na klíč?",
        answer:
          "Ano, E.ON dodává kompletní fotovoltaické elektrárny i tepelná čerpadla včetně odborného návrhu, montáže, servisu a asistence se státními dotacemi.",
      },
      {
        question: "Dodává E.ON elektřinu a plyn i mimo jižní Moravu a jižní Čechy?",
        answer:
          "Ano, E.ON dodává energie domácnostem i firmám po celé České republice nezávisle na tom, kdo ve vašem kraji spravuje distribuční síť.",
      },
      {
        question: "Kolik stojí příprava cenové nabídky od E.ON?",
        answer:
          "Vyplnění poptávkového formuláře i vypracování nezávazné cenové nabídky je zcela zdarma.",
      },
    ],
  },
];
