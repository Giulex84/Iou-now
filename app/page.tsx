"use client";

import dynamic from "next/dynamic";
import PiSdkLoader from "@/components/pi/PiSdkLoader";

export const dynamic = "force-dynamic";

const DashboardContent = dynamic(
  () => import("@/components/DashboardContent"),
  { ssr: false }
);

export default function Home() {
  return (
    <PiSdkLoader>
      <DashboardContent />
    </PiSdkLoader>
  );
}
