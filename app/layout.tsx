import "./globals.css"

export const metadata = {
  title: "Trader Journal",
  description: "Professional trading journal platform"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

return (

<html lang="en">

<body className="bg-slate-950 text-slate-200">

{children}

</body>

</html>

)

}