"use client"

import { useMemo, useState } from "react"
import {
  forexPairs,
  cryptoPairs,
  commoditiesPairs,
  futuresPairs,
  stocksPairs,
} from "@/lib/asset-lists"

export default function TradesPage() {
  const [assetClass, setAssetClass] = useState("Forex")
  const [pair, setPair] = useState(forexPairs[0])

  const options = useMemo(() => {
    if (assetClass === "Forex") return forexPairs
    if (assetClass === "Crypto") return cryptoPairs
    if (assetClass === "Commodities") return commoditiesPairs
    if (assetClass === "Futures") return futuresPairs
    return stocksPairs
  }, [assetClass])

  function changeTab(tab: string) {
    setAssetClass(tab)

    if (tab === "Forex") setPair(forexPairs[0])
    if (tab === "Crypto") setPair(cryptoPairs[0])
    if (tab === "Commodities") setPair(commoditiesPairs[0])
    if (tab === "Futures") setPair(futuresPairs[0])
    if (tab === "Stocks") setPair(stocksPairs[0])
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ margin: 0, color: "white" }}>Trades</h1>

      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: 16, color: "white" }}>Asset Class</h3>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Forex", "Crypto", "Commodities", "Futures", "Stocks"].map((tab) => (
            <button
              key={tab}
              onClick={() => changeTab(tab)}
              style={{
                background: assetClass === tab ? "#2563eb" : "#0f172a",
                border: "1px solid #1e293b",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ maxWidth: 700 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: "white" }}>Add Trade</h3>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label className="muted">Pair / Symbol</label>
            <select value={pair} onChange={(e) => setPair(e.target.value)}>
              {options.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="muted">Side</label>
            <select defaultValue="Buy">
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          <div>
            <label className="muted">Entry</label>
            <input type="number" placeholder="Enter entry price" />
          </div>

          <div>
            <label className="muted">Exit</label>
            <input type="number" placeholder="Enter exit price" />
          </div>

          <div>
            <label className="muted">Lot Size / Quantity</label>
            <input type="number" placeholder="1.00" />
          </div>

          <div>
            <label className="muted">Notes</label>
            <textarea rows={4} placeholder="Trade notes..." />
          </div>

          <button>Add Trade</button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0, color: "white" }}>Selected Instrument</h3>
        <p style={{ marginBottom: 0 }}>
          {assetClass} — <strong>{pair}</strong>
        </p>
      </div>
    </div>
  )
}