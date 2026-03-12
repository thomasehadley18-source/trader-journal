"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import PnLDistribution from "@/components/charts/pnl-distribution"
import SessionChart from "@/components/charts/session-chart"

export default function Analytics(){

const [pnl,setPnl]=useState<any[]>([])
const [sessions,setSessions]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

const trades=data||[]

let wins=0
let losses=0

let asia=0
let london=0
let ny=0

trades.forEach(t=>{

if(t.pnl>0)wins++
else losses++

const hour=new Date(t.trade_date).getUTCHours()

if(hour<7)asia+=t.pnl
else if(hour<14)london+=t.pnl
else ny+=t.pnl

})

setPnl([

{name:"Wins",value:wins},
{name:"Losses",value:losses}

])

setSessions([

{name:"Asia",value:asia},
{name:"London",value:london},
{name:"New York",value:ny}

])

}

return(

<div>

<h1>Analytics</h1>

<h2>PnL Distribution</h2>

<PnLDistribution data={pnl}/>

<h2 style={{marginTop:40}}>
Session Performance
</h2>

<SessionChart data={sessions}/>

</div>

)

}