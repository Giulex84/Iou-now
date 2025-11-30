"use client";

import { useEffect, useState, createContext, useContext } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

interface PiContextValue {
  Pi: any;
  user: any;
}

const PiContext = createContext<PiContextValue>({
  Pi: null,
  user: null,
});

export default function PiProvider({ children }: { children: React.ReactNode }) {
  const [pi, setPi] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load Pi SDK script
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      if (!window.Pi) return;

      // Init Pi SDK
      window.Pi.init({
        version: "2.0",
      });

      setPi(window.Pi);

      // Auto-login on open
      window.Pi.authenticate(["username", "payments"], (authResult: any) => {
        setUser(authResult ? authResult.user : null);
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <PiContext.Provider value={{ Pi: pi, user }}>
      {children}
    </PiContext.Provider>
  );
}

export function usePi() {
  return useContext(PiContext);
}
