"use client";

import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        key?: string;
        'solution-channel'?: string;
      };
      'gmpx-store-locator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'map-id'?: string;
      };
    }
  }
}

export default function StoreLocator() {
  useEffect(() => {
    // Load the Google Maps Extended Component Library
    if (typeof window === 'undefined') return;

    // Configuration for the store locator
    const CONFIGURATION = {
      locations: [
        {
          title: "Ultron power systems",
          address1: "Kanishka Apts,kshire colony",
          address2: "Dhule, Maharashtra, India",
          coords: { lat: 20.9161854, lng: 74.768602 },
          placeId: "ChIJVRJSzJrF3jsRJScBZS1QR7k"
        }
      ],
      mapOptions: {
        center: { lat: 20.9161854, lng: 74.768602 },
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 17,
        zoomControl: true,
        maxZoom: 17,
        mapId: ""
      },
      mapsApiKey: "AIzaSyDG8q-XGX4G7JGdiztdCk2OAXGatmKj8FA",
      capabilities: {
        input: false,
        autocomplete: false,
        directions: false,
        distanceMatrix: false,
        details: false,
        actions: false
      }
    };

    // Configure the store locator once the component is loaded
    const configureLocator = () => {
      const checkComponent = setInterval(() => {
        const locator = document.querySelector('gmpx-store-locator') as any;
        if (locator && typeof locator.configureFromQuickBuilder === 'function') {
          locator.configureFromQuickBuilder(CONFIGURATION);
          clearInterval(checkComponent);
        }
      }, 100);

      // Clear interval after 10 seconds if component doesn't load
      setTimeout(() => clearInterval(checkComponent), 10000);
    };

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="extended-component-library"]');
    if (existingScript) {
      configureLocator();
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Wait for custom elements to be defined
      customElements.whenDefined('gmpx-store-locator').then(() => {
        configureLocator();
      }).catch(() => {
        // If already defined, configure immediately
        configureLocator();
      });
    };

    // Also try to configure if script was already loaded
    if (document.readyState === 'complete') {
      setTimeout(configureLocator, 1000);
    }
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] rounded-lg overflow-hidden bg-white">
      <style jsx global>{`
        gmpx-store-locator {
          width: 100%;
          height: 100%;
          min-height: 500px;
          --gmpx-color-surface: #fff;
          --gmpx-color-on-surface: #212121;
          --gmpx-color-on-surface-variant: #757575;
          --gmpx-color-primary: #1967d2;
          --gmpx-color-outline: #e0e0e0;
          --gmpx-fixed-panel-width-row-layout: 28.5em;
          --gmpx-fixed-panel-height-column-layout: 65%;
          --gmpx-font-family-base: "Roboto", sans-serif;
          --gmpx-font-family-headings: "Roboto", sans-serif;
          --gmpx-font-size-base: 0.875rem;
          --gmpx-hours-color-open: #188038;
          --gmpx-hours-color-closed: #d50000;
          --gmpx-rating-color: #ffb300;
          --gmpx-rating-color-empty: #e0e0e0;
        }
      `}</style>
      <gmpx-api-loader 
        key="AIzaSyDG8q-XGX4G7JGdiztdCk2OAXGatmKj8FA" 
        solution-channel="GMP_QB_locatorplus_v11_c"
      />
      <gmpx-store-locator map-id="DEMO_MAP_ID" />
    </div>
  );
}

