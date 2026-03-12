"use client"

import Sidebar from "@/components/dashboard/sidebar"

export default function DashboardLayout({
children,
}:{children:React.ReactNode}){

return(

<div style={{
display:"flex",
background:"#020817",
minHeight:"100vh",
color:"#e2e8f0"
}}>

<Sidebar/>

<div style={{
marginLeft:230,
padding:40,
width:"100%"
}}>

{children}

</div>

</div>

)

}