"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import StatCard from "@/components/dashboard/stat-card"

export default function DashboardPage(){

const [stats,setStats] = useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

const trades = data || []

const wins = trades.filter((t:any)=>t.pnl>0).length
const losses = trades.filter((t:any)=>t.pnl<=0).length

const winRate = wins/(trades.length||1)

const pnl = trades.reduce((a:any,b:any)=>a+Number(b.pnl||0),0)

setStats({
trades:trades.length,
winRate,
pnl
})

}

if(!stats){
return <div style={{padding:40}}>Loading...</div>
}

return(

<div style={{padding:40}}>

<h1 style={{marginBottom:30}}>
Trading Dashboard
</h1>

<div
style={{
display:"flex",
gap:20,
flexWrap:"wrap"
}}
>

<StatCard
title="Total Trades"
value={stats.trades}
/>

<StatCard
title="Win Rate"
value={(stats.winRate*100).toFixed(2)+"%"}
/>

<StatCard
title="Total PnL"
value={stats.pnl.toFixed(2)}
/>

</div>

</div>

)

}