"use client";

import { useIOUs } from "@/components/iou-context";
import IOUCard from "@/components/iou-card";
import StartPaymentButton from "@/components/StartPaymentButton";

export default function HistoryPage() {
  const { ious } = useIOUs();
  const paid = ious.filter((i) => i.paid);

  return (
    <div className="space-y-6 pt-4 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">History</h1>
        <p className="mt-1 text-sm text-gray-500">View all settled IOUs.</p>
      </div>

      <div className="flex justify-end">
        <StartPaymentButton />
      </div>

      <div className="space-y-3">
        {paid.map((iou) => (
          <IOUCard key={iou.id} iou={iou} />
        ))}

        {paid.length === 0 && (
          <p className="text-center py-10 text-gray-400 text-sm font-medium">
            No past IOUs — completed IOUs will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
