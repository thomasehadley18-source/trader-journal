"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function EquityCurve({ trades }: any) {

  let equity = 0

  const data = trades.map((t: any) => {
    equity += t.pnl

    return {
      date: new Date(t.trade_date).toLocaleDateString(),
      equity,
    }
  })

  return (
    <div className="border rounded p-4">

      <h2 className="font-medium mb-4">
        Equity Curve
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#22c55e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}