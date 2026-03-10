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

    await supabase.from("trades").insert(payload)

    return NextResponse.json({ success: true })

  } catch {

    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  }

}