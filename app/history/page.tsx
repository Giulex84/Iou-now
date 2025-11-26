"use client";

import IOUList from "@/components/iou-list";
import { useIOUs } from "@/components/iou-context";
import TestPaymentButton from "@/components/TestPaymentButton";

export default function HistoryPage() {
  const { ious } = useIOUs();
  const paid = ious.filter((i) => i.paid);

  return (
    <div className="space-y-6 p-4">

      {/* TEST PAYMENT BUTTON */}
      <div className="w-full flex justify-center mt-4">
        <TestPaymentButton />
      </div>

      <h1 className="text-2xl font-bold">History</h1>
      <IOUList items={paid} />
    </div>
  );
}
