"use client";

import { useState, useTransition } from "react";
import { triggerEhubSync } from "@/lib/actions/admin-wallet";

export function SyncEhubButton({ configured }: { configured: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSync = () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await triggerEhubSync(90);
      setFeedback({ ok: res.success, text: res.message });
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleSync}
        disabled={isPending || !configured}
        className="inline-flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-xs font-bold text-navy hover:bg-green-light transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
      >
        <span>{isPending ? "⏳" : "🔄"}</span>
        <span>{isPending ? "Synchronizuji z eHUB API..." : "Synchronizovat z eHUB API"}</span>
      </button>
      {!configured && (
        <p className="text-[11px] text-amber-700">
          Doplňte <code className="font-mono">EHUB_API_KEY</code> do proměnných prostředí.
        </p>
      )}
      {feedback && (
        <p
          className={`text-xs font-medium rounded-lg px-3 py-1.5 ${
            feedback.ok
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}
