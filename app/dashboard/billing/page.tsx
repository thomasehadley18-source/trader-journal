"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ProStatus } from "@/components/pro/pro-status"

export default function BillingPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then((res) => setUser(res.data.user))
  }, [])

  async function upgrade() {
    if (!user) return

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
      }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <ProStatus />

      <div className="border border-border p-6 rounded-lg space-y-4 max-w-lg">
        <h2 className="text-xl font-medium">Upgrade to Pro</h2>

        <p className="text-muted-foreground">
          Unlock advanced analytics, AI journaling, unlimited trades, and more.
        </p>

        <Button onClick={upgrade} className="w-full">
          Subscribe — $19/month
        </Button>
      </div>
    </div>
  )
}
