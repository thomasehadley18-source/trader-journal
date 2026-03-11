import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#020817",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        {children}
      </body>
    </html>
  )
}