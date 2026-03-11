import OpenAI from "openai"

export async function POST(req:Request){

try{

const body = await req.json()

const openai = new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You analyze trading performance."
},
{
role:"user",
content:JSON.stringify(body.trades)
}
]

})

return Response.json({
analysis:completion.choices[0].message.content
})

}catch(err){

return Response.json({
error:"AI analysis failed"
},{status:500})

}

}