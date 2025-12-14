"use client";

import React from 'react';
import { GeoLocation } from '@/types/billExtract';

interface MapViewProps {
    address: string;
    geoLocation?: GeoLocation;
}

export default function MapView({ address, geoLocation }: MapViewProps) {
    // Don't render if no address
    if (!address) return null;

    let mapSrc = "";
    const encodedAddress = encodeURIComponent(address);

    // If we have precise coordinates, use them
    if (geoLocation && geoLocation.lat && geoLocation.lng) {
        // q=lat,lng places a marker at that exact spot
        mapSrc = `https://maps.google.com/maps?q=${geoLocation.lat},${geoLocation.lng}&t=h&z=19&ie=UTF8&iwloc=&output=embed`;
    } else {
        // Fallback to address search
        mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=h&z=18&ie=UTF8&iwloc=&output=embed`;
    }

    const openGoogleMaps = () => {
        if (geoLocation) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${geoLocation.lat},${geoLocation.lng}`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Building Location
                </h3>
                <button
                    onClick={openGoogleMaps}
                    className="text-white/90 hover:text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center"
                >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Maps
                </button>
            </div>

            {/* Map iframe */}
            <div className="relative w-full h-[250px] bg-gray-900">
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapSrc}
                    title="Building Location"
                    className="w-full h-full"
                />

                {/* Coordinates overlay */}
                {geoLocation && geoLocation.lat !== 0 && (
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow text-xs">
                        <div className="flex items-center text-emerald-700 font-medium mb-1">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Location Found
                        </div>
                        <div className="font-mono text-gray-600">
                            {geoLocation.lat.toFixed(5)}, {geoLocation.lng.toFixed(5)}
                        </div>
                        {geoLocation.formattedAddress && (
                            <div className="text-gray-500 truncate mt-0.5">
                                {geoLocation.formattedAddress}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
