"use client"

import { useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
import InstrumentSelect from "@/components/trades/instrument-select"

export default function TradeForm({
  onAdded,
}: {
  onAdded?: () => void
}) {
  const [symbol, setSymbol] = useState("")
  const [side, setSide] = useState("LONG")
  const [entry, setEntry] = useState("")
  const [exit, setExit] = useState("")
  const [strategy, setStrategy] = useState("")
  const [notes, setNotes] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const preview = useMemo(() => {
    if (!file) return ""
    return URL.createObjectURL(file)
  }, [file])

  async function submit() {
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaving(false)
      return
    }

    const entryNum = Number(entry)
    const exitNum = Number(exit)

    const pnl =
      side === "LONG"
        ? exitNum - entryNum
        : entryNum - exitNum

    const { data: inserted, error } = await supabase
      .from("trades")
      .insert({
        user_id: user.id,
        symbol,
        side,
        entry: entryNum,
        exit: exitNum,
        pnl,
        strategy: strategy || null,
        notes: notes || null,
        trade_date: new Date().toISOString(),
      })
      .select()
      .single()

    if (!error && inserted && file) {
      const path = `${inserted.id}/${Date.now()}-${file.name}`

      const upload = await supabase.storage
        .from("trade-screenshots")
        .upload(path, file)

      if (!upload.error) {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/trade-screenshots/${path}`

        await supabase
          .from("trades")
          .update({ screenshot_url: url })
          .eq("id", inserted.id)
      }
    }

    setSymbol("")
    setSide("LONG")
    setEntry("")
    setExit("")
    setStrategy("")
    setNotes("")
    setFile(null)
    setSaving(false)

    if (onAdded) onAdded()
  }

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h2 style={{ marginTop: 0 }}>Add Trade</h2>

      <div className="grid-2">
        <div>
          <label className="muted">Instrument</label>
          <InstrumentSelect value={symbol} onChange={setSymbol} />
        </div>

        <div>
          <label className="muted">Side</label>
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        <div>
          <label className="muted">Entry</label>
          <input
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Entry"
          />
        </div>

        <div>
          <label className="muted">Exit</label>
          <input
            value={exit}
            onChange={(e) => setExit(e.target.value)}
            placeholder="Exit"
          />
        </div>

        <div>
          <label className="muted">Strategy</label>
          <input
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            placeholder="Breakout / Reversal / etc."
          />
        </div>

        <div>
          <label className="muted">Upload Chart</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label className="muted">Notes</label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Trade notes"
        />
      </div>

      {preview && (
        <div style={{ marginTop: 16 }}>
          <img src={preview} alt="Preview" className="image-preview" />
        </div>
      )}

      <button onClick={submit} style={{ marginTop: 16 }}>
        {saving ? "Saving..." : "Save Trade"}
      </button>
    </div>
  )
}