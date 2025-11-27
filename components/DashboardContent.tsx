"use client";

import { useIOUs } from "@/components/providers/IOUProvider";

export default function DashboardContent() {
  const { ious } = useIOUs();
  
  return (
    <div className="text-center text-white mt-6">
      Totale IOU: {ious.length}
    </div>
  );
}
