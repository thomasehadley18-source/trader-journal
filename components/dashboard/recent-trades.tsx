"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table"

export function RecentTrades() {
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
      .order("trade_date", { ascending: false })
      .limit(5)

    setTrades(data || [])
  }

  return (
    <div className="border border-border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Recent Trades</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Pair</TableHead>
            <TableHead>Side</TableHead>
            <TableHead>PnL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trades.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{new Date(t.trade_date).toLocaleDateString()}</TableCell>
              <TableCell>{t.pair}</TableCell>
              <TableCell>{t.direction}</TableCell>
              <TableCell className={t.pnl >= 0 ? "text-green-500" : "text-red-500"}>
                {t.pnl.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}

          {trades.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No trades found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
