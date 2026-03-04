import { StatCard } from "@/components/ui/stat-card"

export function StatGrid({ stats }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Total Trades" value={stats.totalTrades} />
      <StatCard title="Win Rate" value={`${stats.winRate}%`} />
      <StatCard title="Avg Win" value={stats.avgWin} />
      <StatCard title="Avg Loss" value={stats.avgLoss} />
    </div>
  )
}
