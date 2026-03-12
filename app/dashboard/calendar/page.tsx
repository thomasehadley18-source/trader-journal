"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {buildCalendar} from "@/lib/calendar-engine"

export default function CalendarPage(){

const [days,setDays]=useState<any>({})

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

setDays(buildCalendar(data||[]))

}

return(

<div style={{padding:40}}>

<h1>Trade Calendar</h1>

{Object.entries(days).map(([d,p]:any)=>(
<div key={d}>
{d} : {p}
</div>
))}

</div>

)

}