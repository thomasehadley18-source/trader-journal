import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI not configured" }, { status: 500 })
  }

  try {

    const { message } = await req.json()

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a professional trading coach." },
          { role: "user", content: message }
        ]
      })
    })

    const data = await response.json()

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    })

  } catch (err: any) {

    return NextResponse.json({ error: err.message }, { status: 500 })

  }

}