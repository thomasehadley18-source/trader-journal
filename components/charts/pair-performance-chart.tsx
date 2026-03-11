"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function PairPerformanceChart({data}:any){

return(

<div className="card" style={{height:350}}>

<h3 style={{marginBottom:20}}>Pair Performance</h3>

<ResponsiveContainer width="100%" height="100%">

<BarChart data={data}>

<CartesianGrid stroke="#1e293b"/>

<XAxis dataKey="pair"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="pnl"
fill="#3b82f6"
/>

</BarChart>

</ResponsiveContainer>

</div>

)

}