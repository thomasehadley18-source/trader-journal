import Sidebar from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="content">{children}</main>
    </div>
  )
}