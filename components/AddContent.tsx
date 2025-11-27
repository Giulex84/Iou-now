"use client";

import AddIOUForm from "@/components/add-iou-form";

export default function AddContent() {
  return (
    <div className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6">Aggiungi IOU</h1>
      <AddIOUForm />
    </div>
  );
}
