"use client"

import {useEffect,useState} from "react"

export default function Feed(){

const [posts,setPosts] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const res = await fetch("/api/feed")
const data = await res.json()

setPosts(data)

}

return(

<div>

<h1>Community Feed</h1>

{posts.map((p,i)=>(
<div
key={i}
style={{
background:"#0f172a",
padding:20,
borderRadius:10,
marginBottom:20
}}
>

<h3>{p.pair}</h3>

<p>Side: {p.side}</p>

<p>PnL: {p.pnl}</p>

<p>Date: {p.trade_date}</p>

</div>
))}

</div>

)

}