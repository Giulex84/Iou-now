"use client";

import PiSdkLoader from "@/components/pi/PiSdkLoader";
import AddIOUForm from "@/components/AddIOUForm";

export const dynamic = "force-dynamic";

export default function AddPage() {
  return (
    <PiSdkLoader>
      <div className="min-h-screen p-4 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">Aggiungi IOU</h1>
        <AddIOUForm />
      </div>
    </PiSdkLoader>
  );
}
