import { NextResponse } from "next/server"
import { openai } from "@/lib/openai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a professional trading psychologist and performance coach. Provide actionable, concise, and insightful advice on trading mistakes, mindset, patterns, and performance improvement. Be supportive, direct, and clear.",
      },
      ...messages,
    ],
    temperature: 0.7,
  })

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  })
}
