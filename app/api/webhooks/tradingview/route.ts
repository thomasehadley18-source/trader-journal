import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { calculateTradeSessions } from "@/lib/sessions"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get("user")
    const key = url.searchParams.get("key")

    if (!userId || !key) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      )
    }

    const { data: userData, error: userError } = await supabase
      .from("trade_accounts")
      .select("*")
      .eq("user_id", userId)
      .eq("provider", "tradingview")
      .single()

    if (userError || !userData || userData.api_key !== key) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const payload = await req.json()

    await supabase.from("tv_webhook_logs").insert({
      user_id: userId,
      payload,
    })

    const pair = payload.symbol || payload.pair || payload.ticker
    const direction = payload.side || payload.direction || payload.order || "Buy"
    const entry = Number(payload.entry || payload.price || payload.open)
    const exit = Number(payload.exit || payload.close || entry)
    const lot = Number(payload.size || payload.qty || payload.volume || 1)
    const pnl = Number(payload.pnl || 0)

    const now = new Date().toISOString()
    const sessions = calculateTradeSessions(now, now)

    await supabase.from("trades").insert({
      user_id: userId,
      pair,
      direction,
      entry,
      exit,
      lot_size: lot,
      pnl,
      import_source: "tradingview",
      raw_payload: payload,
      session_open: sessions.session_open,
      session_close: sessions.session_close,
      sessions_active: sessions.sessions_active,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Webhook error:", err)

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}