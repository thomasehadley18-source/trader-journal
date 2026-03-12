"use client"

import{
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function EquityChart({data}:{data:any[]}){

return(

<div style={{height:320}}>

<ResponsiveContainer>

<LineChart data={data}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="balance"
stroke="#2563eb"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

)

}