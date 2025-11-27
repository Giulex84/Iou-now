"use client";

import dynamic from "next/dynamic";
import StartPaymentButton from "@/components/StartPaymentButton";

// Carichiamo il DashboardContent SENZA SSR
const DashboardContent = dynamic(
  () => import("@/components/DashboardContent"),
  { ssr: false }
);

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        IOU Ledger Pro Dashboard
      </h1>

      <DashboardContent />

      <div className="mt-8 flex justify-center">
        <StartPaymentButton />
      </div>
    </main>
  );
}
