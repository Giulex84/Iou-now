// components/StartPaymentButton.tsx
"use client";

import React, { useState } from "react";
import { usePi } from "@/components/PiProvider";

export default function StartPaymentButton() {
  const { Pi, user, initialized } = usePi();
  const [status, setStatus] = useState<string>("Pronto per il test payment.");
  const [serverPaymentId, setServerPaymentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!Pi) {
      setStatus("Pi SDK non disponibile. Apri in Pi Browser.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Creo pagamento sul server...");

      // 🔥 MOSTRA ERRORE REALE DELL'API BACKEND
      const initRes = await fetch("/api/pi/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1,
          memo: "Test payment (checklist)",
          metadata: { reason: "checklist_test" },
        }),
      });

      const initJson = await initRes.json();
      console.log("Init response:", initJson);

      if (!initRes.ok) {
        setStatus(`Errore initiate-payment: ${JSON.stringify(initJson)}`);
        setIsLoading(false);
        return;
      }

      const newServerPaymentId: string = initJson.serverPaymentId ?? initJson.id;

      if (!newServerPaymentId) {
        setStatus("Errore: serverPaymentId mancante!");
        setIsLoading(false);
        return;
      }

      setServerPaymentId(newServerPaymentId);

      const paymentData = {
        amount: 1,
        memo: "Test payment (checklist)",
        metadata: { serverPaymentId: newServerPaymentId },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          setStatus("Attesa approvazione server...");

          const res = await fetch("/api/pi/approve-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId,
              serverPaymentId: newServerPaymentId,
            }),
          });

          const json = await res.json();
          console.log("Approve response:", json);

          if (!res.ok) {
            setStatus(
              `Errore approvazione server: ${JSON.stringify(json)}`
            );
          } else {
            setStatus("Approvato. Attesa completamento su Pi...");
          }
        },

        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          setStatus("Completamento sul server...");

          const res = await fetch("/api/pi/complete-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId,
              txid,
              serverPaymentId: newServerPaymentId,
            }),
          });

          const json = await res.json();
          console.log("Complete response:", json);

          if (!res.ok) {
            setStatus(
              `Errore completamento server: ${JSON.stringify(json)}`
            );
          } else {
            setStatus("Pagamento completato ✅");
            alert("Pagamento di test completato!");
          }

          setIsLoading(false);
        },

        onCancel: () => {
          setStatus("Pagamento annullato dall'utente");
          setIsLoading(false);
        },

        onError: (err: any) => {
          console.error("Pi payment error", err);
          setStatus(`Errore pagamento: ${err?.message ?? "sconosciuto"}`);
          setIsLoading(false);
        },
      };

      await Pi.createPayment(paymentData, callbacks);
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

      {serverPaymentId && (
        <p className="text-[10px] text-gray-400 mb-1">
          serverPaymentId:{" "}
          <span className="font-mono break-all">{serverPaymentId}</span>
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
