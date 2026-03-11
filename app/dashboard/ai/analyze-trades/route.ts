import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

const { userId } = await req.json()

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data: trades } = await supabase
.from("trades")
.select("*")
.eq("user_id", userId)

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

const completion = await openai.chat.completions.create({

model: "gpt-4o-mini",

messages: [

{
role: "system",
content: "You are a professional trading performance analyst."
},

{
role: "user",
content: `
Analyze this trading dataset and give performance insights.

Dataset:
${JSON.stringify(trades)}

Return:

1. Best strategy
2. Worst mistake pattern
3. Best trading session
4. Best pair
5. Risk management advice
`
}

]

})

return Response.json({
analysis: completion.choices[0].message.content
})

}