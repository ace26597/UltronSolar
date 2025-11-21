import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultron Power Systems - Solar Energy Solutions | Dhule, Maharashtra",
  description: "Your one-stop solution for solar power and solar system installation. Expert installations for residential, commercial, industrial, and farm applications. Complete EPC services in Dhule, Maharashtra.",
  keywords: "solar energy, solar panels, renewable energy, solar installation, solar water pump, EPC services, Dhule, Maharashtra, solar power systems",
  openGraph: {
    title: "Ultron Power Systems - Solar Energy Solutions",
    description: "Your one-stop solution for solar power and solar system installation. Expert installations for residential, commercial, industrial, and farm applications.",
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
              "name": "Ultron Power Systems",
              "description": "Your one-stop solution for solar power and solar system installation",
              "url": "https://ultronsolar.in",
              "telephone": "+91-9422787438",
              "email": "ultronvij@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kanishka Apartment, Kshire Colony, Deopur",
                "addressLocality": "Dhule",
                "addressRegion": "Maharashtra",
                "postalCode": "424002",
                "addressCountry": "IN"
              },
              "priceRange": "₹₹",
              "areaServed": {
                "@type": "State",
                "name": "Maharashtra"
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

