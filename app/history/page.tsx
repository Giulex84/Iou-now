"use client"

import { useIOUs } from "@/components/iou-context"
import IOUCard from "@/components/iou-card"

export default function HistoryPage() {
  const { ious } = useIOUs()

  if (!ious.length) {
    return (
      <div className="text-center text-gray-500 py-16">
        No IOU history yet.
      </div>
    )
  }

  return (
    <div className="space-y-4 py-4">
      {ious.map((iou) => (
        <IOUCard key={iou.id} iou={iou} />
      ))}
    </div>
  )
}
