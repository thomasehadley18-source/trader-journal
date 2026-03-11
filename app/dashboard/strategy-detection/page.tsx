"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategyDetection(){

const [strategies,setStrategies] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const { data:{user} } = await supabase.auth.getUser()

if(!user) return

const { data } = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

const map:any = {}

data?.forEach((t)=>{

const pair = t.pair || "unknown"

if(!map[pair]){

map[pair] = {
pair,
trades:0,
pnl:0
}

}

map[pair].trades++
map[pair].pnl += Number(t.pnl || 0)

})

setStrategies(Object.values(map))

}

return(

<div style={{padding:40,color:"white"}}>

<h1 style={{fontSize:30,marginBottom:20}}>
Strategy Detection
</h1>

{strategies.map((s:any)=>(
<div key={s.pair} style={{marginBottom:15}}>
{s.pair} — Trades: {s.trades} — PnL: {s.pnl}
</div>
))}

</div>

)

}