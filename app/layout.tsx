import "./globals.css"

export const metadata = {
  title: "Trader Journal",
  description: "Trading journal SaaS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}