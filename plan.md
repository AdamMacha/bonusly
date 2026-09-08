# BONUSLY — kompletní specifikace projektu

## 1. ROLE

Jsi seniorní full-stack developer, software architect, UX/UI designer a SEO specialist.

Tvým úkolem je navrhnout a kompletně implementovat moderní, rychlý, škálovatelný a SEO-first webovou aplikaci **BONUSLY**.

Nechci pouze vizuální prototyp. Chci vytvořit reálně použitelný produkční web, který bude možné dlouhodobě rozvíjet, plnit obsahem, přidávat nové nabídky, publikovat články a monetizovat prostřednictvím affiliate/referral programů.

Před implementací:

1. Prozkoumej celý projekt.
2. Zkontroluj aktuální strukturu repozitáře.
3. Navrhni architekturu.
4. Pokud je potřeba něco změnit oproti této specifikaci z důvodu lepšího řešení, udělej to.
5. Než začneš psát velké množství kódu, vytvoř si jasný implementation plan.
6. Poté implementuj celý projekt systematicky.

Nevytvářej zbytečně komplikovanou architekturu. Preferuj jednoduché, robustní a dlouhodobě udržitelné řešení.

---

# 2. PRODUKT

## Název

**BONUSLY**

## Positioning

BONUSLY je moderní česká platforma, která na jednom místě pomáhá lidem objevovat:

* přivýdělky
* referral nabídky
* finanční produkty
* bankovní účty
* platební karty
* cashback
* registrační bonusy
* slevy
* promo akce
* další zajímavé finanční a spotřebitelské nabídky

Cílem není působit jako obyčejný affiliate katalog.

BONUSLY má působit jako:

> moderní digitální průvodce nejlepšími příležitostmi a výhodami.

Uživatel přijde na BONUSLY například z Googlu na článek:

„Jak si přivydělat jako Wolt kurýr?“

Zjistí informace → porovná možnosti → vybere nabídku → klikne na CTA → odejde přes affiliate/referral tracking link.

---

# 3. HLAVNÍ CÍLE

Priorita projektu:

1. SEO
2. rychlost
3. UX
4. důvěryhodnost
5. konverze
6. jednoduchá správa obsahu
7. škálovatelnost

Web musí být navržen tak, aby mohl v budoucnu obsahovat:

* stovky nabídek
* stovky článků
* desítky kategorií
* porovnávací stránky
* landing pages
* newsletter
* uživatelské hodnocení
* další affiliate programy
* případně uživatelský účet

---

# 4. TECHNOLOGICKÝ STACK

Použij moderní stabilní stack:

* Next.js
* App Router
* TypeScript
* React
* Tailwind CSS
* PostgreSQL
* Prisma ORM
* Resend
* Vercel-friendly architecture

Pokud je v projektu již nějaký vhodný stack nebo knihovny, zachovej je, pokud není důvod je měnit.

Používej Server Components všude, kde je to vhodné.

Client Components používej pouze tam, kde jsou skutečně potřeba.

---

# 5. DESIGN

BONUSLY musí působit jako moderní technologický/fintech produkt.

Inspirace:

* moderní SaaS
* fintech
* moderní startup
* Apple-like simplicity
* Linear
* Vercel
* Stripe
* Revolut

Nechci:

* přeplácaný affiliate web
* agresivní bannery
* staromódní design
* obrovské množství barev
* laciné gradienty
* stock fotografie lidí s penězi
* mince
* bankovky
* prasátka
* generické affiliate ikony

## Barevná identita

Primární:

* Dark Navy: `#0B1220`
* Green: `#22C55E`
* White: `#FFFFFF`

Sekundární barvy používej velmi střídmě.

Design musí fungovat perfektně v:

* desktopu
* tabletu
* mobilu

---

# 6. TYPOGRAFIE

Použij moderní sans-serif font.

Preferovaně:

* Geist

Alternativně:

* Inter
* Manrope
* Plus Jakarta Sans

Typografie musí mít jasnou hierarchii:

H1 → H2 → H3 → body → metadata → captions.

Nepoužívej zbytečně mnoho font weights.

---

# 7. HLAVNÍ NAVIGACE

Navrhni moderní sticky navbar.

Logo:

**BONUSLY**

Navigace například:

* Nabídky
* Přivýdělek
* Finance
* Banky
* Karty
* Bonusy
* Blog

CTA:

