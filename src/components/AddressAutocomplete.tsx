"use client";

import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        key?: string;
        'solution-channel'?: string;
      };
      'gmpx-split-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'row-layout-min-width'?: string;
        slot?: string;
      };
      'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        slot?: string;
      };
      'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmpx-icon-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: string;
      };
    }
  }
}

export default function AddressAutocomplete() {
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || mapInitialized.current) return;

    // Load the Google Maps Extended Component Library
    const existingScript = document.querySelector('script[src*="extended-component-library"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const CONFIGURATION = {
      ctaTitle: "Checkout",
      mapOptions: {
        center: { lat: 20.9161854, lng: 74.768602 }, // Dhule, Maharashtra
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        zoom: 13,
        zoomControl: true,
        maxZoom: 22,
        mapId: ""
      },
      mapsApiKey: "AIzaSyDG8q-XGX4G7JGdiztdCk2OAXGatmKj8FA",
      capabilities: {
        addressAutocompleteControl: true,
        mapDisplayControl: true,
        ctaControl: true
      }
    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'location',
      'locality',
      'administrative_area_level_1',
      'postal_code',
      'country',
    ];

    function getFormInputElement(componentType: string) {
      return document.getElementById(`${componentType}-input`) as HTMLInputElement;
    }

    function fillInAddress(place: any) {
      function getComponentName(componentType: string) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType: string) {
        return (componentType === 'location') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        const input = getFormInputElement(componentType);
        if (input) {
          input.value = getComponentText(componentType);
        }
      }
    }

    function renderAddress(place: any) {
      const mapEl = document.querySelector('gmp-map') as any;
      const markerEl = document.querySelector('gmp-advanced-marker') as any;

      if (place.geometry && place.geometry.location) {
        if (mapEl && mapEl.innerMap) {
          mapEl.innerMap.setCenter(place.geometry.location);
        }
        if (markerEl) {
          markerEl.position = place.geometry.location;
        }
      } else if (markerEl) {
        markerEl.position = null;
      }
    }

    async function initMap() {
      try {
        // Wait for custom elements to be defined
        await customElements.whenDefined('gmp-map');
        await customElements.whenDefined('gmpx-api-loader');

        // Dynamically import the Places library
        const moduleScript = document.createElement('script');
        moduleScript.type = 'module';
        moduleScript.textContent = `
          import {APILoader} from 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
          
          const CONFIG = ${JSON.stringify(CONFIGURATION)};
          const SHORT_TYPES = ${JSON.stringify(Array.from(SHORT_NAME_ADDRESS_COMPONENT_TYPES))};
          const FORM_TYPES = ${JSON.stringify(ADDRESS_COMPONENT_TYPES_IN_FORM)};
          
          function getFormInputElement(componentType) {
            return document.getElementById(componentType + '-input');
          }
          
          function fillInAddress(place) {
            function getComponentName(componentType) {
              for (const component of place.address_components || []) {
                if (component.types[0] === componentType) {
                  return SHORT_TYPES.includes(componentType) ? component.short_name : component.long_name;
                }
              }
              return '';
            }
            
            function getComponentText(componentType) {
              return (componentType === 'location') ?
                getComponentName('street_number') + ' ' + getComponentName('route') :
                getComponentName(componentType);
            }
            
            for (const componentType of FORM_TYPES) {
              const input = getFormInputElement(componentType);
              if (input) input.value = getComponentText(componentType);
            }
          }
          
          function renderAddress(place) {
            const mapEl = document.querySelector('gmp-map');
            const markerEl = document.querySelector('gmp-advanced-marker');
            
            if (place.geometry && place.geometry.location) {
              if (mapEl && mapEl.innerMap) {
                mapEl.innerMap.setCenter(place.geometry.location);
              }
              if (markerEl) markerEl.position = place.geometry.location;
            } else if (markerEl) {
              markerEl.position = null;
            }
          }
          
          (async () => {
            const {Autocomplete} = await APILoader.importLibrary('places');
            
            const mapEl = document.querySelector('gmp-map');
            if (mapEl && mapEl.innerMap) {
              const mapOptions = CONFIG.mapOptions;
              mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
              mapEl.innerMap.setOptions(mapOptions);
            }
            
            const locationInput = document.getElementById('location-input');
            if (locationInput) {
              const autocomplete = new Autocomplete(locationInput, {
                fields: ['address_components', 'geometry', 'name'],
                types: ['address'],
              });
              
              autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                  window.alert('No details available for input: ' + place.name);
                  return;
                }
                renderAddress(place);
                fillInAddress(place);
              });
            }
          })();
        `;
        document.body.appendChild(moduleScript);

        mapInitialized.current = true;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    // Initialize after a short delay to ensure components are loaded
    const timer = setTimeout(() => {
      initMap();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full">
      <style jsx global>{`
        .sb-title {
          position: relative;
          top: -12px;
          font-family: Roboto, sans-serif;
          font-weight: 500;
        }
        .sb-title-icon {
          position: relative;
          top: -5px;
        }
        gmpx-split-layout {
          height: 500px;
          width: 100%;
        }
        gmpx-split-layout:not(:defined) {
          visibility: hidden;
        }
        .panel {
          background: white;
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .half-input-container {
          display: flex;
          justify-content: space-between;
        }
        .half-input {
          max-width: 120px;
        }
        h2 {
          margin: 0;
          font-family: Roboto, sans-serif;
        }
        input {
          height: 30px;
          border: 0;
          border-bottom: 1px solid black;
          font-size: 14px;
          font-family: Roboto, sans-serif;
          font-style: normal;
          font-weight: normal;
        }
        input:focus::placeholder {
          color: white;
        }
      `}</style>
      <gmpx-api-loader 
        key="AIzaSyDG8q-XGX4G7JGdiztdCk2OAXGatmKj8FA" 
        solution-channel="GMP_QB_addressselection_v4_cABC"
      />
      <gmpx-split-layout row-layout-min-width="600">
        <div className="panel" slot="fixed">
          <div>
            <img 
              className="sb-title-icon" 
              src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" 
              alt="Location"
            />
            <span className="sb-title">Address Selection</span>
          </div>
          <input type="text" placeholder="Address" id="location-input" />
          <input type="text" placeholder="Apt, Suite, etc (optional)" />
          <input type="text" placeholder="City" id="locality-input" />
          <div className="half-input-container">
            <input 
              type="text" 
              className="half-input" 
              placeholder="State/Province" 
              id="administrative_area_level_1-input"
            />
            <input 
              type="text" 
              className="half-input" 
              placeholder="Zip/Postal code" 
              id="postal_code-input"
            />
          </div>
          <input type="text" placeholder="Country" id="country-input" />
          <gmpx-icon-button variant="filled">Checkout</gmpx-icon-button>
        </div>
        <gmp-map slot="main">
          <gmp-advanced-marker />
        </gmp-map>
      </gmpx-split-layout>
    </div>
  );
}

