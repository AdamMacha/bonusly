import Link from "next/link";
import { BONUSLY_TOOLS } from "@/lib/tools-data";

interface ToolCrossLinksProps {
  currentToolId: string;
}

export function ToolCrossLinks({ currentToolId }: ToolCrossLinksProps) {
  const otherTools = BONUSLY_TOOLS.filter((tool) => tool.id !== currentToolId);

  return (
    <section className="mt-16 pt-10 border-t border-slate-200" aria-labelledby="other-tools-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2 id="other-tools-heading" className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
            Další finanční nástroje a kalkulačky
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Všechny kalkulačky BONUSLY zdarma, bez registrace a podle aktuálních pravidel 2026.
          </p>
        </div>
        <Link
          href="/nastroje"
          className="text-sm font-semibold text-green-dark hover:text-green transition-colors whitespace-nowrap"
        >
          Všechny nástroje →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-green/40 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 text-lg">
                  {tool.icon}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{tool.category}</span>
              </div>
              <h3 className="text-base font-bold text-navy group-hover:text-green-dark transition-colors">
                {tool.shortName}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-dark">
              Otevřít kalkulačku →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
