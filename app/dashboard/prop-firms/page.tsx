"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { analyzePropFirm } from "@/lib/propfirm-engine"

export default function PropFirmAnalytics(){

const [stats,setStats] = useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const { data:{ user } } = await supabase.auth.getUser()
if(!user) return

const { data } = await supabase
.from("trades")
.select("*")
.eq("user_id", user.id)

const result = analyzePropFirm(data || [])

setStats(result)

}

if(!stats){
return <div style={{padding:40}}>Loading prop firm stats...</div>
}

return(

<div style={{padding:40}}>

<h1>Prop Firm Analytics</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:20
}}>

<div className="card">
<h3>Total Profit</h3>
<p>{stats.totalProfit.toFixed(2)}</p>
</div>

<div className="card">
<h3>Best Day</h3>
<p>{stats.bestDay.toFixed(2)}</p>
</div>

<div className="card">
<h3>Worst Day</h3>
<p>{stats.worstDay.toFixed(2)}</p>
</div>

</div>

</div>

)

}