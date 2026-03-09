"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function RecentTrades() {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })
      .limit(5)

    setTrades(data || [])
  }

  return (
    <div className="border border-border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Recent Trades</h2>

      {trades.length === 0 && (
        <p className="text-muted-foreground">No trades found.</p>
      )}

      {trades.map((t) => (
        <div
          key={t.id}
          className="flex justify-between border-b py-2"
        >
          <span>{new Date(t.trade_date).toLocaleDateString()}</span>
          <span>{t.pair}</span>
          <span>{t.direction}</span>
          <span className={t.pnl >= 0 ? "text-green-500" : "text-red-500"}>
            {t.pnl?.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}