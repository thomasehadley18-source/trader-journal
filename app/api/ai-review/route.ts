import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { tradeData } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a senior institutional risk manager. Analyze the following trade and provide a score (1-10) and 3 bullet points of feedback." },
      { role: "user", content: JSON.stringify(tradeData) }
    ],
  });

  return NextResponse.json({ review: response.choices[0].message.content });
}