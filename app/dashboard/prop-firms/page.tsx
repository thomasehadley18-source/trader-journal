"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {calculatePropFirmStats} from "@/lib/propfirm-engine"

export default function PropFirmAnalytics(){

const [stats,setStats]=useState<any|null>(null)

const startingBalance=100000

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()
if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const trades=data||[]

setStats(calculatePropFirmStats(trades,startingBalance))

}

if(!stats) return <div>Loading...</div>

return(

<div>

<h1>Prop Firm Challenge</h1>

<div className="grid-4">

<div className="card">
<div className="muted">Balance</div>
<div className="stat">${stats.balance.toFixed(2)}</div>
</div>

<div className="card">
<div className="muted">Profit</div>
<div className="stat">${stats.profit.toFixed(2)}</div>
</div>

<div className="card">
<div className="muted">Max Drawdown</div>
<div className="stat">${stats.maxDrawdown.toFixed(2)}</div>
</div>

<div className="card">
<div className="muted">Worst Day</div>
<div className="stat">${stats.worstDay.toFixed(2)}</div>
</div>

</div>

<div className="card" style={{marginTop:20}}>

<h3>Typical Prop Firm Rules</h3>

<ul>
<li>Max Daily Loss: 5%</li>
<li>Max Drawdown: 10%</li>
<li>Profit Target: 8-10%</li>
<li>Minimum Trading Days: 5</li>
</ul>

</div>

</div>

)

}