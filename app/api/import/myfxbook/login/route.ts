import { NextResponse } from "next/server"
import { myfxbookLogin, saveMyFxBookSession } from "@/lib/myfxbook"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email, password, userId } = await req.json()

  try {
    const sessionToken = await myfxbookLogin(email, password)

    await saveMyFxBookSession(userId, sessionToken)

    return NextResponse.json({ success: true, session: sessionToken })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}
