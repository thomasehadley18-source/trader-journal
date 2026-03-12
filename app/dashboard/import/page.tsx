"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

function parseGenericCsv(text: string) {
  const rows = text.split("\n").map((r) => r.trim()).filter(Boolean)
  if (rows.length <= 1) return []

  return rows.slice(1).map((row) => {
    const cols = row.split(",")

    return {
      symbol: cols[0] || "",
      side: cols[1] || "LONG",
      entry: Number(cols[2] || 0),
      exit: Number(cols[3] || 0),
      pnl: Number(cols[4] || 0),
      trade_date: cols[5] || new Date().toISOString(),
    }
  })
}

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")

  async function uploadCsv() {
    if (!file) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const text = await file.text()
    const trades = parseGenericCsv(text)

    if (trades.length === 0) {
      setMessage("No trades found in CSV.")
      return
    }

    await supabase.from("trades").insert(
      trades.map((trade) => ({
        ...trade,
        user_id: user.id,
      }))
    )

    setMessage(`Imported ${trades.length} trades.`)
    setFile(null)
  }

  return (
    <div>
      <h1>Import Trades</h1>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>CSV Upload</h3>
          <div className="muted" style={{ marginBottom: 12 }}>
            Import MT4 / MT5 / NinjaTrader / Tradovate exports
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button onClick={uploadCsv} style={{ marginTop: 12 }}>
            Import CSV
          </button>

          {message && <div style={{ marginTop: 12 }}>{message}</div>}
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Broker Connect</h3>
          <div className="muted">MT4</div>
          <div className="muted">MT5</div>
          <div className="muted">NinjaTrader</div>
          <div className="muted">Tradovate</div>
          <div className="muted">Interactive Brokers</div>
          <div style={{ marginTop: 12 }}>
            Foundation page ready for direct broker integrations.
          </div>
        </div>
      </div>
    </div>
  )
}