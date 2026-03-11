"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { generateEquityCurve,calculateMaxDrawdown,calculateWinLoss } from "@/lib/equity-engine"

export default function EquityPage(){

const [curve,setCurve]=useState<any[]>([])
const [maxDD,setMaxDD]=useState(0)
const [wins,setWins]=useState(0)
const [losses,setLosses]=useState(0)
const [winRate,setWinRate]=useState(0)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)
.order("trade_date",{ascending:true})

const trades = data || []

const curveData = generateEquityCurve(trades)

setCurve(curveData)

const dd = calculateMaxDrawdown(trades)

setMaxDD(dd)

const wl = calculateWinLoss(trades)

setWins(wl.wins)
setLosses(wl.losses)
setWinRate(wl.winRate)

}

return(

<div style={{
padding:"40px",
background:"#020817",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{
fontSize:32,
marginBottom:30
}}>
Equity Analytics
</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
marginBottom:"30px"
}}>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Wins</h3>
<p>{wins}</p>
</div>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Losses</h3>
<p>{losses}</p>
</div>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Win Rate</h3>
<p>{(winRate*100).toFixed(1)}%</p>
</div>

</div>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px",
marginBottom:"20px"
}}>
<h3>Max Drawdown</h3>
<p>{maxDD}</p>
</div>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>

<h3>Equity Curve</h3>

<div style={{
maxHeight:"300px",
overflow:"auto",
marginTop:"10px"
}}>

{curve.map((p)=>(

<div key={p.trade}>
Trade {p.trade} — Equity: {p.equity}
</div>

))}

</div>

</div>

</div>

)

}