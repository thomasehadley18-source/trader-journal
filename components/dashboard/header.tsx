"use client"

import { supabase } from "@/lib/supabase"

export default function DashboardHeader() {
  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div>
        <div className="muted">Trader Journal</div>
        <h1 style={{ marginTop: 6 }}>Dashboard</h1>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  )
}