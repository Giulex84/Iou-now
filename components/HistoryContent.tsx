"use client";

import { useIOUs } from "@/components/providers/IOUProvider";

export default function HistoryContent() {
  const { ious } = useIOUs();

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl mb-4">Storico IOU</h1>
      <ul className="space-y-2">
        {ious.map((iou) => (
          <li key={iou.id} className="bg-gray-800 p-2 rounded">
            {iou.description} — {iou.amount} PI
          </li>
        ))}
      </ul>
    </div>
  );
}