**Prozkoumat nabídky**

Na mobilu použij kvalitní mobile navigation.

Navbar musí být jednoduchý a velmi čistý.

---

# 8. HOMEPAGE

Homepage musí být výrazná a konverzní.

## Hero

Hlavní headline například ve stylu:

> Objev bonusy, přivýdělky a výhody, které se vyplatí.

Podheadline:

> Porovnáváme zajímavé nabídky, finanční produkty, přivýdělky a bonusy na jednom místě.

CTA:

**Prozkoumat nabídky**

Sekundární CTA:

**Přečíst blog**

Hero musí být velmi moderní.

Nechci klasický obrovský gradientový hero.

---

# 9. KATEGORIE NABÍDEK

Kategorie jsou záměrně navržené takto, ale architektura musí umožnit jejich budoucí změnu.

## 🛵 Přivýdělek

Příklady:

* Wolt kurýr
* foodora kurýr

Slug:

`privydelek`

---

## 💰 Finance

Příklady:

* Trading 212
* Revolut
* XTB
* Portu
* další

Slug:

`finance`

---

## 🏦 Banky

Příklady:

* Raiffeisenbank
* Air Bank
* Česká spořitelna
* ČSOB
* MONETA
* další

Slug:

`banky`

---

## 💳 Karty

Příklady:

* Revolut
* Curve
* Wise
* další

Slug:

`karty`

---

## 🎁 Bonusy

Tato kategorie může obsahovat:

* cashback
* registrační bonusy
* casino bonusy
* slevy
* promo akce
* časově omezené nabídky

Slug:

`bonusy`

---

Kategorie nesmí být hardcoded způsobem, který znemožní budoucí změny.

Kategorie musí být datový model.

---

# 10. NABÍDKY

Každá nabídka musí mít vlastní SEO-friendly stránku.

Například:

`/nabidky/wolt-kuryr`

`/nabidky/foodora-kuryr`

`/nabidky/trading-212`

`/nabidky/raiffeisenbank`

## Offer model

Navrhni vhodný Prisma model minimálně s těmito informacemi:

* id
* slug
* name
* shortDescription
* description
* category
* logo
* bonus
* bonusDescription
* requirements
* commission
* referralUrl
* affiliateUrl
* trackingSlug
* pros
* cons
* rating
* featured
* active
* verified
* lastVerifiedAt
* createdAt
* updatedAt
* seoTitle
* seoDescription

Model podle potřeby rozšiř.

---

# 11. OFFER PAGE

Každá nabídka musí být velmi kvalitní landing page.

Struktura například:

1. breadcrumb
2. logo
3. název
4. krátké vysvětlení
5. hlavní benefit
6. CTA
7. podmínky
8. jak nabídka funguje
9. pro koho je vhodná
10. výhody
11. nevýhody
12. detailní informace
13. FAQ
14. datum posledního ověření
15. související nabídky
16. související články

CTA například:

**Získat nabídku**

Kliknutí nesmí vést přímo na externí URL.

Použij interní tracking route:

`/go/[slug]`

která následně provede redirect.

To umožní v budoucnu sledovat:

* počet kliknutí
* konverzní poměr
* výkon jednotlivých nabídek
* zdroj návštěvy

---

# 12. TRACKING

Implementuj bezpečný systém:

`/go/[slug]`

Například:

`/go/wolt-kuryr`

Route najde nabídku v databázi a přesměruje uživatele na aktuální referral/affiliate URL.

Navrhni možnost ukládat click tracking.

Minimálně:

* offerId
* timestamp
* referrer
* UTM source
* UTM medium
* UTM campaign
* user agent / anonymizované informace podle potřeby
* případně session identifier

Respektuj privacy/GDPR.

Nepoužívej osobní údaje, pokud nejsou nezbytné.

---

# 13. BLOG

Blog je jedna z nejdůležitějších částí projektu.

Musí být navržen primárně pro SEO.

Route:

`/blog`

Jednotlivé články:

`/blog/[slug]`

Blog musí podporovat:

* title
* slug
* excerpt
* content
* featured image
* category
* author
* publishedAt
* updatedAt
* seoTitle
* seoDescription
* keywords
* canonicalUrl
* featured
* draft/published status

Obsah musí být možné snadno spravovat.

Pokud je vhodné použít MDX, použij MDX.

Pokud je pro dlouhodobou správu lepší databáze/CMS-like řešení, navrhni vhodnou architekturu.

