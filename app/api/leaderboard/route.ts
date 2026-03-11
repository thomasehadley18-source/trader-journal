import { createClient } from "@supabase/supabase-js"

export async function GET(){

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data:trades } = await supabase
.from("trades")
.select("*")

const map:any = {}

trades?.forEach((t)=>{

if(!map[t.user_id]){

map[t.user_id] = {
user_id:t.user_id,
trades:0,
wins:0,
pnl:0
}

}

map[t.user_id].trades++

const pnl = Number(t.pnl)

map[t.user_id].pnl += pnl

if(pnl>0){
map[t.user_id].wins++
}

})

const leaderboard = Object.values(map).map((t:any)=>({

user_id:t.user_id,

trades:t.trades,

winRate:((t.wins/t.trades)*100).toFixed(1),

pnl:t.pnl

}))

leaderboard.sort((a:any,b:any)=>b.pnl-a.pnl)

return Response.json(leaderboard)

}