"use client"

import { useState } from "react"

export default function TradeCoach({ trade }: any) {

  const [loading,setLoading]=useState(false)
  const [analysis,setAnalysis]=useState<string | null>(null)

  async function run(){

    setLoading(true)

    const res = await fetch("/api/ai-coach",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({trade})
    })

    const data = await res.json()

    setAnalysis(data.analysis)

    setLoading(false)
  }

  return (

    <div className="border rounded p-4 space-y-3">

      <h3 className="font-medium">
        AI Trading Coach
      </h3>

      <button
        className="border px-3 py-2 rounded"
        onClick={run}
      >
        {loading ? "Analyzing..." : "Analyze Trade"}
      </button>

      {analysis && (
        <pre className="text-sm whitespace-pre-wrap">
          {analysis}
        </pre>
      )}

    </div>

  )
}