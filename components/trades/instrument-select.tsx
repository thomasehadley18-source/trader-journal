"use client"

import { useMemo, useState } from "react"
import { INSTRUMENTS } from "@/lib/instruments"

const CATEGORIES = Object.keys(INSTRUMENTS)

export default function InstrumentSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [category, setCategory] = useState<string>("Forex")

  const list = useMemo(() => {
    return INSTRUMENTS[category as keyof typeof INSTRUMENTS] || []
  }, [category])

  const allSymbols = useMemo(() => {
    return Object.values(INSTRUMENTS).flat()
  }, [])

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            style={{
              background: category === item ? "#2563eb" : "#0f172a",
              border: "1px solid #1e293b",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <select
        value={list.includes(value) ? value : ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {category}</option>
        {list.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>

      <div>
        <label className="muted">Or type any symbol</label>
        <input
          list="all-symbols"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Type custom pair / symbol"
        />
        <datalist id="all-symbols">
          {allSymbols.map((symbol) => (
            <option key={symbol} value={symbol} />
          ))}
        </datalist>
      </div>
    </div>
  )
}