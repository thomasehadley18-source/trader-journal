import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const payload = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const {
    userId,
    symbol,
    direction,
    entry,
    exit,
    pnl
  } = payload

  await supabase.from("trades").insert({
    user_id: userId,
    symbol,
    direction,
    entry,
    exit,
    pnl,
    import_source: "tradingview",
    trade_date: new Date().toISOString()
  })

  return Response.json({
    success: true
  })

}