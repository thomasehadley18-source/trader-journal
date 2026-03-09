"use client"

import { useState } from "react"

export default function MyFxBookConnect() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/import/myfxbook-connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || "Failed to connect MyFxBook")
      } else {
        setMessage("MyFxBook connected successfully.")
      }
    } catch {
      setMessage("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 border p-6 rounded-lg max-w-md">
      <h2 className="text-xl font-semibold">Connect MyFxBook</h2>

      <form onSubmit={handleConnect} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="MyFxBook password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="border rounded px-4 py-2"
        >
          {loading ? "Connecting..." : "Connect"}
        </button>
      </form>

      {message && <p className="text-sm">{message}</p>}
    </div>
  )
}