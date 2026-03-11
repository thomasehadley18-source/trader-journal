"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function PnlHistogram({ trades }:any){

const data = trades.map((t:any)=>({
pnl:Number(t.pnl || 0)
}))

return(

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="pnl" />

<YAxis />

<Tooltip />

<Bar dataKey="pnl" fill="#22c55e" />

</BarChart>

</ResponsiveContainer>

)

}