"use client";
import React from "react";

export default function TestPaymentButton() {
  const handlePay = async () => {
    try {
      const payment = await window.Pi.createPayment({
        amount: 1,
        memo: "Test payment for Pi checklist",
        metadata: { purpose: "checklist" },
      });
      console.log("Payment created:", payment);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-purple-600 text-white rounded-xl"
      onClick={handlePay}
    >
      Pay 1π (Checklist Test)
    </button>
  );
}
