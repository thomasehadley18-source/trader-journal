"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PerformancePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Performance</h1>

      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will show advanced metrics like R-multiples, drawdown analysis,
            equity behavior, and session performance.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upgrade Potential</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Want a TradeZella-style performance analyzer? I can build it in the next batch.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
