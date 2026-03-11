"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import InstrumentSelect from "@/components/trades/instrument-select"

export default function AddTradeForm({onAdded}:any){

const [symbol,setSymbol] = useState("")
const [side,setSide] = useState("buy")
const [entry,setEntry] = useState("")
const [exit,setExit] = useState("")

async function submit(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const pnl = Number(exit) - Number(entry)

await supabase
.from("trades")
.insert({

user_id:user.id,
symbol,
side,
entry:Number(entry),
exit:Number(exit),
pnl

})

setSymbol("")
setEntry("")
setExit("")

if(onAdded){
onAdded()
}

}

return(

<div
style={{
border:"1px solid #1e293b",
padding:20,
borderRadius:10
}}
>

<h3>Add Trade</h3>

<InstrumentSelect
value={symbol}
onChange={setSymbol}
/>

<select
value={side}
onChange={(e)=>setSide(e.target.value)}
style={{marginTop:10}}
>
<option value="buy">Buy</option>
<option value="sell">Sell</option>
</select>

<input
placeholder="Entry"
value={entry}
onChange={(e)=>setEntry(e.target.value)}
style={{marginTop:10}}
/>

<input
placeholder="Exit"
value={exit}
onChange={(e)=>setExit(e.target.value)}
style={{marginTop:10}}
/>

<button
onClick={submit}
style={{marginTop:10}}
>
Add Trade
</button>

</div>

)

}