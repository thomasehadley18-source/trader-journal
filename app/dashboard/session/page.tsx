"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {analyzeSessions} from "@/lib/session-engine"

export default function SessionPage(){

const [stats,setStats]=useState<any>(null)

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

setStats(analyzeSessions(data||[]))

}

if(!stats)return <div>Loading...</div>

return(

<div style={{padding:40}}>

<h1>Session Analytics</h1>

<p>Asia: {stats.Asia}</p>
<p>London: {stats.London}</p>
<p>New York: {stats.NewYork}</p>

</div>

)

}