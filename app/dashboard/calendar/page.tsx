"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TradingCalendar(){

const [days,setDays] = useState<any>({})

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

const map:any = {}

data?.forEach((t:any)=>{

const day = new Date(t.created_at).toISOString().split("T")[0]

if(!map[day]) map[day] = 0

map[day] += Number(t.pnl || 0)

})

setDays(map)

}

const today = new Date()

const year = today.getFullYear()
const month = today.getMonth()

const firstDay = new Date(year,month,1).getDay()
const totalDays = new Date(year,month+1,0).getDate()

const cells:any[] = []

for(let i=0;i<firstDay;i++){
cells.push(null)
}

for(let d=1;d<=totalDays;d++){

const date = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`

cells.push({
day:d,
pnl:days[date] || 0
})

}

return(

<div>

<h1>Trading Calendar</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(7,1fr)",
gap:10,
marginTop:20
}}
>

{cells.map((c,i)=>{

if(!c){

return <div key={i}></div>

}

const color =
c.pnl > 0
? "#14532d"
: c.pnl < 0
? "#7f1d1d"
: "#0f172a"

return(

<div
key={i}
style={{
padding:14,
borderRadius:8,
background:color,
textAlign:"center"
}}
>

<div>{c.day}</div>

<div style={{fontSize:12}}>
{c.pnl !==0 && c.pnl.toFixed(2)}
</div>

</div>

)

})}

</div>

</div>

)

}