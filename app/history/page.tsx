"use client";

import dynamic from "next/dynamic";
import PiSdkLoader from "@/components/pi/PiSdkLoader";

export const dynamic = "force-dynamic";

const HistoryContent = dynamic(
  () => import("@/components/HistoryContent"),
  { ssr: false }
);

export default function HistoryPage() {
  return (
    <PiSdkLoader>
      <HistoryContent />
    </PiSdkLoader>
  );
}
