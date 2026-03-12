"use client"

import { INSTRUMENTS } from "@/lib/instruments"

export default function InstrumentSelect({
value,
onChange
}:{value:string,onChange:(v:string)=>void}){

return(

<select
value={value}
onChange={e=>onChange(e.target.value)}
>

<option value="">
Select Instrument
</option>

{Object.entries(INSTRUMENTS).map(([group,list])=>(

<optgroup key={group} label={group}>

{(list as string[]).map(pair=>(

<option key={pair} value={pair}>
{pair}
</option>

))}

</optgroup>

))}

</select>

)

}