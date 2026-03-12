"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import AITradeFeedback from "./ai-trade-feedback"

export default function TradeTable({refresh}:{refresh:number}){

const [trades,setTrades]=useState<any[]>([])

useEffect(()=>{
load()
},[refresh])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:false})

setTrades(data||[])

}

return(

<div>

{trades.map(t=>(

<div
key={t.id}
className="card"
style={{marginBottom:20}}
>

<div>

<b>{t.symbol}</b>

</div>

<div>
Entry: {t.entry}
</div>

<div>
Exit: {t.exit}
</div>

<div>
PNL: {t.pnl}
</div>

<AITradeFeedback trade={t}/>

</div>

))}

</div>

)

}