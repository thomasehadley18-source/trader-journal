"use client"

import {
LineChart,
Line,
XAxis,
YAxis,
ReferenceLine,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function TradeChart({trade}:any){

if(!trade) return null

const data = [
{price:trade.entry,step:"Entry"},
{price:trade.exit,step:"Exit"}
]

return(

<div
style={{
height:300,
width:"100%",
background:"#020817",
border:"1px solid #1e293b",
borderRadius:10,
padding:20
}}
>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={data}>

<XAxis dataKey="step"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="price"
stroke="#3b82f6"
strokeWidth={2}
/>

<ReferenceLine
y={trade.entry}
stroke="#22c55e"
label="Entry"
/>

<ReferenceLine
y={trade.exit}
stroke="#ef4444"
label="Exit"
/>

</LineChart>

</ResponsiveContainer>

</div>

)

}