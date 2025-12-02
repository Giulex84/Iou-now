"use client";

import { useEffect, useState } from "react";
import { getIous, deleteIou } from "@/lib/ious";

export default function HistoryPage() {
  const [ious, setIous] = useState<any[]>([]);

  useEffect(() => {
    getIous().then(setIous);
  }, []);

  const remove = async (id: string) => {
    await deleteIou(id);
    setIous((s) => s.filter((i) => i.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Storico IOU</h1>

      {ious.length === 0 && (
        <p className="text-gray-400">Nessun IOU presente.</p>
      )}

      <div className="space-y-4">
        {ious.map((i) => (
          <div
            key={i.id}
            className="p-4 bg-gray-800 border border-gray-700 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-bold">{i.person}</p>
              <p className="text-gray-300">
                {i.type === "owes_me" ? "Mi deve" : "Devo"}: {i.amount}
              </p>
            </div>

            <button
              onClick={() => remove(i.id)}
              className="text-red-400 font-bold"
            >
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
