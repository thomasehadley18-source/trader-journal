"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TradeScreenshotViewer({tradeId}:{tradeId:string}){

const [images,setImages]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.storage
.from("trade-screenshots")
.list(tradeId)

if(!data) return

const urls = data.map((file:any)=>{

return supabase
.storage
.from("trade-screenshots")
.getPublicUrl(`${tradeId}/${file.name}`)
.data.publicUrl

})

setImages(urls)

}

return(

<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>

{images.map((img,i)=>(
<img
key={i}
src={img}
style={{
width:200,
borderRadius:8
}}
/>
))}

</div>

)

}