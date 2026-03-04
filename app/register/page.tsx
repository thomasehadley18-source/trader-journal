"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { AuthCard } from "@/components/auth/auth-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Account created! You can now log in.")
    router.push("/login")
  }

  return (
    <AuthCard title="Create an Account">
      <div className="space-y-4">

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

        <Button className="w-full" onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?
          <a href="/login" className="text-primary underline ml-1">Login</a>
        </p>
      </div>
    </AuthCard>
  )
}
