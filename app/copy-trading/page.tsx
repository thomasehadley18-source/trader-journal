"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { rankTraders } from "@/lib/copy-trading"

export default function CopyTrading(){

const [traders,setTraders] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from("trades")
.select("*")

const ranking = rankTraders(data || [])

setTraders(ranking.slice(0,10))

}

return(

<div style={{padding:40}}>

<h1>Copy Trading Leaderboard</h1>

{traders.map((t,i)=>(
<p key={i}>
Trader {i+1} — PnL {t.pnl}
</p>
))}

</div>

)

}