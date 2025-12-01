"use client";

import React, { useState } from "react";
import { usePi } from "@/components/PiProvider";

export default function StartPaymentButton() {
  const { Pi, user, initialized } = usePi();
  const [status, setStatus] = useState("Pronto al test payment.");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!Pi) {
      setStatus("Apri l’app nel Pi Browser.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Genero serverPaymentId...");

      // NON chiamiamo più Pi API dal server
      const initRes = await fetch("/api/pi/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1,
          memo: "Test payment checklist",
          metadata: { test: true },
        }),
      });

      const initJson = await initRes.json();
      if (!initJson.ok) {
        setStatus("Errore generazione ID");
        setIsLoading(false);
        return;
      }

      const paymentData = {
        amount: 1,
        memo: "Test payment checklist",
        metadata: {
          serverPaymentId: initJson.serverPaymentId,
        },
      };

      setStatus("Apro Pi payment popup...");

      await Pi.createPayment(paymentData, {
        onReadyForServerApproval: () => {
          setStatus("Approvazione automatica completata.");
        },
        onReadyForServerCompletion: () => {
          setStatus("Completamento automatico...");
        },
        onCompleted: () => {
          setStatus("Pagamento completato! ✅");
          alert("Test payment completato!");
          setIsLoading(false);
        },
        onCancel: () => {
          setStatus("Pagamento annullato.");
          setIsLoading(false);
        },
        onError: () => {
          setStatus("Errore pagamento.");
          setIsLoading(false);
        },
      });
    } catch (err) {
      setStatus("Errore " + err);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-6 p-4 border border-yellow-400 bg-black text-white rounded-lg">
      <h3 className="text-lg text-yellow-400 font-bold mb-2">
        Pi Test Payment (1 π)
      </h3>

      <p className="text-sm mb-2">Stato: {status}</p>

      <button
        onClick={handlePayment}
        disabled={!initialized || !Pi || isLoading}
        className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg"
      >
        {isLoading ? "In corso..." : "TEST PAYMENT (1 π)"}
      </button>
    </div>
  );
}
