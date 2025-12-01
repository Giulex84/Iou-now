"use client";

import React, { useState } from "react";
import { useIOUS } from "@/components/providers/IOUProvider";

const CURRENT_USER = "@Giulex84"; // TODO: prendere dal Pi SDK

type Direction = "they_owe_me" | "i_owe_them";

export default function AddPage() {
  const { addIou, loading, error } = useIOUS();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [person, setPerson] = useState("");
  const [direction, setDirection] = useState<Direction>("they_owe_me");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!title || !amount || !person) {
      setLocalError("Compila tutti i campi.");
      return;
    }

    const parsed = Number(
      amount.replace(",", ".") // accetta anche 10,5
    );
    if (Number.isNaN(parsed) || parsed <= 0) {
      setLocalError("L'importo deve essere un numero positivo.");
      return;
    }

    const signedAmount =
      direction === "they_owe_me" ? Math.abs(parsed) : -Math.abs(parsed);

    const now = new Date().toISOString();

    await addIou({
      title,
      amount: signedAmount,
      debtor: direction === "they_owe_me" ? person : CURRENT_USER,
      paid: false,
      date: now,
      created_at: now,
    });

    // reset
    setTitle("");
    setAmount("");
    setPerson("");
    setDirection("they_owe_me");
  };

  const previewText =
    direction === "they_owe_me"
      ? `${person || "Qualcuno"} deve soldi a ${CURRENT_USER}`
      : `${CURRENT_USER} deve soldi a ${person || "qualcuno"}`;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Aggiungi IOU</h1>
          <p className="text-gray-400 text-sm">
            Specifica chi deve a chi, l&apos;importo e una breve nota.
          </p>
        </header>

        {(error || localError) && (
          <p className="text-red-400 text-center text-sm">
            {localError || error}
          </p>
        )}

        {/* Direzione del debito */}
        <section className="bg-[#111827] border border-gray-700 rounded-2xl p-4 space-y-3">
          <p className="text-sm font-medium mb-2">Chi deve a chi?</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDirection("they_owe_me")}
              className={
                "rounded-xl px-3 py-2 border " +
                (direction === "they_owe_me"
                  ? "bg-green-900/60 border-green-500 text-green-200"
                  : "bg-[#020617] border-gray-700 text-gray-300")
              }
            >
              Mi devono
            </button>
            <button
              type="button"
              onClick={() => setDirection("i_owe_them")}
              className={
                "rounded-xl px-3 py-2 border " +
                (direction === "i_owe_them"
                  ? "bg-yellow-900/70 border-yellow-500 text-yellow-200"
                  : "bg-[#020617] border-gray-700 text-gray-300")
              }
            >
              Devo io
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{previewText}</p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titolo */}
          <div>
            <label className="block text-xs font-medium mb-1">Titolo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-700 bg-[#020617] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Es. Cena, Prestito, Biglietti..."
            />
          </div>

          {/* Importo */}
          <div>
            <label className="block text-xs font-medium mb-1">Importo</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-700 bg-[#020617] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Es. 20"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Il segno (+/-) viene gestito automaticamente in base alla scelta
              sopra.
            </p>
          </div>

          {/* Persona */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Nome / persona
            </label>
            <input
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full border border-gray-700 bg-[#020617] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Es. Leo, Marco, @username"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 text-white py-2 rounded-2xl font-semibold mt-2 transition-colors"
          >
            {loading ? "Salvataggio..." : "Aggiungi IOU"}
          </button>
        </form>
      </div>
    </div>
  );
}
