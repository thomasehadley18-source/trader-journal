"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SessionAnalytics } from "./session-analytics"

export function SessionTabs() {
  const [session, setSession] = useState("All")

  return (
    <Tabs value={session} onValueChange={setSession} className="w-full">

      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="All">All Sessions</TabsTrigger>
        <TabsTrigger value="Asia">Asia</TabsTrigger>
        <TabsTrigger value="London">London</TabsTrigger>
        <TabsTrigger value="New York">New York</TabsTrigger>
      </TabsList>

      <TabsContent value={session}>
        <SessionAnalytics session={session} />
      </TabsContent>

    </Tabs>
  )
}
