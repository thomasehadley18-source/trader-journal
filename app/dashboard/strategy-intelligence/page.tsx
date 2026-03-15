"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type StrategyStats = {
  strategy: string
  trades: number
  winrate: string | number
  pnl: string
}

function analyzeStrategies(trades: any[]) {
  const map: any = {}

  trades.forEach(t => {
    const strat = t.strategy || "Uncategorized"

    if (!map[strat]) {
      map[strat] = {
        wins: 0,
        losses: 0,
        pnl: 0,
        trades: 0
      }
    }

    map[strat].trades++
    map[strat].pnl += Number(t.pnl || 0)

    if (Number(t.pnl) > 0) {
      map[strat].wins++
    } else {
      map[strat].losses++
    }
  })

  return Object.keys(map).map(name => {
    const s = map[name]

    return {
      strategy: name,
      trades: s.trades,
      winrate: s.trades > 0 ? (s.wins / s.trades * 100).toFixed(1) : 0,
      pnl: s.pnl.toFixed(2)
    }
  })
}

export default function StrategyIntelligencePage() {
  const [strategies, setStrategies] = useState<StrategyStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStrategies()
  }, [])

  async function loadStrategies() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)

    const stats = analyzeStrategies(data || [])
    setStrategies(stats)
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Strategy Intelligence</h1>

      {strategies.length === 0 ? (
        <p>No strategies found. Add trades with a strategy to see analytics.</p>
      ) : (
        <table className="trade-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Trades</th>
              <th>Win Rate</th>
              <th>PnL</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map(s => (
              <tr key={s.strategy}>
                <td>{s.strategy}</td>
                <td>{s.trades}</td>
                <td>{s.winrate}%</td>
                <td style={{ color: Number(s.pnl) >= 0 ? "#22c55e" : "#ef4444" }}>
                  ${s.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
