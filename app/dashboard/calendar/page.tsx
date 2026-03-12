"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {buildCalendar} from "@/lib/calendar-engine"

export default function CalendarPage(){

const [days,setDays]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const calendar=buildCalendar(data||[])

setDays(calendar)

}

return(

<div>

<h1>Trading Calendar</h1>

<div className="grid-4">

{days.map(day=>{

const color=
day.pnl>0
? "#064e3b"
: day.pnl<0
? "#7f1d1d"
: "#1e293b"

return(

<div
key={day.date}
style={{
background:color,
padding:20,
borderRadius:10
}}
>

<div>{day.date}</div>

<div>Trades: {day.trades}</div>

<div>PnL: {day.pnl.toFixed(2)}</div>

</div>

)

})}

</div>

</div>

)

}