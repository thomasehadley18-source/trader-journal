"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MTImport() {
  const [status, setStatus] = useState("")
  const [file, setFile] = useState<File | null>(null)

  async function upload(type: "mt4" | "mt5") {
    if (!file) {
      setStatus("No file selected")
      return
    }

    const { data: { user } } = await supabase.auth.getUser()

    const form = new FormData()
    form.append("file", file)
    form.append("userId", user?.id || "")

    const res = await fetch(`/api/import/${type}`, {
      method: "POST",
      body: form,
    })

    const json = await res.json()

    if (json.success) {
      setStatus(`Imported ${json.imported} trades successfully!`)
    } else {
      setStatus(`Error: ${json.error}`)
    }
  }

  return (
    <div className="space-y-4 border p-6 rounded-lg max-w-md">
      <h2 className="text-xl font-semibold">Import MT4 / MT5 Trades</h2>

      <div className="space-y-2">
        <Label>Select CSV File</Label>
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>

      <div className="flex gap-3">
        <Button className="w-full" onClick={() => upload("mt4")}>
          Import MT4
        </Button>
        <Button className="w-full" onClick={() => upload("mt5")}>
          Import MT5
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  )
}
