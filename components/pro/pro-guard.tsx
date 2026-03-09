"use client"

import { useEffect, useState } from "react"
import { isProUser } from "@/lib/subscription"
import { Button } from "@/components/ui/button"

export function ProGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    async function check() {
      setAllowed(await isProUser())
    }
    check()
  }, [])

  if (allowed === null) {
    return <div className="p-4 text-muted-foreground">Checking subscription...</div>
  }

  if (!allowed) {
    return (
      <div className="border border-border rounded-lg p-6 space-y-3 max-w-md">
        <h2 className="text-xl font-semibold">Pro Feature</h2>
        <p className="text-muted-foreground">
          This feature is available only to Pro members.
        </p>
        <a href="/dashboard/billing">
          <Button className="w-full">Upgrade to Pro</Button>
        </a>
      </div>
    )
  }

  return <>{children}</>
}
