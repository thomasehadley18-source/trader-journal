"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import TradeReplay from "@/components/trades/trade-replay"
import TradeScreenshotViewer from "@/components/trades/trade-screenshot-viewer"

export default function TradeTable({refresh}:any){

const [trades,setTrades] = useState<any[]>([])
const [selected,setSelected] = useState<any>(null)

useEffect(()=>{
load()
},[refresh])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:false})

setTrades(data || [])

}

return(

<div style={{marginTop:40}}>

<h2>Your Trades</h2>

<table>

<thead>

<tr>
<th>Date</th>
<th>Pair</th>
<th>Side</th>
<th>PnL</th>
<th>View</th>
</tr>

</thead>

<tbody>

{trades.map(t=>(

<tr key={t.id}>

<td>{t.trade_date}</td>

<td>{t.symbol}</td>

<td>{t.side}</td>

<td
style={{
color:t.pnl>0?"#22c55e":"#ef4444"
}}
>
{t.pnl}
</td>

<td>
<button
onClick={()=>setSelected(t)}
>
View
</button>
</td>

</tr>

))}

</tbody>

</table>

{selected &&(

<div style={{marginTop:40}}>

<TradeReplay trade={selected}/>

<TradeScreenshotViewer url={selected.screenshot_url}/>

</div>

)}

</div>

)

}