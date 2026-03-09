import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { calculateTradeSessions } from "@/lib/sessions"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// The user will include ?user=USER_ID&key=SECRET in the webhook URL
export async function POST(req: Request) {
  // Extract query params
  const url = new URL(req.url)
  const userId = url.searchParams.get("user")
  const key = url.searchParams.get("key")

  if (!userId || !key) {
    return NextResponse.json({ success: false, error: "Missing parameters" })
  }

  // Validate user secret
  const { data: userData } = await supabase
    .from("trade_accounts")
    .select("*")
    .eq("user_id", userId)
    .eq("provider", "tradingview")
    .single()

  if (!userData || userData.api_key !== key) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  // Parse TradingView payload
  const payload = await req.json()

  // Log raw webhook payload
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

  // Save trade
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
}
