import { Provider } from "../components/ui/provider";
import { ErrorBoundary } from "../components/ErrorBoundary"; // Add curly braces here
import { Toaster } from "../components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
        <Provider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}