"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function SessionAnalytics(){

const [sessions,setSessions]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data:trades}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

const map:any={
Asia:{pnl:0,trades:0},
London:{pnl:0,trades:0},
NewYork:{pnl:0,trades:0}
}

trades?.forEach((t:any)=>{

const session=t.session || "London"

const pnl=Number(t.pnl ?? t.profit ?? 0)

map[session].pnl+=pnl
map[session].trades++

})

setSessions(Object.entries(map).map(([name,val]:any)=>({

name,
pnl:val.pnl,
trades:val.trades

})))

}

return(

<div>

<h1 className="text-3xl mb-6">
Session Analytics
</h1>

<div className="card">

<table className="w-full">

<thead>
<tr>
<th>Session</th>
<th>Trades</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{sessions.map((s,i)=>(
<tr key={i}>
<td>{s.name}</td>
<td>{s.trades}</td>
<td>{s.pnl}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}