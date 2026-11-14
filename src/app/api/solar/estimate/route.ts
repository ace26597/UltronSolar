/**
 * POST /api/solar/estimate
 * Calculate solar system size and savings from bill/consumption data
 */

import { NextRequest, NextResponse } from 'next/server';
import { EstimateInput, EstimateOutput } from '@/types/solar';
import { calculateEstimate, calculateEstimateWithPVWatts } from '@/lib/solar/estimate';
import { rateLimit } from '@/lib/server/rateLimit';
import { cleanLine, numberInRange, readJsonBody } from '@/lib/server/requestGuards';

const RATE_LIMIT = { limit: 60, windowMs: 5 * 60_000 };

/** Upper bounds that no real bill or site reaches; they only stop nonsense input. */
const MAX_BILL_RUPEES = 100_000_000;
const MAX_MONTHLY_KWH = 10_000_000;
const MAX_TARIFF = 100;

const ROOF_TYPES = ['flat', 'tilted', 'shed'] as const;

type Parsed<T> = { ok: true; value: T } | { ok: false };

/** An optional number: absent is fine, present must be a finite number in range. */
function optionalNumber(value: unknown, min: number, max: number): Parsed<number | undefined> {
    if (value === undefined || value === null) return { ok: true, value: undefined };
    const number = numberInRange(value, min, max);
    return number === undefined ? { ok: false } : { ok: true, value: number };
}

function optionalLabel(value: unknown): string | undefined {
    const text = cleanLine(value).slice(0, 100);
    return text || undefined;
}

function badRequest(error: string) {
    return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: NextRequest) {
    const limited = rateLimit(request, 'solar-estimate', RATE_LIMIT);
    if (limited) return limited;

    try {
        const parsedBody = await readJsonBody(request, 8_000);
        if (!parsedBody.ok) {
            return NextResponse.json({ error: parsedBody.error }, { status: parsedBody.status });
        }
        const body = parsedBody.data;
        const location = (body.location && typeof body.location === 'object'
            ? body.location
            : {}) as Record<string, unknown>;

        // Validate required fields
        const lat = numberInRange(location.lat, -90, 90);
        const lon = numberInRange(location.lon, -180, 180);
        if (lat === undefined || lon === undefined) {
            return badRequest('Invalid location. Please provide lat and lon.');
        }

        if (!body.billAmount && !body.monthlyKwh) {
            return badRequest('Please provide either billAmount or monthlyKwh.');
        }

        const billAmount = optionalNumber(body.billAmount, 0, MAX_BILL_RUPEES);
        const monthlyKwh = optionalNumber(body.monthlyKwh, 0, MAX_MONTHLY_KWH);
        const tariffRate = optionalNumber(body.tariffRate, 0, MAX_TARIFF);
        const offsetPercent = optionalNumber(body.offsetPercent, 0, 200);
        const roofTilt = optionalNumber(body.roofTilt, 0, 90);
        const roofAzimuth = optionalNumber(body.roofAzimuth, 0, 360);
        const systemLosses = optionalNumber(body.systemLosses, 0, 99);

        if (
            !billAmount.ok || !monthlyKwh.ok || !tariffRate.ok || !offsetPercent.ok ||
            !roofTilt.ok || !roofAzimuth.ok || !systemLosses.ok
        ) {
            return badRequest('One or more values are not valid numbers.');
        }

        const roofType = ROOF_TYPES.find(type => type === body.roofType);

        // Build estimate input
        const input: EstimateInput = {
            location: {
                lat,
                lon,
                city: optionalLabel(location.city),
                state: optionalLabel(location.state),
                pincode: optionalLabel(location.pincode),
            },
            billAmount: billAmount.value,
            monthlyKwh: monthlyKwh.value,
            tariffRate: tariffRate.value,
            offsetPercent: offsetPercent.value,
            roofTilt: roofTilt.value,
            roofAzimuth: roofAzimuth.value,
            systemLosses: systemLosses.value,
            roofType,
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
                error: 'Failed to calculate estimate'
            },
            { status: 500 }
        );
    }
}

/** A query-string number: plain decimal only, bounded length. NaN when absent or malformed. */
function queryNumber(value: string | null): number {
    if (!value || value.length > 24 || !/^-?\d+(\.\d+)?$/.test(value)) return NaN;
    return parseFloat(value);
}

// Also support GET for simple queries
export async function GET(request: NextRequest) {
    const limited = rateLimit(request, 'solar-estimate', RATE_LIMIT);
    if (limited) return limited;

    const searchParams = request.nextUrl.searchParams;

    const lat = queryNumber(searchParams.get('lat'));
    const lon = queryNumber(searchParams.get('lon'));
    const bill = queryNumber(searchParams.get('bill'));
    const kwh = queryNumber(searchParams.get('kwh'));

    if (isNaN(lat) || isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
        return badRequest('Please provide lat and lon query parameters.');
    }

    if (isNaN(bill) && isNaN(kwh)) {
        return badRequest('Please provide bill or kwh query parameter.');
    }

    const tariff = queryNumber(searchParams.get('tariff'));
    const offset = queryNumber(searchParams.get('offset'));

    if (
        (!isNaN(bill) && (bill < 0 || bill > MAX_BILL_RUPEES)) ||
        (!isNaN(kwh) && (kwh < 0 || kwh > MAX_MONTHLY_KWH)) ||
        (!isNaN(tariff) && (tariff < 0 || tariff > MAX_TARIFF)) ||
        (!isNaN(offset) && (offset < 0 || offset > 200))
    ) {
        return badRequest('One or more values are out of range.');
    }

    const input: EstimateInput = {
        location: { lat, lon },
        billAmount: isNaN(bill) ? undefined : bill,
        monthlyKwh: isNaN(kwh) ? undefined : kwh,
        tariffRate: tariff || undefined,
        offsetPercent: offset || undefined,
    };

    const result = calculateEstimate(input);

    return NextResponse.json({
        success: true,
        data: result,
    });
}
