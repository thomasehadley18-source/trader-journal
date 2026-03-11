"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProfilePage(){

const [profile,setProfile] = useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("profiles")
.select("*")
.eq("id",user.id)
.single()

setProfile(data)

}

async function save(){

const {data:{user}} = await supabase.auth.getUser()

await supabase
.from("profiles")
.upsert({
id:user?.id,
username:profile.username,
bio:profile.bio,
public_profile:profile.public_profile
})

alert("Profile saved")

}

if(!profile) return <div style={{padding:40}}>Loading...</div>

return(

<div style={{padding:40,maxWidth:700}}>

<h1>Your Profile</h1>

<label>Username</label>

<input
value={profile.username || ""}
onChange={(e)=>setProfile({...profile,username:e.target.value})}
/>

<label>Bio</label>

<textarea
value={profile.bio || ""}
onChange={(e)=>setProfile({...profile,bio:e.target.value})}
/>

<label>

<input
type="checkbox"
checked={profile.public_profile}
onChange={(e)=>setProfile({...profile,public_profile:e.target.checked})}
/>

Public Profile

</label>

<button onClick={save}>
Save Profile
</button>

</div>

)

}