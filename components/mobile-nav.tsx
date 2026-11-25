"use client";

import { useState } from "react";
import Link from "next/link";
import { SocialLinks } from "./social-links";
import { NAV_CATEGORIES } from "./navbar-categories-menu";

interface MobileNavProps {
  links: { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);

  const closeAll = () => {
    setIsOpen(false);
    setCatsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
        aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          className="w-6 h-6"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-navy border-b border-white/5 animate-slide-down shadow-2xl">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Expandable 11 Categories */}
            <div>
              <button
                type="button"
                onClick={() => setCatsOpen((v) => !v)}
                aria-expanded={catsOpen}
                aria-controls="mobile-nav-categories"
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <span>Kategorie nabídek ({NAV_CATEGORIES.length})</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`w-4 h-4 transition-transform ${catsOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {catsOpen && (
                <ul
                  id="mobile-nav-categories"
                  className="mt-1 ml-2 pl-2 border-l border-white/10 grid grid-cols-1 gap-0.5"
                >
                  {NAV_CATEGORIES.map((cat) => (
                    <li key={cat.href}>
                      <Link
                        href={cat.href}
                        onClick={closeAll}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <span aria-hidden="true">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/dashboard"
              onClick={closeAll}
              className="block px-4 py-3 text-sm font-semibold text-emerald-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              💰 Moje peněženka & odměny
            </Link>
            <div className="pt-3 border-t border-white/5 space-y-3">
              <Link
                href="/nabidky"
                onClick={closeAll}
                className="block text-center rounded-lg bg-green px-4 py-3 text-sm font-medium text-navy hover:bg-green-light transition-colors"
              >
                Prozkoumat nabídky
              </Link>
              <div className="flex items-center justify-center pt-2">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
