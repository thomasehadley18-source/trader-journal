import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Create Supabase client ONLY during request
    const { createClient } = await import("@supabase/supabase-js")

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    return NextResponse.json({
      success: true,
      message: "MyFxBook login endpoint ready",
    })

  } catch (err) {

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )

  }
}