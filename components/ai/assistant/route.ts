import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      )
    }

    const openai = new OpenAI({ apiKey })

    const body = await req.json().catch(() => ({}))
    const message =
      body?.message ||
      "Give concise trading assistant feedback."

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a trading journal assistant. Give practical, concise, risk-aware trading feedback.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    })

    const reply =
      completion.choices?.[0]?.message?.content || "No response generated."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("AI assistant route error:", error)

    return NextResponse.json(
      { error: "Failed to generate assistant response" },
      { status: 500 }
    )
  }
}