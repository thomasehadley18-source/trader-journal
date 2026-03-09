"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function ProStatus() {
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle()

    setStatus(data?.status || "none")
  }

  if (status === "active") {
    return (
      <div className="border border-green-600/40 bg-green-600/10 text-green-400 p-4 rounded-lg max-w-lg">
        <p className="font-medium">You are a Pro Member 🎉</p>
        <p className="text-sm mt-1">Full access to all premium features.</p>
      </div>
    )
  }

  return (
    <div className="border border-border p-4 rounded-lg max-w-lg">
      <p className="font-medium">You are on the Free Plan</p>
      <p className="text-sm text-muted-foreground mt-1">
        Upgrade to unlock advanced analytics, AI tools, and unlimited journaling.
      </p>
    </div>
  )
}
