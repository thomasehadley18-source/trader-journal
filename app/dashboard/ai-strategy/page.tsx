"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {detectBestStrategy} from "@/lib/ai-strategy"

export default function AIStrategy(){

const [data,setData]=useState<any>(null)

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

setData(detectBestStrategy(data||[]))

}

if(!data)return<div>Loading...</div>

return(

<div>

<h1>AI Strategy Detection</h1>

<p>Best Strategy: {data[0]}</p>
<p>Total Profit: {data[1]}</p>

</div>

)

}