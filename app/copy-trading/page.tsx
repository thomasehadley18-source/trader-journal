"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {rankTraders} from "@/lib/copy-trading"

export default function CopyTrading(){

const [traders,setTraders]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data}=await supabase
.from("traders")
.select("*")

const ranked = rankTraders(data || [])

setTraders(ranked)

}

return(

<div>

<h1>Copy Trading Marketplace</h1>

<div className="grid-3">

{traders.map(t=>(

<div key={t.id} className="card">

<h3>{t.username}</h3>

<div className="muted">PnL</div>
<div>${t.pnl}</div>

<div className="muted">Win Rate</div>
<div>{(t.wins/t.trades*100).toFixed(1)}%</div>

<div className="muted">Drawdown</div>
<div>${t.drawdown}</div>

<button style={{marginTop:10}}>
Copy Strategy
</button>

</div>

))}

</div>

</div>

)

}