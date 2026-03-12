"use client"

import { useEffect, useRef } from "react"
import { createChart } from "lightweight-charts"

export default function TradeReplayChart({ data }: { data: any[] }) {

const chartContainerRef = useRef<HTMLDivElement | null>(null)

useEffect(() => {

if (!chartContainerRef.current) return

const chart = createChart(chartContainerRef.current, {
width: chartContainerRef.current.clientWidth,
height: 400,
layout: {
background: { color: "#020817" },
textColor: "#e2e8f0"
},
grid: {
vertLines: { color: "#1e293b" },
horzLines: { color: "#1e293b" }
}
})

/* FIX TYPESCRIPT ISSUE */
const series = (chart as any).addCandlestickSeries()

series.setData(data)

return () => {
chart.remove()
}

}, [data])

return (

<div
ref={chartContainerRef}
style={{
width: "100%",
height: "400px"
}}
/>

)

}