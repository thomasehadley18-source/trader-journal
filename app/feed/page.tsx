"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Feed(){

const [trades,setTrades]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.from("trades")
.select("*")
.order("trade_date",{ascending:false})
.limit(30)

setTrades(data||[])

}

return(

<div style={{padding:40}}>

<h1>Trader Feed</h1>

{trades.map(t=>(

<div key={t.id} style={{marginBottom:20}}>

<p>{t.symbol}</p>
<p>PNL: {t.pnl}</p>

</div>

))}

</div>

)

}