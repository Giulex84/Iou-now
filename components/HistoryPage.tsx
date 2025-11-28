"use client";

import dynamic from "next/dynamic";
import HistoryContent from "@/components/HistoryContent";

// PiSdkLoader deve essere importato dinamicamente
const PiSdkLoader = dynamic(() => import("@/components/pi/PiSdkLoader"), {
  ssr: false,
});

export default function HistoryPage() {
  return (
    <PiSdkLoader>
      <div className="min-h-screen p-4 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">Storico IOUs</h1>
        <HistoryContent />
      </div>
    </PiSdkLoader>
  );
}
