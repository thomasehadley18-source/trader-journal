"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function FeedPage(){

const [trades,setTrades] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from("trades")
.select("*")
.order("created_at",{ascending:false})
.limit(20)

setTrades(data || [])

}

return(

<div style={{padding:40}}>

<h1>Trader Feed</h1>

{trades.map(t=>(

<div
key={t.id}
style={{
border:"1px solid #1e293b",
padding:20,
marginBottom:20,
borderRadius:10
}}
>

<p>{t.symbol}</p>

<p>{t.side}</p>

<p style={{color:t.pnl>0?"#22c55e":"#ef4444"}}>

PnL: {t.pnl}

</p>

</div>

))}

</div>

)

}