"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import DueDatePicker from "@/components/due-date-picker"
import { useIOUs } from "@/components/iou-context"
import type { IOUCurrency } from "@/lib/types"

export default function AddPage() {
  const router = useRouter()
  const { addIOU } = useIOUs()

  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | "">("")
  const [type, setType] = useState<"owed" | "owing">("owed")
  const [currency, setCurrency] = useState<IOUCurrency>("EUR")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !amount) return

    addIOU({
      name,
      amount: Number(amount),
      type,
      currency,
      dueDate,
      note,
      paid: false,
      category: "",
    })

    router.push("/")
  }

  return (
    <div className="space-y-6">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add IOU
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Record a new debt or credit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pb-10">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full rounded-xl border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Person"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Amount</label>
          <input
            type="number"
            className="w-full rounded-xl border px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Type</label>
          <select
            className="w-full rounded-xl border px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="owed">Owed to Me</option>
            <option value="owing">I Owe</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Currency</label>
          <select
            className="w-full rounded-xl border px-3 py-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as IOUCurrency)}
          >
            <option value="EUR">EUR €</option>
            <option value="USD">USD $</option>
            <option value="PI">PI π</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Due Date</label>
          <DueDatePicker value={dueDate} onChange={setDueDate} />
        </div>

        <div>
          <label className="text-sm font-medium">Note</label>
          <textarea
            className="w-full rounded-xl border px-3 py-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-2 text-white font-medium"
        >
          Save IOU
        </button>
      </form>
    </div>
  )
}
