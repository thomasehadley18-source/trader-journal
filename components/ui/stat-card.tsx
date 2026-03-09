import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function StatCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <Card className="p-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
