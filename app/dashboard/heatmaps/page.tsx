"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {
generateDayHeatmap,
generateHourHeatmap
} from "@/lib/heatmap-engine"

import PerformanceHeatmap from "@/components/charts/performance-heatmap"

export default function Heatmaps(){

const [day,setDay]=useState<any[]>([])
const [hour,setHour]=useState<any[]>([])

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

const trades=data||[]

setDay(generateDayHeatmap(trades))
setHour(generateHourHeatmap(trades))

}

return(

<div>

<h1>Performance Heatmaps</h1>

<div className="grid-2">

<PerformanceHeatmap
data={day}
label="Day Performance"
/>

<PerformanceHeatmap
data={hour}
label="Hour Performance"
/>

</div>

</div>

)

}