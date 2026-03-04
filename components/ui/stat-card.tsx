import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function StatCard({
  title,
  value,
  change,
}: {
  title: string
  value: string | number
  change?: string
}) {
  return (
    <Card className="p-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground mt-1">{change}</p>}
      </CardContent>
    </Card>
  )
}
