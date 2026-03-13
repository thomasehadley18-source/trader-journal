"use client"

import { useEffect, useRef } from "react"
import { createChart } from "lightweight-charts"

export default function TradeReplayChart({ data }: { data: any[] }) {

const chartRef = useRef<HTMLDivElement>(null)

useEffect(() => {

if (!chartRef.current) return

const chart:any = createChart(chartRef.current, {
height: 400,
layout: {
background: { color: "#020817" },
textColor: "#ffffff"
},
grid: {
vertLines: { color: "#1e293b" },
horzLines: { color: "#1e293b" }
}
})

const candleSeries = chart.addCandlestickSeries()

candleSeries.setData(data)

return () => {
chart.remove()
}

}, [data])

return <div ref={chartRef} style={{ width: "100%" }} />

}