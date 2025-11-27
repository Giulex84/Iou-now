"use client";

import dynamic from "next/dynamic";
import PiSdkLoader from "@/components/pi/PiSdkLoader";

export const dynamic = "force-dynamic";

const AddContent = dynamic(
  () => import("@/components/AddContent"),
  { ssr: false }
);

export default function AddPage() {
  return (
    <PiSdkLoader>
      <AddContent />
    </PiSdkLoader>
  );
}
