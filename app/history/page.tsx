"use client";

import React from "react";
import { useIOUS } from "@/components/providers/IOUProvider";
import type { IOU } from "@/lib/types";

const CURRENT_USER = "@Giulex84";

function describeIou(iou: IOU) {
  const amount = Math.abs(Number(iou.amount)).toFixed(2);

  if (iou.amount > 0) {
    return `${iou.debtor} deve ${amount} π a ${CURRENT_USER}`;
  }
  if (iou.amount < 0) {
    return `${CURRENT_USER} deve ${amount} π a ${iou.debtor}`;
  }
  return `Importo neutro con ${iou.debtor}`;
}

export default function HistoryPage() {
  const { ious, loading, error, removeIou, togglePaid } = useIOUS();

  const sorted = ious
    .slice()
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const active = sorted.filter((i) => !i.paid);
  const archived = sorted.filter((i) => i.paid);

  const handleDelete = async (id: string) => {
    if (!confirm("Vuoi davvero eliminare questo IOU?")) return;
    await removeIou(id);
  };

  const handleTogglePaid = async (iou: IOU) => {
    await togglePaid(iou.id, !iou.paid);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Storico IOUs</h1>
          <p className="text-gray-400 text-sm">
            Vedi tutti i movimenti, segna come pagati o elimina quelli vecchi.
          </p>
        </header>

        {loading && (
          <p className="text-gray-400 text-lg text-center">
            Caricamento...
          </p>
        )}

        {error && (
          <p className="text-red-400 text-center text-sm">{error}</p>
        )}

        {!loading && !error && sorted.length === 0 && (
          <p className="text-gray-400 text-lg text-center">
            Nessun IOU registrato.
          </p>
        )}

        {/* IOU attivi */}
        {active.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Attivi</h2>
            {active.map((iou) => (
              <article
                key={iou.id}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex justify-between items-center shadow"
              >
                <div className="space-y-1">
                  <p className="text-white font-semibold">{iou.title}</p>
                  <p className="text-gray-300 text-xs">
                    {describeIou(iou)}
                  </p>
                  <p className="text-gray-400 text-[11px]">
                    {new Date(iou.date).toLocaleDateString("it-IT")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p
                    className={
                      "text-sm font-bold " +
                      (iou.amount > 0
                        ? "text-green-400"
                        : "text-yellow-300")
                    }
                  >
                    {iou.amount > 0 ? "+" : "-"}
                    {Math.abs(Number(iou.amount)).toFixed(2)} π
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePaid(iou)}
                      className="px-3 py-1 rounded-xl bg-emerald-600 text-xs text-white hover:bg-emerald-500"
                    >
                      Segna pagato
                    </button>
                    <button
                      onClick={() => handleDelete(iou.id)}
                      className="px-3 py-1 rounded-xl bg-red-600 text-xs text-white hover:bg-red-500"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* IOU pagati / archivio */}
        {archived.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-gray-800 mt-4">
            <h2 className="text-lg font-semibold">Pagati / Archivio</h2>
            {archived.map((iou) => (
              <article
                key={iou.id}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-4 flex justify-between items-center opacity-80"
              >
                <div className="space-y-1">
                  <p className="text-white font-semibold">{iou.title}</p>
                  <p className="text-gray-400 text-xs">
                    {describeIou(iou)}
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    {new Date(iou.date).toLocaleDateString("it-IT")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-bold text-gray-300">
                    {iou.amount > 0 ? "+" : "-"}
                    {Math.abs(Number(iou.amount)).toFixed(2)} π
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePaid(iou)}
                      className="px-3 py-1 rounded-xl bg-gray-700 text-xs text-white hover:bg-gray-600"
                    >
                      Segna NON pagato
                    </button>
                    <button
                      onClick={() => handleDelete(iou.id)}
                      className="px-3 py-1 rounded-xl bg-red-600 text-xs text-white hover:bg-red-500"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
