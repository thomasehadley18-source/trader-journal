"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { reviewTrade } from "@/lib/ai-trade-review"

export default function TradeReview(){

const [reviews,setReviews] = useState<any[]>([])

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

const r = (data || []).map(reviewTrade)

setReviews(r)

}

return(

<div style={{padding:40}}>

<h1>AI Trade Reviews</h1>

{reviews.map((r,i)=>(

<div
key={i}
style={{
border:"1px solid #1e293b",
padding:20,
marginBottom:20,
borderRadius:10
}}
>

<p>R:R Ratio: {r.rr?.toFixed(2)}</p>
<p>{r.rating}</p>
<p>{r.mistake}</p>

</div>

))}

</div>

)

}