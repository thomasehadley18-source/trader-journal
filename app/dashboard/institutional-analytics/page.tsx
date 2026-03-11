"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculateExpectancy,riskOfRuin,monteCarlo } from "@/lib/analytics"

export default function InstitutionalAnalytics(){

const [expectancy,setExpectancy]=useState(0)
const [ror,setRor]=useState(0)
const [mc,setMc]=useState<number[]>([])

useEffect(()=>{

load()

},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const trades = data || []

const exp = calculateExpectancy(trades)

setExpectancy(exp)

const winRate = trades.filter(t=>Number(t.pnl)>0).length/(trades.length||1)

const ruin = riskOfRuin(10000,100,winRate)

setRor(ruin)

const mcRes = monteCarlo(trades)

setMc(mcRes)

}

return(

<div style={{padding:"40px",color:"white"}}>

<h1 style={{fontSize:32,marginBottom:30}}>
Institutional Analytics
</h1>

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>

<div style={{background:"#0f172a",padding:20,borderRadius:10}}>
<h3>Expectancy</h3>
<p>{expectancy.toFixed(2)}</p>
</div>

<div style={{background:"#0f172a",padding:20,borderRadius:10}}>
<h3>Risk of Ruin</h3>
<p>{(ror*100).toFixed(2)}%</p>
</div>

<div style={{background:"#0f172a",padding:20,borderRadius:10}}>
<h3>Monte Carlo Runs</h3>
<p>{mc.length}</p>
</div>

</div>

</div>

)
}