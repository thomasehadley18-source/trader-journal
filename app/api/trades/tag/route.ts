import { createClient } from "@supabase/supabase-js"
import { autoTagTrade } from "@/lib/trade-tags"

export async function POST(req:Request){

const body = await req.json()

const {tradeId} = body

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const {data:trade} = await supabase
.from("trades")
.select("*")
.eq("id",tradeId)
.single()

const tags = autoTagTrade(trade)

await supabase
.from("trades")
.update({tags})
.eq("id",tradeId)

return Response.json({tags})

}