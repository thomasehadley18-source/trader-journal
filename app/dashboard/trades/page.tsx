"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

import TradeReplay from "@/components/trades/trade-replay"

export default function TradesPage(){

const [trades,setTrades] = useState<any[]>([])

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
.order("trade_date",{ascending:true})

setTrades(data || [])

}

return(

<div style={{display:"flex",flexDirection:"column",gap:30}}>

<h1>Trades</h1>

<TradeReplay trades={trades} />

</div>

)

}