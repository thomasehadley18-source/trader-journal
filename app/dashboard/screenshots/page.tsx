"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import ScreenshotAnnotator from "@/components/trades/screenshot-annotator"

export default function Screenshots(){

const [images,setImages] = useState<string[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.storage
.from("trade-screenshots")
.list()

if(!data) return

const urls = data.map((f:any)=>{

return supabase
.storage
.from("trade-screenshots")
.getPublicUrl(f.name)
.data.publicUrl

})

setImages(urls)

}

return(

<div>

<h1>Trade Screenshots</h1>

<div className="grid-2">

{images.map((img,i)=>(

<div key={i} className="card">

<ScreenshotAnnotator image={img} />

</div>

))}

</div>

</div>

)

}
