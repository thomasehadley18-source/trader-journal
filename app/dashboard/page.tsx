"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculatePerformance } from "@/lib/performance"
import { calculateDrawdown } from "@/lib/drawdown"

export default function DashboardPage() {

  const [stats,setStats] = useState({
    totalTrades:0,
    winRate:"0",
    expectancy:"0",
    maxDrawdown:"0"
  })

  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    load()
  },[])

  async function load(){

    const {
      data:{user}
    } = await supabase.auth.getUser()

    if(!user){
      setLoading(false)
      return
    }

    const {data} = await supabase
      .from("trades")
      .select("*")
      .eq("user_id",user.id)
      .order("trade_date",{ascending:true})

    const trades = data || []

    const perf = calculatePerformance(trades)
    const dd = calculateDrawdown(trades)

    setStats({
      totalTrades:trades.length,
      winRate:(perf.winRate * 100).toFixed(1),
      expectancy:perf.expectancy.toFixed(2),
      maxDrawdown:dd.maxDrawdown.toFixed(2)
    })

    setLoading(false)

  }

  if(loading){
    return <div>Loading dashboard...</div>
  }

  return (

    <div style={{display:"flex",flexDirection:"column",gap:30}}>

      {/* Stats Row */}

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:20
        }}
      >

        <div className="card">
          <div style={{color:"#94a3b8"}}>Total Trades</div>
          <div style={{fontSize:30,fontWeight:700}}>
            {stats.totalTrades}
          </div>
        </div>

        <div className="card">
          <div style={{color:"#94a3b8"}}>Win Rate</div>
          <div style={{fontSize:30,fontWeight:700}}>
            {stats.winRate}%
          </div>
        </div>

        <div className="card">
          <div style={{color:"#94a3b8"}}>Expectancy</div>
          <div style={{fontSize:30,fontWeight:700}}>
            {stats.expectancy}
          </div>
        </div>

        <div className="card">
          <div style={{color:"#94a3b8"}}>Max Drawdown</div>
          <div style={{fontSize:30,fontWeight:700}}>
            {stats.maxDrawdown}
          </div>
        </div>

      </div>

      {/* Equity Chart Placeholder */}

      <div className="card">

        <h2 style={{marginBottom:20}}>Equity Curve</h2>

        <div
          style={{
            height:250,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color:"#94a3b8"
          }}
        >
          Equity chart will render here
        </div>

      </div>

      {/* Insights */}

      <div className="card">

        <h2 style={{marginBottom:15}}>Trading Insights</h2>

        <ul style={{color:"#94a3b8",lineHeight:1.8}}>

          <li>Your win rate is {stats.winRate}%</li>

          <li>Maximum drawdown recorded: {stats.maxDrawdown}</li>

          <li>Expectancy per trade: {stats.expectancy}</li>

        </ul>

      </div>

    </div>

  )

}