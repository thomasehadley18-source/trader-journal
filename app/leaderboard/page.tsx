import { createClient } from "@supabase/supabase-js"

export default async function Leaderboard(){

const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const {data}=await supabase
.from("trades")
.select("user_id,pnl")

const map:any={}

data?.forEach((t:any)=>{

const pnl=Number(t.pnl ?? 0)

if(!map[t.user_id])map[t.user_id]=0

map[t.user_id]+=pnl

})

const leaderboard=Object.entries(map)
.sort((a:any,b:any)=>b[1]-a[1])

return(

<div className="container">

<h1 className="text-4xl mb-6">
Trader Leaderboard
</h1>

<div className="card">

<table className="w-full">

<thead>
<tr>
<th>Rank</th>
<th>User</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{leaderboard.map((u:any,i:number)=>(
<tr key={i}>
<td>{i+1}</td>
<td>{u[0]}</td>
<td>{u[1]}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}