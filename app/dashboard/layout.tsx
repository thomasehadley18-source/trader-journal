export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

<div className="min-h-screen bg-bg text-white">

<nav className="flex justify-between p-6 border-b border-border">

<h1 className="text-xl font-bold">
Trader Journal
</h1>

<div className="flex gap-6">

<a href="/dashboard">Dashboard</a>
<a href="/dashboard/trades">Trades</a>
<a href="/dashboard/analytics">Analytics</a>
<a href="/dashboard/ai">AI Coach</a>

</div>

</nav>

<div className="container">

{children}

</div>

</div>

  )
}