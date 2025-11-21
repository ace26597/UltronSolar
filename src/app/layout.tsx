import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultron Power Systems - Solar Energy Solutions | Dhule, Maharashtra",
  description: "Your one-stop solution for solar power and solar system installation. Expert installations for residential, commercial, industrial, and farm applications. Complete EPC services in Dhule, Maharashtra.",
  keywords: "solar energy, solar panels, renewable energy, solar installation, solar water pump, EPC services, Dhule, Maharashtra, solar power systems",
  openGraph: {
    title: "Ultron Power Systems - Solar Energy Solutions",
    description: "Your one-stop solution for solar power and solar system installation. Expert installations for residential, commercial, industrial, and farm applications.",
    url: "https://ultron-solar.vercel.app",
    siteName: "Ultron Power Systems",
    images: [
      {
        url: "/images/gallery-project-2.jpg",
        width: 1200,
        height: 630,
        alt: "Ultron Power Systems Solar Installation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  verification: {
    google: "google-site-verification-code-here", // User needs to replace this
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}

