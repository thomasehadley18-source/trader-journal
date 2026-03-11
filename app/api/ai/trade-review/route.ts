import OpenAI from "openai"

export async function POST(req:Request){

const {trade}=await req.json()

const openai=new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

const prompt=`
Review this trade.

Pair: ${trade.symbol}
Direction: ${trade.direction}
Entry: ${trade.entry}
Exit: ${trade.exit}
PnL: ${trade.pnl}

Give insights and mistakes.
`

const completion=await openai.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:"You are a professional trading coach."
},
{
role:"user",
content:prompt
}
]
})

return Response.json({
analysis:completion.choices[0].message.content
})

}