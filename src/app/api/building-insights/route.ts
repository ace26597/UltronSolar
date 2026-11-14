/**
 * GET /api/building-insights
 * Fetch building insights (roof area, orientation, solar potential) from Google Solar API
 */

import { NextRequest, NextResponse } from 'next/server';
import { SolarInsights } from '@/types/billExtract';
import { rateLimit } from '@/lib/server/rateLimit';

/**
 * The business only serves India, and every lookup is a paid Google Solar API
 * call, so coordinates outside this box are refused instead of forwarded.
 */
const INDIA_BOUNDS = { minLat: 6, maxLat: 38, minLng: 68, maxLng: 98 };

/** Strict decimal number: no exponents, no trailing text, bounded length. */
function parseCoordinate(value: string | null): number {
    if (!value || value.length > 24 || !/^-?\d{1,3}(\.\d+)?$/.test(value)) return NaN;
    return parseFloat(value);
}

// Helper to convert degrees to cardinal direction
function getCardinalDirection(azimuth: number): string {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const normalizedAzimuth = ((azimuth % 360) + 360) % 360;
    const index = Math.round(normalizedAzimuth / 45) % 8;
    return directions[index];
}

// Haversine distance for bounding box dimensions
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export async function GET(request: NextRequest) {
    const limited = rateLimit(request, 'building-insights', { limit: 15, windowMs: 10 * 60_000 });
    if (limited) return limited;

    try {
        const searchParams = request.nextUrl.searchParams;
        const rawLat = parseCoordinate(searchParams.get('lat'));
        const rawLng = parseCoordinate(searchParams.get('lng'));

        // Validate coordinates
        if (isNaN(rawLat) || isNaN(rawLng)) {
            return NextResponse.json(
                { success: false, error: 'Invalid coordinates. Please provide lat and lng.' },
                { status: 400 }
            );
        }

        if (
            rawLat < INDIA_BOUNDS.minLat || rawLat > INDIA_BOUNDS.maxLat ||
            rawLng < INDIA_BOUNDS.minLng || rawLng > INDIA_BOUNDS.maxLng
        ) {
            return NextResponse.json(
                { success: false, error: 'This location is outside our service area.' },
                { status: 400 }
            );
        }

        // Six decimals is about 10 cm; more precision is noise.
        const lat = Number(rawLat.toFixed(6));
        const lng = Number(rawLng.toFixed(6));

        // Check for API key
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { success: false, error: 'GOOGLE_MAPS_API_KEY not configured' },
                { status: 500 }
            );
        }

        // Call Google Solar API
        const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${apiKey}`;

        const solarRes = await fetch(solarUrl);

        if (!solarRes.ok) {
            // Try with MEDIUM quality if HIGH fails
            const solarUrlMedium = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=MEDIUM&key=${apiKey}`;
            const solarResMedium = await fetch(solarUrlMedium);

            if (!solarResMedium.ok) {
                console.warn(`Solar API Error: ${solarRes.status} ${solarRes.statusText}`);
                return NextResponse.json({
                    success: false,
                    error: 'Building not found in Solar API coverage area'
                });
            }

            const solarData = await solarResMedium.json();
            return processAndReturnInsights(solarData);
        }

        const solarData = await solarRes.json();
        return processAndReturnInsights(solarData);

    } catch (error) {
        console.error('[/api/building-insights] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch building insights'
            },
            { status: 500 }
        );
    }
}

function processAndReturnInsights(solarData: any) {
    // Check if we got valid data
    if (!solarData.solarPotential) {
        return NextResponse.json({
            success: false,
            error: 'No solar potential data available for this location'
        });
    }

    const stats = solarData.solarPotential;
    const wholeRoof = stats.wholeRoofStats;
    const roofSegments = stats.roofSegmentStats || [];

    // Determine Primary Orientation (Segment with largest area)
    let primarySegment = roofSegments[0];
    if (roofSegments.length > 0) {
        primarySegment = roofSegments.reduce((prev: any, current: any) =>
            (prev.stats?.areaMeters2 > current.stats?.areaMeters2) ? prev : current
        );
    }

    const azimuth = primarySegment?.azimuthDegrees || 0;
    const pitch = primarySegment?.pitchDegrees || 0;
    const roofAreaM2 = wholeRoof?.areaMeters2 || 0;

    // Calculate Dimensions from Bounding Box
    let dimensions = undefined;
    if (solarData.boundingBox && solarData.boundingBox.sw && solarData.boundingBox.ne) {
        const sw = solarData.boundingBox.sw;
        const ne = solarData.boundingBox.ne;

        // Calculate approx width (West to East)
        const widthMeters = calculateDistance(sw.latitude, sw.longitude, sw.latitude, ne.longitude);
        // Calculate approx length (South to North)
        const lengthMeters = calculateDistance(sw.latitude, sw.longitude, ne.latitude, sw.longitude);

        dimensions = {
            widthMeters: widthMeters,
            lengthMeters: lengthMeters,
            widthFeet: widthMeters * 3.28084,
            lengthFeet: lengthMeters * 3.28084
        };
    }

    const insights: SolarInsights = {
        roofAreaSqM: roofAreaM2,
        roofAreaSqFt: roofAreaM2 * 10.7639,
        maxSunlightHoursPerYear: stats.maxSunshineHoursPerYear || 0,
        maxPanelCount: stats.maxArrayPanelsCount || 0,
        azimuthDegrees: azimuth,
        primaryOrientation: getCardinalDirection(azimuth),
        pitchDegrees: pitch,
        dimensions: dimensions
    };

    return NextResponse.json({
        success: true,
        data: insights,
    });
}
