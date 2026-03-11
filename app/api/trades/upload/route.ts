import {createClient} from "@supabase/supabase-js"

export async function POST(req:Request){

const form=await req.formData()

const file=form.get("file") as File
const tradeId=form.get("tradeId")

const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const {data,error}=await supabase
.storage
.from("trade-images")
.upload(`${tradeId}/${file.name}`,file)

return Response.json({success:!error})

}