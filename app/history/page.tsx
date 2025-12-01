"use client";

import { useEffect, useState } from "react";
import { getIous, deleteIou } from "@/lib/ious";
import type { IOU } from "@/lib/types";

export default function HistoryPage() {
  const [ious, setIous] = useState<IOU[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const data = await getIous();
    setIous(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await deleteIou(id);
    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6 text-white bg-[#0f172a] min-h-screen">
      <h1 className="text-3xl font-bold text-white">Storico IOUs</h1>

      {loading && <p className="text-gray-400 text-lg">Caricamento...</p>}

      {!loading && ious.length === 0 && (
        <p className="text-gray-400 text-lg">Nessun IOU registrato.</p>
      )}

      <div className="space-y-4">
        {ious.map((iou) => (
          <div
            key={iou.id}
            className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">{iou.title}</p>
              <p className="text-gray-300 text-sm">
                {iou.amount} — {iou.debtor}
              </p>
              <p className="text-gray-400 text-xs">
                {new Date(iou.date).toLocaleDateString("it-IT")}
              </p>
            </div>

            <button
              onClick={() => handleDelete(iou.id)}
              className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
