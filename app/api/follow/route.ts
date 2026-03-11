import {createClient} from "@supabase/supabase-js"

export async function POST(req:Request){

const {userId,targetId}=await req.json()

const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

await supabase.from("followers").insert({
user_id:userId,
target_id:targetId
})

return Response.json({success:true})

}