import Navbar from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  )
}
