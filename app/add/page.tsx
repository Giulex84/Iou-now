"use client";

import AddIOUForm from "@/components/AddIOUForm";

export const dynamic = "force-dynamic";

export default function AddPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Aggiungi IOU</h1>
      <AddIOUForm />
    </div>
  );
}
