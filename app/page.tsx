"use client";

import React from "react";
import Link from "next/link";
import { useIOUS } from "@/components/providers/IOUProvider";
import type { IOU } from "@/lib/types";

const CURRENT_USER = "@Giulex84"; // placeholder finché non usiamo il Pi SDK

export default function HomePage() {
  const { ious, loading } = useIOUS();

  const activeIous = ious.filter((i) => !i.paid);
  const hasIous = activeIous.length > 0;

  const owedToMe = activeIous
    .filter((i) => i.amount > 0)
    .reduce((s, i) => s + Number(i.amount), 0);

  const iOwe = activeIous
    .filter((i) => i.amount < 0)
    .reduce((s, i) => s + Number(i.amount), 0);

  const formatAmount = (value: number) =>
    Math.abs(value).toFixed(2);

  const describeIou = (iou: IOU) => {
    if (iou.amount > 0) {
      // LORO DEVONO A ME
      return `${iou.debtor} deve ${formatAmount(iou.amount)} π a ${CURRENT_USER}`;
    }
    if (iou.amount < 0) {
      // IO DEVO A LORO
      return `${CURRENT_USER} deve ${formatAmount(iou.amount)} π a ${iou.debtor}`;
    }
    return `Importo neutro con ${iou.debtor}`;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">IOU Ledger Pro</h1>
          <p className="text-gray-300">
            Tieni traccia di chi deve cosa, in Pi o altre valute.
          </p>
        </header>

        {/* Search (solo UI per ora) */}
        <div>
          <input
            type="text"
            placeholder="Search by name or note"
            className="w-full rounded-2xl bg-[#1e293b] border border-gray-700 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cards riepilogo */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-green-900/40 border border-green-700/70 shadow">
            <p className="text-sm text-green-300">Owed to Me</p>
            <p className="mt-1 text-3xl font-bold text-green-400">
              €/$/π {formatAmount(owedToMe)}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              IOU attivi che gli altri devono a te.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-yellow-900/40 border border-yellow-700/70 shadow">
            <p className="text-sm text-yellow-200">I Owe</p>
            <p className="mt-1 text-3xl font-bold text-yellow-300">
              €/$/π {formatAmount(iOwe)}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              IOU attivi in cui tu devi ad altri.
            </p>
          </div>
        </section>

        {/* Lista IOU attivi */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Active IOUs</h2>

          {loading && (
            <p className="text-gray-400 text-center mt-4">Loading...</p>
          )}

          {!loading && !hasIous && (
            <p className="text-gray-500 text-center mt-4">
              No active IOUs.
              <br />
              Prova ad aggiungerne uno nuovo.
            </p>
          )}

          {!loading &&
            activeIous
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 5)
              .map((iou) => (
                <article
                  key={iou.id}
                  className="p-4 rounded-2xl bg-[#1f2937] border border-gray-700 flex justify-between items-center shadow-sm"
                >
                  <div className="space-y-1">
                    <p className="font-semibold">{iou.title}</p>
                    <p className="text-xs text-gray-300">
                      {describeIou(iou)}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {new Date(iou.date).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={
                        "text-lg font-bold " +
                        (iou.amount > 0 ? "text-green-400" : "text-yellow-300")
                      }
                    >
                      {iou.amount > 0 ? "+" : "-"}
                      {formatAmount(iou.amount)} π
                    </p>
                  </div>
                </article>
              ))}
        </section>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f172a] border-t border-gray-800">
          <div className="max-w-3xl mx-auto flex justify-around p-3 text-sm">
            <Link href="/" className="text-blue-400 font-semibold">
              Home
            </Link>
            <Link href="/add" className="text-blue-400 font-semibold">
              Add
            </Link>
            <Link href="/history" className="text-blue-400 font-semibold">
              History
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
