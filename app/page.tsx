"use client";

import { useEffect, useState } from "react";
import DashboardContent from "@/components/DashboardContent";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Page() {
  const [piUser, setPiUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initPiAuth() {
      try {
        if (!window.Pi) {
          console.warn("Pi SDK non trovato. Apri nel Pi Browser.");
          setLoading(false);
          return;
        }

        // Inizializza Pi SDK
        window.Pi.init({ version: "2.0" });

        // Chiede login tramite Pi Browser
        const authResult = await window.Pi.authenticate(
          ["username", "payment"], 
          (error: any, result: any) => {
            if (error) {
              console.error("Errore login Pi:", error);
              setLoading(false);
              return;
            }
            return result;
          }
        );

        setPiUser(authResult.user); // contiene username, uid ecc.
      } catch (err) {
        console.error("Errore durante autenticazione Pi:", err);
      } finally {
        setLoading(false);
      }
    }

    initPiAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-lg animate-pulse">Caricamento…</div>
      </div>
    );
  }

  if (!piUser) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Apri l’app nel Pi Browser</h1>
        <p className="opacity-70">
          Per utilizzare IOU Ledger Pro devi accedere tramite Pi Network.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <DashboardContent username={piUser.username} />
    </div>
  );
}
