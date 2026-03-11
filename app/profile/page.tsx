"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProfilePage(){

const [profile,setProfile]=useState<any>({})

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("profiles")
.select("*")
.eq("id",user.id)
.single()

setProfile(data)

}

return(

<div className="container">

<h1 className="text-4xl mb-6">
Trader Profile
</h1>

<div className="card">

<p>Username: {profile.username}</p>
<p>Bio: {profile.bio}</p>

</div>

</div>

)

}