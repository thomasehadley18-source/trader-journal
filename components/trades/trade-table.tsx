"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EditTradeDialog } from "./edit-trade-dialog"

export function TradeTable({ refresh }: { refresh: boolean }) {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [refresh])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })

    setTrades(data || [])
  }

  async function remove(id: string) {
    await supabase.from("trades").delete().eq("id", id)
    load()
  }

  return (
    <div className="border border-border p-4 rounded-lg">
      <h2 className="text-lg font-medium mb-4">Your Trades</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Pair</TableHead>
            <TableHead>Direction</TableHead>
            <TableHead>PnL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trades.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{new Date(t.trade_date).toLocaleDateString()}</TableCell>
              <TableCell>{t.pair}</TableCell>
              <TableCell>{t.direction}</TableCell>
              <TableCell
                className={t.pnl >= 0 ? "text-green-500" : "text-red-500"}
              >
                {t.pnl.toFixed(2)}
              </TableCell>
              <TableCell className="flex gap-2">
                <EditTradeDialog trade={t} onUpdate={load} />
                <Button variant="destructive" size="sm" onClick={() => remove(t.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {trades.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No trades yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
