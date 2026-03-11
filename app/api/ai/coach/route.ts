import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

const body = await req.json()

const { question,userId } = body

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const {data:trades} = await supabase
.from("trades")
.select("*")
.eq("user_id",userId)
.limit(100)

const openai = new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"You are an elite trading performance coach."
},

{
role:"user",
content:`
User question:

${question}

Trading data:

${JSON.stringify(trades)}
`
}

]

})

return Response.json({
answer:completion.choices[0].message.content
})

}