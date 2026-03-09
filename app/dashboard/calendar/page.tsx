"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Calendar</h1>

      <Card>
        <CardHeader>
          <CardTitle>Trading Calendar Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will eventually show a heatmap of your trading activity and PnL
            across each day of the month — similar to TradeZella or Notion’s habit tracker.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
