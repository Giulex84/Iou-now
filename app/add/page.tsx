"use client";

import { useState } from "react";
import { addIou } from "@/lib/ious";

export default function AddPage() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [debtor, setDebtor] = useState(""); 
  const [relation, setRelation] = useState("they-owe-me"); 
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!title || !amount || !debtor) return;

    setLoading(true);

    const numeric = Number(amount);

    const finalAmount =
      relation === "they-owe-me" ? numeric : -numeric;

    await addIou({
      id: crypto.randomUUID(),
      title,
      amount: finalAmount,
      name: debtor,
      paid: false,
      currency: "€",
      date: new Date().toISOString(),
    });

    setLoading(false);

    setTitle("");
    setAmount("");
    setDebtor("");
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Aggiungi IOU</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">

        <div>
          <label className="block text-sm mb-1">Titolo</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#1e293b] border border-gray-700 p-3 rounded-xl"
            placeholder="Es. Prestito, Cena…"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Importo</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full bg-[#1e293b] border border-gray-700 p-3 rounded-xl"
            placeholder="Es. 25"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Persona coinvolta</label>
          <input
            value={debtor}
            onChange={(e) => setDebtor(e.target.value)}
            className="w-full bg-[#1e293b] border border-gray-700 p-3 rounded-xl"
            placeholder="Nome"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium mb-1">Relazione</p>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="rel"
              value="they-owe-me"
              checked={relation === "they-owe-me"}
              onChange={e => setRelation(e.target.value)}
            />
            Mi devono dei soldi
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="rel"
              value="i-owe-them"
              checked={relation === "i-owe-them"}
              onChange={e => setRelation(e.target.value)}
            />
            Devo soldi a questa persona
          </label>
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 py-3 rounded-xl font-semibold text-white disabled:bg-gray-600"
        >
          {loading ? "Salvataggio..." : "Aggiungi IOU"}
        </button>
      </form>
    </div>
  );
}
