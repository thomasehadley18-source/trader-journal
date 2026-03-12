"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import EquityChart from "@/components/charts/equity-chart"

export default function Dashboard(){

const [stats,setStats]=useState<any>({
balance:0,
winrate:0,
trades:0,
profit:0
})

const [chart,setChart]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const trades=data||[]

let wins=0
let profit=0
let balance=0

const equity:any=[]

trades.forEach(t=>{

if(t.pnl>0)wins++

profit+=Number(t.pnl)

balance+=Number(t.pnl)

equity.push({

date:new Date(t.trade_date).toLocaleDateString(),
balance

})

})

setStats({

balance,
profit,
trades:trades.length,
winrate:((wins/(trades.length||1))*100).toFixed(1)

})

setChart(equity)

}

return(

<div>

<h1>Trading Dashboard</h1>

<div className="grid grid-4">

<div className="card">
<div className="muted">Account Balance</div>
<div className="stat">${stats.balance}</div>
</div>

<div className="card">
<div className="muted">Total Profit</div>
<div className="stat">${stats.profit}</div>
</div>

<div className="card">
<div className="muted">Total Trades</div>
<div className="stat">{stats.trades}</div>
</div>

<div className="card">
<div className="muted">Win Rate</div>
<div className="stat">{stats.winrate}%</div>
</div>

</div>

<div style={{marginTop:40}}>

<h2>Equity Curve</h2>

<EquityChart data={chart}/>

</div>

</div>

)

}