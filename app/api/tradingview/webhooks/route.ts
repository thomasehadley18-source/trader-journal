import { supabase } from "@/lib/supabase"

export async function POST(req:Request){

const body = await req.json()

const trade = {
instrument: body.symbol,
side: body.side,
size: body.size,
entry: body.entry,
exit: body.exit,
pnl: body.pnl,
user_id: body.user_id
}

await supabase
.from("trades")
.insert(trade)

return Response.json({success:true})

}
