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

import { Button } from "@/components/ui/button"
import { EditTradeDialog } from "./edit-trade-dialog"
import { calculateTradeSessions } from "@/lib/sessions"

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
    <div className="border border-border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Your Trades</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Pair</TableHead>
            <TableHead>Side</TableHead>
            <TableHead>PnL</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trades.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                {new Date(t.trade_date).toLocaleDateString()}
              </TableCell>

              <TableCell>{t.pair}</TableCell>

              <TableCell>{t.direction}</TableCell>

              <TableCell
                className={t.pnl >= 0 ? "text-green-500" : "text-red-500"}
              >
                {t.pnl.toFixed(2)}
              </TableCell>

              <TableCell>
                {t.sessions_active?.join(", ") || "—"}
              </TableCell>

              <TableCell className="flex gap-2">
                <EditTradeDialog trade={t} onUpdate={load} />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(t.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {trades.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No trades yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
