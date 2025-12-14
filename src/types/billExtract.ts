/**
 * Bill Extraction Type Definitions
 * Types for AI-powered bill extraction and building analysis
 */

// ============================================
// Bill Extraction Types
// ============================================

export interface GeoLocation {
    lat: number;
    lng: number;
    formattedAddress: string;
    searchQueryUsed?: string;
}

export interface SolarInsights {
    roofAreaSqM: number;
    roofAreaSqFt: number;
    maxSunlightHoursPerYear: number;
    maxPanelCount: number;
    primaryOrientation: string; // e.g., "South-West"
    azimuthDegrees: number;
    pitchDegrees: number; // Roof tilt
    dimensions?: {
        lengthMeters: number;
        widthMeters: number;
        lengthFeet: number;
        widthFeet: number;
    };
}

export interface BillData {
    consumerName: string;
    billingDate: string;
    dueDate: string;
    unitsConsumed: string;
    totalAmount: string;
    ratePerUnit: string;
    address: string;
    provider: string;
    sanctionedLoad?: string;
    plotArea?: string;
    geoLocation?: GeoLocation;
    solarInsights?: SolarInsights;
}

export interface BillExtractionResult {
    success: boolean;
    data?: BillData;
    error?: string;
}

export interface GeocodeResult {
    success: boolean;
    data?: GeoLocation;
    error?: string;
}

export interface BuildingInsightsResult {
    success: boolean;
    data?: SolarInsights;
    error?: string;
}
