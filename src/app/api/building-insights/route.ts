/**
 * GET /api/building-insights
 * Fetch building insights (roof area, orientation, solar potential) from Google Solar API
 */

import { NextRequest, NextResponse } from 'next/server';
import { SolarInsights } from '@/types/billExtract';

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
    try {
        const searchParams = request.nextUrl.searchParams;
        const lat = parseFloat(searchParams.get('lat') || '');
        const lng = parseFloat(searchParams.get('lng') || '');

        // Validate coordinates
        if (isNaN(lat) || isNaN(lng)) {
            return NextResponse.json(
                { success: false, error: 'Invalid coordinates. Please provide lat and lng.' },
                { status: 400 }
            );
        }

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
                error: 'Failed to fetch building insights',
                details: error instanceof Error ? error.message : 'Unknown error'
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
