"use client";

import PiSdkLoader from "@/components/pi/PiSdkLoader";
import AddIOUForm from "@/components/add-iou-form";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function AddPage() {
  return (
    <PiSdkLoader>
      <main className="min-h-screen p-4 bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-6">Aggiungi IOU</h1>
        <AddIOUForm />
      </main>
    </PiSdkLoader>
  );
}
