"use client"

import { useState } from "react"
import TradeForm from "@/components/trades/trade-form"
import TradeTable from "@/components/trades/trade-table"

export default function TradesPage() {
  const [refresh, setRefresh] = useState(false)

  function reload() {
    setRefresh((v) => !v)
  }

  return (
    <div className="grid">
      <TradeForm onSaved={reload} />
      <TradeTable refresh={refresh} />
    </div>
  )
}