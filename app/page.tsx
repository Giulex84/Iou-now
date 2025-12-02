"use client";

import { useEffect } from "react";
import { useIOUStore } from "@/lib/store";
import CurrencySelector from "@/components/CurrencySelector";
import Link from "next/link";

export default function Home() {
  const { ious, fetchIOUs } = useIOUStore();

  useEffect(() => {
    fetchIOUs();
  }, []);

  const owesMe = ious
    .filter((i) => i.debtor !== "Me")
    .reduce((s, x) => s + x.amount, 0);

  const iOwe = ious
    .filter((i) => i.debtor === "Me")
    .reduce((s, x) => s + x.amount, 0);

  return (
    <main className="p-6 text-white bg-[#0d1227] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold">IOU</h1>
        <CurrencySelector />
      </div>

      <p className="mt-3 text-lg opacity-80">Track debts and credits easily.</p>

      <div className="grid grid-cols-1 gap-6 mt-10">
        <div className="p-6 rounded-2xl bg-green-900/40 border border-green-700">
          <p className="text-green-300">They owe me</p>
          <p className="text-4xl font-bold text-green-400">
            {localStorage.getItem("currency_symbol") || "π"} {owesMe.toFixed(2)}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-yellow-900/40 border border-yellow-700">
          <p className="text-yellow-300">I owe</p>
          <p className="text-4xl font-bold text-yellow-400">
            {localStorage.getItem("currency_symbol") || "π"} {iOwe.toFixed(2)}
          </p>
        </div>
      </div>

      <Link
        href="/add"
        className="block mt-10 text-center bg-purple-600 rounded-xl py-4 text-white text-xl"
      >
        Add IOU
      </Link>

      <Link
        href="/history"
        className="block mt-4 text-center bg-blue-600 rounded-xl py-4 text-white text-xl"
      >
        IOU History
      </Link>
    </main>
  );
}
