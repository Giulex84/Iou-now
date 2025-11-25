"use client";

import React, { useState } from "react";

export default function StartPaymentButton({ iouId, amount = 1 }) {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    if (typeof window === "undefined" || !window.Pi) {
      alert("Pi SDK non trovato. Apri l’app nel Pi Browser.");
      return;
    }

    const Pi = window.Pi;
    setLoading(true);

    try {
      console.log("👉 Starting Pi payment…");

      // 1️⃣ CREATE SERVER PAYMENT
      const initiateRes = await fetch("/api/pi/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iouId,
          amount,
          memo: `Payment for IOU ${iouId}`,
          metadata: { origin: "IOU Ledger Pro" },
        }),
      });

      const initiateData = await initiateRes.json();
      if (!initiateData.ok) throw new Error(initiateData.error);

      const serverPaymentId = initiateData.serverPaymentId;
      console.log("SERVER PAYMENT CREATED:", serverPaymentId);

      // 2️⃣ CALL PI SDK
      const payment = await Pi.createPayment({
        amount,
        memo: `Payment for IOU ${iouId}`,
        metadata: { serverPaymentId },
        onReadyForServerApproval: async (paymentId) => {
          const res = await fetch(`/api/pi/approve-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, serverPaymentId }),
          });
          const data = await res.json();
          if (!data.ok) throw new Error("Approve failed");
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          const res = await fetch(`/api/pi/complete-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid, serverPaymentId }),
          });
          const data = await res.json();
          if (!data.ok) throw new Error("Complete failed");
        },
        onCancel: async (paymentId) => {
          await fetch(`/api/pi/cancel-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });
        },
        onError: (error) => {
          console.error("PI SDK ERROR:", error);
        },
      });

      console.log("PAYMENT FINISHED", payment);
      alert("Payment completed!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg"
    >
      {loading ? "Processing…" : "Start Pi Payment"}
    </button>
  );
}
