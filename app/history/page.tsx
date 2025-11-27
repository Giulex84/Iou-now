"use client";

import dynamic from "next/dynamic";

const HistoryContent = dynamic(
  () => import("@/components/history-content"), 
  { ssr: false }
);

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function HistoryPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Storico IOU
      </h1>

      <HistoryContent />
    </main>
  );
}
