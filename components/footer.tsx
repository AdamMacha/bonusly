import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "./social-links";

const footerLinks = {
  kategorie: [
    { href: "/kategorie/extra-prijem", label: "Extra příjem" },
    { href: "/kategorie/banky", label: "Banky & Účty" },
    { href: "/kategorie/finance", label: "Investice & Finance" },
    { href: "/kategorie/pojisteni-a-sluzby", label: "Energie, Pojištění & Tarify" },
    { href: "/kategorie/elektro", label: "Elektro & Apple" },
    { href: "/kategorie/dum-a-zahrada", label: "Dům, Zahrada & Auto" },
    { href: "/kategorie/nakupy-a-volny-cas", label: "Šperky, Sport & Děti" },
    { href: "/kategorie/moda-a-doplnky", label: "Móda & Doplňky" },
    { href: "/kategorie/krasa-a-zdravi", label: "Zdraví, Krása & Jídlo" },
    { href: "/kategorie/zvirata-a-darky", label: "Dárky, Zvířata & Ostatní" },
    { href: "/kategorie/bonusy", label: "Bonusy & Slevové kódy" },
  ],
  informace: [
    { href: "/nabidky", label: "Všechny nabídky" },
    { href: "/akce-a-kupony", label: "Akce a slevové kódy" },
    { href: "/jak-funguje-cashback", label: "Jak funguje cashback 50/50" },
    { href: "/kalkulacka-bonusu", label: "Kalkulačka bonusů 2026" },
    { href: "/nejlepsi-bankovni-bonusy-2026", label: "Bankovní bonusy 2026" },
    { href: "/investicni-bonusy-2026", label: "Investiční bonusy 2026" },
    { href: "/porovnani", label: "Srovnání nabídek" },
    { href: "/blog", label: "Blog & Magazín" },
  ],
  pravni: [
    { href: "/jak-hodnotime", label: "Jak hodnotíme nabídky" },
    { href: "/o-nas", label: "O BONUSLY & provozovatel" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/podminky", label: "Podmínky použití" },
    { href: "/ochrana-soukromi", label: "Ochrana soukromí (GDPR)" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo-white.png"
                alt="BONUSLY"
                width={150}
                height={42}
                loading="lazy"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Porovnáváme ověřené bonusy, slevové kódy, investice, pojištění, energie a možnosti extra příjmu na jednom místě.
            </p>
            <div className="mt-5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Sledujte nás
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Kategorie */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Kategorie nabídek</h2>
            <ul className="space-y-2">
              {footerLinks.kategorie.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informace */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Objevujte</h2>
            <ul className="space-y-2.5">
              {footerLinks.informace.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Právní */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Právní</h2>
            <ul className="space-y-2.5">
              {footerLinks.pravni.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
            BONUSLY může získat provizi, pokud nabídku využijete prostřednictvím některých našich partnerských odkazů. Pro uživatele se cena nabídky tímto nemění. Všechny informace na webu jsou pouze informativní a nepředstavují finanční ani investiční poradenství.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} BONUSLY. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
