"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then((res) => setUser(res.data.user))
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">

        <Link href="/" className="font-bold text-xl">
          TradeJournal Pro
        </Link>

        <div className="flex items-center gap-3">

          {!user && (
            <>
              <Link href="/login" className="underline text-sm">Login</Link>
              <Link href="/register" className="underline text-sm">Register</Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="border px-3 py-1 rounded"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </header>
  )
}