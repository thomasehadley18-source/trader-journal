import {createClient} from "@supabase/supabase-js"

export async function POST(req:Request){

const form=await req.formData()

const file=form.get("file") as File

const text=await file.text()

const rows=text.split("\n")

const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

for(const r of rows.slice(1)){

const cols=r.split(",")

if(cols.length<6)continue

await supabase.from("trades").insert({

symbol:cols[0],
direction:cols[1],
entry:Number(cols[2]),
exit:Number(cols[3]),
pnl:Number(cols[4]),
trade_date:cols[5]

})

}

return Response.json({
message:"Trades imported"
})

}