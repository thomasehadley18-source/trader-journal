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

const {data:{user}} = await supabase.auth.getUser()

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)
.order("trade_date",{ascending:true})

const chartData = (data || []).map(t=>({

time: new Date(t.trade_date).getTime()/1000,
open: Number(t.open || 0),
high: Number(t.high || 0),
low: Number(t.low || 0),
close: Number(t.close || 0)

}))

setData(chartData)

}

return(

<div>

<h1>Trade Replay</h1>

<TradeReplayChart data={data} />

</div>

)

}