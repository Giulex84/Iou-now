"use client";

import React from "react";
import { useIOUs } from "@/components/iou-context";
import IOUCard from "@/components/iou-card";

export default function HistoryContent() {
  const { ious } = useIOUs();

  return (
    <div className="space-y-4">
      {ious.map((iou) => (
        <IOUCard key={iou.id} {...iou} />
      ))}
    </div>
  );
}
