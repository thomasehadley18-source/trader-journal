"use client"

import Link from "next/link"
import ModeToggle from "@/components/mode-toggle"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

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
    <header className="border-b border-border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        
        <div className="lg:hidden">
          <MobileSidebar />
        </div>

        <Link href="/" className="font-semibold text-xl">
          TradeJournal Pro
        </Link>

        <div className="flex items-center gap-4">

          <ModeToggle />

          {!user && (
            <>
              <Link href="/login" className="text-sm underline">Login</Link>
              <Link href="/register" className="text-sm underline">Register</Link>
            </>
          )}

          {user && (
            <Button variant="secondary" onClick={logout}>Logout</Button>
          )}
        </div>
      </div>
    </header>
  )
}
