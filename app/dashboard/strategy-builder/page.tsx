"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategyBuilderPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [rules, setRules] = useState("")
  const [price, setPrice] = useState("0")
  const [saving, setSaving] = useState(false)

  async function createStrategy() {
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaving(false)
      return
    }

    await supabase.from("strategies").insert({
      user_id: user.id,
      name,
      description,
      rules,
      price: Number(price || 0),
      created_at: new Date().toISOString(),
    })

    setName("")
    setDescription("")
    setRules("")
    setPrice("0")
    setSaving(false)
  }

  return (
    <div>
      <h1>Strategy Builder</h1>

      <div className="card" style={{ maxWidth: 800 }}>
        <label className="muted">Strategy Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label className="muted">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="muted">Rules</label>
        <textarea
          rows={6}
          value={rules}
          onChange={(e) => setRules(e.target.value)}
        />

        <label className="muted">Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={createStrategy} style={{ marginTop: 12 }}>
          {saving ? "Saving..." : "Create Strategy"}
        </button>
      </div>
    </div>
  )
}