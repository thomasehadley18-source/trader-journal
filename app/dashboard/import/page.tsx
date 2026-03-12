"use client"

import {useState} from "react"
import {supabase} from "@/lib/supabase"
import {parseMT4,parseMT5,parseNinja} from "@/lib/trade-import-parser"

export default function ImportTrades(){

const [platform,setPlatform]=useState("MT4")
const [file,setFile]=useState<File|null>(null)
const [message,setMessage]=useState("")

async function importTrades(){

if(!file)return

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const text=await file.text()

let trades:any[]=[]

if(platform==="MT4") trades=parseMT4(text)
if(platform==="MT5") trades=parseMT5(text)
if(platform==="NinjaTrader") trades=parseNinja(text)

await supabase.from("trades").insert(

trades.map(t=>({
...t,
user_id:user.id
}))

)

setMessage(`Imported ${trades.length} trades`)

}

return(

<div>

<h1>Import Trades</h1>

<div className="card">

<label>Platform</label>

<select
value={platform}
onChange={e=>setPlatform(e.target.value)}
>

<option>MT4</option>
<option>MT5</option>
<option>NinjaTrader</option>

</select>

<input
type="file"
accept=".csv"
onChange={e=>setFile(e.target.files?.[0]||null)}
/>

<button onClick={importTrades}>
Import Trades
</button>

{message && <p>{message}</p>}

</div>

</div>

)

}