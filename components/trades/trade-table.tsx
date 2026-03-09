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

              {/* DATE */}
              <TableCell>
                {new Date(t.trade_date).toLocaleDateString()}
              </TableCell>

              {/* PAIR */}
              <TableCell>{t.pair}</TableCell>

              {/* DIRECTION */}
              <TableCell>{t.direction}</TableCell>

              {/* PNL */}
              <TableCell
                className={
                  t.pnl >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"
                }
              >
                {t.pnl.toFixed(2)}
              </TableCell>

              {/* STRATEGY */}
              <TableCell>
                {t.strategy || "—"}
              </TableCell>

              {/* TAGS */}
              <TableCell>
                {Array.isArray(t.tags) && t.tags.length > 0
                  ? t.tags.join(", ")
                  : "—"}
              </TableCell>

              {/* SESSIONS */}
              <TableCell>
                {Array.isArray(t.sessions_active) && t.sessions_active.length > 0
                  ? t.sessions_active.join(", ")
                  : "—"}
              </TableCell>

              {/* IMPORT SOURCE */}
              <TableCell>
                {t.import_source || "manual"}
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="flex gap-2">
                <EditTradeDialog trade={t} onUpdate={load} />
                <Button
                  variant="destructive"
                  size="sm"
                  on
