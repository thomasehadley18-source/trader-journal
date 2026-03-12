"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {scoreTrades} from "@/lib/ai-trade-score"

export default function TradeScore(){

const [trades,setTrades]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

setTrades(scoreTrades(data||[]))

}

return(

<div>

<h1>AI Trade Scores</h1>

{trades.map(t=>(

<div key={t.id}>
{t.symbol} — Score {t.score}
</div>

))}

</div>

)

}