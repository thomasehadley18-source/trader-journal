"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TraderPage({params}:any){

const [profile,setProfile] = useState<any>(null)
const [trades,setTrades] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:profileData} = await supabase
.from("profiles")
.select("*")
.eq("username",params.username)
.single()

if(!profileData) return

setProfile(profileData)

const {data:tradesData} = await supabase
.from("trades")
.select("*")
.eq("user_id",profileData.id)

setTrades(tradesData || [])

}

if(!profile) return <div style={{padding:40}}>Loading...</div>

return(

<div style={{padding:40}}>

<h1>{profile.username}</h1>

<p>{profile.bio}</p>

<h2>Public Trades</h2>

<table>

<thead>
<tr>
<th>Pair</th>
<th>Side</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{trades.map((t:any)=>(

<tr key={t.id}>

<td>{t.symbol}</td>

<td>{t.side}</td>

<td style={{color:t.pnl>0?"#22c55e":"#ef4444"}}>

{t.pnl}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}