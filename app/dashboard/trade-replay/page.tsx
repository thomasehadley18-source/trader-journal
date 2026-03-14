"use client"

import { useEffect, useState } from "react"
import TradeReplayChart from "@/components/charts/trade-replay-chart"

export default function TradeReplay(){

const [data,setData] = useState<any[]>([])

useEffect(()=>{

setData([
{time:"2024-01-01",open:100,high:110,low:95,close:105},
{time:"2024-01-02",open:105,high:112,low:101,close:110},
{time:"2024-01-03",open:110,high:115,low:108,close:112},
{time:"2024-01-04",open:112,high:118,low:109,close:116},
{time:"2024-01-05",open:116,high:120,low:113,close:118}
])

},[])

return(

<div>

<h1>Trade Replay</h1>

<div className="card">

<TradeReplayChart data={data} />

</div>

</div>

)

}