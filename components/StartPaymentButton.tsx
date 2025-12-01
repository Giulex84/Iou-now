"use client";

import React, { useState } from "react";
import { usePi } from "@/components/PiProvider";

export default function StartPaymentButton() {
  const { Pi, user, initialized } = usePi();
  const [status, setStatus] = useState<string>("Pronto per il test payment.");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!Pi) {
      setStatus("Pi SDK non disponibile. Apri in Pi Browser.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Creazione pagamento...");

      const paymentData = {
        amount: 1,
        memo: "Test payment (checklist)",
        metadata: { reason: "checklist_test" },
      };

      await Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId: string) => {
          setStatus("Approvazione automatica...");
          try {
            await Pi.approvePayment(paymentId); // APPROVA
            setStatus("Approvato! Attesa completamento...");
          } catch (e) {
            setStatus("Errore approvazione server");
            setIsLoading(false);
          }
        },

        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          setStatus("Completamento automatico...");
          try {
            await Pi.completePayment(paymentId, txid); // COMPLETA
            setStatus("Pagamento completato! ✅");
            alert("Test payment completato!");
          } catch (e) {
            setStatus("Errore completamento server");
          }
          setIsLoading(false);
        },

        onCancel: () => {
          setStatus("Pagamento annullato dall'utente.");
          setIsLoading(false);
        },

        onError: (err: any) => {
          console.error("Pi payment error", err);
          setStatus("Errore pagamento.");
          setIsLoading(false);
        },
      });
    } catch (err: any) {
      console.error("handlePayment error", err);
      setStatus("Errore: " + (err?.message ?? "sconosciuto"));
      setIsLoading(false);
    }
  };

  const disabled = !initialized || !Pi || isLoading;

  return (
    <div className="my-6 p-4 border-2 border-yellow-400 bg-black rounded-lg text-white max-w-md mx-auto">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">
        Pi Test Payment (1 π)
      </h3>

      {user && (
        <p className="text-xs mb-1">
          Utente: <span className="font-mono">{user.username}</span>
        </p>
      )}

      <p className="text-xs mb-3">Stato: {status}</p>

      <button
        onClick={handlePayment}
        disabled={disabled}
        className={`w-full py-3 px-4 rounded font-bold text-lg ${
          disabled
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-black"
        }`}
      >
        {isLoading
          ? "In corso..."
          : initialized
          ? "TEST PAYMENT (1 π)"
          : "Inizializzazione..."}
      </button>
    </div>
  );
}
