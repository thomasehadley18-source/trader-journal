"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { buildStrategyStats } from "@/lib/marketplace-engine"

export default function StrategyMarketplace(){

const [rows,setRows] = useState<any[]>([])

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

const stats = buildStrategyStats(data || [])

setRows(stats)

}

return(

<div>

<h1>Strategy Marketplace</h1>

<div className="grid-3">

{rows.map((s,i)=>(

<div key={i} className="card">

<h3>{s.name}</h3>

<p className="muted">
Trades: {s.trades}
</p>

<p className="muted">
Winrate: {s.winrate}%
</p>

<p>
PnL: {s.pnl}
</p>

<button>
View Strategy
</button>

</div>

))}

</div>

</div>

)

}