Důležité je, aby přidání článku nevyžadovalo zásah do komponent.

---

# 14. SEO BLOG STRATEGIE

Architektura musí podporovat topic clusters.

Například:

## Wolt cluster

* Jak se stát Wolt kurýrem
* Kolik si vydělá Wolt kurýr
* Wolt kurýr zkušenosti
* Wolt kurýr Praha
* Wolt kurýr Brno
* Wolt kurýr podmínky
* Wolt vs foodora
* Wolt kurýr jako OSVČ
* Kolik stojí provoz Wolt kurýra

Všechny články musí být vzájemně interně prolinkované.

Stejný princip použij pro:

* foodora
* Bolt
* Trading 212
* XTB
* Portu
* Revolut
* banky
* platební karty
* cashback
* bonusy

---

# 15. SEO — ABSOLUTNÍ PRIORITA

Každá veřejná stránka musí mít:

* unique `<title>`
* meta description
* canonical URL
* Open Graph metadata
* Twitter/X metadata
* semantic HTML
* správnou heading hierarchy
* structured data tam, kde dává smysl
* breadcrumbs
* interní odkazy
* SEO-friendly URL

Implementuj JSON-LD schema podle typu stránky.

Například:

Homepage:

* Organization
* WebSite

Offer page:

* Product / Service podle vhodnosti
* FAQPage pokud obsahuje FAQ
* BreadcrumbList

Blog:

* Article
* BreadcrumbList

Kategorie:

* CollectionPage
* BreadcrumbList

---

# 16. STRUCTURED DATA

Implementuj reusable komponentu pro JSON-LD.

Musí být možné generovat například:

* Organization
* WebSite
* Article
* FAQPage
* BreadcrumbList
* ItemList

Structured data musí být validní.

Nepřidávej schema markup jen kvůli SEO, pokud obsah stránky daný typ skutečně nepodporuje.

---

# 17. SITEMAP

Implementuj automatickou:

`/sitemap.xml`

Musí obsahovat:

* homepage
* kategorie
* nabídky
* blog články

Dynamicky podle databáze.

Nechci ručně udržovaný sitemap seznam.

---

# 18. ROBOTS.TXT

Implementuj:

`/robots.txt`

Nastav správné indexování.

Admin/private části nesmí být indexované.

---

# 19. INTERNAL LINKING

Interní prolinkování je velmi důležité.

Články musí odkazovat na:

* relevantní nabídky
* kategorie
* další články

Offer pages musí odkazovat na:

* relevantní články
* kategorii
* podobné nabídky

Implementuj komponenty například:

* RelatedOffers
* RelatedArticles
* Breadcrumbs
* CategoryLinks

---

# 20. SEARCH

Web musí mít vyhledávání.

Uživatel může hledat například:

"Wolt"

"Revolut"

"banka"

"přivýdělek"

"Trading 212"

Vyhledávání musí prohledávat:

* nabídky
* články

Na mobilu musí být dobře použitelné.

Pokud není potřeba externí search engine, začni jednoduchým řešením vhodným pro PostgreSQL.

Architektura však musí umožnit pozdější přechod například na Algolia/Meilisearch/Typesense.

---

# 21. RESEND

Integruj **Resend**.

Použij ho především pro newsletter.

Na webu vytvoř newsletter signup.

Například:

> Chceš vědět o nových bonusech a zajímavých nabídkách?

Email:

`email@example.com`

CTA:

**Přihlásit odběr**

Použij Resend API.

API key musí být pouze v server-side environment variables.

Nikdy nevystavuj API key v klientském JavaScriptu.

---

# 22. NEWSLETTER

Navrhni newsletter systém tak, aby byl připravený na:

* welcome email
* potvrzení registrace
* nové nabídky
* nové články
* promo akce

Implementuj minimálně:

* signup form
* validaci emailu
* server action / API endpoint
* Resend integration
* success state
* error state

Mysli na GDPR a možnost odhlášení.

---

# 23. ADMIN / CONTENT MANAGEMENT

Potřebuji způsob, jak dlouhodobě spravovat:

* nabídky
* kategorie
* články

Pokud není v zadání dodán konkrétní CMS, navrhni nejlepší jednoduché řešení.

Priorita:

1. jednoduchost
2. bezpečnost
3. rychlost
4. SEO
5. snadná údržba

