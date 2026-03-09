import "./globals.css"

export const metadata = {
  title: "Trader Journal",
  description: "Track your trades and analyze performance",
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