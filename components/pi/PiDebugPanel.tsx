"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

interface PiDebugPanelProps {
  sdkReady: boolean;
}

export default function PiDebugPanel({ sdkReady }: PiDebugPanelProps) {
  const [authData, setAuthData] = useState<any>(null);
  const [isPiBrowser, setIsPiBrowser] = useState(false);

  useEffect(() => {
    setIsPiBrowser(
      typeof window !== "undefined" && /PiBrowser/i.test(navigator.userAgent)
    );

    if (sdkReady && window.Pi && !authData) {
      window.Pi.authenticate(
        ["username"],
        (auth: any) => setAuthData(auth),
        (err: any) =>
          setAuthData({ username: "ERRORE AUTENTICAZIONE", error: err.message })
      );
    }
  }, [sdkReady, authData]);

  const authStatus = authData?.username
    ? `Autenticato: ${authData.username}`
    : sdkReady
    ? "In attesa Autenticazione..."
    : "SDK non pronto";

  return (
    <div className="fixed top-2 right-2 p-2 rounded-lg shadow-xl bg-gray-800 text-xs font-mono z-50 max-w-xs">
      <h4 className="text-white font-bold mb-1 border-b border-gray-700 pb-1">
        PI DEBUG STATUS
      </h4>

      <div
        className={`p-1 rounded mb-1 text-white flex justify-between ${
          isPiBrowser ? "bg-blue-600" : "bg-red-700"
        }`}
      >
        <span>Browser:</span>
        <span>{isPiBrowser ? "✅ PiBrowser" : "❌ Altro"}</span>
      </div>

      <div
        className={`p-1 rounded text-white flex justify-between ${
          sdkReady ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <span>SDK Status:</span>
        <span>{sdkReady ? "✅ READY" : "❌ NOT FOUND"}</span>
      </div>

      <p className="mt-1 text-gray-300 break-words">Auth: {authStatus}</p>
    </div>
  );
}
