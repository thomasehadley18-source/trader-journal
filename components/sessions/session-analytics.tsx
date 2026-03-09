"use client"

import { useMemo } from "react"

export default function SessionAnalytics({ trades = [] }: { trades?: any[] }) {
  const stats = useMemo(() => {
    const grouped: Record<
      string,
      { count: number; pnl: number; wins: number; losses: number }
    > = {}

    for (const trade of trades) {
      const sessions = Array.isArray(trade.sessions_active)
        ? trade.sessions_active
        : ["Unknown"]

      for (const session of sessions) {
        if (!grouped[session]) {
          grouped[session] = {
            count: 0,
            pnl: 0,
            wins: 0,
            losses: 0,
          }
        }

        grouped[session].count += 1
        grouped[session].pnl += Number(trade.pnl || 0)

        if (Number(trade.pnl || 0) >= 0) {
          grouped[session].wins += 1
        } else {
          grouped[session].losses += 1
        }
      }
    }

    return Object.entries(grouped).map(([session, value]) => {
      const winRate =
        value.count > 0 ? ((value.wins / value.count) * 100).toFixed(1) : "0.0"

      return {
        session,
        ...value,
        winRate,
      }
    })
  }, [trades])

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold">Session Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Performance grouped by trading session.
        </p>
      </div>

      {stats.length === 0 ? (
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          No session data available yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {stats.map((item) => (
            <div key={item.session} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">{item.session}</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-sm text-muted-foreground">Trades</div>
                  <div className="text-xl font-semibold">{item.count}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">PnL</div>
                  <div
                    className={
                      item.pnl >= 0
                        ? "text-xl font-semibold text-green-500"
                        : "text-xl font-semibold text-red-500"
                    }
                  >
                    {item.pnl.toFixed(2)}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                  <div className="text-xl font-semibold">{item.winRate}%</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Wins / Losses
                  </div>
                  <div className="text-xl font-semibold">
                    {item.wins} / {item.losses}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}