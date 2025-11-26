"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function TestPaymentButton() {
  const [status, setStatus] = useState("Inizializzazione componente...");
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    setStatus("Verifico window.Pi...");

    const initPi = async () => {
      if (typeof window !== "undefined" && window.Pi) {
        try {
          await window.Pi.init({ version: "2.0", sandbox: true });
          setSdkReady(true);
          setStatus("Pi SDK pronto (sandbox)");
        } catch (err: any) {
          setSdkReady(true);
          setStatus("Pi init probabilmente già fatto: " + (err?.message || ""));
        }
      } else {
        setStatus("window.Pi non trovato. Sei sicuro di essere nel Pi Browser?");
      }
    };

    const t = setTimeout(initPi, 1000);
    return () => clearTimeout(t);
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK non trovato");
      return;
    }

    setStatus("Avvio pagamento...");

    const paymentData = {
      amount: 1,
      memo: "Test Payment IOU",
      metadata: { test: true },
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        setStatus("In attesa di approvazione server: " + paymentId);
        alert("PaymentID: " + paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        setStatus("Completato. TXID: " + txid);
        alert("TXID: " + txid);
      },
      onCancel: () => {
        setStatus("Pagamento annullato dall’utente");
      },
      onError: (error: any) => {
        setStatus("Errore: " + JSON.stringify(error));
      },
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err: any) {
      setStatus("Errore createPayment: " + (err?.message || ""));
    }
  };

  return (
    <div className="my-4 p-4 border-2 border-yellow-400 bg-gray-900 rounded-lg text-white w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">
        Test Payment Pi
      </h3>

      <div className="mb-3 p-2 bg-black rounded font-mono text-xs text-green-400 break-words">
        STATUS: {status}
      </div>

      <button
        onClick={handlePayment}
        disabled={!sdkReady}
        className={`w-full py-3 px-4 rounded font-bold text-lg transition-colors ${
          sdkReady
            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        {sdkReady ? "PAGA 1 PI (TEST)" : "Caricamento SDK..."}
      </button>
    </div>
  );
}
