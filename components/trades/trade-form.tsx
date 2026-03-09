"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TradeForm({ onSaved }: { onSaved: () => void }) {
  const [form, setForm] = useState({
    pair: "",
    direction: "Buy",
    entry: "",
    exit: "",
    lot_size: "",
    pnl: "",
    strategy: "",
    tags: "",
    notes: "",
  })

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("trades").insert({
      user_id: user.id,
      trade_date: new Date().toISOString(),
      pair: form.pair,
      direction: form.direction,
      entry: Number(form.entry),
      exit: Number(form.exit),
      lot_size: Number(form.lot_size),
      pnl: Number(form.pnl),
      strategy: form.strategy,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
      notes: form.notes,
      import_source: "manual",
      sessions_active: [],
    })

    setForm({
      pair: "",
      direction: "Buy",
      entry: "",
      exit: "",
      lot_size: "",
      pnl: "",
      strategy: "",
      tags: "",
      notes: "",
    })

    onSaved()
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2 style={{ marginBottom: 16 }}>Add Trade</h2>

      <div className="grid-2">
        <div>
          <label className="label">Pair</label>
          <input
            className="input"
            value={form.pair}
            onChange={(e) => setForm({ ...form, pair: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Direction</label>
          <select
            className="input"
            value={form.direction}
            onChange={(e) => setForm({ ...form, direction: e.target.value })}
          >
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>

        <div>
          <label className="label">Entry</label>
          <input
            className="input"
            type="number"
            value={form.entry}
            onChange={(e) => setForm({ ...form, entry: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Exit</label>
          <input
            className="input"
            type="number"
            value={form.exit}
            onChange={(e) => setForm({ ...form, exit: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Lot Size</label>
          <input
            className="input"
            type="number"
            value={form.lot_size}
            onChange={(e) => setForm({ ...form, lot_size: e.target.value })}
          />
        </div>

        <div>
          <label className="label">PnL</label>
          <input
            className="input"
            type="number"
            value={form.pnl}
            onChange={(e) => setForm({ ...form, pnl: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Strategy</label>
          <input
            className="input"
            value={form.strategy}
            onChange={(e) => setForm({ ...form, strategy: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Tags</label>
          <input
            className="input"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label className="label">Notes</label>
        <textarea
          className="input"
          rows={4}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="btn" type="submit">
          Save Trade
        </button>
      </div>
    </form>
  )
}