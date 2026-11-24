"use client";

import { useState } from "react";
import { createManualTransaction, importTransactionsCsv } from "@/lib/actions/admin-wallet";

interface UserOption {
  id: string;
  email: string;
  name?: string | null;
}

interface OfferOption {
  id: string;
  name: string;
}

interface ManualTransactionFormProps {
  users: UserOption[];
  offers: OfferOption[];
}

export function ManualTransactionForm({ users, offers }: ManualTransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"single" | "csv">("single");

  // Single form state
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("APPROVED");
  const [description, setDescription] = useState("");
  const [offerId, setOfferId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; errors?: string[] } | null>(null);

  // CSV form state
  const [csvText, setCsvText] = useState("");

  async function handleSingleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("userId", selectedUser);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("offerId", offerId);

    try {
      const res = await createManualTransaction(formData);
      if (res?.error) {
        setMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setMessage({ type: "success", text: res.message });
        setAmount("");
        setDescription("");
        setOfferId("");
        setTimeout(() => setIsOpen(false), 2000);
      }
    } catch {
      setMessage({ type: "error", text: "Chyba při odesílání formuláře." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCsvSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await importTransactionsCsv(formData);
      if (res?.error) {
        setMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setMessage({
          type: "success",
          text: res.message,
          errors: res.errors,
        });
        setCsvText("");
      }
    } catch {
      setMessage({ type: "error", text: "Chyba při importu CSV souboru." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mb-8">
      {!isOpen ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("single");
              setIsOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-bold text-navy hover:bg-green-light transition-all shadow-sm cursor-pointer"
          >
            <span>➕ Přidat manuální odměnu</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("csv");
              setIsOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
          >
            <span>📁 Hromadný CSV import z eHUBu</span>
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab("single")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === "single"
                    ? "bg-navy text-white"
                    : "text-slate-500 hover:text-navy hover:bg-slate-100"
                }`}
              >
                Jednotlivá odměna
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("csv")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === "csv"
                    ? "bg-navy text-white"
                    : "text-slate-500 hover:text-navy hover:bg-slate-100"
                }`}
              >
                📁 Hromadný CSV import (eHUB)
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-navy cursor-pointer"
            >
              ✕ Zavřít
            </button>
          </div>

          {message && (
            <div
              className={`mb-4 rounded-xl p-3.5 text-xs sm:text-sm ${
                message.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <p className="font-semibold">{message.text}</p>
              {message.errors && message.errors.length > 0 && (
                <ul className="mt-1 list-disc list-inside text-xs text-slate-600">
                  {message.errors.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "single" ? (
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Uživatel *
                  </label>
                  <select
                    required
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20"
                  >
                    <option value="">-- Vyberte uživatele --</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name ? `${u.name} (${u.email})` : u.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Částka (Kč) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="1"
                    required
                    placeholder="např. 250"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Stav transakce *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20"
                  >
                    <option value="APPROVED">Schváleno (okamžitě přičíst na zůstatek)</option>
                    <option value="PENDING">Čekající (zobrazit v čekajících odměnách)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Přiřazená nabídka (volitelné)
                  </label>
                  <select
                    value={offerId}
                    onChange={(e) => setOfferId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20"
                  >
                    <option value="">-- Žádná konkrétní nabídka --</option>
                    {offers.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Popis / Poznámka k odměně
                </label>
                <input
                  type="text"
                  placeholder="např. Manuální bonus za kampaň Wolt nebo speciální soutěž"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-navy focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-green px-5 py-2 text-xs font-bold text-navy hover:bg-green-light shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Vytvářím..." : "Uložit transakci"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCsvSubmit} className="space-y-4">
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs text-slate-600 leading-relaxed">
                <strong>Jak importovat z eHUBu:</strong> V administraci eHUB (portal.ehub.cz) přejděte do sekce <strong>Statistiky → Transakce / Konverze</strong>, klikněte na tlačítko <strong>Export (CSV)</strong> a stažený soubor nahrajte níže. Systém automaticky najde sloupce <code>sub_id</code> (nebo <code>data1</code>) a <code>provize</code> a připíše peníze do peněženky uživatelům.
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Vyberte CSV soubor
                </label>
                <input
                  type="file"
                  name="csvFile"
                  accept=".csv,.txt,.tsv"
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-navy hover:file:bg-slate-200 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Nebo vložte obsah CSV přímo sem:
                </label>
                <textarea
                  name="csvText"
                  rows={4}
                  placeholder={`sub_id,provize,stav,transakce\ncmtw123...,450,schvaleno,ehub-101`}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-mono text-navy focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-green px-5 py-2 text-xs font-bold text-navy hover:bg-green-light shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Zpracovávám import..." : "Nahrát a připsat odměny"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
