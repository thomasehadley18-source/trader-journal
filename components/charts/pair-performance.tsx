"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function PairPerformance({ pairs }:any){

const data = Object.entries(pairs).map(([pair,val]:any)=>({
pair,
pnl:val.pnl
}))

return(

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="pair" />

<YAxis />

<Tooltip />

<Bar dataKey="pnl" fill="#3b82f6" />

</BarChart>

</ResponsiveContainer>

)

}