"use client";

import { useEffect, useState } from "react";
import { Pi } from "@pi-network/pi-sdk";
import DashboardContent from "@/components/DashboardContent";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [piUser, setPiUser] = useState(null);

  useEffect(() => {
    async function initPi() {
      try {
        // Inizializza il Pi SDK
        await Pi.init({
          version: "2.0",
          sandbox: false,
        });

        // Prova ad ottenere la sessione se esiste già
        const existingUser = await Pi.getUser();

        if (existingUser) {
          setPiUser(existingUser);
        } else {
          // Se non è loggato → login immediato
          const auth = await Pi.authenticate();
          setPiUser(auth.user);
        }
      } catch (err) {
        console.error("Errore autenticazione Pi:", err);
      } finally {
        setLoading(false);
      }
    }

    initPi();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Caricamento…
      </div>
    );
  }

  if (!piUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Errore: impossibile ottenere i dati utente.
      </div>
    );
  }

  return <DashboardContent username={piUser.username} />;
}
