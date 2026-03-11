import { createClient } from "@supabase/supabase-js"

export async function GET() {

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data } = await supabase
.from("strategy_marketplace")
.select("*")
.order("created_at",{ascending:false})

return Response.json(data)

}