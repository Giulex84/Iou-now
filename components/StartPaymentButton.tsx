"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

type PiUser = {
  uid: string;
  username: string;
};

export default function StartPaymentButton() {
  const [status, setStatus] = useState<string>("Inizializzazione...");
  const [sdkReady, setSdkReady] = useState<boolean>(false);
  const [user, setUser] = useState<PiUser | null>(null);
  const [serverPaymentId, setServerPaymentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined" || !window.Pi) {
        setStatus("SDK Pi non trovato. Apri in Pi Browser.");
        return;
      }

      try {
        await window.Pi.init({
          version: "2.0",
          sandbox: true,
        });

        const scopes = ["payments"];

        const authUser = await window.Pi.authenticate(
          scopes,
          (incompletePayment: any) => {
            console.log("Incomplete Payment:", incompletePayment);
          }
        );

        setUser(authUser);
        setSdkReady(true);
        setStatus("SDK pronto.");
      } catch (err) {
        console.error(err);
        setStatus("Errore init/auth");
      }
    };

    init();
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) return;

    try {
      setIsLoading(true);
      setStatus("Creo pagamento lato server...");

      const initRes = await fetch("/api/pi/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iouId: "TEST_PAYMENT",
          amount: 1,
          memo: "Test payment (checklist)",
          metadata: { reason: "checklist_test" },
        }),
      });

      const initJson = await initRes.json();
      if (!initRes.ok || !initJson.ok) {
        setStatus("Errore initiate-payment");
        setIsLoading(false);
        return;
      }

      const newServerPaymentId = initJson.serverPaymentId;
      setServerPaymentId(newServerPaymentId);

      const paymentData = {
        amount: 1,
        memo: "Test payment (checklist)",
        metadata: { serverPaymentId: newServerPaymentId },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          setStatus("Attesa approvazione...");

          const res = await fetch("/api/pi/approve-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId,
              serverPaymentId: newServerPaymentId,
            }),
          });

          const json = await res.json();
          if (!res.ok || !json.ok) setStatus("Errore approvazione");
          else setStatus("Approvato. Attesa completamento...");
        },

        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          setStatus("Completamento...");

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
          if (!res.ok || !json.ok) setStatus("Errore completion");
          else {
            setStatus("Pagamento completato");
            alert("Pagamento di test completato!");
          }

          setIsLoading(false);
        },

        onCancel: () => {
          setStatus("Annullato");
          setIsLoading(false);
        },

        onError: (err: any) => {
          console.error(err);
          setStatus("Errore pagamento");
          setIsLoading(false);
        },
      };

      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error(err);
      setStatus("Errore");
      setIsLoading(false);
    }
  };

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
        disabled={!sdkReady || isLoading}
        className={`w-full py-3 px-4 rounded font-bold text-lg ${
          !sdkReady || isLoading
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-black"
        }`}
      >
        {sdkReady ? (isLoading ? "In corso..." : "TEST PAYMENT (1 π)") : "Caricamento..."}
      </button>
    </div>
  );
}
