import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req:Request){

try{

const body = await req.json()

const question = body.question || ""

if(!process.env.OPENAI_API_KEY){

return NextResponse.json({
error:"OPENAI_API_KEY missing"
})

}

const openai = new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"You are a professional trading coach."
},

{
role:"user",
content:question
}

]

})

return NextResponse.json({

answer:completion.choices[0].message.content

})

}catch(err:any){

console.error("AI ERROR:",err)

return NextResponse.json({

error:err.message || "AI server error"

})

}

}