Admin část nesmí být veřejně indexovaná.

---

# 24. HOMEPAGE SECTIONS

Homepage může obsahovat:

### Hero

Silný headline + CTA.

### Featured offers

Například:

"Nejzajímavější nabídky"

3–6 nabídek.

### Categories

Karty:

Přivýdělek / Finance / Banky / Karty / Bonusy

### Popular offers

Nejnavštěvovanější nabídky.

### Latest articles

Poslední články z blogu.

### Why Bonusly

Například:

* Ověřené nabídky
* Přehledně na jednom místě
* Pravidelně aktualizujeme
* Bez zbytečného hledání

### Newsletter

CTA na odběr.

### Footer

Obsahuje:

* nabídky
* kategorie
* blog
* o BONUSLY
* kontakt
* podmínky
* ochranu soukromí
* cookies
* affiliate disclosure

---

# 25. TRUST / DŮVĚRYHODNOST

Protože web bude pracovat s financemi a affiliate nabídkami, musí působit důvěryhodně.

U každé nabídky zobraz:

**Ověřeno: [datum]**

Pokud je nabídka časově omezená, zobraz:

**Platí do: [datum]**

Přidej transparentní informaci:

> BONUSLY může získat provizi, pokud nabídku využijete prostřednictvím některých našich odkazů. Pro uživatele se cena nabídky tímto nemění.

Text musí být formulován profesionálně.

---

# 26. RESPONSIVE DESIGN

Web musí být mobile-first.

Velmi důležité:

* iPhone
* Android
* tablet
* desktop

Na mobilu:

* žádné horizontální scrollování
* CTA musí být snadno dostupné
* karty musí být přehledné
* navigace musí být jednoduchá
* tabulky musí být responzivní

---

# 27. PERFORMANCE

Cílem je výborné Core Web Vitals.

Priorita:

* LCP
* CLS
* INP

Používej:

* Next.js Image
* lazy loading
* server components
* caching
* static generation tam, kde dává smysl
* minimalizaci JavaScriptu
* optimalizované obrázky
* správné font loading

Neinstaluj zbytečné knihovny.

---

# 28. ACCESSIBILITY

Dodržuj:

* semantic HTML
* správné aria labels
* keyboard navigation
* focus states
* dostatečný contrast
* alt texty
* správnou heading hierarchy

Cílem je kvalitní WCAG-friendly implementace.

---

# 29. URL ARCHITEKTURA

Navrhni URL strukturu přibližně:

`/`

`/nabidky`

`/nabidky/[slug]`

`/kategorie/[slug]`

`/blog`

`/blog/[slug]`

`/go/[slug]`

`/o-nas`

`/kontakt`

`/podminky`

`/ochrana-soukromi`

`/cookies`

URL musí být:

* krátké
* čitelné
* SEO-friendly
* stabilní

---

# 30. KATEGORIE STRÁNKA

Například:

`/kategorie/privydelek`

Musí obsahovat:

* H1
* popis kategorie
* nabídky
* relevantní články
* FAQ
* interní odkazy

Kategorie stránka musí být sama o sobě hodnotná SEO landing page.

---

# 31. COMPARE

Architektura musí být připravená na budoucí porovnávání.

Například:

`/porovnani/wolt-vs-foodora`

`/porovnani/trading-212-vs-xtb`

`/porovnani/revolut-vs-wise`

Nemusíš nutně implementovat kompletní compare systém v první verzi, ale datový model a routing musí umožnit jeho budoucí přidání.

---

# 32. ANALYTICS

Architektura musí být připravená na:

* Google Analytics
* Google Search Console
* případně Vercel Analytics
* affiliate click tracking

Nezaváděj zbytečné trackovací skripty, které zpomalují web.

---

# 33. SECURITY

Dodržuj:

* server-side secrets
* environment variables
* input validation
* Zod nebo vhodnou validační knihovnu
* ochranu admin routes
* sanitizaci obsahu
* bezpečné redirecty

Referral URL nesmí být možné libovolně zadat uživatelem přes query parametr.

Používej pouze URL uložené v databázi.

---

# 34. DATABASE

Použij Prisma + PostgreSQL.

Navrhni čisté relační schéma minimálně pro:

* Category
* Offer
* Article
* Author
* Click
* NewsletterSubscriber

Podle potřeby přidej:

* Tag
* Comparison
* FAQ
* OfferUpdate
* AffiliateProgram

