"use client";

import { useState } from "react";

export interface OfferReviewItem {
  id: string;
  authorName: string;
  rating: number;
  comment: string | null;
  bonusReceived: boolean;
  daysToReceive: number | null;
  createdAt: string;
}

interface OfferReviewsProps {
  offerSlug: string;
  offerName: string;
  initialReviews: OfferReviewItem[];
}

export function OfferReviews({
  offerSlug,
  offerName,
  initialReviews,
}: OfferReviewsProps) {
  const [reviews, setReviews] = useState<OfferReviewItem[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [bonusReceived, setBonusReceived] = useState(true);
  const [daysToReceive, setDaysToReceive] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  const daysList = reviews
    .map((r) => r.daysToReceive)
    .filter((d): d is number => typeof d === "number" && d >= 0);
  const avgDays =
    daysList.length > 0
      ? Math.round(daysList.reduce((sum, d) => sum + d, 0) / daysList.length)
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerSlug,
          authorName,
          rating,
          comment,
          bonusReceived,
          daysToReceive: daysToReceive.trim() ? Number(daysToReceive) : null,
          website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Nepodařilo se odeslat hodnocení.");
      } else {
        if (data.review) {
          setReviews((prev) => [data.review, ...prev]);
        }
        setSubmitted(true);
        setAuthorName("");
        setComment("");
        setDaysToReceive("");
      }
    } catch {
      setError("Chyba připojení. Zkuste to prosím znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="zkusenosti"
      aria-labelledby="reviews-heading"
      className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 id="reviews-heading" className="text-xl font-bold text-navy">
            Zkušenosti a hodnocení uživatelů — {offerName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Využili jste tuto nabídku nebo slevový kód? Podělte se o reálnou zkušenost.
          </p>
        </div>

        {avgRating !== null && (
          <div className="flex items-center gap-4 shrink-0 rounded-xl bg-amber-50/70 border border-amber-200/70 px-4 py-2.5">
            <div className="text-center">
              <div className="text-2xl font-black text-navy">{avgRating.toFixed(1)}</div>
              <div className="text-[11px] font-semibold text-amber-700">★ z 5 ({reviews.length})</div>
            </div>
            {avgDays !== null && (
              <div className="border-l border-amber-200 pl-4 text-xs text-slate-600">
                <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                  Prům. připsání
                </span>
                <strong className="text-navy font-bold">
                  {avgDays === 0 ? "Ihned" : `${avgDays} dní`}
                </strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Existing community reviews */}
      {reviews.length > 0 && (
        <div className="mt-6 space-y-4">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-navy">{rev.authorName}</span>
                  <span
                    className="text-xs font-bold text-amber-500"
                    aria-label={`Hodnocení ${rev.rating} z 5`}
                  >
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  {rev.bonusReceived && (
                    <span className="rounded-full bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 font-semibold text-emerald-700">
                      ✓ Bonus/sleva potvrzena
                    </span>
                  )}
                  {typeof rev.daysToReceive === "number" && (
                    <span className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-slate-600">
                      Připsáno: {rev.daysToReceive === 0 ? "ihned" : `za ${rev.daysToReceive} dní`}
                    </span>
                  )}
                  <time dateTime={rev.createdAt}>
                    {new Date(rev.createdAt).toLocaleDateString("cs-CZ")}
                  </time>
                </div>
              </div>
              {rev.comment && (
                <p className="text-sm text-slate-600 leading-relaxed">{rev.comment}</p>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Submission form */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        {submitted ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900">
            <strong>Děkujeme za hodnocení!</strong> Vaše reálná zkušenost byla zveřejněna a pomůže dalším uživatelům.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-sm font-bold text-navy">
              Získal(a) jsi bonus nebo slevu? Ohodnoť nabídku:
            </h3>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1" role="radiogroup" aria-label="Počet hvězdiček">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`${star} z 5 hvězdiček`}
                    className={`text-2xl leading-none transition-transform hover:scale-110 cursor-pointer ${
                      star <= rating ? "text-amber-400" : "text-slate-200"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2 text-xs font-semibold text-slate-600">{rating} / 5</span>
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bonusReceived}
                  onChange={(e) => setBonusReceived(e.target.checked)}
                  className="rounded border-slate-300 text-green focus:ring-green"
                />
                <span>Bonus / sleva mi úspěšně fungovala</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="review-author" className="block text-xs font-medium text-slate-600 mb-1">
                  Vaše jméno nebo přezdívka *
                </label>
                <input
                  id="review-author"
                  type="text"
                  required
                  minLength={2}
                  maxLength={60}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Např. Petr K."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="review-days" className="block text-xs font-medium text-slate-600 mb-1">
                  Za kolik dní bonus přišel? (volitelné, 0 = ihned)
                </label>
                <input
                  id="review-days"
                  type="number"
                  min={0}
                  max={365}
                  value={daysToReceive}
                  onChange={(e) => setDaysToReceive(e.target.value)}
                  placeholder="Např. 7"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="review-comment" className="block text-xs font-medium text-slate-600 mb-1">
                Krátká zkušenost (volitelné)
              </label>
              <textarea
                id="review-comment"
                rows={2}
                maxLength={600}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Jak proběhlo založení nebo uplatnění kódu?"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none"
              />
            </div>

            {error && <p className="text-xs font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-light transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting ? "Odesílám..." : "Odeslat hodnocení"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
