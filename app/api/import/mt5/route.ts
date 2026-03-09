import { NextResponse } from "next/server"
import { parseMTCSV } from "@/lib/mt-parser"
import { calculateTradeSessions } from "@/lib/sessions"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const userId = formData.get("userId") as string

  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" })
  }

  const csv = await file.text()
  const trades = parseMTCSV(csv)

  for (const t of trades) {
    const sessionData = calculateTradeSessions(t.openTime, t.closeTime)

    await supabase.from("trades").upsert({
      user_id: userId,
      external_trade_id: t.ticket,
      pair: t.symbol,
      direction: t.direction,
      entry: t.entry,
      exit: t.exit,
      lot_size: t.lots,
      pnl: t.pnl,
      import_source: "mt5",
      raw_payload: t.raw,
      session_open: sessionData.session_open,
      session_close: sessionData.session_close,
      sessions_active: sessionData.sessions_active,
    })
  }

  return NextResponse.json({
    success: true,
    imported: trades.length,
  })
}
