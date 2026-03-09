export default function StatCard({
  label,
  value,
}: {
  label: string
  value: any
}) {
  return (
    <div className="border rounded p-4">

      <div className="text-sm text-muted-foreground">
        {label}
      </div>

      <div className="text-2xl font-semibold">
        {value}
      </div>

    </div>
  )
}