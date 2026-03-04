import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { supabase } from "@/lib/supabase"

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const protectedPaths = ["/dashboard"]

  const isProtected = protectedPaths.some((p) => path.startsWith(p))

  if (isProtected) {
    const supa = supabase.auth

    const { data } = await supa.getSession()

    if (!data.session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
