import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const supabase = createClient(url, key)

  try {

    const payload = await req.json()

    await supabase.from("trades").insert({
      user_id: payload.userId,
      pair: payload.symbol,
      direction: payload.side,
      entry: payload.entry,
      exit: payload.exit,
      pnl: payload.pnl,
      import_source: "tradingview",
      raw_payload: payload
    })

    return NextResponse.json({ success: true })

  } catch {

    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 })

  }

}