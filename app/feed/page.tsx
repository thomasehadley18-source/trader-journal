"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function TraderFeed(){

const [posts,setPosts]=useState<any[]>([])
const [content,setContent]=useState("")

useEffect(()=>{
load()
},[])

async function load(){

const {data}=await supabase
.from("feed_posts")
.select("*")
.order("created_at",{ascending:false})

setPosts(data||[])

}

async function post(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

await supabase
.from("feed_posts")
.insert({
user_id:user.id,
content
})

setContent("")

load()

}

return(

<div>

<h1>Trader Feed</h1>

<div className="card">

<textarea
placeholder="Share trade insight..."
value={content}
onChange={e=>setContent(e.target.value)}
/>

<button onClick={post}>
Post
</button>

</div>

<div style={{marginTop:20}}>

{posts.map(p=>(

<div key={p.id} className="card" style={{marginBottom:15}}>

<div>{p.content}</div>

<div className="muted" style={{marginTop:10}}>
{new Date(p.created_at).toLocaleString()}
</div>

</div>

))}

</div>

</div>

)

}