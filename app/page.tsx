"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getIous } from "@/lib/ious";
import type { IOU } from "@/lib/types";

type Currency = "EUR" | "USD" | "PI";

function getCurrencySymbol(currency: Currency) {
  if (currency === "USD") return "$";
  if (currency === "PI") return "π";
  return "€";
}

export default function HomePage() {
  const [ious, setIous] = useState<IOU[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<Currency>("EUR");

  useEffect(() => {
    // load currency preference
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("iou_currency");
      if (stored === "EUR" || stored === "USD" || stored === "PI") {
        setCurrency(stored);
      }
    }

    async function load() {
      try {
        setLoading(true);
        const data = await getIous();
        setIous(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const symbol = getCurrencySymbol(currency);

  // amount > 0 = I owe, amount < 0 = they owe me
  const owedToMe = ious
    .filter((i) => !i.paid && Number(i.amount) < 0)
    .reduce((sum, i) => sum + Math.abs(Number(i.amount || 0)), 0);

  const iOwe = ious
    .filter((i) => !i.paid && Number(i.amount) > 0)
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#050a1a] text-white p-6">
      <header className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight">IOU</h1>

          <select
            value={currency}
            onChange={(e) => {
              const value = e.target.value as Currency;
              setCurrency(value);
              if (typeof window !== "undefined") {
                window.localStorage.setItem("iou_currency", value);
              }
            }}
            className="bg-[#0b1024] border border-gray-700 rounded-lg px-3 py-1 text-sm"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="PI">π Pi</option>
          </select>
        </div>

        <p className="text-gray-300 text-base">
          Track debts and credits easily.
        </p>
      </header>

      <main className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700">
            <p className="text-sm text-emerald-300 mb-1">They owe me</p>
            <p className="text-3xl font-extrabold text-emerald-400">
              {symbol} {owedToMe.toFixed(2)}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-900/40 border border-amber-700">
            <p className="text-sm text-amber-300 mb-1">I owe</p>
            <p className="text-3xl font-extrabold text-amber-400">
              {symbol} {iOwe.toFixed(2)}
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-400 text-sm">Loading IOUs...</p>
        )}

        {!loading && ious.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No IOUs yet. Add your first one!
          </p>
        )}

        <div className="space-y-4 mt-4">
          <Link href="/add" className="block">
            <button className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 font-semibold text-lg transition">
              Add IOU
            </button>
          </Link>

          <Link href="/history" className="block">
            <button className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 font-semibold text-lg transition">
              IOU History
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
