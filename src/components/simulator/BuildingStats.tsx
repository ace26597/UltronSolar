"use client";

import React from 'react';
import { SolarInsights } from '@/types/billExtract';

interface BuildingStatsProps {
    insights: SolarInsights;
}

export default function BuildingStats({ insights }: BuildingStatsProps) {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Solar Analysis
                </h3>
                <span className="text-xs text-blue-100 bg-blue-700/30 px-2 py-1 rounded">
                    Google Solar API
                </span>
            </div>

            {/* Stats Grid */}
            <div className="p-4 grid grid-cols-3 gap-3">
                {/* Roof Area */}
                <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
                    <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 text-sky-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-600">Roof Area</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                        {Math.round(insights.roofAreaSqFt).toLocaleString()}
                        <span className="text-xs text-gray-500 ml-1">sqft</span>
                    </p>
                    {insights.dimensions && (
                        <p className="text-xs text-gray-500 mt-0.5">
                            ~{Math.round(insights.dimensions.lengthFeet)}&apos; × {Math.round(insights.dimensions.widthFeet)}&apos;
                        </p>
                    )}
                </div>

                {/* Orientation */}
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 text-orange-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="text-xs font-medium text-gray-600">Facing</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                        {insights.primaryOrientation}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {Math.round(insights.azimuthDegrees)}° azimuth
                    </p>
                </div>

                {/* Max Panels */}
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 text-emerald-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-600">Max Panels</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                        {insights.maxPanelCount}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {Math.round(insights.maxSunlightHoursPerYear).toLocaleString()} sun hrs/yr
                    </p>
                </div>
            </div>
        </div>
    );
}
