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
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export function EditTradeDialog({ trade, onUpdate }: any) {
  const [form, setForm] = useState({
    pair: trade.pair,
    entry: trade.entry,
    exit: trade.exit,
    lot_size: trade.lot_size,
    notes: trade.notes,
  })

  async function save() {
    await supabase.from("trades").update({
      pair: form.pair,
      entry: Number(form.entry),
      exit: Number(form.exit),
      lot_size: Number(form.lot_size),
      notes: form.notes,
    }).eq("id", trade.id)

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

        <div className="space-y-3">

          <div className="space-y-1">
            <Label>Pair</Label>
            <Input
              value={form.pair}
              onChange={(e) => setForm({ ...form, pair: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Entry</Label>
            <Input
              type="number"
              value={form.entry}
              onChange={(e) => setForm({ ...form, entry: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Exit</Label>
            <Input
              type="number"
              value={form.exit}
              onChange={(e) => setForm({ ...form, exit: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Lot Size</Label>
            <Input
              type="number"
              value={form.lot_size}
              onChange={(e) => setForm({ ...form, lot_size: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Notes</Label>
            <Input
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <Button onClick={save}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
