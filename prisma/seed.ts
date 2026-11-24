import { PrismaClient } from "@prisma/client";
import { syncCollaborations } from "./sync-collaborations";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Začíná kompletní seedování databáze BONUSLY...");

  // 1. Vytvoření/aktualizace autora
  const author = await prisma.author.upsert({
    where: { slug: "redakce" },
    update: {
      name: "Redakce BONUSLY",
      bio: "Tým redaktorů a finančních specialistů portálu BONUSLY. Denně testujeme a ověřujeme výhodné nabídky, bonusy, slevové kódy a možnosti přivýdělku v ČR.",
      avatar: "/logo.png",
    },
    create: {
      name: "Redakce BONUSLY",
      slug: "redakce",
      bio: "Tým redaktorů a finančních specialistů portálu BONUSLY. Denně testujeme a ověřujeme výhodné nabídky, bonusy, slevové kódy a možnosti přivýdělku v ČR.",
      avatar: "/logo.png",
    },
  });

  // 2. Synchronizace všech 8 kategorií, 41 nabídek, 14 promo akcí a FAQ z Excelu
  const { categoryMap } = await syncCollaborations(prisma);

  const offerBySlug = new Map(
    (await prisma.offer.findMany({ select: { id: true, slug: true } })).map((o) => [o.slug, o.id])
  );

  const articles = [
    {
      slug: "jak-si-privydelat-jako-wolt-kuryr",
      title: "Jak si přivydělat jako Wolt kurýr: Kompletní průvodce a reálné výdělky",
      excerpt:
        "Přemýšlíte o rozvozu jídla s Woltem? Zjistěte, kolik si reálně vyděláte, jak funguje registrace, zda potřebujete IČO a jak získat vstupní bonus 4 000 Kč s kódem CPCJPUX.",
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
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "extra-prijem",
      offerSlug: "wolt-kuryr",
      publishedAt: new Date("2026-07-12"),
      featured: true,
      keywords: ["wolt kuryr", "privydelek rozvoz", "wolt kód CPCJPUX", "wolt bonus", "prace kuryr"],
      seoTitle: "Jak si přivydělat jako Wolt kurýr: Kód CPCJPUX a bonus 4 000 Kč",
      seoDescription:
        "Kompletní průvodce pro kurýry Wolt. Reálné výdělky, zkušenosti a startovací bonus 4 000 Kč s promo kódem CPCJPUX.",
    },
    {
      slug: "investown-investovani-do-nemovitosti-zkusenosti",
      title: "Investown zkušenosti: Jak investovat do nemovitostí od 500 Kč a získat bonus",
      excerpt:
        "Otestovali jsme českou platformu Investown. Přečtěte si, jak funguje zajištění úvěrů nemovitostmi, jaké jsou reálné výnosy a jak získat vstupní bonus 500 Kč.",
      content: `
Ceny nemovitostí v ČR jsou rekordně vysoké a nákup celého investičního bytu vyžaduje miliony korun. Crowdfundingová platforma Investown tento problém vyřešila: umožňuje drobným investorům podílet se na financování developerských a nemovitostních projektů už od 500 Kč s ročním výnosem okolo 8 až 10 % p.a.

## Jak Investown funguje?

Developeři potřebují úvěr na rekonstrukci nebo výstavbu nemovitosti. Investown projekt důkladně prověří, zastaví nemovitost a nabídne investorům možnost půjčit část peněz.

- **Minimální investice:** 500 Kč
- **Výnos:** Typicky 8 až 10,5 % ročně, vyplácený každý měsíc
- **Zajištění:** První zástavní právo na nemovitost s konzervativním LTV (Loan-to-Value)

## Jak získat bonus 500 Kč do začátku?

Při registraci zadejte promo kód **0G1ADBC5** a do 7 dní zainvestujte alespoň 5 000 Kč do libovolného projektu. Obratem získáte odměnu 500 Kč připsanou přímo na váš investorský účet.
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "finance",
      offerSlug: "investown",
      publishedAt: new Date("2026-07-22"),
      featured: true,
      keywords: ["investown zkusenosti", "investown bonus 0G1ADBC5", "investice do nemovitosti", "investown recenze"],
      seoTitle: "Investown recenze & bonus 500 Kč s kódem 0G1ADBC5",
      seoDescription:
        "Podrobná recenze platformy Investown. Jak funguje investování do nemovitostí od 500 Kč a jak získat vstupní bonus 500 Kč.",
    },
    {
      slug: "revolut-recenze-a-zkusenosti",
      title: "Revolut recenze a zkušenosti: Proč je to nejlepší karta na cesty a nákupy",
      excerpt:
        "Otestovali jsme kartu Revolut v zahraničí i doma. Zjistěte, jak ušetřit tisíce na poplatcích, jak fungují RevPoints a jak získat vstupní odměnu.",
      content: `
Pokud ještě platíte v zahraničí běžnou kartou od tradiční banky, přicházíte o 2 až 4 % z každé platby kvůli skrytým bankovním kurzovým přirážkám. Revolut tento problém odstraňuje.

## Co všechno Revolut umí?
- Směna více než 30 světových měn za mezibankovní středové kurzy
- Jednorázové virtuální karty pro 100% bezpečné nákupy na internetu
- Program RevPoints s možností sbírat body a směňovat je za letecké míle či slevy
- Okamžité platby mezi přáteli zdarma
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "banky",
      offerSlug: "revolut",
      publishedAt: new Date("2026-08-02"),
      featured: false,
      keywords: ["revolut recenze", "revolut zkusenosti", "revpoints", "karta do zahranici"],
      seoTitle: "Revolut recenze & zkušenosti: RevPoints a směna měn",
      seoDescription:
        "Jak ušetřit na směnách měn a jak získat virtuální karty zdarma. Kompletní recenze aplikace Revolut a programu RevPoints.",
    },
    {
      slug: "wolt-vs-foodora-kuryr-srovnani",
      title: "Wolt vs. Foodora kurýr: Velké srovnání výdělků a podmínek",
      excerpt:
        "Kde si jako kurýr vyděláte více peněz? Porovnali jsme hodinové sazby, plánování směn, aplikaci a bonusy obou největších rozvážkových služeb v Česku.",
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
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "extra-prijem",
      offerSlug: "wolt-kuryr",
      publishedAt: new Date("2026-08-11"),
      featured: false,
      keywords: ["wolt vs foodora", "kurýr srovnání", "kolik bere kurýr", "rozvoz jídla výdělek"],
      seoTitle: "Wolt vs Foodora kurýr: Kde si vyděláte víc? Srovnání 2026",
      seoDescription:
        "Detailní srovnání kurýrů pro Wolt a Foodora. Hodinové sazby, plánování směn, bonus 4 000 Kč a zkušenosti z praxe.",
    },
    {
      slug: "mbank-mkonto-recenze-bonus-1000",
      title: "mBank mKonto recenze: Jak získat bonus 1 000 Kč za platby kartou",
      excerpt:
        "Podrobný průvodce běžným účtem mKonto od mBank. Žádné poplatky za vedení, výběry zdarma a odměna 100 Kč za každou platbu kartou až do 1 000 Kč.",
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
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "banky",
      offerSlug: "mbank",
      publishedAt: new Date("2026-08-20"),
      featured: true,
      keywords: ["mbank recenze", "mkonto bonus 1000 kč", "mbank kód adamm1863", "účet bez poplatků"],
      seoTitle: "mBank mKonto recenze: Bonus 1 000 Kč s kódem adamm1863",
      seoDescription:
        "Recenze mKonto od mBank. Jak získat 100 Kč za každou platbu kartou celkem až 1 000 Kč s promo kódem adamm1863.",
    },
    {
      slug: "trading-212-akcie-zdarma-navod",
      title: "Trading 212 recenze a návod: Akcie a ETF bez poplatků + úročení hotovosti",
      excerpt:
        "Chcete investovat do světových akcií a ETF bez komisí? Přečtěte si náš podrobný návod k brokerovi Trading 212, zlomkovým akciím a dennímu úročení.",
      content: `
Broker **Trading 212** je v Evropě známý svým intuitivním rozhraním a nulovými komisemi za nákup a prodej akcií i ETF. Díky podpoře zlomkových akcií můžete investovat i malé částky už od 30 Kč.

## Hlavní přednosti Trading 212
- Nulové poplatky za nákup a prodej akcií i ETF
- Automatické investiční koláče (Pies) pro pravidelné investování
- Denní úročení neinvestované hotovosti v CZK, EUR i USD
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "finance",
      offerSlug: "trading-212",
      publishedAt: new Date("2026-08-28"),
      featured: false,
      keywords: ["trading 212 akcie zdarma", "trading 212 recenze", "akcie bez poplatku", "jak investovat"],
      seoTitle: "Trading 212 recenze 2026: Akcie a ETF bez poplatků",
      seoDescription:
        "Podrobný průvodce brokerem Trading 212: nulové komise za ETF a akcie, automatické koláče a denní úročení volných peněz.",
    },
    {
      slug: "jak-ziskat-tipsport-bonus-1300",
      title: "Jak získat Tipsport bonus 1 300 Kč: 300 Kč bez vkladu + 1 000 Kč přes pozvánku",
      excerpt:
        "Přečtěte si přesný návod, jak bezpečně získat uvítací bonus 1 300 Kč od sázkové kanceláře Tipsport a jak funguje program Přiveď kamaráda.",
      content: `
Sázková kancelář **Tipsport** nabízí jeden z nejštědřejších uvítacích bonusů na českém trhu: **300 Kč zdarma ihned** pouze za dokončení registrace bez nutnosti vkládat vlastní peníze, a navíc dalších **1 000 Kč** v rámci partnerského programu Přiveď kamaráda.

## Část 1: 300 Kč zdarma ihned (bez vkladu)
- Pro získání 300 Kč se stačí zaregistrovat online a ověřit totožnost přes BankID (trvá to cca 2 minuty).
- Peníze jsou připsány v Netech (1 Net = 1 Kč) ihned po schválení účtu.

## Část 2: Dalších 1 000 Kč přes osobní pozvánku
- Program Přiveď kamaráda umožňuje získat další bonus 1 000 Kč.
- Podmínkou je, že vám stávající ověřený člen zašle osobní pozvánku. Na našem webu stačí vyplnit formulář u nabídky Tipsport a pozvánku vám obratem zašleme do e-mailu.
      `.trim(),
      featuredImage:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&auto=format&fit=crop&q=80",
      categorySlug: "bonusy",
      offerSlug: "tipsport",
      publishedAt: new Date("2026-09-05"),
      featured: false,
      keywords: ["tipsport bonus 1300", "tipsport 300 kč zdarma", "tipsport pozvánka", "peníze zdarma za registraci"],
      seoTitle: "Jak získat Tipsport bonus 1 300 Kč zdarma (2026)",
      seoDescription:
        "Návod jak získat 300 Kč bez vkladu + 1 000 Kč přes osobní pozvánku od Tipsportu. Ověření přes BankID a okamžitý bonus.",
    },
  ];

  for (const a of articles) {
    const categoryId = categoryMap.get(a.categorySlug);
    if (!categoryId) continue;
    const offerId = offerBySlug.get(a.offerSlug) ?? null;

    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        featuredImage: a.featuredImage,
        categoryId,
        authorId: author.id,
        offerId,
        publishedAt: a.publishedAt,
        featured: a.featured,
        draft: false,
        keywords: a.keywords,
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
      },
      create: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        featuredImage: a.featuredImage,
        categoryId,
        authorId: author.id,
        offerId,
        publishedAt: a.publishedAt,
        featured: a.featured,
        draft: false,
        keywords: a.keywords,
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
      },
    });
  }

  console.log("✅ Kompletní seedování databáze BONUSLY dokončeno!");
}

main()
  .catch((e) => {
    console.error("❌ Chyba při seedování:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
