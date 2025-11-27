"use client";

import { useState } from "react";
import { useIOUs } from "@/components/iou-context";

export default function AddPage() {
  const { addIOU } = useIOUs();
  const [form, setForm] = useState({ from: "", to: "", amount: "" });

  const submit = () => {
    addIOU(form.from, form.to, Number(form.amount));
    setForm({ from: "", to: "", amount: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add IOU</h1>

      <input
        placeholder="From"
        value={form.from}
        onChange={(e) => setForm({ ...form, from: e.target.value })}
      />

      <input
        placeholder="To"
        value={form.to}
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />

      <input
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <button onClick={submit}>Save</button>
    </div>
  );
}
