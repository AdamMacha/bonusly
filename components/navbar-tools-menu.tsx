"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BONUSLY_TOOLS } from "@/lib/tools-data";

export function NavbarToolsMenu() {
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
        aria-controls="nav-tools-panel"
        onClick={() => {
          if (open && !pinned) {
            setPinned(true);
          } else {
            setOpen((v) => !v);
            setPinned((v) => !v);
          }
        }}
        className="inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 whitespace-nowrap cursor-pointer"
      >
        <span>Nástroje</span>
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
          id="nav-tools-panel"
          className="absolute left-0 top-full pt-2 z-50 w-[26rem]"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Finanční kalkulačky ({BONUSLY_TOOLS.length})
              </span>
              <Link
                href="/nastroje"
                onClick={closeMenu}
                className="text-xs font-bold text-green-dark hover:text-green transition-colors"
              >
                Všechny nástroje →
              </Link>
            </div>

            <ul className="space-y-1">
              {BONUSLY_TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200/80 text-base"
                      >
                        {tool.icon}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-navy group-hover:text-green-dark transition-colors truncate">
                          {tool.shortName}
                        </span>
                        <span className="block text-[11px] text-slate-400 truncate">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                    {tool.badge && (
                      <span className="shrink-0 rounded-full bg-green/15 px-2 py-0.5 text-[10px] font-bold text-green-dark">
                        {tool.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
