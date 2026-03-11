"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

export default function AnalyticsPage(){

const [equity,setEquity]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

let equityCurve=0

const chart:any[]=[]

data?.forEach((t:any,i:number)=>{

const pnl=Number(t.pnl ?? t.profit ?? 0)

equityCurve+=pnl

chart.push({
trade:i+1,
equity:equityCurve
})

})

setEquity(chart)

}

return(

<div>

<h1 className="text-3xl mb-6">
Performance Analytics
</h1>

<div className="card">

<h2 className="mb-4">
Equity Curve
</h2>

<div style={{height:300}}>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={equity}>

<XAxis dataKey="trade"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="equity"
stroke="#3b82f6"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</div>

)

}