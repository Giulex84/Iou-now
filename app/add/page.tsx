"use client";

import AddIOUForm from "@/components/add-iou-form";
import TestPaymentButton from "@/components/TestPaymentButton";

export default function AddPage() {
  return (
    <div className="space-y-6 p-4">

      {/* TEST PAYMENT BUTTON */}
      <div className="w-full flex justify-center mt-4">
        <TestPaymentButton />
      </div>

      <h1 className="text-2xl font-bold">Add New IOU</h1>
      <AddIOUForm />
    </div>
  );
}
