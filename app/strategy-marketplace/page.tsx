"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategyMarketplacePage() {
  const [strategies, setStrategies] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase
      .from("strategies")
      .select("*")
      .order("created_at", { ascending: false })

    setStrategies(data || [])
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Strategy Market</h1>

      {strategies.length === 0 ? (
        <div className="empty-state">
          No strategies yet. Create one in Strategy Builder.
        </div>
      ) : (
        <div className="grid-3">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="card">
              <h3 style={{ marginTop: 0 }}>{strategy.name}</h3>
              <div className="muted" style={{ marginBottom: 8 }}>
                ${strategy.price || 0}
              </div>
              <p>{strategy.description || "No description."}</p>
              {strategy.rules && (
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    background: "#020817",
                    border: "1px solid #1e293b",
                    borderRadius: 10,
                    padding: 12,
                  }}
                >
                  {strategy.rules}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}