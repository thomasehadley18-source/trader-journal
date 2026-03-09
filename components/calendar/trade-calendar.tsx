"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TradeCalendar() {

  const [days, setDays] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {

    const { data: { user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("trades")
      .select("trade_date, pnl")
      .eq("user_id", user?.id)

    const grouped: any = {}

    data?.forEach((t) => {
      const d = new Date(t.trade_date).toDateString()

      if (!grouped[d]) grouped[d] = 0

      grouped[d] += t.pnl
    })

    setDays(Object.entries(grouped))
  }

  return (
    <div className="grid grid-cols-7 gap-2">

      {days.map(([date, pnl]: any) => (

        <div
          key={date}
          className={`p-2 text-xs rounded
          ${pnl >= 0 ? "bg-green-500/20" : "bg-red-500/20"}`}
        >
          {date}
          <br />
          {pnl.toFixed(2)}
        </div>

      ))}

    </div>
  )
}