"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TradeTable({ refresh }: { refresh: number }) {
  const [trades, setTrades] = useState<any[]>([])
  const [selectedTag, setSelectedTag] = useState("")
  const [filtered, setFiltered] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [refresh])

  useEffect(() => {
    if (!selectedTag) {
      setFiltered(trades)
      return
    }

    setFiltered(
      trades.filter((t) => Array.isArray(t.tags) && t.tags.includes(selectedTag))
    )
  }, [selectedTag, trades])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })

    const rows = data || []
    setTrades(rows)
    setFiltered(rows)
  }

  const allTags = Array.from(
    new Set(
      trades.flatMap((t) => (Array.isArray(t.tags) ? t.tags : []))
    )
  )

  return (
    <div className="card">
      <h2>Trade History</h2>

      <div style={{ marginBottom: 16 }}>
        <label className="muted">Filter by Tag</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Trades</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Side</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>PnL</th>
            <th>Strategy</th>
            <th>Tags</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.symbol}</td>
              <td>{t.side}</td>
              <td>{t.entry}</td>
              <td>{t.exit}</td>
              <td style={{ color: t.pnl > 0 ? "#22c55e" : "#ef4444" }}>
                {t.pnl}
              </td>
              <td>{t.strategy || "-"}</td>
              <td>{Array.isArray(t.tags) ? t.tags.join(", ") : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}