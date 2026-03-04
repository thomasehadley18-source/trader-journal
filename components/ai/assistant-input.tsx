"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendHorizonal } from "lucide-react"

export function AssistantInput({ onSend }: { onSend: (msg: string) => void }) {
  const [msg, setMsg] = useState("")

  function submit() {
    if (!msg.trim()) return
    onSend(msg)
    setMsg("")
  }

  return (
    <div className="flex gap-2 border-t border-border pt-4">
      <Input
        placeholder="Ask the AI assistant about your trading..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <Button onClick={submit}>
        <SendHorizonal className="w-4 h-4" />
      </Button>
    </div>
  )
}
