import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-md mx-auto mt-20 p-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
