"use client";

import TestPaymentButton from "@/components/test-payment-button";

export default function TestPaymentPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Test Payment
      </h1>

      <p className="text-gray-600 text-sm">
        Use this button to process a User-to-App test transaction required
        to complete the Pi App checklist.
      </p>

      <TestPaymentButton />
    </div>
  );
}
