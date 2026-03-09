"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MyFxBookConnect() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  async function connect() {
    setStatus("Connecting...")

    const { data: { user } } = await supabase.auth.getUser()

    const res = await fetch("/api/import/myfxbook/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        userId: user?.id,
      }),
    })

    const data = await res.json()

    if (data.success) {
      setStatus("Connected successfully! Fetching accounts...")
    } else {
      setStatus("Error: " + data.error)
    }
  }

  return (
    <div className="space-y-4 border p-6 rounded-lg max-w-md">
      <h2 className="text-xl font-semibold">Connect MyFxBook</h2>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button onClick={connect} className="w-full">
        Connect MyFxBook
      </Button>

      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  )
}
