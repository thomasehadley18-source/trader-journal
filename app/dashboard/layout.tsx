export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h1>Trader Journal</h1>

        <div style={{ display: "flex", gap: 12 }}>
          <a href="/dashboard">Dashboard</a>
          <a href="/dashboard/trades">Trades</a>
          <a href="/dashboard/analytics">Analytics</a>
        </div>
      </div>

      {children}
    </div>
  )
}