Datový model musí být normalizovaný, ale ne zbytečně komplikovaný.

---

# 35. SEED DATA

Vytvoř seed data pro první verzi.

Kategorie:

* Přivýdělek
* Finance
* Banky
* Karty
* Bonusy

Ukázkové nabídky:

### Přivýdělek

* Wolt kurýr
* foodora kurýr
* Bolt Food
* Bolt řidič
* Uber

### Finance

* Trading 212
* Revolut
* XTB
* Portu

### Banky

* Raiffeisenbank
* Air Bank
* Česká spořitelna
* ČSOB
* MONETA

### Karty

* Revolut
* Curve
* Wise

U těchto nabídek nepředstírej konkrétní aktuální bonusy nebo podmínky, pokud nejsou skutečně ověřené.

Použij placeholder data tam, kde je potřeba.

---

# 36. COMPONENT ARCHITECTURE

Vytvoř reusable komponenty například:

* Navbar
* Footer
* Hero
* OfferCard
* OfferGrid
* OfferHero
* CategoryCard
* CategoryGrid
* ArticleCard
* ArticleGrid
* Search
* SearchResults
* Breadcrumbs
* CTA
* NewsletterForm
* FAQ
* RelatedOffers
* RelatedArticles
* TrustBadge
* AffiliateDisclosure
* JsonLd
* Pagination

Komponenty musí být reusable.

Avoiduj obří komponenty o stovkách řádků.

---

# 37. ERROR / EMPTY STATES

Implementuj:

* 404
* loading states
* empty search
* empty category
* newsletter error
* newsletter success
* invalid offer
* invalid article

404 stránka musí být designově součástí BONUSLY.

---

# 38. SEO CONTENT ARCHITECTURE

Navrhni systém tak, aby SEO nebylo doděláno až na konci.

Každá stránka musí být vytvořena s ohledem na:

Search intent → content → internal links → CTA → conversion.

Například uživatel hledá:

"wolt kurýr výdělek"

→ přijde na článek

→ článek odkáže na Wolt nabídku

→ nabídka obsahuje CTA

→ `/go/wolt-kuryr`

---

# 39. CONTENT STRATEGY

Blog bude hlavním nástrojem organického trafficu.

V budoucnu chci publikovat například:

### Přivýdělek

* Jak si přivydělat po škole
* Nejlepší přivýdělky v Praze
* Wolt vs foodora
* Kolik si vydělá kurýr
* Nejlepší práce na IČO

### Finance

* Trading 212 zkušenosti
* Trading 212 vs XTB
* Jak začít investovat
* Nejlepší investiční aplikace
* Revolut zkušenosti

### Banky

* Nejlepší bankovní účet
* Raiffeisenbank zkušenosti
* Air Bank zkušenosti
* Bankovní účty zdarma

### Karty

* Nejlepší platební karty
* Revolut vs Wise
* Curve zkušenosti

### Bonusy

* Nejlepší registrační bonusy
* Cashback aplikace
* Jak získat cashback
* Nejlepší bonusy pro nové zákazníky

Architektura musí umožnit snadné vytváření dalších content clusters.

---

# 40. ADMIN UX

Pokud vytváříš vlastní admin, musí být maximálně jednoduchý.

Například:

Dashboard:

* počet nabídek
* počet článků
* počet kliknutí
* počet newsletter subscribers

Offers:

* seznam
* vytvořit
* editovat
* deaktivovat
* označit featured
* datum ověření

Articles:

* seznam
* draft
* published
* vytvořit
* editovat
* SEO metadata

---

# 41. COPYWRITING

Veškerý text na webu musí být:

* stručný
* sebevědomý
* moderní
* důvěryhodný
* český
* srozumitelný

Vyhýbej se marketingovým klišé.

Nechci texty typu:

„Nejlepší nabídky, které vám změní život!“

Preferuj:

„Porovnej nabídky a vyber tu, která dává smysl právě tobě.“

---

# 42. SEO TECHNICKÉ POŽADAVKY

Implementuj:

* dynamic metadata
* generateMetadata
* canonical
* sitemap
* robots
* OpenGraph
* Twitter cards
* JSON-LD
* breadcrumbs
* semantic HTML
* clean URLs
* pagination
* internal linking
* optimized images
* proper alt attributes

Zajisti, aby Google mohl bez problémů crawlovat všechny veřejné stránky.

