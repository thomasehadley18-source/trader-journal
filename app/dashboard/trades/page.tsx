"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type TradeRow = {
  id: string
  user_id: string
  trade_date: string | null
  symbol: string | null
  pair?: string | null
  direction: string | null
  side?: string | null
  entry: number | null
  exit: number | null
  lot_size: number | null
  pnl: number | null
  profit?: number | null
  strategy?: string | null
  tags?: string[] | null
  notes?: string | null
  import_source?: string | null
}

export default function TradesPage() {
  const [loading, setLoading] = useState(false)
  const [trades, setTrades] = useState<TradeRow[]>([])
  const [message, setMessage] = useState("")

  const [form, setForm] = useState({
    pair: "",
    direction: "LONG",
    entry: "",
    exit: "",
    lotSize: "1",
    strategy: "",
    tags: "",
    notes: "",
  })

  useEffect(() => {
    loadTrades()
  }, [])

  async function loadTrades() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })

    setTrades((data as TradeRow[]) || [])
  }

  async function saveTrade(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage("You must be logged in.")
      setLoading(false)
      return
    }

    const entry = Number(form.entry)
    const exit = Number(form.exit)
    const lotSize = Number(form.lotSize)

    if (!form.pair || Number.isNaN(entry) || Number.isNaN(exit) || Number.isNaN(lotSize)) {
      setMessage("Please fill in pair, entry, exit, and lot size.")
      setLoading(false)
      return
    }

    const pnl =
      form.direction === "LONG"
        ? (exit - entry) * lotSize
        : (entry - exit) * lotSize

    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const today = new Date().toISOString().slice(0, 10)

    const payload = {
      user_id: user.id,
      trade_date: today,
      symbol: form.pair,
      pair: form.pair,
      direction: form.direction,
      side: form.direction,
      entry,
      exit,
      lot_size: lotSize,
      pnl,
      profit: pnl,
      strategy: form.strategy || null,
      tags: tagsArray.length ? tagsArray : null,
      notes: form.notes || null,
      import_source: "manual",
    }

    const { error } = await supabase.from("trades").insert(payload)

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setForm({
      pair: "",
      direction: "LONG",
      entry: "",
      exit: "",
      lotSize: "1",
      strategy: "",
      tags: "",
      notes: "",
    })

    setMessage("Trade saved.")
    setLoading(false)
    loadTrades()
  }

  async function deleteTrade(id: string) {
    await supabase.from("trades").delete().eq("id", id)
    loadTrades()
  }

  return (
    <div className="page-shell">
      <div className="navbar">
        <h1 style={{ margin: 0 }}>Trader Journal</h1>
        <div className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/dashboard/trades">Trades</a>
          <a href="/dashboard/analytics">Analytics</a>
        </div>
      </div>

      <div className="page-container">
        <h2 className="section-title">Add Trade</h2>

        <form onSubmit={saveTrade} className="card form-grid" style={{ maxWidth: 520, marginBottom: 32 }}>
          <div>
            <label>Pair</label>
            <input
              value={form.pair}
              onChange={(e) => setForm({ ...form, pair: e.target.value })}
              placeholder="BTCUSD"
            />
          </div>

          <div>
            <label>Direction</label>
            <select
              value={form.direction}
              onChange={(e) => setForm({ ...form, direction: e.target.value })}
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>

          <div>
            <label>Entry</label>
            <input
              type="number"
              value={form.entry}
              onChange={(e) => setForm({ ...form, entry: e.target.value })}
              placeholder="50000"
            />
          </div>

          <div>
            <label>Exit</label>
            <input
              type="number"
              value={form.exit}
              onChange={(e) => setForm({ ...form, exit: e.target.value })}
              placeholder="50500"
            />
          </div>

          <div>
            <label>Lot Size</label>
            <input
              type="number"
              value={form.lotSize}
              onChange={(e) => setForm({ ...form, lotSize: e.target.value })}
              placeholder="1"
            />
          </div>

          <div>
            <label>Strategy</label>
            <input
              value={form.strategy}
              onChange={(e) => setForm({ ...form, strategy: e.target.value })}
              placeholder="Breakout"
            />
          </div>

          <div>
            <label>Tags</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="A+, trend, London"
            />
          </div>

          <div>
            <label>Notes</label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="What happened in this trade?"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Trade"}
          </button>

          {message && <p style={{ margin: 0 }}>{message}</p>}
        </form>

        <h2 className="section-title">Your Trades</h2>

        <div className="card">
          <table>
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
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={8}>No trades yet.</td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <tr key={trade.id}>
                    <td>{trade.trade_date || "—"}</td>
                    <td>{trade.symbol || trade.pair || "—"}</td>
                    <td>{trade.direction || trade.side || "—"}</td>
                    <td>
                      {Number(
                        trade.pnl ?? trade.profit ?? 0
                      ).toFixed(2)}
                    </td>
                    <td>{trade.strategy || "—"}</td>
                    <td>
                      {Array.isArray(trade.tags) ? trade.tags.join(", ") : "—"}
                    </td>
                    <td>{trade.import_source || "manual"}</td>
                    <td>
                      <button onClick={() => deleteTrade(trade.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}