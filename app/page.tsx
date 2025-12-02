"use client";

import { useEffect, useState } from "react";
import { getIousSummary } from "@/lib/ious";

export default function HomePage() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    getIousSummary().then(setSummary);
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">IOU</h1>
      <p className="text-gray-300 mb-6">Traccia debiti e crediti facilmente.</p>

      {!summary ? (
        <p className="text-gray-400">Caricamento...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-green-900/40 border border-green-700">
            <p className="text-sm text-green-300">Mi devono</p>
            <p className="text-2xl font-bold text-green-400">
              {summary.owedToMe.toFixed(2)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-yellow-900/40 border border-yellow-700">
            <p className="text-sm text-yellow-300">Devo</p>
            <p className="text-2xl font-bold text-yellow-400">
              {summary.iOwe.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="/add"
          className="block w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-bold mt-4"
        >
          Aggiungi IOU
        </a>

        <a
          href="/history"
          className="block w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-bold mt-4"
        >
          Storico IOU
        </a>
      </div>
    </div>
  );
}
