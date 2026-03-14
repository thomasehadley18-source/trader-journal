"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import InstrumentSelect from "./instrument-select"
import ScreenshotUpload from "./screenshot-upload"

export default function TradeForm({ onAdded }: any) {

  const [instrument,setInstrument] = useState("")
  const [side,setSide] = useState("long")
  const [size,setSize] = useState("")
  const [entry,setEntry] = useState("")
  const [exit,setExit] = useState("")
  const [pnl,setPnl] = useState("")
  const [notes,setNotes] = useState("")
  const [tradeId,setTradeId] = useState<string | null>(null)
  const [loading,setLoading] = useState(false)

  async function addTrade(){

    setLoading(true)

    const {data:{user}} = await supabase.auth.getUser()

    if(!user){
      setLoading(false)
      return
    }

    const {data,error} = await supabase
      .from("trades")
      .insert({
        user_id:user.id,
        instrument,
        side,
        size:Number(size),
        entry:Number(entry),
        exit:Number(exit),
        pnl:Number(pnl),
        notes
      })
      .select()
      .single()

    setLoading(false)

    if(error) return

    setTradeId(data.id)

    setInstrument("")
    setSide("long")
    setSize("")
    setEntry("")
    setExit("")
    setPnl("")
    setNotes("")

    if(onAdded) onAdded()

  }

  return (

    <div className="card" style={{marginBottom:30}}>

      <h2>Add Trade</h2>

      <label>Instrument</label>
      <InstrumentSelect
        value={instrument}
        onChange={setInstrument}
      />

      <label>Side</label>
      <select
        value={side}
        onChange={(e)=>setSide(e.target.value)}
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>

      <label>Position Size</label>
      <input
        value={size}
        onChange={(e)=>setSize(e.target.value)}
        placeholder="Size"
      />

      <label>Entry</label>
      <input
        value={entry}
        onChange={(e)=>setEntry(e.target.value)}
        placeholder="Entry price"
      />

      <label>Exit</label>
      <input
        value={exit}
        onChange={(e)=>setExit(e.target.value)}
        placeholder="Exit price"
      />

      <label>PnL</label>
      <input
        value={pnl}
        onChange={(e)=>setPnl(e.target.value)}
        placeholder="Profit / Loss"
      />

      <label>Notes</label>
      <textarea
        value={notes}
        onChange={(e)=>setNotes(e.target.value)}
        placeholder="Trade notes"
      />

      <button
        onClick={addTrade}
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Trade"}
      </button>

      {tradeId && (
        <div style={{marginTop:20}}>
          <h3>Upload Screenshot</h3>
          <ScreenshotUpload tradeId={tradeId}/>
        </div>
      )}

    </div>

  )

}