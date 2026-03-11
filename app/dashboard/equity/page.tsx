"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import EquityChart from "@/components/charts/equity-chart"

export default function EquityPage(){

const [data,setData] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

let equity = 0

const chart = (data || []).map((t,i)=>{

equity += Number(t.pnl || 0)

return{
trade:i+1,
equity
}

})

setData(chart)

}

return(

<div style={{padding:40}}>

<h1>Equity Curve</h1>

<EquityChart data={data}/>

</div>

)

}