"use client";

import React from "react";
import { useIOUs } from "@/components/providers/IOUProvider";
import Link from "next/link";

export default function HomePage() {
  const { ious, loading } = useIOUs();

  const owedToMe = ious
    .filter(i => !i.paid && i.amount > 0)
    .reduce((s, i) => s + Number(i.amount), 0);

  const iOwe = ious
    .filter(i => !i.paid && i.amount < 0)
    .reduce((s, i) => s + Number(i.amount), 0);

  const hasIOUs = ious.length > 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-4xl font-bold mb-2">IOU Ledger Pro</h1>
      <p className="text-gray-300 mb-6">Track who owes what, across currencies.</p>

      <input
        type="text"
        placeholder="Search by name or note"
        className="w-full p-3 rounded-xl bg-[#1e293b] border border-gray-700 mb-4 text-white"
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-green-900/40 border border-green-700">
          <p className="text-sm text-green-300">Owed to Me</p>
          <p className="text-2xl font-bold text-green-400">
            {owedToMe.toFixed(2)}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-yellow-900/40 border border-yellow-700">
          <p className="text-sm text-yellow-300">I Owe</p>
          <p className="text-2xl font-bold text-yellow-400">
            {Math.abs(iOwe).toFixed(2)}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-3">Active IOUs</h2>

      {loading && <p className="text-gray-400 text-center">Loading...</p>}

      {!loading && !hasIOUs && (
        <p className="text-gray-500 text-center mt-10">
          No active IOUs. Try adding a new one.
        </p>
      )}

      <div className="space-y-3">
        {ious.slice(0, 5).map(iou => (
          <div
            key={iou.id}
            className="p-4 rounded-xl bg-[#1e293b] border border-gray-700"
          >
            <p className="font-semibold">{iou.title}</p>
            <p className="text-gray-400 text-sm">{iou.date.split("T")[0]}</p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] p-4 border-t border-gray-700 flex justify-around">
        <Link href="/add" className="text-blue-400 font-semibold">Add</Link>
        <Link href="/history" className="text-blue-400 font-semibold">History</Link>
      </div>
    </div>
  );
}
