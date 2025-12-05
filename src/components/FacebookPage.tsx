"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

export default function FacebookPage() {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== "undefined" && !window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      };
    } else if (window.FB) {
      window.FB.XFBML.parse();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Your Facebook page URL - update this with your actual page URL
  // To find your page URL: Go to your Facebook page, click "About" section, 
  // and copy the URL shown there (should look like: https://www.facebook.com/YourPageName)
  // Common formats: https://www.facebook.com/ultronpowersystems or https://www.facebook.com/UltronPowerSystems
  const facebookPageUrl = "https://www.facebook.com/ultronpowersystems";

  return (
    <section id="facebook-timeline" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Follow Us on Facebook
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest projects, promotions, and solar energy news
          </p>
        </div>

        <div className="w-full flex justify-center overflow-hidden">
          <div className="w-full max-w-[500px] overflow-hidden bg-white rounded-lg shadow-sm">
            <div
              className="fb-page"
              data-href={facebookPageUrl}
              data-width="500"
              data-height="600"
              data-tabs="timeline"
              data-hide-cover="false"
              data-show-facepile="true"
              data-adapt-container-width="true"
              data-small-header="true"
            ></div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors touch-manipulation min-h-[48px] flex items-center justify-center text-sm sm:text-base"
          >
            Visit Our Facebook Page
          </a>
          {/* Dev text hidden for production
          <p className="text-xs text-gray-400 mt-4">
            If the timeline doesn&apos;t load, check the page URL in FacebookPage.tsx
          </p>
          */}
        </div>
      </div>
    </section>
  );
}

