"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {detectMistakes} from "@/lib/mistake-engine"

export default function MistakePage(){

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

setData(detectMistakes(data||[]))

}

if(!data)return <div>Loading...</div>

return(

<div style={{padding:40}}>

<h1>Trading Mistakes</h1>

<p>Revenge Trades: {data.revenge}</p>

<p>Bad Risk Reward: {data.badRR}</p>

</div>

)

}