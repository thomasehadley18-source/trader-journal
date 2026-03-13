import Sidebar from "@/components/sidebar"
import DashboardHeader from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div style={{ flex: 1 }}>
        <div className="content">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </div>
  )
}