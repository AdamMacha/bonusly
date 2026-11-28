"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface NavCategoryLink {
  href: string;
  label: string;
  icon: string;
}

export const NAV_CATEGORIES: NavCategoryLink[] = [
  { href: "/kategorie/banky", label: "Banky & Účty", icon: "🏦" },
  { href: "/kategorie/finance", label: "Investice & Finance", icon: "📈" },
  { href: "/kategorie/extra-prijem", label: "Extra příjem", icon: "🛵" },
  { href: "/kategorie/pojisteni-a-sluzby", label: "Energie, Pojištění & Tarify", icon: "⚡" },
  { href: "/kategorie/elektro", label: "Elektro & Apple", icon: "📱" },
  { href: "/kategorie/moda-a-doplnky", label: "Móda & Doplňky", icon: "👗" },
  { href: "/kategorie/krasa-a-zdravi", label: "Zdraví, Krása & Jídlo", icon: "🌿" },
  { href: "/kategorie/dum-a-zahrada", label: "Dům, Zahrada & Auto", icon: "🏡" },
  { href: "/kategorie/nakupy-a-volny-cas", label: "Šperky, Sport & Děti", icon: "🛍️" },
  { href: "/kategorie/zvirata-a-darky", label: "Dárky, Zvířata & Ostatní", icon: "🐾" },
  { href: "/kategorie/bonusy", label: "Bonusy & Slevové kódy", icon: "🎁" },
];

export function NavbarCategoriesMenu() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPinned(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setPinned(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setOpen(true);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (!pinned) {
      setOpen(false);
    }
  };

  const handleFocusOut = (e: React.FocusEvent) => {
    if (
      e.relatedTarget &&
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setOpen(false);
      setPinned(false);
    }
  };

  const closeMenu = () => {
    setOpen(false);
    setPinned(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={handleFocusOut}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-categories-panel"
        onClick={() => {
          if (open && !pinned) {
            setPinned(true);
          } else {
            setOpen((v) => !v);
            setPinned((v) => !v);
          }
        }}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 whitespace-nowrap cursor-pointer"
      >
        <span>Nabídky</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? "rotate-180 text-white" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          id="nav-categories-panel"
          className="absolute left-0 top-full pt-2 z-50 w-[30rem]"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Kategorie nabídek (11)
              </span>
              <Link
                href="/nabidky"
                onClick={closeMenu}
                className="text-xs font-bold text-green-dark hover:text-green transition-colors"
              >
                Všechny nabídky →
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-1">
              {NAV_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-navy hover:bg-slate-50 hover:text-green-dark transition-colors"
                  >
                    <span aria-hidden="true" className="text-sm shrink-0">
                      {cat.icon}
                    </span>
                    <span className="truncate">{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href="/jak-funguje-cashback"
                onClick={closeMenu}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
              >
                <span aria-hidden="true">💰</span>
                Jak funguje cashback 50/50
              </Link>
              <Link
                href="/nastroje"
                onClick={closeMenu}
                className="text-xs font-semibold text-slate-500 hover:text-navy transition-colors"
              >
                🧮 Všechny nástroje →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
