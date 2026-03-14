"use client"

import { useEffect, useRef } from "react"
import { createChart } from "lightweight-charts"

export default function TradeReplayChart({ data }: any) {

  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    if (!chartRef.current) return

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 420,
      layout: {
        background: { color: "#020617" },
        textColor: "#e2e8f0"
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" }
      },
      rightPriceScale:{
        borderColor:"#1e293b"
      },
      timeScale:{
        borderColor:"#1e293b"
      }
    })

    const candles = (chart as any).addCandlestickSeries()

    candles.setData(data || [])

    // ENTRY LINE
    const entryLine = candles.createPriceLine({
      price: data?.[1]?.close || 0,
      color: "#22c55e",
      lineWidth: 2,
      title: "ENTRY"
    })

    // STOP LINE
    candles.createPriceLine({
      price: (data?.[1]?.close || 0) * 0.98,
      color: "#ef4444",
      lineWidth: 2,
      title: "STOP"
    })

    // TARGET LINE
    candles.createPriceLine({
      price: (data?.[1]?.close || 0) * 1.03,
      color: "#3b82f6",
      lineWidth: 2,
      title: "TARGET"
    })

    return () => chart.remove()

  }, [data])

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: 420
      }}
    />
  )
}