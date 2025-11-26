"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function TestPaymentButton() {
  const [status, setStatus] = useState("Inizializzazione componente…");
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    setStatus("Verifica presenza SDK Pi…");

    const init = async () => {
      if (typeof window !== "undefined" && window.Pi) {
        try {
          await window.Pi.init({ version: "2.0", sandbox: true });
          setSdkReady(true);
          setStatus("SDK Pi pronto (sandbox)");
        } catch (e: any) {
          setSdkReady(true);
          setStatus("Pi init già attivo o errore: " + e.message);
        }
      } else {
        setStatus("SDK Pi NON trovato.");
      }
    };

    const t = setTimeout(init, 800);
    return () => clearTimeout(t);
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) {
      alert("SDK non trovato");
      return;
    }

    setStatus("Avvio pagamento…");

    const paymentData = {
      amount: 1,
      memo: "Test Payment",
      metadata: { test: true },
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        setStatus("In attesa approvazione server: " + paymentId);
        alert("Payment: " + paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        setStatus("Completamento pagamento…");
        alert("TXID: " + txid);
      },
      onCancel: () => {
        setStatus("Pagamento annullato");
      },
      onError: (err: any) => {
        setStatus("Errore: " + JSON.stringify(err));
      },
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (e: any) {
      setStatus("Errore createPayment: " + e.message);
      alert(e.message);
    }
  };

  return (
    <div className="my-6 p-4 border-2 border-yellow-400 bg-gray-900 rounded-lg text-white w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">Pi Payment Debug</h3>

      <div className="mb-4 p-2 bg-black rounded font-mono text-xs text-green-400 break-words">
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
        {sdkReady ? "PAGA 1 PI (TEST)" : "Caricamento SDK…"}
      </button>
    </div>
  );
}
