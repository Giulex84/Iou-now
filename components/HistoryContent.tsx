"use client";

import { useIOUS } from "@/components/providers/IOUProvider";
import IouCard from "@/components/IouCard";

export default function HistoryContent() {
  const { ious } = useIOUS();

  if (ious.length === 0) {
    return (
      <p className="text-gray-400 text-lg">
        Nessun IOU registrato.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {ious.map((iou, index) => (
        <IouCard key={index} iou={iou} />
      ))}
    </div>
  );
}
