"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {calculateStreaks} from "@/lib/streak-engine"

export default function StreakPage(){

const [data,setData]=useState<any>(null)

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

setData(calculateStreaks(data||[]))

}

if(!data)return <div>Loading...</div>

return(

<div style={{padding:40}}>

<h1>Trade Streaks</h1>

<p>Max Win Streak: {data.maxWin}</p>

<p>Max Loss Streak: {data.maxLoss}</p>

</div>

)

}