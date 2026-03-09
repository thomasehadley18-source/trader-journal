"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import {
  calculateExpectancy,
  calculateRiskOfRuin,
  calculateRMultiples,
  monteCarloSimulation
} from "@/lib/hedge-analytics"

export default function AdvancedAnalytics(){

  const [trades,setTrades]=useState<any[]>([])
  const [stats,setStats]=useState<any>(null)

  useEffect(()=>{
    load()
  },[])

  async function load(){

    const {data:{user}} =
      await supabase.auth.getUser()

    const {data} = await supabase
      .from("trades")
      .select("*")
      .eq("user_id",user?.id)

    const list=data||[]

    const expectancy =
      calculateExpectancy(list)

    const ruin =
      calculateRiskOfRuin(list)

    const rMultiples =
      calculateRMultiples(list)

    const monteCarlo =
      monteCarloSimulation(list)

    setTrades(list)

    setStats({
      expectancy,
      ruin,
      rMultiples,
      monteCarlo
    })
  }

  if(!stats) return <div className="p-6">Loading...</div>

  return(

    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">
        Hedge Fund Analytics
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="border p-4 rounded">
          <h3 className="text-sm text-muted-foreground">
            Win Rate
          </h3>
          <div className="text-xl font-semibold">
            {(stats.expectancy.winRate*100).toFixed(2)}%
          </div>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-sm text-muted-foreground">
            Expectancy
          </h3>
          <div className="text-xl font-semibold">
            {stats.expectancy.expectancy.toFixed(2)}
          </div>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-sm text-muted-foreground">
            Risk of Ruin
          </h3>
          <div className="text-xl font-semibold">
            {(stats.ruin*100).toFixed(2)}%
          </div>
        </div>

      </div>

      <div className="border p-4 rounded">

        <h2 className="font-medium mb-4">
          Monte Carlo Simulation
        </h2>

        <p className="text-sm text-muted-foreground">
          Simulated equity outcomes based on trade distribution
        </p>

        <div className="mt-4 text-sm">
          {stats.monteCarlo.slice(0,10).map((v:any,i:number)=>(
            <div key={i}>
              Run {i+1}: {v.toFixed(2)}
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}