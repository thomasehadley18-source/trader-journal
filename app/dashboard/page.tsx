"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

import PerformanceCards from "@/components/dashboard/performance-cards"

export default function DashboardPage(){

const [trades,setTrades] = useState<any[]>([])

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

setTrades(data || [])

}

return(

<div style={{display:"flex",flexDirection:"column",gap:30}}>

<h1>Trading Dashboard</h1>

<PerformanceCards trades={trades} />

</div>

)

}