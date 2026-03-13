import { supabase } from "@/lib/supabase"

export async function POST(req:Request){

const body = await req.json()

const {follower_id,following_id} = body

const {error} = await supabase
.from("follows")
.insert({
follower_id,
following_id
})

if(error){
return Response.json({error:error.message},{status:400})
}

return Response.json({success:true})

}