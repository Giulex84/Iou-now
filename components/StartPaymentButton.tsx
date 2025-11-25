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
      console.log("▶ Starting payment...");

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

        // ➖ APPROVAL REQUIRED
        onReadyForServerApproval: async (paymentId) => {
          console.log("APPROVAL REQUIRED:", paymentId);

          const res = await fetch("/api/pi/approve-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, serverPaymentId }),
          });

          const data = await res.json();
          console.log("APPROVE RESPONSE:", data);
          if (!data.ok) throw new Error("Approve failed");
        },

        // ✔ COMPLETION REQUIRED
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("COMPLETION REQUIRED:", paymentId, txid);

          const res = await fetch("/api/pi/complete-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid, serverPaymentId }),
          });

          const data = await res.json();
          console.log("COMPLETE RESPONSE:", data);
          if (!data.ok) throw new Error("Complete failed");
        },

        // ❌ USER CANCEL ACTION
        onCancel: async (paymentId) => {
          console.log("USER CANCELLED:", paymentId);

          await fetch("/api/pi/cancel-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, serverPaymentId }),
          });

          alert("❌ Payment cancelled.");
        },

        // ❗ ANY ERROR IN SDK
        onError: (error) => {
          console.error("PI PAYMENT ERROR:", error);
          alert("❌ Payment error: " + error);
        },
      });

      console.log("FINAL PAYMENT RESULT:", payment);
      alert("✅ Payment completed successfully!");

    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("❌ Payment failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <button
      className="btn-primary"
      disabled={loading}
      onClick={startPayment}
      style={{ padding: "10px 18px", fontSize: "0.9rem" }}
    >
      {loading ? "Processing..." : `Start Payment (${amount} π)`}
    </button>
  );
}
