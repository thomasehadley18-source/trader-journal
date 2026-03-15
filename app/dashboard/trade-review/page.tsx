"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {reviewTrade} from "@/lib/trade-review-engine"

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

if(!data) return

const results = data.map(t=>({

trade:t,
review:reviewTrade(t)

}))

setReviews(results)

}

return(

<div>

<h1>AI Trade Review</h1>

<div className="grid-2">

{reviews.map((r,i)=>(

<div key={i} className="card">

<h3>{r.trade.instrument}</h3>

<p>Grade: {r.review.grade}</p>

<p>Score: {r.review.score}</p>

<ul>

{r.review.notes.map((n:string,j:number)=>(
<li key={j}>{n}</li>
))}

</ul>

</div>

))}

</div>

</div>

)

}
