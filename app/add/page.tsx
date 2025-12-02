"use client";

import { useState } from "react";
import { addIou } from "@/lib/ious";

export default function AddPage() {
  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"owes_me" | "i_owe">("owes_me");

  const submit = async () => {
    if (!person || !amount) return;
    await addIou({ person, amount, type });
    window.location.href = "/history";
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Aggiungi IOU</h1>

      <div className="space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          placeholder="Nome"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          type="number"
          placeholder="Importo"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />

        <select
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="owes_me">Mi deve</option>
          <option value="i_owe">Devo</option>
        </select>

        <button
          onClick={submit}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-bold"
        >
          Aggiungi
        </button>
      </div>
    </div>
  );
}
