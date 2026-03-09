export default function ConnectionsPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold">Connections</h1>

      <p className="text-muted-foreground">
        Connect platforms or import historical data.
      </p>

      <div className="space-y-4 border p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold">Connect MyFxBook</h2>
        <p className="text-sm text-muted-foreground">
          MyFxBook connection UI coming soon.
        </p>
      </div>

      <div className="space-y-4 border p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold">TradingView Webhook</h2>
        <p className="text-sm text-muted-foreground">
          TradingView webhook setup coming soon.
        </p>
      </div>

      <div className="space-y-4 border p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold">MT Import</h2>
        <p className="text-sm text-muted-foreground">
          MT4 / MT5 import coming soon.
        </p>
      </div>
    </div>
  )
}