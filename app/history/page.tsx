"use client";

import { useIOUs } from "@/components/iou-context";

export default function HistoryPage() {
  const { ious } = useIOUs();

  return (
    <div style={{ padding: 20 }}>
      <h1>IOU History</h1>
      <ul>
        {ious.map((iou, idx) => (
          <li key={idx}>
            {iou.from} owes {iou.to}: {iou.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
