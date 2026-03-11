import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const question = (body.question || "").toLowerCase()

    let answer = ""

    if(question.includes("drawdown")){
      answer = "Your drawdown may be caused by risking too much per trade. Professional traders typically risk 0.5–1% per trade."
    }

    else if(question.includes("win rate")){
      answer = "Win rate alone does not determine profitability. A strategy with a lower win rate can still be profitable with strong risk-reward."
    }

    else if(question.includes("revenge")){
      answer = "Revenge trading usually occurs after losses. Implement a rule to stop trading for 15 minutes after a losing trade."
    }

    else if(question.includes("strategy")){
      answer = "Your trading may follow a breakout structure. Consider reviewing entry timing and session volatility."
    }

    else if(question.includes("risk")){
      answer = "Professional traders control drawdown by risking a small percentage of capital per trade."
    }

    else{
      answer = "Focus on consistency, risk control, and reviewing your trades regularly."
    }

    return NextResponse.json({
      answer
    })

  } catch {

    return NextResponse.json({
      answer: "AI analysis temporarily unavailable."
    })

  }

}