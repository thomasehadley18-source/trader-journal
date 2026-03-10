import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  try {
    const payload = await req.json()

    const userId = payload.userId || payload.user_id || null
    const pair = payload.symbol || payload.pair || payload.ticker || ""
    const direction = payload.side || payload.direction || payload.order || "Buy"
    const entry = Number(payload.entry || payload.price || payload.open || 0)
    const exit = Number(payload.exit || payload.close || entry || 0)
    const lotSize = Number(payload.size || payload.qty || payload.volume || 1)
    const pnl = Number(payload.pnl || 0)

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing userId" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("trades").insert({
      user_id: userId,
      trade_date: new Date().toISOString(),
      pair,
      direction,
      entry,
      exit,
      lot_size: lotSize,
      pnl,
      import_source: "tradingview",
      raw_payload: payload,
      sessions_active: [],
    })

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}