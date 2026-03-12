"use client"

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from "recharts"

const colors=["#6366f1","#22c55e","#f59e0b"]

export default function SessionChart({data}:{data:any[]}){

return(

<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<PieChart>

<Pie
data={data}
dataKey="value"
nameKey="name"
outerRadius={120}
>

{data.map((e,i)=>(
<Cell key={i} fill={colors[i%3]}/>
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

)

}