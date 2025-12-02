"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addIou } from "@/lib/ious";

type Direction = "i_owe" | "they_owe_me";
type Currency = "EUR" | "USD" | "PI";

function getCurrencySymbol(currency: Currency) {
  if (currency === "USD") return "$";
  if (currency === "PI") return "π";
  return "€";
}

export default function AddPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [debtor, setDebtor] = useState("");
  const [direction, setDirection] = useState<Direction>("i_owe");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("iou_currency");
      if (stored === "EUR" || stored === "USD" || stored === "PI") {
        setCurrency(stored);
      }
    }
  }, []);

  const symbol = getCurrencySymbol(currency);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const value = parseFloat(amount.replace(",", "."));
    if (!title || !amount || isNaN(value) || !debtor) {
      setError("Please fill all fields correctly.");
      return;
    }

    const signedAmount = direction === "i_owe" ? value : -value;

    try {
      setLoading(true);
      await addIou({
        title,
        amount: signedAmount,
        debtor,
        paid: false,
        date: new Date().toISOString(),
      });

      setTitle("");
      setAmount("");
      setDebtor("");

      router.push("/history");
    } catch (err: any) {
      setError(err.message ?? "Error while saving IOU.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050a1a] text-white p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-white">Add IOU</h1>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block text-sm mb-1 font-medium">
            Description / note
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Dinner, Tickets, Loan..."
            className="w-full rounded-xl bg-[#0b1024] border border-gray-700 px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">
            Amount ({symbol})
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 20"
            className="w-full rounded-xl bg-[#0b1024] border border-gray-700 px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Currency</label>
          <select
            value={currency}
            onChange={(e) => {
              const value = e.target.value as Currency;
              setCurrency(value);
              if (typeof window !== "undefined") {
                window.localStorage.setItem("iou_currency", value);
              }
            }}
            className="w-full rounded-xl bg-[#0b1024] border border-gray-700 px-3 py-2 text-sm outline-none focus:border-purple-500"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="PI">π Pi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Who owes who?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDirection("i_owe")}
              className={`rounded-xl px-3 py-2 text-sm border ${
                direction === "i_owe"
                  ? "bg-purple-600 border-purple-400"
                  : "bg-[#0b1024] border-gray-700"
              }`}
            >
              I owe someone
            </button>
            <button
              type="button"
              onClick={() => setDirection("they_owe_me")}
              className={`rounded-xl px-3 py-2 text-sm border ${
                direction === "they_owe_me"
                  ? "bg-emerald-600 border-emerald-400"
                  : "bg-[#0b1024] border-gray-700"
              }`}
            >
              Someone owes me
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">
            Other person&apos;s name
          </label>
          <input
            type="text"
            value={debtor}
            onChange={(e) => setDebtor(e.target.value)}
            placeholder="e.g. Tim, Alice..."
            className="w-full rounded-xl bg-[#0b1024] border border-gray-700 px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 rounded-2xl bg-purple-600 hover:bg-purple-500 font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Add IOU"}
        </button>
      </form>
    </div>
  );
}
