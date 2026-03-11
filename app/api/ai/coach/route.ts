import OpenAI from "openai"

export async function POST(req: Request) {

try {

const body = await req.json()

const question = body.question || ""

if (!process.env.OPENAI_API_KEY) {
return Response.json({
answer: "OpenAI API key missing."
})
}

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

const completion = await openai.chat.completions.create({

model: "gpt-4o-mini",

messages: [
{
role: "system",
content: "You are an expert trading coach helping traders improve discipline, risk management and strategy."
},
{
role: "user",
content: question
}
]

})

return Response.json({
answer: completion.choices[0].message.content
})

} catch (err) {

console.error(err)

return Response.json({
answer: "AI request failed."
})

}

}