import { NextResponse } from "next/server"
import { openai } from "@/lib/openai"

export async function POST(req: Request) {

try {

const body = await req.json()

const question = body.question || ""

if (!question) {
return NextResponse.json({
answer: "Ask a trading question."
})
}

const completion = await openai.chat.completions.create({

model: "gpt-4o-mini",

messages: [

{
role: "system",
content:
"You are a professional trading coach helping traders improve discipline, risk management, and strategy."
},

{
role: "user",
content: question
}

]

})

return NextResponse.json({
answer: completion.choices[0].message.content
})

} catch (error) {

console.error("AI ERROR:", error)

return NextResponse.json({
answer: "AI request failed."
})

}

}