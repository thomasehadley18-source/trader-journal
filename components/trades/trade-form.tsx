"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculateTradeSessions } from "@/lib/sessions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TradeForm({ onSubmit }: { onSubmit: () => void }) {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    pair: "",
    direction: "Buy",
    entry: "",
    exit: "",
    lot_size: "",
    notes: "",
    strategy: "",
    tags: "",
  })

  async function handleSubmit() {
    if (!form.pair || !form.entry || !form.exit) {
      alert("Please enter all required fields")
      return
    }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    const entryNum = Number(form.entry)
    const exitNum = Number(form.exit)
    const lot = Number(form.lot_size)

    const pnl =
      form.direction === "Buy" ? (exitNum - entryNum) * lot : (entryNum - exitNum) * lot

    const now = new Date().toISOString()
    const sessionData = calculateTradeSessions(now, now)

    await supabase.from("trades").insert([
      {
        user_id: user.id,
        pair: form.pair,
        direction: form.direction,
        entry: entryNum,
        exit: exitNum,
        lot_size: lot,
        pnl,
        notes: form.notes,
        strategy: form.strategy,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        import_source: "manual",
        session_open: sessionData.session_open,
        session_close: sessionData.session_close,
        sessions_active: sessionData.sessions_active,
      },
    ])

    setForm({
      pair: "",
      direction: "Buy",
      entry: "",
      exit: "",
      lot_size: "",
      notes: "",
      strategy: "",
      tags: "",
    })

    setLoading(false)
    onSubmit()
  }

  return (
    <div className="border border-border p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-medium">Add Trade</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Pair</Label>
          <Input value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value })} />
        </div>

        <div className="space-y-2">
          <Label>Direction</Label>
          <select
            className="bg-background border p-2 rounded"
            value={form.direction}
            onChange={(e) => setForm({ ...form, direction: e.target.value })}
          >
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Entry</Label>
          <Input type="number" value={form.entry} onChange={(e) => setForm({ ...form, entry: e.target.value })} />
        </div>

        <div className="space-y-2">
          <Label>Exit</Label>
          <Input type="number" value={form.exit} onChange={(e) => setForm({ ...form, exit: e.target.value })} />
        </div>

        <div className="space-y-2">
          <Label>Lot Size</Label>
          <Input type="number" value={form.lot_size} onChange={(e) => setForm({ ...form, lot_size: e.target.value })} />
        </div>

        <div className="space-y-2">
          <Label>Strategy</Label>
          <Input
            value={form.strategy}
            onChange={(e) => setForm({ ...form, strategy: e.target.value })}
            placeholder="Breakout, Pullback, Range…"
          />
        </div>

        <div className="space-y-2">
          <Label>Tags (comma separated)</Label>
          <Input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="FOMO, Revenge, A+ Setup…"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Add Trade"}
      </Button>
    </div>
  )
}
