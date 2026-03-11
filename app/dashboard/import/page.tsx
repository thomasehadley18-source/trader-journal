"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { parseBrokerCSV } from "@/lib/broker-import"

export default function ImportPage(){

const [file,setFile] = useState<File|null>(null)

async function upload(){

if(!file) return

const text = await file.text()

const trades = parseBrokerCSV(text)

const {data:{user}} = await supabase.auth.getUser()

await supabase
.from("trades")
.insert(
trades.map(t=>({
...t,
user_id:user?.id
}))
)

alert("Trades imported")

}

return(

<div style={{padding:40}}>

<h1>Import Trades</h1>

<input
type="file"
accept=".csv"
onChange={(e)=>setFile(e.target.files?.[0] || null)}
/>

<button onClick={upload}>
Import CSV
</button>

</div>

)

}