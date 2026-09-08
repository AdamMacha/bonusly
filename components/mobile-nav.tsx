"use client";

import { useState } from "react";
import Link from "next/link";
import { SocialLinks } from "./social-links";

interface MobileNavProps {
  links: { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-300 hover:text-white transition-colors"
        aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
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
        <div className="absolute top-16 left-0 right-0 bg-navy border-b border-white/5 animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/5 space-y-3">
              <Link
                href="/nabidky"
                onClick={() => setIsOpen(false)}
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
