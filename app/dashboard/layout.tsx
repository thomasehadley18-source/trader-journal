"use client"

import Sidebar from "@/components/dashboard/sidebar"
import Link from "next/link"

const mobileLinks=[
{href:"/dashboard",label:"Dashboard"},
{href:"/dashboard/trades",label:"Trades"},
{href:"/dashboard/import",label:"Import"},
{href:"/dashboard/analytics",label:"Analytics"},
{href:"/dashboard/ai",label:"AI"},
{href:"/strategy-marketplace",label:"Market"}
]

export default function DashboardLayout({
children
}:{children:React.ReactNode}){

return(

<div className="page-wrap">

<Sidebar/>

<main className="main-shell">

<div className="mobile-nav">
{mobileLinks.map(link=>(
<Link key={link.href} href={link.href}>
{link.label}
</Link>
))}
</div>

{children}

</main>

</div>

)

}