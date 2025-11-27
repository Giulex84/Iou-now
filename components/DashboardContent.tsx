"use client";

import React from "react";
import { useIOUs } from "@/components/iou-context";

export default function DashboardContent() {
  const { ious } = useIOUs();

  return (
    <div className="mt-4 text-center text-white">
      <p className="text-gray-300">Totale IOU in sospeso: {ious.length}</p>
    </div>
  );
}
