"use client"

import { useEffect, useState } from "react"
import { isProUser } from "@/lib/subscription"
import { Button } from "@/components/ui/button"

export function ProGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    async function check() {
      const allowed = await isProUser()
      setAllowed(allowed)
    }
    check()
  }, [])

  if (allowed === null) {
    return <div className="p-4 text-muted-foreground">Checking subscription...</div>
  }

  if (!allowed) {
    return (
      <div className="border border-border p-6 rounded-lg max-w-lg">
        <h2 className="text-2xl font-semibold">Pro Feature</h2>
        <p className="text-muted-foreground mt-2">
          This feature requires a Pro subscription.
        </p>
        <a href="/dashboard/billing">
          <Button className="mt-4 w-full">Upgrade to Pro</Button>
        </a>
      </div>
    )
  }

  return <>{children}</>
}
