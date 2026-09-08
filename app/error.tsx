"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-navy mb-2">Něco se pokazilo</h1>
      <p className="text-slate-500 mb-8 max-w-md">
        Omlouváme se za potíže. Zkuste to prosím znovu.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-green px-6 py-3 text-sm font-semibold text-navy hover:bg-green-light transition-colors"
      >
        Zkusit znovu
      </button>
    </div>
  );
}
