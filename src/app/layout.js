import "./globals.css";
import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";

export const metadata = {
  title: "Crypto News | bitlinks.in",
  description: "Stay updated with the latest Crypto news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3942329473861458"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CQVX3HV87S"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CQVX3HV87S');
            `,
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
