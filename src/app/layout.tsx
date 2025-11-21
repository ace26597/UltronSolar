import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultron Solar - Clean Energy Solutions",
  description: "Leading solar energy solutions provider. Save money and reduce your carbon footprint with our premium solar installations.",
  keywords: "solar energy, solar panels, renewable energy, clean energy, solar installation",
  openGraph: {
    title: "Ultron Solar - Clean Energy Solutions",
    description: "Leading solar energy solutions provider. Save money and reduce your carbon footprint.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Ultron Solar",
              "description": "Leading solar energy solutions provider",
              "url": "https://ultronsolar.in",
              "telephone": "+91-XXXXXXXXXX",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "priceRange": "$$",
              "areaServed": {
                "@type": "Country",
                "name": "India"
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

