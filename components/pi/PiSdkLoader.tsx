"use client";

import Script from "next/script";
import React, { useState, useEffect, ReactNode } from "react";
import { IOUProvider } from "@/components/providers/IOUProvider";
import PiDebugPanel from "@/components/pi/PiDebugPanel";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function PiSdkLoader({ children }: { children: ReactNode }) {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const checkPi = () => {
      if (typeof window !== "undefined" && window.Pi) {
        try {
          window.Pi.init({ version: "2.0", sandbox: true });
          setSdkLoaded(true);
        } catch (e) {
          console.error("Errore Pi.init:", e);
        }
      } else {
        setTimeout(checkPi, 500);
      }
    };

    checkPi();
  }, []);

  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
      <PiDebugPanel sdkReady={sdkLoaded} />

      {sdkLoaded ? (
        <IOUProvider>{children}</IOUProvider>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-950 text-white flex-col">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-400">Attendo caricamento Pi Network SDK...</p>
        </div>
      )}
    </>
  );
}
