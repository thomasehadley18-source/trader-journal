"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function MonthlyPerformance({ trades }:any){

const months:any = {}

trades.forEach((t:any)=>{

const d = new Date(t.trade_date)

const key = `${d.getFullYear()}-${d.getMonth()+1}`

if(!months[key]) months[key] = 0

months[key] += Number(t.pnl || 0)

})

const data = Object.entries(months).map(([month,pnl])=>({
month,
pnl
}))

return(

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="month" />

<YAxis />

<Tooltip />

<Bar dataKey="pnl" fill="#22c55e" />

</BarChart>

</ResponsiveContainer>

)

}