"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function login() {

    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      window.location.href = "/dashboard"
      return
    }

    setMessage("Login failed.")
    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020817",
        color: "white",
        padding: "24px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          padding: "24px"
        }}
      >

        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Login</h1>

        <p style={{ color: "#94a3b8", marginBottom: 20 }}>
          Welcome back.
        </p>

        <div style={{ display: "grid", gap: 16 }}>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #334155",
                background: "#111827",
                color: "white"
              }}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #334155",
                background: "#111827",
                color: "white"
              }}
            />
          </div>

          <button
            onClick={login}
            disabled={loading}
            style={{
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {message && (
          <p style={{ marginTop: 16, color: "#f87171" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: 20, color: "#94a3b8" }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "white", textDecoration: "underline" }}>
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}