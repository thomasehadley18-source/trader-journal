import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

const body = await req.json()

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { title, description, price, userId } = body

const { error } = await supabase
.from("strategy_marketplace")
.insert({
title,
description,
price,
user_id: userId
})

if (error) {
return Response.json({ error: error.message }, { status: 500 })
}

return Response.json({ success: true })

}