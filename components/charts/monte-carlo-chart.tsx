"use client"

import { LineChart,Line,XAxis,YAxis,Tooltip } from "recharts"

export default function MonteCarloChart({data}:{data:any[]}){

return(

<LineChart
width={800}
height={400}
data={data}
>

<XAxis dataKey="x" />
<YAxis />
<Tooltip />

<Line
type="monotone"
dataKey="y"
stroke="#22c55e"
dot={false}
/>

</LineChart>

)

}
