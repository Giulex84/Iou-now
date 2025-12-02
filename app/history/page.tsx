"use client";

import { useEffect, useState } from "react";
import { getIous, deleteIou } from "@/lib/ious";

export default function HistoryPage() {
  const [ious, setIous] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getIous();
    setIous(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await deleteIou(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 space-y-6">

      <h1 className="text-3xl font-bold text-center">Storico IOUs</h1>

      {loading && <p className="text-gray-400 text-center">Caricamento...</p>}

      {!loading && ious.length === 0 && (
        <p className="text-gray-400 text-center">Nessun IOU registrato.</p>
      )}

      {!loading &&
        ious.map(iou => (
          <div
            key={iou.id}
            className="bg-[#1e293b] p-4 rounded-xl shadow border border-gray-700 flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">{iou.title}</p>
              <p className="text-gray-300 text-sm">
                {iou.amount > 0 ? "Mi devono:" : "Devo:"}{" "}
                <span className="font-bold">
                  {Math.abs(iou.amount)} {iou.currency}
                </span>
              </p>
              <p className="text-gray-500 text-xs">{iou.date.split("T")[0]}</p>
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
  );
}
