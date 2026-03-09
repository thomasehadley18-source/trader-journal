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
import TradeCoach from "@/components/ai/trade-coach"

export function TradeTable({ refresh }: { refresh: boolean }) {

  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [refresh])

  async function load() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })

    setTrades(data || [])
  }

  async function remove(id: string) {

    await supabase
      .from("trades")
      .delete()
      .eq("id", id)

    load()
  }

  return (
    <div className="border border-border rounded-lg p-4">

      <h2 className="text-lg font-medium mb-4">
        Your Trades
      </h2>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Pair</TableHead>
            <TableHead>Side</TableHead>
            <TableHead>PnL</TableHead>
            <TableHead>Strategy</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Source</TableHead>
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
                className={
                  t.pnl >= 0
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {Number(t.pnl).toFixed(2)}
              </TableCell>

              <TableCell>
                {t.strategy || "—"}
              </TableCell>

              <TableCell>
                {Array.isArray(t.tags) && t.tags.length > 0
                  ? t.tags.join(", ")
                  : "—"}
              </TableCell>

              <TableCell>
                {Array.isArray(t.sessions_active) &&
                t.sessions_active.length > 0
                  ? t.sessions_active.join(", ")
                  : "—"}
              </TableCell>

              <TableCell>
                {t.import_source || "manual"}
              </TableCell>

              <TableCell className="flex gap-2">

                <EditTradeDialog
                  trade={t}
                  onUpdate={load}
                />

                <TradeCoach trade={t} />

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
                colSpan={9}
                className="text-center text-muted-foreground"
              >
                No trades found.
              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>

    </div>
  )
}