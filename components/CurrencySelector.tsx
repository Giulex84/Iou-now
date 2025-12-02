"use client";

import { useState, useEffect } from "react";

const currencies = [
  { code: "PI", symbol: "π" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
];

export default function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("PI");

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  const change = (c: any) => {
    setCurrency(c.code);
    localStorage.setItem("currency", c.code);
    localStorage.setItem("currency_symbol", c.symbol);
    setOpen(false);
    location.reload();
  };

  const symbol =
    localStorage.getItem("currency_symbol") ||
    currencies.find((x) => x.code === currency)?.symbol ||
    "π";

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-[#1f2949] border border-gray-600 rounded-xl"
        onClick={() => setOpen(!open)}
      >
        {symbol} {currency}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-[#1f2949] border border-gray-700 rounded-xl p-2 w-32 z-20">
          {currencies.map((c) => (
            <button
              key={c.code}
              className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded-lg"
              onClick={() => change(c)}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
