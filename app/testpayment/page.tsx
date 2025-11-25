"use client";

import TestPaymentButton from "@/components/TestPaymentButton";

export default function TestPaymentPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">Pi Test Payment</h1>
      <p className="text-gray-600 mb-4">
        Esegui il pagamento di test richiesto dalla Pi Checklist (punto 10).
      </p>

      <TestPaymentButton />
    </div>
  );
}
