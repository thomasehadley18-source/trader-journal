import OpenAI from "openai"

export async function POST(req:Request){

const {question}=await req.json()

const openai=new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

const completion=await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You are a professional trading performance coach."
},
{
role:"user",
content:question
}
]

})

return Response.json({
answer:completion.choices[0].message.content
})

}