"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer } from "recharts"

export default function DashboardPage(){

const [stats,setStats]=useState({
 trades:0,
 winRate:0,
 expectancy:0,
 drawdown:0
})

const [equity,setEquity]=useState<any[]>([])
const [email,setEmail]=useState("")

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()
if(!user)return
setEmail(user.email||"")

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const trades=data||[]

let equityCurve=0
let wins=0

const chart:any[]=[]

trades.forEach((t:any,i:number)=>{
 const pnl=Number(t.pnl ?? t.profit ?? 0)

 equityCurve+=pnl

 if(pnl>0)wins++

 chart.push({
   trade:i+1,
   equity:equityCurve
 })
})

setEquity(chart)

setStats({
 trades:trades.length,
 winRate:trades.length?((wins/trades.length)*100):0,
 expectancy:trades.length?(equityCurve/trades.length):0,
 drawdown:0
})

}

return(

<div>

<div className="navbar">
<h1>Trader Journal</h1>

<div className="nav-links">
<a href="/dashboard">Dashboard</a>
<a href="/dashboard/trades">Trades</a>
<a href="/dashboard/analytics">Analytics</a>
</div>

</div>

<div className="container">

<h1 style={{fontSize:34}}>Trader Dashboard</h1>
<p style={{opacity:.7}}>Logged in as {email}</p>

<div className="grid-4" style={{marginTop:20}}>

<div className="card">
<div>Total Trades</div>
<h2>{stats.trades}</h2>
</div>

<div className="card">
<div>Win Rate</div>
<h2>{stats.winRate.toFixed(1)}%</h2>
</div>

<div className="card">
<div>Expectancy</div>
<h2>{stats.expectancy.toFixed(2)}</h2>
</div>

<div className="card">
<div>Max Drawdown</div>
<h2>{stats.drawdown}</h2>
</div>

</div>

<div className="card" style={{marginTop:40}}>

<h2>Equity Curve</h2>

<div style={{height:300}}>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={equity}>

<XAxis dataKey="trade" stroke="#94a3b8"/>
<YAxis stroke="#94a3b8"/>

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

</div>

)

}