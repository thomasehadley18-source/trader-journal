"use client"

import { useState } from "react"

export default function TradeReplay({ trades }: any) {

  const [index,setIndex] = useState(0)

  if(!trades || trades.length===0)
    return <div>No trades</div>

  const trade = trades[index]

  return (

    <div className="border rounded p-4 space-y-3">

      <h3 className="font-medium">
        Trade Replay
      </h3>

      <div>
        Pair: {trade.pair}
      </div>

      <div>
        Entry: {trade.entry}
      </div>

      <div>
        Exit: {trade.exit}
      </div>

      <div>
        PnL: {trade.pnl}
      </div>

      <div className="flex gap-2">

        <button
          className="border px-3 py-1 rounded"
          disabled={index===0}
          onClick={()=>setIndex(index-1)}
        >
          Prev
        </button>

        <button
          className="border px-3 py-1 rounded"
          disabled={index===trades.length-1}
          onClick={()=>setIndex(index+1)}
        >
          Next
        </button>

      </div>

    </div>
  )
}