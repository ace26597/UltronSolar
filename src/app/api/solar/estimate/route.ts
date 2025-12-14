/**
 * POST /api/solar/estimate
 * Calculate solar system size and savings from bill/consumption data
 */

import { NextRequest, NextResponse } from 'next/server';
import { EstimateInput, EstimateOutput } from '@/types/solar';
import { calculateEstimate, calculateEstimateWithPVWatts } from '@/lib/solar/estimate';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.location || typeof body.location.lat !== 'number' || typeof body.location.lon !== 'number') {
            return NextResponse.json(
                { error: 'Invalid location. Please provide lat and lon.' },
                { status: 400 }
            );
        }

        if (!body.billAmount && !body.monthlyKwh) {
            return NextResponse.json(
                { error: 'Please provide either billAmount or monthlyKwh.' },
                { status: 400 }
            );
        }

        // Build estimate input
        const input: EstimateInput = {
            location: {
                lat: body.location.lat,
                lon: body.location.lon,
                city: body.location.city,
                state: body.location.state,
                pincode: body.location.pincode,
            },
            billAmount: body.billAmount,
            monthlyKwh: body.monthlyKwh,
            tariffRate: body.tariffRate,
            offsetPercent: body.offsetPercent,
            roofTilt: body.roofTilt,
            roofAzimuth: body.roofAzimuth,
            systemLosses: body.systemLosses,
            roofType: body.roofType,
        };

        // Calculate estimate (with PVWatts if available)
        let result: EstimateOutput;

        if (process.env.NREL_API_KEY) {
            // Use PVWatts API for more accurate results
            result = await calculateEstimateWithPVWatts(input);
        } else {
            // Use local calculation
            result = calculateEstimate(input);
        }

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('[/api/solar/estimate] Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to calculate estimate',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Also support GET for simple queries
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const lat = parseFloat(searchParams.get('lat') || '');
    const lon = parseFloat(searchParams.get('lon') || '');
    const bill = parseFloat(searchParams.get('bill') || '');
    const kwh = parseFloat(searchParams.get('kwh') || '');

    if (isNaN(lat) || isNaN(lon)) {
        return NextResponse.json(
            { error: 'Please provide lat and lon query parameters.' },
            { status: 400 }
        );
    }

    if (isNaN(bill) && isNaN(kwh)) {
        return NextResponse.json(
            { error: 'Please provide bill or kwh query parameter.' },
            { status: 400 }
        );
    }

    const input: EstimateInput = {
        location: { lat, lon },
        billAmount: isNaN(bill) ? undefined : bill,
        monthlyKwh: isNaN(kwh) ? undefined : kwh,
        tariffRate: parseFloat(searchParams.get('tariff') || '') || undefined,
        offsetPercent: parseFloat(searchParams.get('offset') || '') || undefined,
    };

    const result = calculateEstimate(input);

    return NextResponse.json({
        success: true,
        data: result,
    });
}
