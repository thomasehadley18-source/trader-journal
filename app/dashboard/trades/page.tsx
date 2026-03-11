"use client"

import { useState } from "react"
import AddTradeForm from "@/components/trades/add-trade-form"
import TradeTable from "@/components/trades/trade-table"

export default function TradesPage(){

const [refresh,setRefresh] = useState(0)

function reload(){
setRefresh(r=>r+1)
}

return(

<div style={{padding:40}}>

<h1>Trades</h1>

<AddTradeForm onAdded={reload}/>

<TradeTable refresh={refresh}/>

</div>

)

}