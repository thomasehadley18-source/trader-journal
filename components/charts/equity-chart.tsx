"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function EquityChart({ trades }: any) {

  let equity = 0

  const data = trades.map((t:any)=>{

    equity += Number(t.pnl || 0)

    return {
      date: new Date(t.trade_date).toLocaleDateString(),
      equity
    }

  })

  return (

    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={data}>

        <XAxis dataKey="date" hide />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="equity"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  )

}