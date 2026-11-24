interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
}

export function Faq({ items, title }: FaqProps) {
  if (items.length === 0) return null;

  const headingId = title ? "faq-heading" : undefined;

  return (
    <section aria-labelledby={headingId} aria-label={headingId ? undefined : "Často kladené otázky"}>
      {title && (
        <h2 id={headingId} className="text-2xl font-bold text-navy tracking-tight mb-6">
          {title}
        </h2>
      )}
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            open={i === 0}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors open:border-green/30 open:shadow-xs"
          >
            <summary className="flex w-full cursor-pointer list-none items-center justify-between px-5 py-4 text-left font-medium text-navy hover:bg-slate-50/70 transition-colors [&::-webkit-details-marker]:hidden">
              <span className="pr-4">{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-green-dark"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
