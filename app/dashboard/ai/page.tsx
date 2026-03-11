"use client"

import { useState } from "react"

export default function AIPage() {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  async function askAI() {

    setLoading(true)
    setAnswer("")

    try {

      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      })

      const data = await res.json()

      if (data.answer) {
        setAnswer(data.answer)
      } else {
        setAnswer("AI returned no response.")
      }

    } catch {
      setAnswer("AI server unavailable.")
    }

    setLoading(false)
  }

  return (

    <div style={{ padding: 40 }}>

      <h1 style={{ fontSize: 30, marginBottom: 20 }}>
        AI Trading Coach
      </h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something about your trading..."
        style={{
          width: "100%",
          height: 120,
          marginBottom: 20
        }}
      />

      <button onClick={askAI}>
        {loading ? "Analyzing..." : "Ask AI"}
      </button>

      {answer && (

        <div
          style={{
            marginTop: 30,
            padding: 20,
            background: "#0f172a",
            borderRadius: 10
          }}
        >

          <h3 style={{ marginBottom: 10 }}>
            AI Response
          </h3>

          <p>{answer}</p>

        </div>

      )}

    </div>

  )
}