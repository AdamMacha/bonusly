export interface ArticleSeed {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categorySlug: string;
  offerSlug: string;
  publishedAt: string;
  featured: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
}

export const ARTICLES_PART_1: ArticleSeed[] = [
  {
    slug: "jak-si-privydelat-jako-wolt-kuryr",
    title: "Jak si přivydělat jako Wolt kurýr: Reálné výdělky, daně a bonus 4 000 Kč",
    excerpt:
      "Kompletní průvodce prací kurýra pro Wolt v roce 2026: reálné hodinové výdělky na kole i v autě, rozvoz na IČO vs. přes flotilu, náklady a návod na bonus 4 000 Kč s kódem CPCJPUX.",
    featuredImage:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&auto=format&fit=crop&q=80",
    categorySlug: "extra-prijem",
    offerSlug: "wolt-kuryr",
    publishedAt: "2026-07-12",
    featured: true,
    keywords: [
      "wolt kurýr výdělek",
      "wolt kurýr registrace",
      "wolt kód CPCJPUX",
      "wolt bonus 4000",
      "rozvoz jídla bez ičo",
    ],
    seoTitle: "Wolt kurýr 2026: Výdělky, flotila a bonus 4 000 Kč",
    seoDescription:
      "Kolik si reálně vydělá Wolt kurýr po odečtení nákladů? Srovnání IČO vs. flotila, nejlepší časy pro rozvoz a návod na startovací bonus 4 000 Kč (CPCJPUX).",
    content: `
Práce kurýra pro **Wolt** patří v České republice dlouhodobě mezi nejoblíbenější flexibilní přivýdělky pro studenty, zaměstnance hledající extra příjem po práci i plnočasové podnikatele na IČO. Na rozdíl od klasických brigád nemusíte týdny dopředu žádat o směny ani se nikomu zpovídat — aplikaci jednoduše zapnete, kdykoliv máte hodinu nebo celý víkend volno.

V tomto podrobném průvodci z praxe rozebereme **skutečné čisté výdělky po odečtení paliva a daní**, vysvětlíme rozdíl mezi jízdou na vlastní IČO a přes partnerskou flotilu, ukážeme konkrétní modelové výpočty a provedeme vás získáním **startovacího bonusu 4 000 Kč s kódem CPCJPUX**.

## Jak funguje rozvoz pro Wolt v praxi

Po schválení registrace získáte přístup do mobilní aplikace **Wolt Partner** (iOS i Android) a termobox pro bezpečnou přepravu teplého i studeného jídla a nákupů z obchodů (Wolt Market, drogerie, lékárny, květinářství).

Samotný proces každé zakázky je maximálně zjednodušený:
1. V aplikaci přepnete svůj stav na **Online** a okamžitě můžete přijímat úkoly ve svém okolí.
2. Před přijetím zakázky vidíte restauraci/obchod, cílovou oblast doručení i **předem vypočítanou odměnu za doručení**.
3. Objednávku vyzvednete, bezpečně uložíte do termoboxu a doručíte zákazníkovi dle navigace v aplikaci.
4. Odměna se okamžitě připíše do vašeho přehledu a každé úterý odchází týdenní výplata na bankovní účet.

Velkou výhodou je podpora tzv. **balíčkování (bundle objednávek)** — pokud dva zákazníci bydlí v podobném směru, aplikace nabídne vyzvednutí dvou zakázek najednou, čímž výrazně roste váš hodinový příjem bez zbytečných kilometrů navíc.

## Kolik si Wolt kurýr reálně vydělá v roce 2026?

Hrubý výdělek se skládá ze čtyř složek: **základní sazby za vyzvednutí a doručení**, **příplatku za ujetou vzdálenost**, **dynamických bonusů ve špičkách či nepříznivém počasí** a **100 % dýšek** (hotovostních i přes aplikaci).

| Typ rozvozu a vytížení | Průměrný hrubý výdělek / hod | Odhadované náklady / hod | Reálný čistý příjem (před zdaněním) |
| :--- | :--- | :--- | :--- |
| **Kolo / Elektrokolo (běžný den)** | 220 – 290 Kč | 10 – 25 Kč | **200 – 265 Kč / hod** |
| **Kolo / Skútr (obědové & večerní špičky)** | 320 – 440 Kč | 25 – 45 Kč | **280 – 400 Kč / hod** |
| **Osobní auto (běžný den)** | 240 – 320 Kč | 75 – 110 Kč | **160 – 220 Kč / hod** |
| **Osobní auto (špičky, víkendy, déšť)** | 360 – 480 Kč | 85 – 120 Kč | **260 – 370 Kč / hod** |

### Modelový výpočet: Přivýdělek 12 hodin týdně vs. plný úvazek
- **Student / zaměstnanec (12 hodin týdně ve špičkách — pátek až neděle večer na kole):** 12 hod × 330 Kč = **3 960 Kč týdně**, tedy zhruba **16 000 Kč měsíčně** navíc bez narušení hlavního programu.
- **Aktivní kurýr na plný úvazek (40 hodin týdně na skútru v Praze/Brně):** 40 hod × 310 Kč = **12 400 Kč týdně**, tedy **49 000 až 58 000 Kč hrubého měsíčně** plus dýška.

*Praktický tip:* Pokud si nejste jistí, zda je pro vaše město lepší Wolt nebo konkurenční foodora, podívejte se na naše detailní [srovnání Wolt kurýr vs. foodora kurýr](/porovnani/wolt-kuryr-vs-foodora-kuryr).

## Vlastní IČO vs. partnerská flotila: Co se vyplatí víc?

Pro legální rozvoz máte v Česku dvě hlavní cesty:

### 1. Vlastní živnostenský list (OSVČ / IČO)
- **Výhody:** Celých **100 % výdělku z aplikace** zůstává vám — neplatíte žádnou provizi prostředníkovi. Jako vedlejší činnost při studiu nebo hlavním zaměstnání navíc v prvním roce neplatíte minimální zálohy na sociální a zdravotní pojištění (doplatíte je jen ze skutečného zisku, přičemž u výdajového paušálu 60 % bývá daňová zátěž velmi nízká).
- **Kdy zvolit:** Jakmile plánujete vydělávat pravidelně více než ~8 000–10 000 Kč měsíčně.

### 2. Partnerská flotila (DPP / DPČ)
- **Výhody:** Nemusíte na živnostenský úřad ani podávat daňové přiznání. Flotila vás zaměstná na dohodu (DPP) a vše administrativně vyřeší za vás.
- **Nevýhody:** Flotila si účtuje provizi obvykle **8 % až 15 %** z vašich výdělků (případně fixní týdenní poplatek).
- **Kdy zvolit:** Ideální na první 1–2 měsíce pro vyzkoušení, zda vás práce baví, nebo pokud nechcete řešit vlastní IČO.

## Jak získat startovací bonus 4 000 Kč s kódem CPCJPUX

Wolt motivuje nové kurýry jedním z nejvyšších náborových bonusů v ČR — **4 000 Kč navíc** k vašim běžným výdělkům. Abyste o bonus zbytečně nepřišli, dodržte tento postup:

1. Přejděte na [detail nabídky Wolt kurýr](/nabidky/wolt-kuryr) a klikněte na tlačítko registrace — referral kód **CPCJPUX** se propíše do přihlášky automaticky (pro jistotu jej zkontrolujte v poli pro doporučovací kód).
2. Vyplňte základní údaje, nahrajte doklady a zvolte způsob spolupráce (vlastní IČO nebo flotila).
3. Po aktivaci účtu doručte **150 objednávek během prvních 45 kalendářních dní**.
4. V přepočtu stačí jen **3,4 objednávky denně**, případně zhruba **12–15 odježděných večerů** po 10–12 zakázkách.

**Pozor na nejčastější chybu:** Pokud si založíte účet bez zadaného referral kódu **CPCJPUX**, zpětně jej bohužel není možné doplnit. Vždy kód zkontrolujte ještě před odesláním prvního kroku registrace.

## 5 osvědčených tipů, jak na Woltu vydělat maximum za hodinu

1. **Jezděte v obědové (11:15–13:45) a večerní (17:45–21:15) špičce:** Mimo špičky je prostoj mezi objednávkami dlouhý a hodinová sazba padá.
2. **Sledujte předpověď počasí:** Déšť, sníh nebo chladný nedělní večer zvyšují počet objednávek i bonusové koeficienty až o 30–50 %.
3. **Zvolte správný dopravní prostředek pro centrum:** V historickém centru Prahy či Brna je elektrokolo nebo 125cc skútr výrazně rychlejší (a levnější na provoz) než auto, se kterým ztrácíte čas parkováním.
4. **Nezapomínejte na powerbanku a držák na telefon:** GPS navigace a nepřetržitě zapnutý displej vybíjejí telefon překvapivě rychle — kvalitní 20 000 mAh powerbanka je naprostý základ.
5. **Kombinujte s chytrým bankovním účtem:** Výplaty si nechte posílat na účet bez poplatků — a když si zároveň založíte třeba [Raiffeisenbank Chytrý účet](/nabidky/raiffeisenbank) nebo [mBank mKonto](/nabidky/mbank), získáte snadno další 1 000 až 3 000 Kč bonusu navíc.

## Často kladené otázky

### Kolik objednávek musím odjet pro Wolt bonus 4 000 Kč?
Pro získání bonusu 4 000 Kč musíte být registrováni s kódem CPCJPUX a dokončit celkem 150 doručených objednávek během prvních 45 dní od aktivace vašeho kurýrního účtu.

### Mohu pro Wolt rozvážet i jako student bez živnostenského listu?
Ano. Jako student můžete buď jezdit na dohodu (DPP) přes partnerskou flotilu, nebo si zdarma/za 1 000 Kč založit vedlejší živnost (OSVČ), kde při studiu do zákonného limitu neplatíte minimální zálohy na sociální a zdravotní pojištění.

### Kdy chodí výplata z Woltu na bankovní účet?
Wolt vyplácí kurýry pravidelně jednou týdně (zpravidla každé úterý za předchozí kalendářní týden). Pokud jezdíte pod flotilou, výplatní den se řídí smlouvou s danou flotilou (většinou rovněž týdně).

### Zůstávají kurýrovi celá dýška od zákazníků?
Ano, 100 % spropitného v hotovosti i dýšek zaslaných zákazníkem v mobilní aplikaci náleží přímo kurýrovi bez jakéhokoliv krácení ze strany Woltu.
    `.trim(),
  },
  {
    slug: "investown-investovani-do-nemovitosti-zkusenosti",
    title: "Investown recenze a zkušenosti 2026: Výnosy, rizika a bonus 500 Kč",
    excerpt:
      "Detailní test české crowdfundingové platformy Investown s licencí ČNB: reálné výnosy 8–10,5 % p.a., zajištění LTV, sekundární trh, daně a návod na bonus 500 Kč s kódem 0G1ADBC5.",
    featuredImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
    categorySlug: "finance",
    offerSlug: "investown",
    publishedAt: "2026-07-22",
    featured: true,
    keywords: [
      "investown zkušenosti",
      "investown recenze 2026",
      "investown bonus 0G1ADBC5",
      "investice do nemovitostí od 500 kč",
      "investown zdanění",
    ],
    seoTitle: "Investown recenze 2026: Výnosy, rizika a 500 Kč",
    seoDescription:
      "Podrobná recenze Investown s licencí ČNB: jak fungují úvěry zajištěné nemovitostí, reálné měsíční výnosy, sekundární trh, daně a bonus 500 Kč (0G1ADBC5).",
    content: `
Vlastnit investiční byt v Praze nebo Brně dnes vyžaduje minimálně 5 až 8 milionů korun a časově náročnou správu nájemníků. Česká platforma **Investown** tuto bariéru zásadně snížila: umožňuje drobným investorům podílet se na financování developerských a nemovitostních projektů **už od 500 Kč** s pravidelným měsíčním výnosem okolo **8 až 10,5 % ročně**.

V této hloubkové recenzi se podíváme pod pokličku fungování Investownu, ověříme regulaci ČNB, porovnáme reálné výnosy i rizika opožděných projektů, ukážeme si daňové souvislosti a přesný postup pro **získání vstupního bonusu 500 Kč s kódem 0G1ADBC5**.

## Jak Investown funguje a kdo za ním stojí

Investown je česká fintech společnost (majetkově propojená mimo jiné se skupinou Česká spořitelna / Seed Starter), která vlastní **evropskou licenci poskytovatele služeb skupinového financování (ECSP) pod dohledem České národní banky (ČNB)**.

Princip je transparentní:
1. Prověřený developer či realitní firma potřebuje úvěr na rekonstrukci bytového domu, výstavbu rodinných domů nebo nákup komerčního objektu.
2. Analytický tým Investownu projekt ohodnotí, nechá zpracovat nezávislý znalecký posudek a **zastaví nemovitost prvním zástavním právem**.
3. Drobní investoři se na úvěr složí částkami od **500 Kč** až po statisíce.
4. Každý měsíc vám na investiční účet chodí poměrná část úroků, kterou můžete ihned reinvestovat do dalšího projektu nebo si nechat zdarma vyplatit na bankovní účet.

## Výnosy, poplatky a konkrétní výpočet zhodnocení

Na rozdíl od mnoha podílových fondů si Investown neúčtuje **žádné vstupní ani průběžné správcovské poplatky** při držení investice do splatnosti. Poplatek (malé procento) platíte pouze tehdy, pokud chcete investici předčasně prodat na sekundárním tržišti.

| Investovaná částka | Průměrný úrok | Měsíční výnos (hrubý) | Roční výnos (hrubý) | Vstupní bonus (kód 0G1ADBC5) |
| :--- | :--- | :--- | :--- | :--- |
| **5 000 Kč** | 9,5 % p.a. | ~40 Kč | 475 Kč | **+ 500 Kč** (celkem +19,5 % 1. rok!) |
| **25 000 Kč** | 9,5 % p.a. | ~198 Kč | 2 375 Kč | **+ 500 Kč** |
| **100 000 Kč** | 9,5 % p.a. | ~792 Kč | 9 500 Kč | **+ 500 Kč** |
| **250 000 Kč** | 9,5 % p.a. | ~1 979 Kč | 23 750 Kč | **+ 500 Kč** |

Právě u startovní investice **5 000 Kč** představuje uvítací bonus **500 Kč** mimořádné okamžité zhodnocení **+10 % navíc** k běžnému úroku projektu.

## Zajištění, LTV a reálná rizika: Na co si dát pozor

Žádná investice s výnosem kolem 9–10 % ročně není bezriziková — a je férové o rizicích otevřeně mluvit:
- **Není to bankovní vklad:** Investice na Investownu nejsou pojištěny u Garančního systému jako běžné nebo spořicí účty.
- **Riziko prodlení developera:** Může se stát, že dlužník nestihne projekt zkolaudovat či prodat přesně v termínu splatnosti. V takovém případě nabíhají sankční úroky z prodlení a Investown vymáhá pohledávku (v krajním případě prodejem zastavené nemovitosti).
- **Klíčový ukazatel LTV (Loan-to-Value):** Vždy sledujte, jaký poměr tvoří výše úvěru k odhadní hodnotě zastavené nemovitosti. Bezpečnější projekty mívají **LTV pod 65–70 %**, což vytváří minimálně 30% bezpečnostní polštář i při poklesu cen realit.
- **Zlaté pravidlo diverzifikace:** Nikdy nedávejte všechny peníze do jednoho projektu. Rozdělte například 50 000 Kč mezi 10 až 20 různých úvěrů napříč regiony a developery (Investown nabízí i chytrý **Autoinvest**).

Zajímá vás, jak si Investown vede vedle přímé české konkurence? Připravili jsme podrobná srovnání [Investown vs. Roier](/porovnani/investown-vs-roier) a [Investown vs. Ronda Invest](/porovnani/investown-vs-rondainvest).

## Jak funguje sekundární tržiště a předčasný výběr

Velkou výhodou Investownu oproti většině ostatních crowdfundingových platforem je **aktivní sekundární tržiště (Tržiště)**. Pokud vložíte peníze do dvouletého projektu, ale po půl roce peníze nečekaně potřebujete, můžete svou participaci jedním kliknutím nabídnout ostatním investorům. U bezproblémových projektů se participace zpravidla prodá během několika hodin až dní (s drobným poplatkem tržiště).

## Zdanění výnosů z Investownu v ČR

Výnosy z úvěrového crowdfundingu (participací) nejsou na rozdíl od bankovních úroků daněny srážkovou daní u zdroje — spadají typicky pod **§ 8 (příjmy z kapitálového majetku)** nebo dle smluvní struktury do daňového přiznání se sazbou **15 %** (při vyšších příjmech 23 %). Investown vám na začátku roku přímo v aplikaci vygeneruje přehledný **daňový podklad** za uplynulý kalendářní rok, takže vyplnění trvá jen pár minut.

## Jak získat bonus 500 Kč krok za krokem

1. Přejděte na [stránku nabídky Investown](/nabidky/investown) a registrujte se přes odkaz s kódem **0G1ADBC5**.
2. Dokončete ověření totožnosti (nejrychleji přes BankID) a nabijte peněženku převodem z vašeho bankovního účtu.
3. **Do 7 dní od registrace zainvestujte alespoň 5 000 Kč do jednoho projektu** (pozor: neskládejte částku z menších investic po 1 000 Kč, pro bonus je vyžadováno min. 5 000 Kč do jednoho projektu!).
4. Bonus **500 Kč** vám bude připsán na investorský účet.

## Často kladené otázky

### Musím investovat celých 5 000 Kč do jednoho projektu pro bonus 500 Kč?
Ano, podmínkou pro získání uvítacího bonusu 500 Kč s kódem 0G1ADBC5 je zainvestovat alespoň 5 000 Kč do jednoho vybraného projektu během prvních 7 dnů od registrace.

### Jak dlouho trvá připsání prvních úroků na Investownu?
Úroky se připisují pravidelně každý měsíc — první výnos obdržíte přibližně za 30 dní od data zainvestování do vybraného projektu.

### Je lepší Investown, Roier nebo Ronda Invest?
Investown vítězí nejnižší vstupní investicí (od 500 Kč), likvidním sekundárním trhem a bonusem 500 Kč. Roier boduje přísným limitem LTV max. 70 % a Ronda Invest nabízí 1% vstupní bonus z celého objemu investic za prvních 30 dní. Ideální strategií pro vyšší částky je platformy kombinovat.

### Jak bezpečný je Investown v případě krachu platformy?
Investown podléhá licenci ČNB a prostředky investorů i pohledávky jsou účetně odděleny od majetku provozovatele. V případě úpadku platformy by správu stávajících pohledávek převzal záložní správce.
    `.trim(),
  },
  {
    slug: "revolut-recenze-a-zkusenosti",
    title: "Revolut recenze 2026: Kurzy měn, RevPoints, poplatky a jak získat bonus",
    excerpt:
      "Velká praktická recenze aplikace Revolut pro české uživatele: kolik reálně ušetříte na dovolené, jak fungují věrnostní body RevPoints, jednorázové karty a přesný návod na bonus.",
    featuredImage:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    categorySlug: "banky",
    offerSlug: "revolut",
    publishedAt: "2026-08-02",
    featured: false,
    keywords: [
      "revolut recenze 2026",
      "revolut zkušenosti",
      "revpoints jak fungují",
      "revolut poplatky víkend",
      "karta na dovolenou do zahraničí",
    ],
    seoTitle: "Revolut recenze 2026: Kurzy, RevPoints a bonus",
    seoDescription:
      "Test karty Revolut v roce 2026: reálná úspora na směně měn, přehled tarifů Standard až Ultra, program RevPoints a postup pro získání odměny.",
    content: `
Pokud na dovolené v Chorvatsku, Itálii nebo při nákupech na zahraničních e-shopech (Amazon, AliExpress, Booking) stále platíte běžnou kartou od tradiční české banky, přicházíte u každé platby zbytečně o **2,5 % až 4 %** na nevýhodném směnném kurzu. Právě tento problém elegantně vyřešil **Revolut**, který dnes v Evropě využívají desítky milionů klientů.

V této aktualizované recenzi pro rok 2026 se podíváme na **skutečnou úsporu na dovolené v korunách**, srovnáme jednotlivé tarify, rozebereme věrnostní program **RevPoints** a ukážeme si, jak při založení účtu získat **přímou odměnu do vaší BONUSLY peněženky**.

## Kolik s Revolutem reálně ušetříte v zahraničí?

Tradiční banky k oficiálnímu mezibankovnímu kurzu přidávají skrytou marži 2,5 % až 3,8 %. Revolut ve všední dny (pondělí až pátek) směňuje přes 30 světových měn za **čistý tržní (mezibankovní) kurz** bez přirážky (u bezplatného tarifu Standard do měsíčního limitu 25 000 Kč).

| Útrata na dovolené / e-shopech | Klasická česká banka (~3,2 % marže) | Revolut Standard (ve všední dny) | Vaše čistá úspora |
| :--- | :--- | :--- | :--- |
| **15 000 Kč** (prodloužený víkend v EU) | +480 Kč na kurzu | **0 Kč** | **480 Kč** |
| **40 000 Kč** (letní rodinná dovolená) | +1 280 Kč na kurzu | **0 – 150 Kč** | **až 1 280 Kč** |
| **100 000 Kč** (roční cesty & online nákupy) | +3 200 Kč na kurzu | **0 Kč** (při rozložení v měsících) | **3 200 Kč ročně** |

*Zlatý trik proti víkendovému příplatku 1 %:* O víkendu (kdy jsou světové devizové burzy zavřené) účtuje bezplatný tarif Standard přirážku 1 %. **Snadno se jí vyhnete** tím, že si v pátek odpoledne jedním klepnutím v aplikaci směníte potřebnou částku z CZK na EUR nebo USD — o víkendu už pak platíte z eurového zůstatku zcela bez poplatku!

## Bezpečnost, evropská bankovní licence a jednorázové karty

Revolut Bank UAB působí pod plnou **evropskou bankovní licencí (regulace v Litvě / ECB)** a vklady klientů jsou ze zákona pojištěny až do výše **100 000 EUR** (cca 2,5 mil. Kč).

Kromě zákonného pojištění nabízí funkce, které u běžných bank často chybí:
- **Jednorázové virtuální karty:** Po každé online platbě se číslo karty okamžitě zničí a vygeneruje se nové. Ideální pro neznámé e-shopy, zkušební předplatná i zahraniční nákupy.
- **Okamžité zmrazení karty i limitů** jedním klepnutím v aplikaci.
- **Společné účty a skupinové rozdělení útraty** (skvělé na chaty a dovolené s přáteli).

## Program RevPoints: Jak proměnit platby kartou v letenky

Revolut spustil propracovaný věrnostní program **RevPoints**, ve kterém sbíráte body za běžné platby kartou, plnění výzev v aplikaci nebo přes funkci „Drobné“ (zaokrouhlování plateb). Nasbírané RevPoints lze směnit 1:1 na:
- **Letecké míle** (Avios — British Airways, Iberia, Qatar Airways; Flying Blue — Air France, KLM; Turkish Airlines aj.)
- **Slevy na ubytování a zážitky** v sekci Revolut Stays & Experiences
- **eSIM mobilní data do zahraničí** přímo v aplikaci Revolut (mimo EU ušetříte stovky korun oproti roamingu českých operátorů!)

## Přehled tarifů Revolut: Stačí bezplatný Standard?

- **Standard (0 Kč / měs.):** Pro 90 % uživatelů naprosto dostačující — směna do 25 000 Kč/měs. bez poplatku ve všední dny, výběry z bankomatů do 4 500 Kč/měs. zdarma, virtuální i jednorázové karty.
- **Plus (cca 115 Kč / měs.):** Vyšší limity směny a základní pojištění nákupů.
- **Premium / Metal (od cca 220 / 350 Kč / měs.):** Neomezená směna měn, kvalitní cestovní pojištění, zvýhodněný sběr RevPoints a předplatná partnerů (např. NordVPN, Perplexity, Wolt+ či Financial Times dle aktuální nabídky tarifu).

Hledáte k Revolutu ideální český hlavní účet? Podívejte se na srovnání [Raiffeisenbank vs. Revolut](/porovnani/raiffeisenbank-vs-revolut).

## Přesný návod, jak získat bonus za založení Revolutu

Abyste získali přímou odměnu do své BONUSLY peněženky, postupujte přesně v tomto pořadí:
1. Přihlaste se na BONUSLY a přejděte na [detail nabídky Revolut](/nabidky/revolut).
2. Zaregistrujte si nový účet přes náš odkaz a ověřte totožnost dokladem (OP nebo pas).
3. Dobijte si peníze na Revolut (okamžitě platební kartou nebo bankovním převodem).
4. **Objednejte si fyzickou platební kartu Revolut** (přidat do Apple Pay / Google Pay ji můžete hned bez čekání na poštu).
5. **Proveďte 3 běžné platby kartou v minimální výši 100 Kč každá** (počítají se nákupy v obchodě či na e-shopech; nepočítají se převody, krypto ani nákup poukazů).

## Často kladené otázky

### Je vedení účtu Revolut opravdu zdarma?
Ano, základní tarif Standard stojí 0 Kč měsíčně bez nutnosti minimálního obratu. Jediným jednorázovým výdajem při splnění uvítací kampaně je poštovné za doručení fyzické platební karty (obvykle kolem 150–180 Kč).

### Jak se vyhnout 1% poplatku za směnu o víkendu?
Stačí si v pracovní den (pondělí až pátek) v aplikaci převést dostatečnou částku z korun na eura či dolary. Při víkendové platbě si pak Revolut strhne peníze přímo z cizoměnového podúčtu bez jakéhokoliv poplatku.

### Funguje u Revolutu české číslo účtu pro výplatu ze zaměstnání?
Revolut poskytuje evropský IBAN (LT), nikoliv klasické české číslo účtu s kódem banky za lomítkem. Proto je nejlepší používat Revolut jako druhou cestovatelskou a nákupní kartu po boku českého bezpoplatkového účtu (např. Raiffeisenbank, mBank nebo Air Bank).

### Počítají se platby přes Apple Pay / Google Pay do podmínky 3 plateb po 100 Kč?
Ano, platby digitální kartou Revolut přidanou v Apple Pay nebo Google Pay v běžných obchodech a e-shopech se plně počítají do splnění 3 požadovaných plateb.
    `.trim(),
  },
  {
    slug: "wolt-vs-foodora-kuryr-srovnani",
    title: "Wolt vs. Foodora kurýr 2026: Velké srovnání výdělků, směn a bonusů",
    excerpt:
      "Která rozvážková platforma platí v roce 2026 lépe? Porovnali jsme hodinové sazby, systém směn, pokrytí měst, aplikaci i vstupní bonusy Woltu a foodory.",
    featuredImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
    categorySlug: "extra-prijem",
    offerSlug: "wolt-kuryr",
    publishedAt: "2026-08-11",
    featured: false,
    keywords: [
      "wolt vs foodora kurýr",
      "kde si kurýr vydělá víc",
      "foodora vs wolt výdělek",
      "rozvoz jídla srovnání 2026",
    ],
    seoTitle: "Wolt vs. Foodora kurýr 2026: Kde vyděláte víc?",
    seoDescription:
      "Velké srovnání práce kurýra pro Wolt a foodoru v roce 2026: reálné hodinové sazby, volnost vs. směny, pokrytí měst a bonus 4 000 Kč.",
    content: `
Pokud uvažujete o rozvozu jídla a nákupů jako flexibilním přivýdělku nebo práci na plný úvazek, nevyhnutelně narazíte na dvě největší značky v Česku: finský **Wolt** a růžovou **foodoru** (dříve Dáme jídlo). Na první pohled dělají totéž, ale v každodenní praxi se zásadně liší způsobem plánování času, strukturou odměn i vstupními bonusy.

Podívejte se na přehledné srovnání obou platforem podle klíčových kritérií — a pokud chcete vidět i rychlou tabulku vedle sebe, mrkněte na náš [duel Wolt kurýr vs. foodora kurýr](/porovnani/wolt-kuryr-vs-foodora-kuryr).

## Přehledné srovnání Wolt vs. foodora (2026)

| Kritérium | Wolt kurýr | foodora kurýr |
| :--- | :--- | :--- |
| **Plánování pracovní doby** | **100 % volnost** — zapnete kdykoliv | Převážně předem rezervované bloky směn |
| **Průměrný výdělek (špičky)** | 320 – 450 Kč / hod | 260 – 380 Kč / hod |
| **Vstupní bonus pro nováčky** | **4 000 Kč** (kód CPCJPUX, 150 zakázek / 45 dní) | Sezónní náborové výzvy dle města |
| **Pokrytí menších měst v ČR** | Krajská a větší okresní města | **Nejširší pokrytí měst v celé ČR** |
| **Hodnocení kurýrů (skupiny)** | Rovný přístup bez přísných skupin | Systém skupin (lepší skupina = dřívější výběr směn) |
| **Výplata peněz** | Každý týden (úterý) | Týdně / dle smlouvy |

## 1. Flexibilita a plánování směn: Jasná výhoda pro Wolt

Největší rozdíl v každodenním fungování spočívá ve svobodě:
- **Wolt** nevyžaduje žádné plánování dopředu. Ráno svítí slunce a nechce se vám? Zůstanete doma bez jakékoliv penalizace. Odpoledne máte 2 hodiny okno mezi přednáškami? Přihlásíte se a jedete.
- **foodora** pracuje se systémem vypsaných směn a skupin kurýrů (tzv. batch systém). Kurýři v 1. skupině (s nejvyšší spolehlivostí a počtem odjetých víkendů) si vybírají nejlepší směny jako první. Pro pravidelné kurýry to přináší stabilní předvídatelnost, ale pro občasné brigádníky může být těžší chytit atraktivní večerní sloty.

## 2. Kde si vyděláte více peněz za hodinu?

Ve velkých městech (**Praha, Brno, Ostrava, Plzeň, Olomouc**) dosahují kurýři Woltu v obědových a večerních špičkách díky dynamickému oceňování vzdálenosti a multi-objednávkám (bundle) často **o 10 až 20 % vyšší hodinové sazby** než na foodoře, zvlášť pokud do celkového výdělku prvních týdnů započítáte i **startovací bonus 4 000 Kč** (v přepočtu **+26,6 Kč navíc za každou z prvních 150 objednávek!**).

Naopak v **menších městech**, kde má foodora dlouhodobou historii ještě z dob Dáme jídlo, bývá tok objednávek na foodoře stabilnější a prostoje kratší.

## 3. Aplikace, podpora a vybavení

- **Aplikace Wolt Partner** je dlouhodobě hodnocena jako stabilnější, rychlejší a přehlednější — okamžitě ukazuje trasu, cenu předem a živý chat podpory odpovídá během minut.
- **foodora** za poslední rok aplikaci výrazně vylepšila a profituje z vlastních prodejen **foodora Market**, které generují stálý proud objednávek i mimo klasické obědové a večerní časy restaurací.

## 4. Proč nejlepší kurýři používají obě aplikace současně (Multi-apping)

Žádná z platforem vám nezakazuje spolupracovat s oběma současně (pokud jezdíte jako nezávislý OSVČ nebo přes kompatibilní flotilu). Zkušení kurýři tento postup využívají běžně:
1. Nejprve začnou u **[Woltu s kódem CPCJPUX](/nabidky/wolt-kuryr)** a během prvních týdnů splní 150 objednávek pro jistý bonus **4 000 Kč**.
2. Následně si aktivují i **[foodoru](/nabidky/foodora-kuryr)** jako zálohu pro slabší dny nebo vybrané špičky s motivačními výzvami.
3. Jakmile přijmou zakázku v jedné aplikaci, druhou na 15 minut pozastaví, aby zákazník vždy dostal horké jídlo včas.

## 5. Reálné náklady kurýra a daňové rozdíly v roce 2026

Hrubá hodinová sazba z aplikace není čistý zisk. Než vyjedete pro Wolt nebo foodoru, spočítejte si skutečnou marži podle zvoleného dopravního prostředku a právní formy:

| Dopravní prostředek | Odhadované náklady (palivo + servis / km) | Typický čistý výdělek ve špičce (po nákladech) | Kdy dává největší smysl |
| :--- | :--- | :--- | :--- |
| **Elektrokolo / kolo** | 0,50 – 1,50 Kč / km | **290 – 410 Kč / hod** | Centra Prahy, Brna, Plzně, Olomouce |
| **Skútr do 125 ccm** | 2,00 – 3,00 Kč / km | **270 – 390 Kč / hod** | Širší centrum a rychlé příměstské přesuny |
| **Úsporný osobní automobil** | 4,50 – 6,50 Kč / km | **210 – 320 Kč / hod** | Okraje měst, večerní nákupy, déšť a zima |

Z hlediska smluvní formy si u obou platforem můžete vybrat ze dvou cest:
- **Vlastní živnost (OSVČ — hlavní nebo vedlejší):** Necháváte si **100 % fakturovaného výdělku** bez provize prostředníkovi. Pro studenty, zaměstnance a rodiče na rodičovské (vedlejší činnost) jsou zálohy na sociální a zdravotní pojištění v prvním roce výrazně nižší a v daňovém přiznání můžete uplatnit 60% výdajový paušál bez schovávání každé účtenky za benzín.
- **Partnerská flotila (DPP / DPČ):** Ideální na první 2–4 týdny na vyzkoušení, pokud nechcete hned zakládat IČO. Počítejte však s administrativní provizí flotily (zpravidla 10–15 % z obratu plus zákonné odvody nad limity DPP).

## 6. Nejčastější chyby nováčků u Woltu i foodory

1. **Nezadání promo kódu při prvotní registraci u Woltu:** Pokud registraci odešlete bez kódu **CPCJPUX**, nelze nárok na bonus 4 000 Kč zpětně doplnit.
2. **Jezdit mimo špičky (14:30 – 16:30):** V hluchých odpoledních hodinách čekáte na zakázku i 20 minut, čímž si zbytečně srážíte průměr. Soustřeďte se na 11:00–13:30 a 17:30–21:00, případně deštivé víkendy.
3. **Špatná správa směn u foodory:** Zrušení rezervované směny na poslední chvíli u foodory zhoršuje vaše hodnocení spolehlivosti a posouvá vás do nižší skupiny pro výběr budoucích směn.

## Verdikt: Kterou si vybrat jako první?

- **Zvolte Wolt**, pokud žijete ve větším městě, chcete absolutní volnost bez hlídání směn a chcete si v prvních 45 dnech připsat **jistý bonus 4 000 Kč navíc**.
- **Zvolte foodoru**, pokud žijete v menším městě bez Woltu nebo preferujete předem daný rozvrh směn s pravidelným vytížením.

## Často kladené otázky

### Mohu rozvážet pro Wolt i foodoru zároveň?
Ano, jako nezávislý kurýr na IČO nejste vázán exkluzivitou a můžete mít aktivní účty u obou služeb. Během doručování jedné objednávky je však nutné druhou aplikaci dočasně pozastavit, aby nedocházelo ke zpoždění.

### Která služba nabízí vyšší vstupní bonus v roce 2026?
Vyšší garantovaný vstupní bonus pro nové kurýry nabízí Wolt — celých 4 000 Kč po registraci s kódem CPCJPUX a odjetí 150 zakázek během prvních 45 dnů.

### Jaký dopravní prostředek je nejvýnosnější u obou platforem?
Po započtení nákladů na benzín, parkování a servis vychází dlouhodobě nejefektivněji elektrokolo (v centru města) nebo úsporný skútr do 125 ccm. Auto dává největší smysl na okraji měst a v zimním deštivém počasí.
    `.trim(),
  },
];
