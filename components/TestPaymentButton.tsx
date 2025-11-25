"use client";

import React, { useState } from "react";

export default function TestPaymentButton() {
  const [loading, setLoading] = useState(false);

  const runTestPayment = async () => {
    if (typeof window === "undefined" || !(window as any).Pi) {
      alert("Pi SDK non trovato. Apri l’app nel Pi Browser.");
      return;
    }

    const Pi = (window as any).Pi;
    const amount = 1;

    setLoading(true);

    try {
      const initiateRes = await fetch("/api/pi/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iouId: "test-payment-checklist",
          amount,
          memo: "Pi Checklist Test Payment",
          metadata: { type: "checklist_test_payment" },
        }),
      });

      const initiateData = await initiateRes.json();
      if (!initiateData.ok) throw new Error(initiateData.error);

      const serverPaymentId = initiateData.serverPaymentId;

      const payment = await Pi.createPayment({
        amount,
        memo: "Pi Checklist Test Payment",
        metadata: { serverPaymentId },

        onReadyForServerApproval: async (paymentId: string) => {
          await fetch("/api/pi/approve-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, serverPaymentId }),
          });
        },

        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          await fetch("/api/pi/complete-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid, serverPaymentId }),
          });
        },

        onCancel: async (paymentId: string) => {
          await fetch("/api/pi/cancel-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, serverPaymentId }),
          });
        },

        onError: (err: any) => {
          console.error(err);
          alert("Errore Pi SDK");
        },
      });

      alert("Test Payment completato!");
    } catch (err: any) {
      alert("Errore: " + err?.message);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={runTestPayment}
      disabled={loading}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg"
    >
      {loading ? "Processing..." : "Run Pi Test Payment"}
    </button>
  );
}
