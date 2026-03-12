"use client"

import { useState } from "react"
import { INSTRUMENTS } from "@/lib/instruments"

export default function InstrumentSelect({
value,
onChange
}:{value:string,onChange:(v:string)=>void}){

const [category,setCategory]=useState("Forex")

const list = INSTRUMENTS[category as keyof typeof INSTRUMENTS]

return(

<div>

<select
value={category}
onChange={e=>setCategory(e.target.value)}
>

{Object.keys(INSTRUMENTS).map(c=>(
<option key={c}>{c}</option>
))}

</select>

<select
value={value}
onChange={e=>onChange(e.target.value)}
>

<option value="">Select Pair</option>

{list.map(p=>(
<option key={p}>{p}</option>
))}

</select>

<input
placeholder="or type pair"
value={value}
onChange={e=>onChange(e.target.value.toUpperCase())}
/>

</div>

)

}