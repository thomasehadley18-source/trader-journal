"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import TradeReplayChart from "@/components/charts/trade-replay-chart"

export default function TradeReplay(){

const [data,setData]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()
if(!user)return

const {data:trades}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const candles=(trades||[]).map(t=>({

time:new Date(t.trade_date).toISOString().split("T")[0],
open:t.entry,
high:Math.max(t.entry,t.exit),
low:Math.min(t.entry,t.exit),
close:t.exit

}))

setData(candles)

}

return(

<div>

<h1>Trade Replay</h1>

<div className="card">

<TradeReplayChart data={data}/>

</div>

</div>

)

}