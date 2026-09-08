"use client";

import { useTransition } from "react";
import { toggleArticleCarousel } from "@/lib/actions/articles";

interface AdminCarouselToggleProps {
  articleId: string;
  isFeatured: boolean;
  size?: "sm" | "default";
}

export function AdminCarouselToggle({
  articleId,
  isFeatured,
  size = "default",
}: AdminCarouselToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleArticleCarousel(articleId);
    });
  };

  if (isFeatured) {
    return (
      <button
        type="button"
        disabled={isPending}
        onClick={handleToggle}
        title="Kliknutím odeberete článek z Hero carouselu"
        className={`group inline-flex items-center gap-1.5 rounded-lg border transition-all cursor-pointer ${
          isPending
            ? "opacity-60 cursor-wait bg-slate-100 border-slate-200 text-slate-500"
            : "bg-emerald-50 border-emerald-300/80 text-emerald-800 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 shadow-sm"
        } ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"} font-semibold`}
      >
        {isPending ? (
          <span className="inline-block animate-spin">⏳</span>
        ) : (
          <>
            <span className="group-hover:hidden">⭐ V carouselu</span>
            <span className="hidden group-hover:inline">✕ Odebrat</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleToggle}
      title="Kliknutím přidáte článek do Hero carouselu na homepage"
      className={`inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 bg-slate-50/80 transition-all cursor-pointer ${
        isPending
          ? "opacity-60 cursor-wait text-slate-400"
          : "text-slate-600 hover:border-emerald-400 hover:bg-emerald-50/80 hover:text-emerald-700"
      } ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"} font-medium`}
    >
      {isPending ? (
        <span className="inline-block animate-spin">⏳</span>
      ) : (
        <span>+ Do carouselu</span>
      )}
    </button>
  );
}
