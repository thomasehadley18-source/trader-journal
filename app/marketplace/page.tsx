"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function MarketplacePage() {
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
    <div>
      <h1>Strategy Market</h1>

      {strategies.length === 0 ? (
        <div className="empty-state">
          No strategies listed yet.
          <div style={{ marginTop: 12 }}>
            Go to <b>Strategy Builder</b> and create one.
          </div>
        </div>
      ) : (
        <div className="grid-3">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="card">
              <h3 style={{ marginTop: 0 }}>{strategy.name}</h3>

              <div className="muted" style={{ marginBottom: 12 }}>
                ${strategy.price || 0}
              </div>

              <p>{strategy.description || "No description."}</p>

              {strategy.rules && (
                <div style={{ marginTop: 12 }}>
                  <div className="muted">Rules</div>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      background: "#020817",
                      padding: 12,
                      borderRadius: 10,
                      border: "1px solid #1e293b",
                    }}
                  >
                    {strategy.rules}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}