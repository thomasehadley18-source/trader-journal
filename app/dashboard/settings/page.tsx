"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then((res) => setUser(res.data.user))
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="border rounded-lg p-4 max-w-lg">
        <h2 className="font-semibold mb-2">Account Information</h2>
        <p>
          <span className="text-muted-foreground">Email: </span>
          {user?.email || "—"}
        </p>
      </div>

      <div className="border rounded-lg p-4 max-w-lg">
        <h2 className="font-semibold mb-2">Account Actions</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}