"use client";

import { useIOUs } from "@/components/providers/IOUProvider";
import IOUCard from "@/components/IOUCard";

export default function HistoryContent() {
  const { ious } = useIOUs();

  if (ious.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Nessun IOU presente nello storico.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {ious.map((iou) => (
        <IOUCard key={iou.id} iou={iou} />
      ))}
    </div>
  );
}
