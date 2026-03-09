import { SessionTabs } from "@/components/sessions/session-tabs"

export default function SessionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Session Analytics</h1>
      <p className="text-muted-foreground">
        Analyze your performance across Asia, London, and New York sessions.
      </p>

      <SessionTabs />
    </div>
  )
}
