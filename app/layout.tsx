import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const metadata = {
  title: "Pro Trading Journal",
  description: "Professional trading analytics, AI trade review, and more.",
  openGraph: {
    title: "Pro Trading Journal",
    description: "Compete with TradeZella. Institutional analytics for traders.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ChakraProvider>
      </body>
    </html>
  );
}