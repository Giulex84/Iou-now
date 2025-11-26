"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function TestPaymentButton() {
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
          setStatus("Init Pi completato");
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
      alert("Pi SDK non caricato");
      return;
    }

    setStatus("Avvio pagamento...");

    const paymentData = {
      amount: 1,
      memo: "Test Payment",
      metadata: { id: "TEST123" },
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        setStatus("In attesa approvazione server: " + paymentId);
        alert("Approva server: " + paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        setStatus("Completo: " + txid);
        alert("Pagamento completato!");
      },
      onCancel: () => setStatus("Annullato"),
      onError: (err: any) => setStatus("Errore: " + JSON.stringify(err)),
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err: any) {
      setStatus("Errore: " + err.message);
    }
  };

  return (
    <div className="my-6 p-4 border-2 border-yellow-400 bg-black rounded-lg text-white w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">Pi Debug Panel</h3>

      <div className="mb-4 p-2 bg-gray-950 rounded font-mono text-xs text-green-400 break-words">
        {status}
      </div>

      <button
        onClick={handlePayment}
        disabled={!sdkReady}
        className={`w-full py-3 px-4 rounded font-bold text-lg ${
          sdkReady
            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
            : "bg-gray-600 text-gray-300 cursor-not-allowed"
        }`}
      >
        {sdkReady ? "TEST PAYMENT (1 PI)" : "Caricamento SDK..."}
      </button>
    </div>
  );
}
