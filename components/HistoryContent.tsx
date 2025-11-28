"use client";

import React from "react";
import { useIOUs } from "@/components/iou-context";
import IOUCard from "@/components/iou-card";

export default function HistoryContent() {
  const { ious } = useIOUs();

  if (!ious.length) {
    return (
      <p className="text-gray-400">
        Nessun IOU ancora registrato.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {ious.map((iou) => (
        <IOUCard key={iou.id} iou={iou} />
      ))}
    </div>
  );
}
```0
