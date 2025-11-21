import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ultron-solar.vercel.app"),
  title: "Ultron Power Systems - Solar Solutions in Dhule & North Maharashtra",
  description: "Trusted solar installation for homes, farms, and businesses in Dhule, Jalgaon, and Nashik. Get complete EPC solutions, solar water pumps, and subsidy assistance.",
  keywords: "solar installation dhule, solar water pump maharashtra, rooftop solar jalgaon, solar epc nashik, ultron power systems, solar subsidy maharashtra",
  openGraph: {
    title: "Ultron Power Systems - Solar Solutions in Dhule",
    description: "Expert solar installation for homes, businesses, and farms in North Maharashtra. 25-year warranty & subsidy support.",
    url: "https://ultron-solar.vercel.app",
    siteName: "Ultron Power Systems",
    images: [
      {
        url: "/images/gallery-project-2.jpg",
        width: 1200,
        height: 630,
        alt: "Ultron Power Systems Solar Project",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://ultron-solar.vercel.app/#organization",
        "name": "Ultron Power Systems",
        "image": "https://ultron-solar.vercel.app/images/product-solar-ups.jpg",
        "url": "https://ultron-solar.vercel.app",
        "telephone": "+91-9422787438",
        "email": "ultronvij@gmail.com",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kanishka Apartment, Kshire Colony, Deopur",
          "addressLocality": "Dhule",
          "addressRegion": "Maharashtra",
          "postalCode": "424002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.897038,
          "longitude": 74.767688
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        },
        "sameAs": [
          "https://www.facebook.com/ultronpowersystems",
          "https://ultron-solar.vercel.app"
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Solar Products and Services",
        "itemListElement": [
          {
            "@type": "Product",
            "name": "Solar Water Pump System",
            "description": "Solar powered water pump installation for farms and poultry.",
            "image": "https://ultron-solar.vercel.app/images/product-solar-pump.jpg",
            "brand": {
              "@type": "Brand",
              "name": "Ultron Power Systems"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Product",
            "name": "Solar Rooftop System",
            "description": "Complete solar rooftop system installation for homes and businesses.",
            "image": "https://ultron-solar.vercel.app/images/gallery-project-2.jpg",
            "brand": {
              "@type": "Brand",
              "name": "Ultron Power Systems"
            },
            "offers": {
              "@type": "Offer",
              "price": "99999",
              "priceCurrency": "INR",
              "name": "1kW Solar Rooftop System Special Deal",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Service",
            "name": "Solar EPC Solutions",
            "description": "Engineering, Procurement, and Construction of solar power systems.",
            "provider": {
              "@id": "https://ultron-solar.vercel.app/#organization"
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N5PL09KWTM"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N5PL09KWTM');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

