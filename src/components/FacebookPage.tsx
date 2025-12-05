"use client";

import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

export default function FacebookPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Lazy load Facebook SDK only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load 200px before it comes into view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load Facebook SDK when visible
  useEffect(() => {
    if (!isVisible || isLoaded) return;

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
        setIsLoaded(true);
      };
    } else if (window.FB) {
      window.FB.XFBML.parse();
      setIsLoaded(true);
    }
  }, [isVisible, isLoaded]);

  // Your Facebook page URL - update this with your actual page URL
  // To find your page URL: Go to your Facebook page, click "About" section, 
  // and copy the URL shown there (should look like: https://www.facebook.com/YourPageName)
  // Common formats: https://www.facebook.com/ultronpowersystems or https://www.facebook.com/UltronPowerSystems
  const facebookPageUrl = "https://www.facebook.com/ultronpowersystems";

  return (
    <section ref={sectionRef} id="facebook-timeline" className="py-20 bg-gray-50">
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
          <div className="w-full max-w-[500px] overflow-hidden bg-white rounded-lg shadow-sm min-h-[400px]">
            {isVisible ? (
              <div
                className="fb-page"
                data-href={facebookPageUrl}
                data-width="500"
                data-height="500"
                data-tabs="timeline"
                data-hide-cover="false"
                data-show-facepile="false"
                data-adapt-container-width="true"
                data-small-header="true"
              ></div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-400">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <p className="text-sm">Loading Facebook...</p>
                </div>
              </div>
            )}
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