---

# 43. NO BLACK-HAT SEO

Nepoužívej:

* keyword stuffing
* hidden text
* doorway pages
* automaticky generované nekvalitní články
* duplicitní obsah
* cloaking
* fake reviews

SEO musí být postavené na skutečně užitečném obsahu.

---

# 44. ARCHITEKTURA PRO BUDOUCNOST

Přemýšlej nad projektem jako nad dlouhodobým produktem.

V budoucnu může přibýt:

* uživatelské účty
* personalizované nabídky
* oblíbené nabídky
* hodnocení
* komentáře
* newsletter segmentation
* push notifications
* affiliate dashboard
* pokročilá analytika
* porovnávání produktů
* cashback tracking
* mobilní aplikace

Nemusíš nic z toho nyní implementovat.

Architektura ale nesmí jejich přidání zbytečně komplikovat.

---

# 45. CO OD TEBE OČEKÁVÁM

Nechci pouze vytvořit několik stránek.

Chci kompletní, konzistentní produkt.

Postup:

### FÁZE 1

Analyzuj projekt a vytvoř implementation plan.

### FÁZE 2

Navrhni databázové schéma.

### FÁZE 3

Implementuj základní design system.

### FÁZE 4

Implementuj layout:

* navbar
* footer
* responsive layout

### FÁZE 5

Implementuj homepage.

### FÁZE 6

Implementuj kategorie.

### FÁZE 7

Implementuj nabídky.

### FÁZE 8

Implementuj `/go/[slug]` tracking.

### FÁZE 9

Implementuj blog.

### FÁZE 10

Implementuj SEO infrastrukturu.

### FÁZE 11

Implementuj Resend + newsletter.

### FÁZE 12

Implementuj admin/content management.

### FÁZE 13

Implementuj analytics/tracking.

### FÁZE 14

Testování.

### FÁZE 15

SEO audit.

### FÁZE 16

Performance audit.

### FÁZE 17

Accessibility audit.

### FÁZE 18

Finální cleanup a production readiness.

---

# 46. QUALITY BAR

Výsledek musí vypadat jako skutečný startup/fintech produkt, který může být veřejně spuštěn.

Nechci:

* generický AI design
* přeplácané UI
* zbytečné animace
* obří gradienty
* náhodné komponenty
* nekonzistentní spacing
* nekonzistentní typography
* placeholder texty na veřejných stránkách
* fake data prezentovaná jako reálná
* broken links
* nefunkční formuláře

Chci:

* minimalistický design
* perfektní spacing
* kvalitní typography
* rychlost
* důvěryhodnost
* konzistentní komponenty
* kvalitní mobile UX
* výborné SEO
* čistý codebase

---

# 47. DŮLEŽITÉ ROZHODOVACÍ PRAVIDLO

Pokud narazíš na rozhodnutí, které není explicitně definováno v tomto promptu, vyber řešení, které je:

1. jednodušší
2. rychlejší
3. bezpečnější
4. SEO-friendly
5. dobře škálovatelné
6. snadno udržovatelné

Nevytvářej zbytečný enterprise overengineering.

---

# 48. FINÁLNÍ VÝSLEDEK

Po dokončení musí existovat:

* moderní homepage
* nabídky
* kategorie
* detail nabídky
* blog
* detail článku
* search
* newsletter
* Resend integration
* affiliate tracking
* SEO metadata
* sitemap
* robots.txt
* JSON-LD
* responsive design
* database
* Prisma
* admin/content management
* seed data
* error states
* loading states
* accessibility
* performance optimization

Celý projekt musí být připravený na nasazení na Vercel.

---

# 49. ZAČNI

Nezačínej okamžitě generovat náhodný UI kód.

Nejdříve:

1. Prozkoumej existující projekt.
2. Zhodnoť jeho současnou architekturu.
3. Vytvoř detailní implementation plan.
4. Identifikuj případné problémy nebo chybějící části.
5. Navrhni databázové schéma.
6. Poté začni implementovat.

Během implementace průběžně kontroluj:

* TypeScript errors
* lint errors
* build errors
* SEO
* responsive design
* accessibility
* performance

Po dokončení spusť build a oprav všechny chyby.

Neukončuj práci pouze proto, že aplikace „nějak funguje“. Výsledkem má být kvalitní production-ready základ pro dlouhodobě budovanou značku BONUSLY.
