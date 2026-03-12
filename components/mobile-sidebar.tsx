"use client"

import Sidebar from "@/components/sidebar"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function MobileSidebar(){

return (

<Sheet>

<SheetTrigger asChild>

<Button
variant="outline"
size="icon"
className="md:hidden"
>

<Menu size={20} />

</Button>

</SheetTrigger>

<SheetContent side="left" className="p-0 w-64">

<Sidebar />

</SheetContent>

</Sheet>

)

}