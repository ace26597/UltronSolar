/**
 * POST /api/geocode
 * Resolve an address from an electricity bill to coordinates.
 *
 * Coordinates come from the Google Geocoding API and nowhere else. An earlier
 * version asked a language model to "use your knowledge to find the precise
 * location coordinates"; with no map data behind it, the model answered with
 * plausible-looking guesses that the page then showed as "Location Found" and
 * used to fetch roof data for whatever building was nearest the guess.
 *
 * A language model is still used, but only for what it is good at: turning a
 * messy bill address ("1, KANISHK APT ... Ta: Dhule Dt: Dhule MNO-942...")
 * into a clean search query when the geocoder cannot place the raw text. The
 * cleaned query is accepted only if every word in it is already in the bill's
 * address, and it goes back through the geocoder; the model never supplies a
 * coordinate or a place name of its own.
 *
 * Needs GOOGLE_MAPS_API_KEY (the server key /api/building-insights already
 * uses) with the Geocoding API enabled. GEMINI_API_KEY is optional. When the
 * geocoder cannot be used the route answers 503 "not available" and the
 * simulator carries on without a map.
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeoLocation } from '@/types/billExtract';
import { geminiModel } from '@/lib/aiModels';
import { geocodeAddress, GeocodeLookup, usesOnlyWordsFrom } from '@/lib/server/geocoding';
import { rateLimit } from '@/lib/server/rateLimit';
import { cleanLine, readJsonBody } from '@/lib/server/requestGuards';

/** Longest address accepted. A full Indian postal address is well under this. */
const MAX_ADDRESS_CHARS = 300;
/** Longest cleaned-up search query accepted back from the model. */
const MAX_QUERY_CHARS = 200;

// Time budget. The function is limited to 10 seconds (vercel.json), and the
// worst case is geocode -> clean-up -> geocode.
const GEOCODE_TIMEOUT_MS = 2500;
const CLEANUP_TIMEOUT_MS = 3500;

function failure(error: string, status: number, code?: string) {
    return NextResponse.json({ success: false, error, ...(code ? { code } : {}) }, { status });
}

/**
 * Ask the model for a clean search query for this address. Returns null when
 * no key is configured, the call fails, or the answer is unusable. The answer
 * is only ever used as text to search for.
 */
async function cleanAddressQuery(address: string): Promise<string | null> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    const prompt = `
        This is a raw address string from an Indian electricity bill: "${address}".

        1. Identify the specific Building Name (e.g., "Kanishk Apartment") and Locality (e.g., "Kshire Colony").
        2. Discard phone numbers (like "MNO-942..."), flat numbers (like "1,"), and administrative prefixes (like "Ta:", "Dt:").
        3. Construct a clean search query for a maps search (e.g., "Kanishk Apartment, Kshire Colony, Dhule").

        Use only words that are present in the address. Do not add places that are not in it and do not give coordinates.

        Return ONLY a JSON object with this exact structure (no markdown, no explanations):
        { "searchQuery": "<the clean query>" }
    `;

    try {
        const model = new GoogleGenerativeAI(apiKey).getGenerativeModel(
            {
                model: geminiModel(),
                generationConfig: {
                    responseMimeType: 'application/json',
                    maxOutputTokens: 256,
                },
            },
            { timeout: CLEANUP_TIMEOUT_MS }
        );

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();

        // Extract JSON from the response (handle potential markdown code blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;

        const parsed: unknown = JSON.parse(jsonMatch[0]);
        const query = cleanLine((parsed as { searchQuery?: unknown })?.searchQuery);
        if (query.length < 5 || query.length > MAX_QUERY_CHARS) return null;

        // The model may only drop noise. A query containing a word that is not
        // in the bill's address is a guess, and geocoding a guess would give a
        // real-looking location for somewhere the customer never named.
        if (!usesOnlyWordsFrom(query, address)) {
            console.warn('[/api/geocode] Address clean-up discarded: it added words not in the address');
            return null;
        }
        return query;
    } catch (error) {
        console.warn(
            '[/api/geocode] Address clean-up skipped:',
            error instanceof Error ? error.message : 'unknown error'
        );
        return null;
    }
}

export async function POST(request: NextRequest) {
    const limited = rateLimit(request, 'geocode', { limit: 15, windowMs: 10 * 60_000 });
    if (limited) return limited;

    try {
        const body = await readJsonBody(request, 4_000);
        if (!body.ok) {
            return failure(body.error, body.status);
        }

        // Single line, no control characters, and no double quotes (the address
        // is quoted inside the clean-up prompt).
        const address = cleanLine(body.data.address).replace(/"/g, "'");

        if (address.length < 5) {
            return failure('Invalid or empty address', 400);
        }

        if (address.length > MAX_ADDRESS_CHARS) {
            return failure('Address is too long', 400);
        }

        const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!mapsKey) {
            console.error('[/api/geocode] GOOGLE_MAPS_API_KEY is not configured');
            return failure('Address lookup is not available right now.', 503, 'geocoding_unavailable');
        }

        // 1. Try the address as written on the bill.
        let searchQueryUsed = address;
        let lookup: GeocodeLookup = await geocodeAddress(address, mapsKey, GEOCODE_TIMEOUT_MS);

        if (lookup.status === 'unavailable') {
            // Key missing the Geocoding API, quota exhausted, network failure...
            console.error('[/api/geocode] Geocoding API unavailable:', lookup.reason);
            return failure('Address lookup is not available right now.', 503, 'geocoding_unavailable');
        }

        // 2. Not placed down to a building: clean the address up and try once more.
        if (lookup.status === 'not_found' || lookup.hit.precision !== 'building') {
            const cleanedQuery = await cleanAddressQuery(address);

            if (cleanedQuery && cleanedQuery.toLowerCase() !== address.toLowerCase()) {
                const retry = await geocodeAddress(cleanedQuery, mapsKey, GEOCODE_TIMEOUT_MS);

                // Keep the retry when it is the better answer: any hit beats
                // none, and a building beats an area.
                const retryIsBetter =
                    retry.status === 'found' &&
                    (lookup.status !== 'found' || retry.hit.precision === 'building');

                if (retryIsBetter) {
                    lookup = retry;
                    searchQueryUsed = cleanedQuery;
                }
            }
        }

        if (lookup.status !== 'found') {
            return NextResponse.json({
                success: false,
                error: 'Could not resolve address to coordinates',
            });
        }

        const geoLocation: GeoLocation = {
            lat: lookup.hit.lat,
            lng: lookup.hit.lng,
            formattedAddress: lookup.hit.formattedAddress,
            searchQueryUsed,
            precision: lookup.hit.precision,
        };

        return NextResponse.json({
            success: true,
            data: geoLocation,
        });

    } catch (error) {
        console.error('[/api/geocode] Error:', error instanceof Error ? error.message : 'unknown error');
        return failure('Failed to geocode address', 500);
    }
}
