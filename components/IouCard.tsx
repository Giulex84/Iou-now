"use client";

import type { IOU } from "@/lib/types";
import { useIOUs } from "@/components/providers/IOUProvider";

function getCurrencySymbol(currency: IOU["currency"]) {
  switch (currency) {
    case "USD":
      return "$";
    case "PI":
      return "π";
    case "EUR":
      return "€";
    default:
      return "€";
  }
}

export default function IouCard({ iou }: { iou: IOU }) {
  const { togglePaid } = useIOUs();

  const symbol = getCurrencySymbol(iou.currency);
  const directionLabel =
    iou.type === "owed" ? "owes me" : "I owe";

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border shadow hover:shadow-md transition-all">
      <div className="flex justify-between items-start gap-3">
        <p className="text-xl font-bold text-gray-900 truncate">
          {iou.name}
        </p>
        <p className="text-2xl font-bold text-gray-900">
          {symbol}
          {iou.amount.toFixed(2)}
        </p>
      </div>

      <p className="text-xs text-gray-500">{directionLabel}</p>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <span className="text-gray-400">
          {new Date(iou.date).toLocaleDateString()}
        </span>

        {iou.paid && (
          <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs">
            Paid
          </span>
        )}
      </div>

      <button
        className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
          iou.paid
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        onClick={() => togglePaid(iou.id, iou.paid)}
      >
        {iou.paid ? "Mark Unpaid" : "Mark Paid"}
      </button>
    </div>
  );
}
