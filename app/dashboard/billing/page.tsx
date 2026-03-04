"use client"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default function BillingPage() {
  async function upgrade() {
    const { data: { user } } = await supabase.auth.getUser()

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        email: user?.email,
      }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Billing</h1>
      <p className="text-muted-foreground">Unlock all pro features.</p>

      <Button onClick={upgrade} className="w-48">
        Upgrade — $19/month
      </Button>
    </div>
  )
}
