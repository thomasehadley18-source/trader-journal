"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { detectTradeMistakes } from "@/lib/mistake-engine"

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<string[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user?.id)
      .order("trade_date", { ascending: true })

    const m = detectTradeMistakes(data || [])
    setMistakes(m)
  }

  return (
    <div>
      <h1>Trading Mistakes</h1>

      {mistakes.length === 0 && (
        <p>No major issues detected.</p>
      )}

      <ul>
        {mistakes.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  )
}
