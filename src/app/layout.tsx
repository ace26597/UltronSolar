import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import LazyChatWidget from "@/components/chat/LazyChatWidget";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import CookieBanner from "@/components/CookieBanner";
import MobileContactBar from "@/components/MobileContactBar";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Prevents font from blocking render - improves FCP
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ultronsolar.in"),
  title: "Ultron Power Systems | Solar Rooftop & Solar Water Pumps in Dhule, Maharashtra",
  description: "Ultron Power Systems provides rooftop solar, solar water pumps, inverters and complete EPC solutions in Dhule, Maharashtra. Residential, commercial and farm solar with bank loan and subsidy support.",
  keywords: "solar installation dhule, solar water pump maharashtra, rooftop solar jalgaon, solar epc nashik, ultron power systems, solar subsidy maharashtra, solar inverter dhule",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  alternates: {
    canonical: "https://www.ultronsolar.in/",
  },
  openGraph: {
    title: "Ultron Power Systems - Solar Energy Solutions in Dhule, Maharashtra",
    description: "Rooftop solar, solar water pumps, inverters and EPC solutions in Dhule, Maharashtra with financing and subsidy support.",
    url: "https://www.ultronsolar.in",
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
  twitter: {
    card: "summary_large_image",
    title: "Ultron Power Systems - Solar Solutions in Dhule",
    description: "Expert solar installation for homes, businesses, and farms in North Maharashtra.",
    images: ["/images/gallery-project-2.jpg"],
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
        "@type": "Organization",
        "@id": "https://www.ultronsolar.in/#organization",
        "name": "Ultron Power Systems",
        "url": "https://www.ultronsolar.in",
        "logo": "https://www.ultronsolar.in/images/product-solar-ups.jpg",
        "image": "https://www.ultronsolar.in/images/product-solar-ups.jpg",
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
        "sameAs": [
          "https://www.facebook.com/ultronpowersystems",
          "https://www.ultronsolar.in"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.ultronsolar.in/#localbusiness",
        "name": "Ultron Power Systems",
        "image": "https://www.ultronsolar.in/images/product-solar-ups.jpg",
        "url": "https://www.ultronsolar.in",
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
          "latitude": 20.916225468005663,
          "longitude": 74.76856980970072
        },
        "areaServed": {
          "@type": "City",
          "name": "Dhule"
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
        "parentOrganization": {
          "@id": "https://www.ultronsolar.in/#organization"
        },
        "sameAs": [
          "https://www.facebook.com/ultronpowersystems",
          "https://www.ultronsolar.in"
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
            "image": "https://www.ultronsolar.in/images/product-solar-pump.jpg",
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
            "image": "https://www.ultronsolar.in/images/gallery-project-2.jpg",
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
              "@id": "https://www.ultronsolar.in/#organization"
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden w-full max-w-[100vw]`}>
        <CookieConsentProvider>
          <AnalyticsScripts />
          <LanguageProvider>
            {children}
            <MobileContactBar />
            <LazyChatWidget />
            <Analytics />
            <SpeedInsights />
          </LanguageProvider>
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}

