"use client";

import dynamic from "next/dynamic";
import HistoryContent from "@/components/HistoryContent";
import { useState, useEffect } from "react";

const DynamicPiSdkLoader = dynamic(
  () => import("@/components/pi/PiSdkLoader"),
  { ssr: false }
);

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen p-4 bg-gray-900 text-white">
        <div className="text-xl">Caricamento…</div>
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
