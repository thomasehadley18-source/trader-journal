"use client"

import Sidebar from "@/components/dashboard/sidebar"

export default function Layout({
children
}:{children:React.ReactNode}){

return(

<div style={{

display:"flex",
minHeight:"100vh"

}}>

<div style={{

width:230,
flexShrink:0

}}>

<Sidebar/>

</div>

<div style={{

flex:1,
padding:20

}}>

{children}

</div>

</div>

)

}