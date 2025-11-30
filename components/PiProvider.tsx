"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Pi } from "@pi-network/pi-web-sdk"; 

interface PiContextType {
  user: any | null;
  login: () => Promise<void>;
  pi: typeof Pi | null;
}

const PiContext = createContext<PiContextType | undefined>(undefined);

export function usePi() {
  const ctx = useContext(PiContext);
  if (!ctx) throw new Error("usePi deve essere usato dentro PiProvider");
  return ctx;
}

export default function PiProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [pi, setPi] = useState<typeof Pi | null>(null);

  useEffect(() => {
    // Controlla se siamo nel Pi Browser
    const isPi = (window as any).Pi;
    if (!isPi) {
      console.warn("⚠️ Pi SDK non trovato — aprire nel Pi Browser");
      return;
    }

    const piInstance = (window as any).Pi;
    piInstance.init({ version: "2.0", sandbox: false });
    setPi(piInstance);

    (() => {
      // Tenta login automatico
      try {
        piInstance.authenticate(
          ["username", "payments"],
          (user: any) => setUser(user),
          (err: any) => console.error("Auth error:", err)
        );
      } catch (err) {
        console.error("Auth init failed:", err);
      }
    })();
  }, []);

  const login = async () => {
    if (!pi) return;

    const user = await pi.authenticate(
      ["username", "payments"],
      (u: any) => u,
      (err: any) => console.error(err)
    );

    setUser(user);
  };

  return (
    <PiContext.Provider value={{ user, login, pi }}>
      {children}
    </PiContext.Provider>
  );
}
