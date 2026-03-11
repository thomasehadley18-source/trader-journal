"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import TradeReplay from "@/components/trades/trade-replay"
import ScreenshotUpload from "@/components/trades/screenshot-upload"

export default function TradesPage(){

const [trades,setTrades] = useState<any[]>([])

const [pair,setPair] = useState("")
const [side,setSide] = useState("LONG")
const [entry,setEntry] = useState("")
const [exit,setExit] = useState("")
const [pnl,setPnl] = useState("")

useEffect(()=>{
loadTrades()
},[])

async function loadTrades(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:false})

setTrades(data || [])

}

async function addTrade(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

await supabase.from("trades").insert({
user_id:user.id,
symbol:pair,
side,
entry:Number(entry),
exit:Number(exit),
pnl:Number(pnl),
trade_date:new Date()
})

setPair("")
setEntry("")
setExit("")
setPnl("")

loadTrades()

}

async function deleteTrade(id:string){

await supabase
.from("trades")
.delete()
.eq("id",id)

loadTrades()

}

return(

<div style={{display:"flex",flexDirection:"column",gap:30}}>

<h1>Trades</h1>

{/* TRADE ENTRY */}

<div className="card">

<h2>Add Trade</h2>

<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>

<input
placeholder="Pair"
value={pair}
onChange={(e)=>setPair(e.target.value)}
/>

<select
value={side}
onChange={(e)=>setSide(e.target.value)}
>
<option>LONG</option>
<option>SHORT</option>
</select>

<input
placeholder="Entry"
value={entry}
onChange={(e)=>setEntry(e.target.value)}
/>

<input
placeholder="Exit"
value={exit}
onChange={(e)=>setExit(e.target.value)}
/>

<input
placeholder="PnL"
value={pnl}
onChange={(e)=>setPnl(e.target.value)}
/>

</div>

<button
style={{marginTop:10}}
onClick={addTrade}
>
Save Trade
</button>

</div>

{/* TRADE REPLAY */}

<TradeReplay trades={trades} />

{/* TRADE TABLE */}

<div className="card">

<h2>Trade History</h2>

<table>

<thead>

<tr>
<th>Pair</th>
<th>Side</th>
<th>Entry</th>
<th>Exit</th>
<th>PnL</th>
<th>Screenshot</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{trades.map((t:any)=>(

<tr key={t.id}>

<td>{t.symbol}</td>
<td>{t.side}</td>
<td>{t.entry}</td>
<td>{t.exit}</td>
<td>{t.pnl}</td>

<td>
<ScreenshotUpload tradeId={t.id}/>
</td>

<td>

<button onClick={()=>deleteTrade(t.id)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}