import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { trade } = await req.json()

  const prompt = `
Analyze this trade and detect mistakes.

Return:

mistake_type
emotion
discipline_score
feedback

Trade:
${JSON.stringify(trade)}
`

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body:JSON.stringify({
        model:"gpt-4o-mini",
        messages:[
          {role:"system",content:"You are a trading psychology coach"},
          {role:"user",content:prompt}
        ]
      })
    }
  )

  const data = await response.json()

  return NextResponse.json({
    result:data.choices?.[0]?.message?.content
  })
}