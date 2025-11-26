"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function StartPaymentButton() {
  const [status, setStatus] = useState("Inizializzazione...");
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    setStatus("Controllo SDK...");

    const initPi = async () => {
      if (typeof window !== "undefined" && window.Pi) {
        try {
          await window.Pi.init({ version: "2.0", sandbox: true });
          setSdkReady(true);
          setStatus("SDK Pronto");
        } catch (err: any) {
          setSdkReady(true);
          setStatus("Errore inizializzazione");
        }
      } else {
        setStatus("SDK non trovato");
      }
    };

    const t = setTimeout(initPi, 800);
    return () => clearTimeout(t);
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) {
      alert("PI SDK non caricato!");
      return;
    }

    setStatus("Avvio pagamento...");

    const paymentData = {
      amount: 1,
      memo: "Payment",
      metadata: { id: "TEST123" }
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        setStatus("In attesa approvazione server: " + paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        setStatus("Pagamento completato");
      },
      onCancel: () => setStatus("Operazione annullata"),
      onError: (err: any) => setStatus("Errore: " + JSON.stringify(err)),
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err: any) {
      setStatus("Errore: " + err.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <button
        onClick={handlePayment}
        disabled={!sdkReady}
        className={`w-full px-4 py-3 rounded font-bold text-lg ${
          sdkReady
            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
      >
        {sdkReady ? "PAGA 1 PI" : "Caricamento SDK..."}
      </button>

      <p className="text-xs text-gray-500">{status}</p>
    </div>
  );
}
