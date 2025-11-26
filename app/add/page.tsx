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
  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<IOUCurrency>("EUR")
  const [category, setCategory] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [type, setType] = useState<"owed" | "owing">("owed")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addIOU({
      name,
      amount,
      currency,
      category,
      dueDate,
      type,
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
          Create a new IOU entry.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pb-10">
        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2"
          placeholder="Person name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-3 py-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select
          className="w-full rounded-xl border border-gray-300 px-3 py-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as IOUCurrency)}
        >
          <option value="EUR">Euro</option>
          <option value="USD">USD</option>
          <option value="PI">π</option>
        </select>

        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <DueDatePicker date={dueDate} setDate={setDueDate} />

        <select
          className="w-full rounded-xl border border-gray-300 px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value as "owed" | "owing")}
        >
          <option value="owed">Owed to me</option>
          <option value="owing">I owe</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-bold"
        >
          Add IOU
        </button>
      </form>
    </div>
  )
}
