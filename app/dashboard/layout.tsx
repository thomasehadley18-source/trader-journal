import Sidebar from "@/components/sidebar"

export default function DashboardLayout({
children,
}:{
children:React.ReactNode
}){

return(

<div className="dashboard">

<div className="sidebar">
<Sidebar/>
</div>

<div className="content">
{children}
</div>

</div>

)

}