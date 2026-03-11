"use client"

import {useState} from "react"

export default function UploadScreenshot(){

const [file,setFile]=useState<File|null>(null)
const [tradeId,setTradeId]=useState("")

async function upload(){

if(!file)return

const form=new FormData()

form.append("file",file)
form.append("tradeId",tradeId)

await fetch("/api/trades/upload",{
method:"POST",
body:form
})

alert("Screenshot uploaded")

}

return(

<div>

<h1 className="text-3xl mb-6">
Upload Trade Screenshot
</h1>

<div className="card">

<input
placeholder="Trade ID"
value={tradeId}
onChange={e=>setTradeId(e.target.value)}
/>

<input
type="file"
onChange={e=>setFile(e.target.files?.[0]||null)}
/>

<button
className="mt-4 bg-primary px-4 py-2 rounded"
onClick={upload}
>
Upload Screenshot
</button>

</div>

</div>

)

}