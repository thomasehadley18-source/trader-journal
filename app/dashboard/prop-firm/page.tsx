"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { PROP_FIRMS } from "@/lib/prop-firm-rules"
import { analyzePropAccount } from "@/lib/prop-analytics"

export default function PropFirmPage(){

const [accounts,setAccounts] = useState<any[]>([])
const [analysis,setAnalysis] = useState<any[]>([])

const [firm,setFirm] = useState("FTMO")
const [size,setSize] = useState(100000)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data:accountsData} = await supabase
.from("prop_accounts")
.select("*")
.eq("user_id",user.id)

const {data:trades} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

setAccounts(accountsData || [])

const results = (accountsData || []).map(acc=>{

return analyzePropAccount(trades || [],acc)

})

setAnalysis(results)

}

async function create(){

const {data:{user}} = await supabase.auth.getUser()

const rules = PROP_FIRMS[firm]

await supabase
.from("prop_accounts")
.insert({

user_id:user?.id,

firm,

account_size:size,

profit_target:size*rules.profit_target,

daily_drawdown:size*rules.daily_drawdown,

max_drawdown:size*rules.max_drawdown,

min_trading_days:rules.min_trading_days

})

load()

}

return(

<div style={{padding:40}}>

<h1>Prop Firm Dashboard</h1>

<h2>Add Account</h2>

<select onChange={(e)=>setFirm(e.target.value)}>

{Object.keys(PROP_FIRMS).map(f=>(
<option key={f}>{f}</option>
))}

</select>

<input
type="number"
value={size}
onChange={(e)=>setSize(Number(e.target.value))}
/>

<button onClick={create}>
Add Prop Account
</button>

<h2 style={{marginTop:40}}>Accounts</h2>

{accounts.map((acc,i)=>(

<div key={acc.id} className="card">

<h3>{acc.firm}</h3>

<p>Account Size: {acc.account_size}</p>

<p>Profit Target: {acc.profit_target}</p>

<p>Daily Drawdown: {acc.daily_drawdown}</p>

<p>Max Drawdown: {acc.max_drawdown}</p>

<p>Trading Days: {analysis[i]?.tradingDays}</p>

<p>Profit Progress: {(analysis[i]?.profitProgress*100).toFixed(1)}%</p>

</div>

))}

</div>

)

}