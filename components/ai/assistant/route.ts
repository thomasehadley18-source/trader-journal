import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a professional trading psychologist & performance coach. Give concise, actionable insights about trading discipline, mistakes, emotions, and improvement.",
      },
      ...messages,
    ],
    temperature: 0.8,
  })

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  })
}
