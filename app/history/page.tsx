"use client";

import React, { useEffect, useState } from "react";
import { getIous, deleteIou } from "@/lib/ious";
import type { IOU } from "@/lib/types";
import Link from "next/link";

type Currency = "EUR" | "USD" | "PI";

function getCurrencySymbol(currency: Currency) {
  if (currency === "USD") return "$";
  if (currency === "PI") return "π";
  return "€";
}

export default function HistoryPage() {
  const [ious, setIous] = useState<IOU[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      } catch (err: any) {
        setError(err.message ?? "Error loading IOUs.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const symbol = getCurrencySymbol(currency);

  async function handleDelete(id: string) {
    try {
      setDeletingId(id);
      setError(null);
      await deleteIou(id);
      setIous((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      setError(err.message ?? "Error deleting IOU.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#050a1a] text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">IOU History</h1>

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
      </header>

      {error && (
        <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
      )}

      {loading && (
        <p className="text-gray-400 text-sm mb-3 text-center">
          Loading IOUs...
        </p>
      )}

      {!loading && ious.length === 0 && (
        <p className="text-gray-400 text-sm mb-3 text-center">
          No IOUs stored yet.
        </p>
      )}

      <div className="space-y-3">
        {ious.map((iou) => {
          const amount = Number(iou.amount || 0);
          const isIOwe = amount > 0;
          const label = isIOwe ? "I owe" : "They owe me";

          return (
            <div
              key={iou.id}
              className="bg-[#0b1024] border border-gray-700 rounded-2xl px-4 py-3 flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">{label}</span>:{" "}
                  {symbol} {Math.abs(amount).toFixed(2)}
                </p>
                {iou.title && (
                  <p className="text-xs text-gray-400 truncate">{iou.title}</p>
                )}
                <p className="text-xs text-gray-500">
                  {new Date(iou.date ?? iou.created_at).toLocaleDateString()}
                  {iou.debtor ? ` · ${iou.debtor}` : null}
                </p>
              </div>

              <button
                onClick={() => handleDelete(iou.id)}
                disabled={deletingId === iou.id}
                className="text-sm text-red-400 font-semibold disabled:opacity-60"
              >
                {deletingId === iou.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-400 text-sm underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
