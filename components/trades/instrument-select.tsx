"use client"

import { INSTRUMENTS } from "../../lib/instruments"

export default function InstrumentSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <option value="">Select Instrument</option>

      {Object.entries(INSTRUMENTS as Record<string, string[]>).map(([group, list]) => (
        <optgroup key={group} label={group}>
          {list.map((pair) => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}