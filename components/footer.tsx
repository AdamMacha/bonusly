import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  nabidky: [
    { href: "/kategorie/privydelek", label: "Přivýdělek" },
    { href: "/kategorie/finance", label: "Finance" },
    { href: "/kategorie/banky", label: "Banky" },
    { href: "/kategorie/bonusy", label: "Bonusy" },
  ],
  informace: [
    { href: "/o-nas", label: "O BONUSLY" },
    { href: "/porovnani", label: "Srovnání" },
    { href: "/blog", label: "Blog" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  pravni: [
    { href: "/podminky", label: "Podmínky" },
    { href: "/ochrana-soukromi", label: "Ochrana soukromí" },
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
            <Link href="/" className="inline-block bg-white/95 hover:bg-white transition-all px-2.5 py-1.5 rounded-lg shadow-sm">
              <Image
                src="/logo.png"
                alt="BONUSLY"
                width={120}
                height={30}
                className="h-6 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Porovnáváme nabídky, přivýdělky a finanční produkty na jednom místě.
            </p>
          </div>

          {/* Nabídky */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Nabídky</h3>
            <ul className="space-y-2.5">
              {footerLinks.nabidky.map((link) => (
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
            <h3 className="text-sm font-semibold text-white mb-4">Informace</h3>
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
            <h3 className="text-sm font-semibold text-white mb-4">Právní</h3>
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
            BONUSLY může získat provizi, pokud nabídku využijete prostřednictvím některých našich odkazů. Pro uživatele se cena nabídky tímto nemění. Všechny informace na webu jsou pouze informativní a nepředstavují finanční poradenství.
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
