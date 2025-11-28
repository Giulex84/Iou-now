"use client";

import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

// Carichiamo TUTTO (PiSdkLoader + HistoryContent) lato client
const HistoryPageContent = dynamic(
  () => import("@/components/history/HistoryPageContent"), 
  { ssr: false }
);

export default function HistoryPage() {
  return <HistoryPageContent />;
}
