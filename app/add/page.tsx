"use client";

import dynamic from "next/dynamic";

// Carichiamo il form dinamicamente senza SSR
const AddIOUForm = dynamic(
  () => import("@/components/add-iou-form"),
  { ssr: false }
);

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function AddPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Aggiungi IOU
      </h1>

      <AddIOUForm />
    </main>
  );
}
