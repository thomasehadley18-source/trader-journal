"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import InstrumentSelect from "./instrument-select"

export default function TradeForm({ onAdded }: { onAdded?: () => void }) {

const [symbol,setSymbol]=useState("")
const [side,setSide]=useState("LONG")
const [entry,setEntry]=useState("")
const [exit,setExit]=useState("")
const [strategy,setStrategy]=useState("")
const [notes,setNotes]=useState("")
const [image,setImage]=useState<File|null>(null)
const [saving,setSaving]=useState(false)

async function submit(){

setSaving(true)

const {data:{user}}=await supabase.auth.getUser()

if(!user){
setSaving(false)
return
}

const entryNum=Number(entry)
const exitNum=Number(exit)

const pnl = side==="LONG"
? exitNum-entryNum
: entryNum-exitNum

const {data:trade}=await supabase
.from("trades")
.insert({
user_id:user.id,
symbol,
side,
entry:entryNum,
exit:exitNum,
pnl,
strategy,
notes
})
.select()
.single()

if(trade && image){

const path=`${trade.id}/${image.name}`

await supabase
.storage
.from("trade-screenshots")
.upload(path,image)

const url=`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/trade-screenshots/${path}`

await supabase
.from("trades")
.update({ screenshot_url:url })
.eq("id",trade.id)

}

setSymbol("")
setEntry("")
setExit("")
setStrategy("")
setNotes("")
setImage(null)
setSaving(false)

if(onAdded)onAdded()

}

return(

<div className="card">

<h2>Add Trade</h2>

<label>Instrument</label>
<InstrumentSelect value={symbol} onChange={setSymbol}/>

<label>Side</label>
<select value={side} onChange={e=>setSide(e.target.value)}>
<option>LONG</option>
<option>SHORT</option>
</select>

<label>Entry</label>
<input value={entry} onChange={e=>setEntry(e.target.value)} />

<label>Exit</label>
<input value={exit} onChange={e=>setExit(e.target.value)} />

<label>Strategy</label>
<input value={strategy} onChange={e=>setStrategy(e.target.value)} />

<label>Notes</label>
<textarea value={notes} onChange={e=>setNotes(e.target.value)} />

<label>Upload Screenshot</label>
<input
type="file"
accept="image/*"
onChange={e=>setImage(e.target.files?.[0]||null)}
/>

<button onClick={submit}>
{saving?"Saving...":"Save Trade"}
</button>

</div>

)

}