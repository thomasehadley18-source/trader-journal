"use client"

import { useState } from "react"
import { AssistantMessage } from "./assistant-message"
import { AssistantInput } from "./assistant-input"
import { openai } from "@/lib/openai"

export function AssistantPanel() {
  const [messages, setMessages] = useState<
    { role: "assistant" | "user"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI trading assistant. Paste a trade, ask a question, or tell me what’s happening — I’ll help you analyze it.",
    },
  ])

  async function send(msg: string) {
    // Add user message
    setMessages((m) => [...m, { role: "user", content: msg }])

    // Call OpenAI
    const response = await fetch("/api/ai/assistant", {
      method: "POST",
      body: JSON.stringify({ messages: [...messages, { role: "user", content: msg }] }),
    })

    const data = await response.json()

    // Add assistant reply
    setMessages((m) => [...m, { role: "assistant", content: data.reply }])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((m, i) => (
          <AssistantMessage key={i} role={m.role} content={m.content} />
        ))}
      </div>

      <AssistantInput onSend={send} />
    </div>
  )
}
