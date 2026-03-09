"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TradingViewWebhook() {
  const [secret, setSecret] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("trade_accounts")
      .select("*")
      .eq("user_id", user?.id)
      .eq("provider", "tradingview")
      .maybeSingle()

    if (data?.api_key) {
      setSecret(data.api_key)
    }
  }

  async function generateKey() {
    const newKey = Math.random().toString(36).substring(2, 15)

    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from("trade_accounts").upsert({
      user_id: user?.id,
      provider: "tradingview",
      api_key: newKey,
    })

    setSecret(newKey)
    setStatus("Secret key generated!")
  }

  const webhookUrl = secret
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/tradingview?user=USER_ID&key=${secret}`
    : ""

  return (
    <div className="space-y-4 border p-6 rounded-lg max-w-md">
      <h2 className="text-xl font-semibold">TradingView Webhook</h2>

      {!secret && (
        <Button onClick={generateKey} className="w-full">
          Generate Webhook Key
        </Button>
      )}

      {secret && (
        <>
          <div className="space-y-2">
            <Label>Your Secret Key</Label>
            <Input value={secret} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <Input value={webhookUrl} readOnly />
          </div>

          <p className="text-sm text-muted-foreground">
            Use this URL in TradingView alert settings.
          </p>

          <p className="text-xs text-muted-foreground">
            Replace USER_ID with your actual user ID
            (I can automate this for you if you want).
          </p>
        </>
      )}

      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  )
}
