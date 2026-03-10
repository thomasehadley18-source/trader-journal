"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    console.log("LOGIN SUCCESS", data)

    // force redirect
    window.location.href = "/dashboard"
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
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
          Login
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Welcome back.
        </p>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: "16px" }}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#111827",
                color: "white",
              }}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#111827",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "16px", color: "#fca5a5" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#94a3b8" }}>
          Don’t have an account?{" "}
          <Link href="/register" style={{ color: "white", textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}