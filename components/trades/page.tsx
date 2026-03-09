"use client"

import { useState } from "react"
import TradeForm from "@/components/trades/trade-form"
import TradeTable from "@/components/trades/trade-table"

export default function TradesPage() {
  const [refresh, setRefresh] = useState(false)

  function reload() {
    setRefresh((prev) => !prev)
  }

  return (
    <div className="space-y-8">
      <TradeForm onSaved={reload} />
      <TradeTable refresh={refresh} />
    </div>
  )
}