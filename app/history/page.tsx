"use client"

import { useIOUs } from "@/components/iou-context"
import IOUCard from "@/components/iou-card"

export default function HistoryPage() {
  const { ious } = useIOUs()
  const paid = ious.filter((i) => i.paid)

  return (
    <div className="space-y-6">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Payment History
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Completed and cleared IOUs.
        </p>
      </div>

      <div className="space-y-3 pb-4">
        {paid.map((iou) => (
          <IOUCard key={iou.id} iou={iou} />
        ))}
        {paid.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm font-medium">No completed IOUs</p>
            <p className="text-xs mt-1">
              They will appear here after being paid.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
