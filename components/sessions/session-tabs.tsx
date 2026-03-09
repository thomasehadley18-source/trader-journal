"use client"

import { useState } from "react"
import SessionAnalytics from "./session-analytics"

export function SessionTabs({ trades = [] }: { trades?: any[] }) {
  const [session, setSession] = useState("All")

  const sessionOptions = ["All", "Asia", "London", "New York"]

  const filteredTrades =
    session === "All"
      ? trades
      : trades.filter((trade) =>
          Array.isArray(trade.sessions_active)
            ? trade.sessions_active.includes(session)
            : false
        )

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {sessionOptions.map((item) => (
          <button
            key={item}
            type="button"
            className={`border rounded px-4 py-2 ${
              session === item ? "bg-black text-white" : ""
            }`}
            onClick={() => setSession(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <SessionAnalytics trades={filteredTrades} />
    </div>
  )
}