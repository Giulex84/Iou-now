"use client";

import PiSdkLoader from "@/components/pi/PiSdkLoader";
import { useIOUs } from "@/components/providers/IOUProvider";
import IOUCard from "@/components/iou-card";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function HistoryPage() {
  const { ious } = useIOUs();

  return (
    <PiSdkLoader>
      <main className="min-h-screen p-4 bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-6">Storico IOU</h1>
        <div className="space-y-4">
          {ious.map((iou) => (
            <IOUCard key={iou.id} iou={iou} />
          ))}
        </div>
      </main>
    </PiSdkLoader>
  );
}
