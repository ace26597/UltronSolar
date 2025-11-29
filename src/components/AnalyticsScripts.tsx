'use client';

import React from 'react';
import Script from 'next/script';
import { useAnalyticsConsent, useMarketingConsent } from '@/context/CookieConsentContext';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-N5PL09KWTM';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const AnalyticsScripts: React.FC = () => {
  const allowAnalytics = useAnalyticsConsent();
  const allowMarketing = useMarketingConsent();

  return (
    <>
      {/* Google Analytics */}
      {allowAnalytics && GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga4-base"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
          >{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
            });
          `}</Script>
        </>
      )}

      {/* Meta Pixel */}
      {allowMarketing && META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}</Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
};

export default AnalyticsScripts;

