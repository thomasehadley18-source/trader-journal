"use client"

import { useEffect, useRef } from "react"
import { createChart } from "lightweight-charts"

export default function TradeReplayChart({
data
}:{data:any[]}){

const chartRef = useRef<HTMLDivElement|null>(null)

useEffect(()=>{

if(!chartRef.current) return

const chart = createChart(chartRef.current,{
height:400,
layout:{
background:{color:"#020617"},
textColor:"#cbd5f5"
},
grid:{
vertLines:{color:"#1e293b"},
horzLines:{color:"#1e293b"}
}
})

const series = chart.addCandlestickSeries()

series.setData(data)

return ()=> chart.remove()

},[data])

return <div ref={chartRef}/>
}