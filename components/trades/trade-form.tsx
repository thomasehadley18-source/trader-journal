"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
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
  })

  async function handleSubmit() {
    if (!form.pair || !form.entry || !form.exit || !form.lot_size) {
      alert("All fields required")
      return
    }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const entry = Number(form.entry)
    const exit = Number(form.exit)
    const lot = Number(form.lot_size)

    const pnl = form.direction === "Buy"
      ? (exit - entry) * lot
      : (entry - exit) * lot

    await supabase.from("trades").insert([
      {
        user_id: user.id,
        pair: form.pair,
        direction: form.direction,
        entry,
        exit,
        lot_size: lot,
        pnl,
        notes: form.notes,
      }
    ])

    setForm({ pair: "", direction: "Buy", entry: "", exit: "", lot_size: "", notes: "" })
    setLoading(false)
    onSubmit()
  }

  return (
    <div className="border border-border p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-medium">Add Trade</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>Pair</Label>
          <Input
            value={form.pair}
            onChange={(e) => setForm({ ...form, pair: e.target.value })}
            placeholder="EURUSD"
          />
        </div>

        <div className="space-y-2">
          <Label>Direction</Label>
          <Select
            defaultValue="Buy"
            onValueChange={(v) => setForm({ ...form, direction: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Buy">Buy</SelectItem>
              <SelectItem value="Sell">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Entry Price</Label>
          <Input
            type="number"
            value={form.entry}
            onChange={(e) => setForm({ ...form, entry: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Exit Price</Label>
          <Input
            type="number"
            value={form.exit}
            onChange={(e) => setForm({ ...form, exit: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Lot Size</Label>
          <Input
            type="number"
            value={form.lot_size}
            onChange={(e) => setForm({ ...form, lot_size: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="What happened in this trade?"
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Add Trade"}
      </Button>
    </div>
  )
}
