import { supabase } from "@/lib/supabase"

export async function GET(){

const {data,error} = await supabase
.from("trades")
.select("*")
.order("trade_date",{ascending:false})
.limit(50)

if(error){
return Response.json({error:error.message},{status:400})
}

return Response.json(data)

}