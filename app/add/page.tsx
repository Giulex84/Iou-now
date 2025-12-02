"use client";

import { useState, useEffect } from "react";
import { useIOUStore } from "@/lib/store";
import CurrencySelector from "@/components/CurrencySelector";
import Link from "next/link";

export default function AddIOU() {
  const addIOU = useIOUStore((s) => s.addIOU);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [debtor, setDebtor] = useState("Me");
  const [currency, setCurrency] = useState("Pi");
  const [symbol, setSymbol] = useState("π");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrency(localStorage.getItem("currency") || "Pi");
      setSymbol(localStorage.getItem("currency_symbol") || "π");
    }
  }, []);

  const submit = async () => {
    await addIOU({
      title,
      amount: parseFloat(amount),
      debtor,
    });

    window.location.href = "/";
  };

  return (
    <main className="p-6 text-white bg-[#0d1227] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">Add IOU</h1>
        <CurrencySelector />
      </div>

      <div className="mt-8">

        <input
          className="w-full bg-[#141a35] text-white p-4 rounded-xl mb-4"
          placeholder="Description"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full bg-[#141a35] text-white p-4 rounded-xl mb-4"
          placeholder={`Amount (${symbol})`}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-3 mb-4">
          <button
            className={`flex-1 p-3 rounded-xl ${
              debtor === "Me" ? "bg-purple-600" : "bg-[#141a35]"
            }`}
            onClick={() => setDebtor("Me")}
          >
            I owe someone
          </button>

          <button
            className={`flex-1 p-3 rounded-xl ${
              debtor === "Them" ? "bg-purple-600" : "bg-[#141a35]"
            }`}
            onClick={() => setDebtor("Them")}
          >
            Someone owes me
          </button>
        </div>

        <button
          className="w-full bg-purple-600 py-4 rounded-xl text-xl"
          onClick={submit}
        >
          Add IOU
        </button>

        <Link href="/" className="block mt-5 text-blue-300 underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
