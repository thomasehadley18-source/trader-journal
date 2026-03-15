"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { rankTraders } from "@/lib/copy-trading"

export default function CopyTrading(){

const [rows,setRows] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from("trades")
.select("*")

const ranked = rankTraders(data || [])

setRows(ranked)

}

async function follow(traderId:string){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

await supabase
.from("followers")
.insert({
follower:user.id,
leader:traderId
})

alert("Now copying this trader")

}

return(

<div>

<h1>Copy Trading</h1>

<div className="card">

<table>

<thead>
<tr>
<th>Trader</th>
<th>Trades</th>
<th>Winrate</th>
<th>PnL</th>
<th></th>
</tr>
</thead>

<tbody>

{rows.map((r,i)=>(

<tr key={i}>

<td>{r.user_id}</td>

<td>{r.trades}</td>

<td>{r.winrate}%</td>

<td>{r.pnl}</td>

<td>

<button onClick={()=>follow(r.user_id)}>
Copy Trader
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
