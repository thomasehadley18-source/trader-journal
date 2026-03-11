"use client"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function EquityChart({data}:any){

return(

<div
style={{
width:"100%",
height:400,
background:"#020817",
padding:20,
borderRadius:10
}}
>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={data}>

<XAxis dataKey="trade"/>

<YAxis/>

<Tooltip/>

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