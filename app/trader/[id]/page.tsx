import { createClient } from "@supabase/supabase-js"

export default async function TraderProfile({params}:any){

const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const {data:trades}=await supabase
.from("trades")
.select("*")
.eq("user_id",params.id)

let pnl=0
let wins=0

trades?.forEach((t:any)=>{

const val=Number(t.pnl ?? 0)

pnl+=val

if(val>0)wins++

})

const winRate=trades?.length?((wins/trades.length)*100):0

return(

<div className="container">

<h1 className="text-4xl mb-6">
Trader Performance
</h1>

<div className="card">

<p>Total Trades: {trades?.length}</p>
<p>Total PnL: {pnl}</p>
<p>Win Rate: {winRate.toFixed(1)}%</p>

</div>

</div>

)

}