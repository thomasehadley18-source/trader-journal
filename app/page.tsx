"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { RecentTrades } from "@/components/dashboard/recent-trades"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then((res) => setUser(res.data.user))
  }, [])

  return (
    <div className="space-y-8 p-6">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <RecentTrades />

    </div>
  )
}