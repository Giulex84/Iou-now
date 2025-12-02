"use client";

import { useEffect } from "react";
import { useIOUStore } from "@/lib/store";
import CurrencySelector from "@/components/CurrencySelector";
import Link from "next/link";

export default function History() {
  const { ious, fetchIOUs, deleteIOU } = useIOUStore();

  useEffect(() => {
    fetchIOUs();
  }, []);

  const symbol = localStorage.getItem("currency_symbol") || "π";

  return (
    <main className="p-6 text-white bg-[#0d1227] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">IOU History</h1>
        <CurrencySelector />
      </div>

      <div className="mt-8 space-y-6">
        {ious.map((iou) => (
          <div
            key={iou.id}
            className="p-6 bg-[#141a35] rounded-2xl border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">
                I owe: {symbol} {iou.amount.toFixed(2)}
              </p>

              <button
                onClick={() => deleteIOU(iou.id)}
                className="text-red-400 font-semibold"
              >
                Delete
              </button>
            </div>

            <p className="opacity-80">{iou.title}</p>

            <p className="text-sm opacity-50 mt-1">
              {new Date(iou.created_at).toLocaleDateString()} · {iou.debtor}
            </p>
          </div>
        ))}
      </div>

      <Link href="/" className="block mt-5 text-blue-300 underline">
        ← Back to home
      </Link>
    </main>
  );
}
