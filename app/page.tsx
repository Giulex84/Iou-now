"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { getIous } from "@/lib/ious";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [ious, setIous] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getIous();
      setIous(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = ious.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.name?.toLowerCase().includes(search.toLowerCase())
  );

  const owedToMe = filtered
    .filter(i => !i.paid && Number(i.amount) > 0)
    .reduce((sum, x) => sum + Number(x.amount), 0);

  const iOwe = filtered
    .filter(i => !i.paid && Number(i.amount) < 0)
    .reduce((sum, x) => sum + Number(x.amount), 0);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 space-y-6">

      <h1 className="text-4xl font-bold">IOU Now</h1>
      <p className="text-gray-300">Gestisci debiti e crediti in modo semplice.</p>

      <input
        type="text"
        placeholder="Cerca per nome o nota"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl bg-[#1e293b] text-white border border-gray-700"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-green-900/40 border border-green-700">
          <p className="text-sm text-green-300">Mi devono</p>
          <p className="text-2xl font-bold text-green-400">
            {owedToMe.toFixed(2)}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-yellow-900/40 border border-yellow-700">
          <p className="text-sm text-yellow-300">Devo</p>
          <p className="text-2xl font-bold text-yellow-400">
            {Math.abs(iOwe).toFixed(2)}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-4">IOUs attivi</h2>

      {loading && <p className="text-gray-400 text-center">Caricamento...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-400 text-center mt-6">Nessun IOU trovato.</p>
      )}

      {!loading && filtered.map(iou => (
        <div
          key={iou.id}
          className="bg-[#1e293b] p-4 rounded-xl shadow border border-gray-700"
        >
          <p className="text-white font-semibold">{iou.title}</p>
          <p className="text-gray-300 text-sm">
            {iou.amount > 0 ? "Mi deve:" : "Devo:"}{" "}
            <span className="font-bold">{Math.abs(iou.amount)} {iou.currency}</span>
          </p>
          <p className="text-gray-500 text-xs">{iou.date.split("T")[0]}</p>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] p-4 border-t border-gray-700 flex justify-around">
        <Link href="/add" className="text-blue-400 font-semibold">➕ Aggiungi</Link>
        <Link href="/history" className="text-blue-400 font-semibold">📜 Storico</Link>
      </div>

    </div>
  );
}
