"use client"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function EquityChart({data}:{data:any[]}){

return(

<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<LineChart data={data}>

<CartesianGrid stroke="#1e293b"/>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="balance"
stroke="#3b82f6"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

)

}