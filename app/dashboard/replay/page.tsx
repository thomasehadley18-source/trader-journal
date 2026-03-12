"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Replay(){

const [trades,setTrades]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

setTrades(data||[])

}

return(

<div>

<h1>Trade Replay</h1>

{trades.map(t=>(

<div key={t.id} style={{marginBottom:20}}>

<p>{t.symbol}</p>

<p>Entry: {t.entry}</p>

<p>Exit: {t.exit}</p>

<p>PNL: {t.pnl}</p>

</div>

))}

</div>

)

}