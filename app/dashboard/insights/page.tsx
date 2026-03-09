"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function InsightsPage() {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)

    setTrades(data || [])
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Insights</h1>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Insights will use AI to detect your trading patterns, strengths, weaknesses,
            and psychological tendencies.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Trade Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Trades: {trades.length}</p>
        </CardContent>
      </Card>
    </div>
  )
}
