"use client"

import { useState } from "react"
import TradeForm from "@/components/trades/trade-form"
import TradeTable from "@/components/trades/trade-table"

export default function TradesPage() {
  const [refresh, setRefresh] = useState(0)

  function reload() {
    setRefresh((r) => r + 1)
  }

  return (
    <div>
      <h1>Trades</h1>
      <TradeForm onAdded={reload} />
      <TradeTable refresh={refresh} />
    </div>
  )
}