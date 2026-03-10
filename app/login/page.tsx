"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  
  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {

    e.preventDefault()

    setError("")
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/dashboard")
  }

  return (

    <div style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      background:"#020617"
    }}>

      <div style={{
        width:420,
        padding:30,
        borderRadius:12,
        background:"#0f172a",
        color:"white"
      }}>

        <h2>Login</h2>

        <form onSubmit={handleLogin} style={{display:"grid",gap:12}}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {error && (
          <p style={{color:"red"}}>{error}</p>
        )}

      </div>

    </div>

  )
}