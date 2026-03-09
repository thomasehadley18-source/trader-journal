import { NextResponse } from "next/server"
import { myfxbookGetHistory } from "@/lib/myfxbook"
import { calculateTradeSessions } from "@/lib/sessions"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { userId, accountId } = await req.json()

  const { data } = await supabase
    .from("myfxbook_accounts")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (!data) {
    return NextResponse.json({ success: false, error: "No linked MyFxBook account" })
  }

  const history = await myfxbookGetHistory(
    data.myfxbook_session,
    accountId
  )

  if (!history.history) {
    return NextResponse.json({ success: false, error: "No history returned" })
  }

  for (const trade of history.history) {
    const sessionData = calculateTradeSessions(
      trade.openTime,
      trade.closeTime
    )

    await supabase.from("trades").upsert({
      user_id: userId,
      external_trade_id: trade.ticket,
      pair: trade.symbol,
      direction: trade.type,
      entry: trade.openPrice,
      exit: trade.closePrice,
      lot_size: trade.lots,
      pnl: trade.profit,
      import_source: "myfxbook",
      raw_payload: trade,
      session_open: sessionData.session_open,
      session_close: sessionData.session_close,
      sessions_active: sessionData.sessions_active,
    })
  }

  return NextResponse.json({
    success: true,
    imported: history.history.length,
  })
}
