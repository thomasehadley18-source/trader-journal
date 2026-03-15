"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {detectEdgeDecay} from "@/lib/edge-decay"

export default function EdgeDecay(){

const [data,setData] = useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data:trades} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("created_at")

const result = detectEdgeDecay(trades || [])

setData(result)

}

if(!data) return <p>Loading...</p>

return(

<div>

<h1>Strategy Edge Detection</h1>

<div className="card">

<p>Past Average PnL: {data.past.toFixed(2)}</p>

<p>Recent Average PnL: {data.recent.toFixed(2)}</p>

<h2>{data.trend}</h2>

</div>

</div>

)

}
