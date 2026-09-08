"use client";

interface AdminDeleteButtonProps {
  label: string;
  confirmMessage: string;
}

export function AdminDeleteButton({ label, confirmMessage }: AdminDeleteButtonProps) {
  return (
    <button
      type="submit"
      className="rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
