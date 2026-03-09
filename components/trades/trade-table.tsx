"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TradeTable({ refresh }: { refresh: boolean }) {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [refresh])

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })

    setTrades(data || [])
  }

  async function remove(id: string) {
    await supabase.from("trades").delete().eq("id", id)
    load()
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: 16 }}>Your Trades</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Pair</th>
            <th>Side</th>
            <th>PnL</th>
            <th>Strategy</th>
            <th>Tags</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.trade_date).toLocaleDateString()}</td>
              <td>{t.pair}</td>
              <td>{t.direction}</td>
              <td className={Number(t.pnl) >= 0 ? "green" : "red"}>
                {Number(t.pnl).toFixed(2)}
              </td>
              <td>{t.strategy || "—"}</td>
              <td>
                {Array.isArray(t.tags) && t.tags.length ? t.tags.join(", ") : "—"}
              </td>
              <td>{t.import_source || "manual"}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => remove(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {trades.length === 0 && (
            <tr>
              <td colSpan={8} className="muted">
                No trades yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}