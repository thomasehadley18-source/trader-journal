import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { trade } = await req.json()

  const prompt = `
You are a professional trading coach.

Analyze this trade and return JSON with:

mistakes
strategy
setup_quality
risk_management
psychology
improvement

Trade:
${JSON.stringify(trade)}
`

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert trading performance analyst."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    }
  )

  const data = await response.json()

  const message = data.choices?.[0]?.message?.content

  return NextResponse.json({
    analysis: message
  })
}