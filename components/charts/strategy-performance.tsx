"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function StrategyPerformance({ strategies }:any){

const data = Object.entries(strategies).map(([name,val]:any)=>({

strategy:name,
pnl:val.pnl,
trades:val.trades

}))

return(

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="strategy" />

<YAxis />

<Tooltip />

<Bar dataKey="pnl" fill="#22c55e" />

</BarChart>

</ResponsiveContainer>

)

}