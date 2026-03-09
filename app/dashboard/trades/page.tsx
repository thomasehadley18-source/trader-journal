"use client"

import { useState } from "react"

export default function TradesPage() {
  const [refresh, setRefresh] = useState(false)

  function reload() {
    setRefresh(!refresh)
  }

  return (
    <div className="space-y-8 p-6">

      <div className="border rounded p-4">
        <h2 className="font-semibold mb-2">Trade Form</h2>
        <p>Trade form component coming soon.</p>
      </div>

      <div className="border rounded p-4">
        <h2 className="font-semibold mb-2">Trade Table</h2>
        <p>Trade table component coming soon.</p>
      </div>

    </div>
  )
}