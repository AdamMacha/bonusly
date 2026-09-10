import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { Search } from "./search";

const navLinks = [
  { href: "/nabidky", label: "Nabídky" },
  { href: "/kategorie/extra-prijem", label: "Extra příjem" },
  { href: "/kategorie/finance", label: "Finance" },
  { href: "/kategorie/banky", label: "Banky" },
  { href: "/kategorie/bonusy", label: "Bonusy" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 bg-white/95 hover:bg-white transition-all px-2.5 py-1 rounded-lg shadow-sm"
            >
              <Image
                src="/logo.png"
                alt="BONUSLY"
                width={120}
                height={30}
                className="h-6 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Search />
            </div>
            <Link
              href="/nabidky"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2 text-sm font-medium text-navy hover:bg-green-light transition-colors"
            >
              Prozkoumat nabídky
            </Link>
            <MobileNav links={navLinks} />
          </div>
        </div>
      </nav>
    </header>
  );
}
