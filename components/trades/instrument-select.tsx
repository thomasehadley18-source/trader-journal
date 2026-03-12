"use client"

import { useState } from "react"
import { INSTRUMENTS } from "@/lib/instruments"

export default function InstrumentSelect({
  value,
  onChange
}:{
  value:string
  onChange:(v:string)=>void
}){

  const [category,setCategory] = useState("Forex")

  const pairs = INSTRUMENTS[category as keyof typeof INSTRUMENTS]

  return(

    <div style={{display:"grid",gap:8}}>

      <label>Market</label>

      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        style={{
          padding:10,
          background:"#0f172a",
          color:"white",
          border:"1px solid #334155",
          borderRadius:8
        }}
      >

        {Object.keys(INSTRUMENTS).map(cat=>(
          <option key={cat}>{cat}</option>
        ))}

      </select>

      <label>Pair</label>

      <select
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        style={{
          padding:10,
          background:"#0f172a",
          color:"white",
          border:"1px solid #334155",
          borderRadius:8
        }}
      >

        <option value="">Select Pair</option>

        {pairs.map(pair=>(
          <option key={pair}>{pair}</option>
        ))}

      </select>

      <label>Or type pair manually</label>

      <input
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder="Example: EURUSD"
        style={{
          padding:10,
          background:"#020617",
          border:"1px solid #334155",
          borderRadius:8,
          color:"white"
        }}
      />

    </div>

  )

}