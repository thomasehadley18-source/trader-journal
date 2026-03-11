"use client"

import {useState} from "react"

export default function ImportPage(){

const [file,setFile]=useState<File|null>(null)
const [message,setMessage]=useState("")

async function upload(){

if(!file)return

const form=new FormData()
form.append("file",file)

const res=await fetch("/api/import/mt4",{
method:"POST",
body:form
})

const data=await res.json()

setMessage(data.message)

}

return(

<div>

<h1 className="text-3xl mb-6">
Import Trades
</h1>

<div className="card">

<input
type="file"
onChange={e=>setFile(e.target.files?.[0]||null)}
/>

<button
className="mt-4 bg-primary px-4 py-2 rounded"
onClick={upload}
>
Import MT4 / MT5 CSV
</button>

<p className="mt-4">{message}</p>

</div>

</div>

)

}