"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Úspěšně přihlášeno!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Něco se pokazilo.");
      }
    } catch {
      setStatus("error");
      setMessage("Nepodařilo se odeslat. Zkuste to znovu.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green/5 border border-green/20 p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green mx-auto mb-3">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
        <p className="font-medium text-green-dark">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vas@email.cz"
        required
        className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:border-green focus:ring-1 focus:ring-green/20 transition-colors"
        aria-label="Email pro newsletter"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-green px-6 py-3 text-sm font-semibold text-navy hover:bg-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status === "loading" ? "Odesílám..." : "Přihlásit odběr"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 sm:absolute sm:bottom-0 sm:translate-y-full sm:pt-1">{message}</p>
      )}
    </form>
  );
}
