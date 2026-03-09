import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { notes } = await req.json()

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
          content: "You analyze trading notes and generate tags like FOMO, revenge trade, hesitation, breakout setup."
        },
        {
          role: "user",
          content: notes
        }
      ],
    }),
  })

  const data = await response.json()

  return NextResponse.json(data)
}