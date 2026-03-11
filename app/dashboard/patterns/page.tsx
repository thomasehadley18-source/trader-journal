"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { detectPatterns } from "@/lib/pattern-detection"

export default function PatternPage(){

const [patterns,setPatterns] = useState<any>(null)

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

const trades = data || []

setPatterns(detectPatterns(trades))

}

if(!patterns) return <div style={{padding:40}}>Loading...</div>

return(

<div style={{padding:40}}>

<h1>Trade Pattern Analytics</h1>

<div style={{marginTop:20}}>

<p>Breakout Trades: {patterns.breakout}</p>
<p>Reversal Trades: {patterns.reversal}</p>
<p>Trend Trades: {patterns.trend}</p>

</div>

</div>

)

}