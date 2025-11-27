"use client";

import PiSdkLoader from "@/components/pi/PiSdkLoader";
import StartPaymentButton from "@/components/StartPaymentButton";
import { useIOUs } from "@/components/providers/IOUProvider";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function DashboardContent() {
  const { ious } = useIOUs();
  return (
    <p className="text-gray-300 text-center">
      Totale IOU in sospeso: {ious.length}
    </p>
  );
}

export default function Home() {
  return (
    <PiSdkLoader>
      <main className="min-h-screen p-4 bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          IOU Ledger Pro Dashboard
        </h1>

        <DashboardContent />

        <div className="mt-8 flex justify-center">
          <StartPaymentButton />
        </div>
      </main>
    </PiSdkLoader>
  );
}
