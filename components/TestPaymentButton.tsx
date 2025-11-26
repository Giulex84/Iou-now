"use client";

import { Pi } from "@pi-network/pi-sdk";

export default function TestPaymentButton() {
  const handlePayment = async () => {
    try {
      const payment = await Pi.createPayment({
        amount: 1,
        memo: "Test Payment",
        metadata: { type: "test-payment" },
      });

      console.log("Payment success:", payment);
      alert("Pagato con successo!");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Errore pagamento");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow"
    >
      Test Payment
    </button>
  );
}
