"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function PnLDistribution({data}:{data:any[]}){

return(

<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<BarChart data={data}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="value" fill="#22c55e"/>

</BarChart>

</ResponsiveContainer>

</div>

)

}