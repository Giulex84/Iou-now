"use client";

import { useIOUs } from "@/components/iou-context";

export default function Home() {
  const { ious } = useIOUs();

  return (
    <main style={{ padding: 20 }}>
      <h1>IOU Ledger Pro</h1>
      <p>Track who owes what, across currencies.</p>

      <p>Total IOUs: {ious.length}</p>
    </main>
  );
}
