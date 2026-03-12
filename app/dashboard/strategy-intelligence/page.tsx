"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { analyzeStrategyIntelligence } from "@/lib/strategy-intelligence"

export default function StrategyIntelligencePage(){

const [data,setData] = useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

setData(analyzeStrategyIntelligence(data || []))

}

if(!data){
return <div style={{padding:40}}>Loading...</div>
}

return(

<div style={{padding:40}}>

<h1>Strategy Intelligence</h1>

<div style={{marginTop:30}}>

<p>
Best Pair:
{data.bestPair?.[0]} ({data.bestPair?.[1]?.toFixed?.(2)})
</p>

<p>
Worst Pair:
{data.worstPair?.[0]} ({data.worstPair?.[1]?.toFixed?.(2)})
</p>

<p>
Best Session:
{data.bestSession?.[0]} ({data.bestSession?.[1]?.toFixed?.(2)})
</p>

<p>
Best Strategy:
{data.bestStrategy?.[0]} ({data.bestStrategy?.[1]?.toFixed?.(2)})
</p>

</div>

</div>

)

}