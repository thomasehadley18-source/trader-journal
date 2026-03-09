"use client"

import { useState } from "react"

export default function TradesPage() {
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Trades</h1>
      <p>Trade tracking coming soon.</p>
    </div>
  )
}