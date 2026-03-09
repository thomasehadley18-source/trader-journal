import { MyFxBookConnect } from "@/components/import/myfxbook-connect"
import { TradingViewWebhook } from "@/components/import/tradingview-webhook"
import { MTImport } from "@/components/import/mt-import"

export default function ConnectionsPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold">Connections</h1>
      <p className="text-muted-foreground">
        Connect platforms or import historical data.
      </p>

      <MyFxBookConnect />

      <TradingViewWebhook />

      <MTImport />
    </div>
  )
}
