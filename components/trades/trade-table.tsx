"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AITradeFeedback from "@/components/trades/ai-trade-feedback"

export default function TradeTable({ refresh }: { refresh: number }) {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [refresh])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })

    setTrades(data || [])
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {trades.map((trade) => (
        <div key={trade.id} className="card">
          <div className="grid-2">
            <div>
              <div className="muted">Instrument</div>
              <div>{trade.symbol}</div>
            </div>

            <div>
              <div className="muted">Side</div>
              <div>{trade.side}</div>
            </div>

            <div>
              <div className="muted">Entry</div>
              <div>{trade.entry}</div>
            </div>

            <div>
              <div className="muted">Exit</div>
              <div>{trade.exit}</div>
            </div>

            <div>
              <div className="muted">PnL</div>
              <div style={{ color: trade.pnl > 0 ? "#22c55e" : "#ef4444" }}>
                {trade.pnl}
              </div>
            </div>

            <div>
              <div className="muted">Strategy</div>
              <div>{trade.strategy || "-"}</div>
            </div>
          </div>

          {trade.notes && (
            <div style={{ marginTop: 14 }}>
              <div className="muted">Notes</div>
              <div>{trade.notes}</div>
            </div>
          )}

          {trade.screenshot_url && (
            <div style={{ marginTop: 16 }}>
              <div className="muted" style={{ marginBottom: 8 }}>Screenshot</div>
              <img
                src={trade.screenshot_url}
                alt="Trade screenshot"
                className="image-preview"
              />
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <AITradeFeedback trade={trade} />
          </div>
        </div>
      ))}
    </div>
  )
}