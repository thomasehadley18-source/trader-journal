"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function EditTradeDialog({
  trade,
  onUpdate,
}: {
  trade: any
  onUpdate: () => void
}) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<{
    pair: string
    direction: string
    entry: string
    exit: string
    lot_size: string
    notes: string
    strategy: string
    tags: string
  }>({
    pair: trade.pair ?? "",
    direction: trade.direction ?? "Buy",
    entry: String(trade.entry ?? ""),
    exit: String(trade.exit ?? ""),
    lot_size: String(trade.lot_size ?? ""),
    notes: trade.notes ?? "",
    strategy: trade.strategy ?? "",
    tags: Array.isArray(trade.tags) ? trade.tags.join(", ") : "",
  })

  async function save() {
    await supabase
      .from("trades")
      .update({
        pair: form.pair,
        direction: form.direction,
        entry: Number(form.entry),
        exit: Number(form.exit),
        lot_size: Number(form.lot_size),
        notes: form.notes,
        strategy: form.strategy,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag.length > 0)
          : [],
      })
      .eq("id", trade.id)

    setOpen(false)
    onUpdate()
  }

  if (!open) {
    return (
      <button
        type="button"
        className="border px-3 py-1 rounded"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg border bg-white p-6 text-black space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Trade</h2>
          <button
            type="button"
            className="border px-2 py-1 rounded"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="space-y-2">
          <label>Pair</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.pair}
            onChange={(e) => setForm({ ...form, pair: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label>Direction</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.direction}
            onChange={(e) => setForm({ ...form, direction: e.target.value })}
          >
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>

        <div className="space-y-2">
          <label>Entry</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={form.entry}
            onChange={(e) => setForm({ ...form, entry: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label>Exit</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={form.exit}
            onChange={(e) => setForm({ ...form, exit: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label>Lot Size</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={form.lot_size}
            onChange={(e) => setForm({ ...form, lot_size: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label>Strategy</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.strategy}
            onChange={(e) => setForm({ ...form, strategy: e.target.value })}
            placeholder="Breakout, Pullback, etc."
          />
        </div>

        <div className="space-y-2">
          <label>Tags (comma separated)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="FOMO, A+ Setup, News"
          />
        </div>

        <div className="space-y-2">
          <label>Notes</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={save}
          >
            Save Changes
          </button>

          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}