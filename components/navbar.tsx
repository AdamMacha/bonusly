import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { NavbarCategoriesMenu } from "./navbar-categories-menu";
import { Search } from "./search";
import { UserNav } from "./user-nav";

const navLinks = [
  { href: "/akce-a-kupony", label: "Akce & kupóny" },
  { href: "/kategorie/banky", label: "Banky" },
  { href: "/kategorie/finance", label: "Investice" },
  { href: "/porovnani", label: "Srovnání" },
  { href: "/blog", label: "Blog" },
];

const mobileLinks = [
  { href: "/nabidky", label: "Všechny nabídky" },
  ...navLinks,
  { href: "/jak-funguje-cashback", label: "Jak funguje cashback 50/50" },
  { href: "/kalkulacka-bonusu", label: "Kalkulačka bonusů" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/5">
      <nav aria-label="Hlavní navigace" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex shrink-0 items-center transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo-white.png"
                alt="BONUSLY — domovská stránka"
                width={140}
                height={39}
                className="h-7 w-auto object-contain"
                preload
              />
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              <NavbarCategoriesMenu />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:block">
              <Search />
            </div>
            <UserNav />
            <Link
              href="/nabidky"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-navy hover:bg-green-light transition-colors whitespace-nowrap"
            >
              Prozkoumat nabídky
            </Link>
            <MobileNav links={mobileLinks} />
          </div>
        </div>
      </nav>
    </header>
  );
}
