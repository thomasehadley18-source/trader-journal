import OpenAI from "openai"

export async function POST(req:Request){

try{

const body=await req.json()

const trade=body.trade

const client=new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

const prompt=`

You are a professional trading coach.

Analyze this trade and provide feedback.

Symbol: ${trade.symbol}
Entry: ${trade.entry}
Exit: ${trade.exit}
PNL: ${trade.pnl}
Strategy: ${trade.strategy || "unknown"}
Notes: ${trade.notes || ""}

Respond with:

1. What was good about the trade
2. What could be improved
3. Risk management feedback
4. Psychological observations

Keep response concise.
`

const completion=await client.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"user",
content:prompt
}
]

})

return Response.json({
feedback:completion.choices[0].message.content
})

}catch(e){

return Response.json({
error:"AI analysis failed"
})

}

}