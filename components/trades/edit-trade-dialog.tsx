"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export function EditTradeDialog({ trade, onUpdate }: any) {
  const [form, setForm] = useState({
    pair: trade.pair,
    direction: trade.direction,
    entry: trade.entry,
    exit: trade.exit,
    lot_size: trade.lot_size,
    notes: trade.notes || "",
    strategy: trade.strategy || "",
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
        tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
      })
      .eq("id", trade.id)

    onUpdate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Trade</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div className="space-y-2">
            <Label>Pair</Label>
            <Input
              value={form.pair}
              onChange={(e) => setForm({ ...form, pair: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Direction</Label>
            <select
              className="border p-2 rounded bg-background"
              value={form.direction}
              onChange={(e) => setForm({ ...form, direction: e.target.value })}
            >
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Entry</Label>
            <Input
              type="number"
              value={form.entry}
              onChange={(e) => setForm({ ...form, entry: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Exit</Label>
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

          <div className="space-y-2">
            <Label>Strategy</Label>
            <Input
              value={form.strategy}
              onChange={(e) => setForm({ ...form, strategy: e.target.value })}
              placeholder="Breakout, Pullback, etc."
            />
          </div>

          <div className="space-y-2">
            <Label>Tags (comma separated)</Label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="FOMO, Overtrade, A+ Setup"
            />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...
