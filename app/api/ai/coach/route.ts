import OpenAI from "openai"

export async function POST(req: Request) {

try {

const body = await req.json()

const question = body.question || ""

if(!process.env.OPENAI_API_KEY){
return Response.json({
answer:"OPENAI_API_KEY is missing from environment variables."
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
content: "You are a professional trading performance coach."
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

}catch(error){

console.error(error)

return Response.json({
answer:"AI request failed. Check server logs."
})

}

}