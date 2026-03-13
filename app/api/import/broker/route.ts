import { supabase } from "@/lib/supabase"

export async function POST(req:Request){

try{

const body = await req.json()

const {
user_id,
pair,
side,
entry,
exit,
lot,
pnl,
trade_date
} = body

const {error} = await supabase
.from("trades")
.insert({
user_id,
pair,
side,
entry,
exit,
lot,
pnl,
trade_date
})

if(error){
return Response.json({error:error.message},{status:400})
}

return Response.json({success:true})

}catch(e){

return Response.json({error:"Import failed"},{status:500})

}

}