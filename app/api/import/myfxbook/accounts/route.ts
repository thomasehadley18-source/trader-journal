import { NextResponse } from "next/server"
import { myfxbookGetAccounts } from "@/lib/myfxbook"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { userId } = await req.json()

  const { data } = await supabase
    .from("myfxbook_accounts")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (!data) {
    return NextResponse.json({ success: false, error: "No MyFxBook session found" })
  }

  const accounts = await myfxbookGetAccounts(data.myfxbook_session)

  return NextResponse.json({ success: true, accounts })
}
