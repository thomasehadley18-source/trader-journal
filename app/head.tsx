import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>Pro Trading Journal</title>
      <meta name="description" content="Professional trading analytics, AI trade review, and more." />
      <meta property="og:title" content="Pro Trading Journal" />
      <meta property="og:description" content="Compete with TradeZella. Institutional analytics for traders." />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ENR3GX7ZLK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ENR3GX7ZLK');
        `}
      </Script>
    </>
  );
}