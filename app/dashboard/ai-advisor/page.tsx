"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {aiAdvisor} from "@/lib/ai-advisor"

export default function Advisor(){

const [advice,setAdvice]=useState("")

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

setAdvice(aiAdvisor(data||[]))

}

return(

<div>

<h1>AI Trading Advisor</h1>

<p>{advice}</p>

</div>

)

}