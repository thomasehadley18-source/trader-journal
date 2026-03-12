import { supabase } from "@/lib/supabase"

export async function POST(req:Request){

const body = await req.json()

const {
pair,
pnl,
trade_date
} = body

const { data:{ user } } = await supabase.auth.getUser()

if(!user){

return Response.json({
error:"User not authenticated"
},{status:401})

}

await supabase
.from("trades")
.insert({
user_id:user.id,
pair,
pnl:Number(pnl),
trade_date
})

return Response.json({
success:true
})

}