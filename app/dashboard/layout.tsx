"use client"

import Sidebar from "@/components/dashboard/sidebar"

export default function DashboardLayout({children}:any){

return(

<div
style={{
display:"flex"
}}
>

<Sidebar/>

<div
style={{
marginLeft:240,
padding:30,
width:"100%"
}}
>

{children}

</div>

</div>

)

}