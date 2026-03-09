"use client"

import { useState } from "react"
import { AssistantMessage } from "./assistant-message"
import { AssistantInput } from "./assistant-input"

export function AssistantPanel() {
  const [messages, setMessages] = useState<
    { role: "assistant" | "user"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I’m your AI trading coach. Paste a trade or ask me anything about psychology, discipline, entries, exits, or performance.",
    },
  ])

  async function send(msg: string) {
    setMessages((m) => [...m, { role: "user", content: msg }])

    const res = await fetch("/api/ai/assistant", {
      method: "POST",
      body: JSON.stringify({ messages: [...messages, { role: "user", content: msg }] }),
    })

    const data = await res.json()

    setMessages((m) => [...m, { role: "assistant", content: data.reply }])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((m, i) => (
          <AssistantMessage key={i} role={m.role} content={m.content} />
        ))}
      </div>

      {/* Input */}
      <AssistantInput onSend={send} />
    </div>
  )
}
