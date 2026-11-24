import Link from "next/link";
import { auth } from "@/auth";

interface CashbackBannerProps {
  rewardAmount?: number | null;
  bonusText?: string | null;
  className?: string;
}

export async function CashbackBanner({
  rewardAmount,
  bonusText,
  className = "",
}: CashbackBannerProps) {
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  const isAuth = !!session?.user;
  const rewardDisplay = rewardAmount
    ? `${rewardAmount.toLocaleString("cs-CZ")} Kč`
    : bonusText || "peněžitou odměnu";

  if (isAuth) {
    return (
      <div
        className={`flex items-center gap-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 px-3.5 py-2.5 text-xs text-emerald-900 ${className}`}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
          ✓
        </span>
        <div className="flex-1">
          <span className="font-semibold">Cashback aktivní:</span> Po využití nabídky ti připíšeme{" "}
          <strong className="text-emerald-700 font-bold">{rewardDisplay}</strong> do tvé peněženky.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-amber-50/90 border border-amber-200/80 px-3.5 py-2.5 text-xs text-amber-900 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">🎁</span>
        <div>
          <span>Přihlas se a získej z této nabídky </span>
          <strong className="text-amber-800 font-bold">{rewardDisplay}</strong>
          <span> do své peněženky!</span>
        </div>
      </div>
      <Link
        href="/prihlaseni"
        className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2 shrink-0 self-start sm:self-auto"
      >
        Přihlásit se <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
