"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ScreenshotUpload({ tradeId }: any) {

const [uploading,setUploading] = useState(false)

async function upload(e:any){

const file = e.target.files[0]

if(!file) return

setUploading(true)

const filePath = `${tradeId}/${Date.now()}-${file.name}`

const { error } = await supabase.storage
.from("trade-screenshots")
.upload(filePath,file)

setUploading(false)

if(error){
alert("Upload failed")
}else{
alert("Screenshot uploaded")
}

}

return(

<div style={{marginTop:10}}>

<input
type="file"
accept="image/*"
onChange={upload}
/>

{uploading && <p>Uploading...</p>}

</div>

)

}