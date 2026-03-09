import { MyFxBookConnect } from "@/components/import/myfxbook-connect"

export default function ConnectionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Connections</h1>
      <p className="text-muted-foreground">
        Connect your trading accounts to enable automatic trade imports.
      </p>

      <MyFxBookConnect />
    </div>
  )
}
