"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HistoryContent from "@/components/HistoryContent";

// IMPORTANTE:
// Non importiamo più PiSdkLoader direttamente.
// Lo carichiamo dinamicamente per evitare qualsiasi esecuzione SSR.
const DynamicPiSdkLoader = dynamic(
  () => import("@/components/pi/PiSdkLoader"),
  { ssr: false }
);

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);

  // Garantiamo che la UI venga renderizzata SOLO sul client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen p-4 bg-gray-900 text-white">
        <div className="text-xl">Caricamento in corso...</div>
      </div>
    );
  }

  return (
    <DynamicPiSdkLoader>
      <div className="min-h-screen p-4 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">Storico IOUs</h1>
        <HistoryContent />
      </div>
    </DynamicPiSdkLoader>
  );
}
