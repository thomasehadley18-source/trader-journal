"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import InstrumentSelect from "@/components/trades/instrument-select"
import { detectTradeTags, detectStrategyName } from "@/lib/auto-strategy"

export default function AddTradeForm({ onAdded }: { onAdded?: () => void }) {
  const [symbol, setSymbol] = useState("")
  const [side, setSide] = useState("LONG")
  const [entry, setEntry] = useState("")
  const [exit, setExit] = useState("")

  async function submit() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const entryNum = Number(entry)
    const exitNum = Number(exit)

    const pnl =
      side === "LONG"
        ? exitNum - entryNum
        : entryNum - exitNum

    const draftTrade = {
      symbol,
      side,
      entry: entryNum,
      exit: exitNum,
      pnl,
    }

    const tags = detectTradeTags(draftTrade)
    const strategy = detectStrategyName(draftTrade)

    await supabase.from("trades").insert({
      user_id: user.id,
      symbol,
      side,
      entry: entryNum,
      exit: exitNum,
      pnl,
      tags,
      strategy,
      trade_date: new Date().toISOString(),
    })

    setSymbol("")
    setSide("LONG")
    setEntry("")
    setExit("")

    if (onAdded) onAdded()
  }

  return (
    <div
      style={{
        border: "1px solid #1e293b",
        padding: 20,
        borderRadius: 10,
        marginBottom: 24,
      }}
    >
      <h3>Add Trade</h3>

      <InstrumentSelect value={symbol} onChange={setSymbol} />

      <select
        value={side}
        onChange={(e) => setSide(e.target.value)}
        style={{ marginTop: 10 }}
      >
        <option value="LONG">LONG</option>
        <option value="SHORT">SHORT</option>
      </select>

      <input
        placeholder="Entry"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        style={{ marginTop: 10 }}
      />

      <input
        placeholder="Exit"
        value={exit}
        onChange={(e) => setExit(e.target.value)}
        style={{ marginTop: 10 }}
      />

      <button
        onClick={submit}
        style={{ marginTop: 10 }}
      >
        Add Trade
      </button>
    </div>
  )
}