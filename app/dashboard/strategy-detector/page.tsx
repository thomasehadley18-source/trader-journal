"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { detectStrategies } from "@/lib/strategy-detector"

export default function StrategyDetection(){

const [strategies,setStrategies]=useState<any[]>([])

useEffect(()=>{

load()

},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const result = detectStrategies(data || [])

setStrategies(result)

}

return(

<div style={{
padding:"40px",
background:"#020817",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{
fontSize:32,
marginBottom:30
}}>
Strategy Detection
</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"
}}>

{strategies.map((s)=>(

<div key={s.pair} style={{
background:"#0f172a",
border:"1px solid #1e293b",
padding:"20px",
borderRadius:"12px"
}}>

<h3>{s.pair}</h3>

<p>Trades: {s.trades}</p>

<p>Wins: {s.wins}</p>

<p>Losses: {s.losses}</p>

<p>PnL: {s.pnl}</p>

</div>

))}

</div>

</div>

)

}