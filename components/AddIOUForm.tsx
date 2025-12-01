"use client";

import { useState } from "react";
import { useIOUs } from "@/components/providers/IOUProvider";
import type { IOUCurrency, IOUType } from "@/lib/types";

const CATEGORIES = ["Prestito", "Cena", "Spesa", "Regalo", "Altro"] as const;

const CURRENCY_LABELS: Record<IOUCurrency, string> = {
  EUR: "€ Euro",
  USD: "$ Dollar",
  PI: "π Pi",
};

export default function AddIOUForm() {
  const { addIOU } = useIOUs();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<IOUType>("owed");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Prestito");
  const [currency, setCurrency] = useState<IOUCurrency>("EUR");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !amount) return;

    await addIOU({
      name,
      amount: Number(amount),
      date: new Date().toISOString(),
      paid: false,
      type,
      category,
      currency,
    });

    setName("");
    setAmount("");
    setType("owed");
    setCategory("Prestito");
    setCurrency("EUR");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* TYPE */}
      <div className="flex gap-3">
        <button
          type="button"
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            type === "owed"
              ? "bg-emerald-500 text-white shadow"
              : "bg-gray-600 text-gray-300"
          }`}
          onClick={() => setType("owed")}
        >
          <span className="font-black">me</span>
          <br />they owe me
        </button>

        <button
          type="button"
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            type === "owing"
              ? "bg-orange-500 text-white shadow"
              : "bg-gray-600 text-gray-300"
          }`}
          onClick={() => setType("owing")}
        >
          <span className="font-black">I owe them</span>
        </button>
      </div>

      {/* NAME */}
      <div>
        <label className="text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Person or contact name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* AMOUNT */}
      <div>
        <label className="text-sm font-medium text-gray-300">Amount</label>
        <input
          type="number"
          step="0.01"
          className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* CURRENCY */}
      <div>
        <label className="text-sm font-medium text-gray-300">Currency</label>

        <div className="flex gap-2">
          {(["EUR", "USD", "PI"] as IOUCurrency[]).map((cur) => (
            <button
              key={cur}
              type="button"
              className={`flex-1 py-3 rounded-xl transition-all ${
                currency === cur
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setCurrency(cur)}
            >
              {CURRENCY_LABELS[cur].split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="text-sm font-medium text-gray-300">Category</label>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                cat === category
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-gray-700 text-gray-300 border-gray-600"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold 
                   shadow-md transition-all"
      >
        Add IOU
      </button>
    </form>
  );
}
