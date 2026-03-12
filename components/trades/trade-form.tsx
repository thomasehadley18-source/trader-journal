"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import InstrumentSelect from "./instrument-select"

export default function TradeForm(){

const [pair,setPair] = useState("")
const [pnl,setPnl] = useState("")
const [date,setDate] = useState("")
const [image,setImage] = useState<File | null>(null)

async function submit(){

const { data:{user} } = await supabase.auth.getUser()
if(!user) return

let screenshot=null

if(image){

const path=`${user.id}/${Date.now()}-${image.name}`

const {data,error} = await supabase
.storage
.from("trade-screenshots")
.upload(path,image)

if(!error){
screenshot=data.path
}

}

await supabase
.from("trades")
.insert({
user_id:user.id,
pair,
pnl:Number(pnl),
trade_date:date,
screenshot
})

alert("Trade added")

}

return(

<div className="card">

<h2>Add Trade</h2>

<InstrumentSelect
value={pair}
onChange={setPair}
/>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<input
type="number"
placeholder="PnL"
value={pnl}
onChange={(e)=>setPnl(e.target.value)}
/>

<label>Screenshot</label>

<input
type="file"
onChange={(e)=>setImage(e.target.files?.[0] || null)}
/>

<button onClick={submit}>
Add Trade
</button>

</div>

)

}