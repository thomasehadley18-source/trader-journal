export function AssistantMessage({
  role,
  content,
}: {
  role: "assistant" | "user"
  content: string
}) {
  const isUser = role === "user"

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg px-4 py-3 rounded-lg text-sm 
          ${isUser ? "bg-primary text-primary-foreground" : "bg-muted border"}
        `}
      >
        {content}
      </div>
    </div>
  )
}
