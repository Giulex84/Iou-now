"use client";

import { useState } from "react";
import { DueDatePicker } from "@/components/due-date-picker";

export default function AddIOUPage() {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Add IOU</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Due Date</label>
        <DueDatePicker value={dueDate} onChange={setDueDate} />
      </div>

      <button className="w-full bg-purple-600 text-white rounded-md px-4 py-2">
        Add IOU
      </button>
    </div>
  );
}
