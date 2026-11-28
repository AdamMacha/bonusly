"use client";

import { useState } from "react";
import { trackPromoCodeCopy } from "@/lib/analytics";

interface CopyCodeButtonProps {
  code: string;
  offerSlug?: string;
  size?: "sm" | "md";
  className?: string;
}

export function CopyCodeButton({
  code,
  offerSlug,
  size = "md",
  className = "",
}: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
    trackPromoCodeCopy({ promoCode: code, offerSlug });
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Zkopírovat slevový kód ${code}`}
      className={`inline-flex items-center gap-2 rounded-lg border-2 border-dashed font-mono font-bold transition-all cursor-pointer active:scale-[0.98] ${
        copied
          ? "border-green bg-green/15 text-green-dark"
          : "border-green/50 bg-white text-navy hover:border-green hover:bg-green/5"
      } ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-sm"} ${className}`}
    >
      <span className="tracking-wider">{code}</span>
      <span
        className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-sans text-[11px] font-semibold ${
          copied ? "bg-green text-navy" : "bg-slate-100 text-slate-600"
        }`}
      >
        {copied ? "Zkopírováno ✓" : "Kopírovat"}
      </span>
    </button>
  );
}
