"use client";

import { useEffect, useState } from "react";
import { getIOUS, deleteIOU } from "@/lib/ious";

export default function HistoryPage() {
  const [ious, setIOUS] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadIOUS() {
    setLoading(true);
    const data = await getIOUS();
    setIOUS(data);
    setLoading(false);
  }

  useEffect(() => {
    loadIOUS();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Sei sicuro di voler eliminare questo IOU?")) return;

    await deleteIOU(id);
    await loadIOUS(); // ricarica la lista aggiornata
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-blue-300 mb-4">History</h1>

      {loading && <p className="text-gray-300">Caricamento...</p>}

      {!loading && ious.length === 0 && (
        <p className="text-gray-400">Nessun IOU presente.</p>
      )}

      <ul className="space-y-3">
        {ious.map((iou) => (
          <li
            key={iou.id}
            className="bg-slate-800 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">
                {iou.debtor} → {iou.creditor}
              </p>
              <p className="text-blue-300">{iou.amount} π</p>
              {iou.description && (
                <p className="text-gray-400 text-sm mt-1">{iou.description}</p>
              )}
            </div>

            <button
              onClick={() => handleDelete(iou.id)}
              className="text-red-400 hover:text-red-300 font-bold text-sm"
            >
              Elimina
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
