/**
 * Address -> coordinates with the Google Geocoding API.
 *
 * Coordinates returned by this module always come from Google's geocoder.
 * Nothing here estimates, defaults or fills in a location: when the geocoder
 * has no usable answer the result is "not_found" or "unavailable".
 *
 * This file has no imports on purpose, so it can be exercised directly with
 * Node's TypeScript support without a test framework.
 */

/**
 * How exact a match is.
 *  - "building":    Google matched the whole address down to a building.
 *  - "approximate": Google matched only part of the address, or matched an
 *                   area (street, neighbourhood, town, pincode). Good enough
 *                   to know the town; not good enough to say which roof.
 */
export type GeocodePrecision = 'building' | 'approximate';

export interface GeocodeHit {
    lat: number;
    lng: number;
    formattedAddress: string;
    precision: GeocodePrecision;
}

export type GeocodeLookup =
    | { status: 'found'; hit: GeocodeHit }
    | { status: 'not_found' }
    | { status: 'unavailable'; reason: string };

/** Result types that identify a single building or address point. */
const BUILDING_TYPES = ['street_address', 'premise', 'subpremise', 'establishment', 'point_of_interest'];

/** Result types too coarse to be a location at all (the country or a whole state). */
const TOO_COARSE_TYPES = ['country', 'administrative_area_level_1'];

/** Requests are restricted to India; anything outside this box is not a valid answer. */
const INDIA_BOUNDS = { minLat: 6, maxLat: 38, minLng: 68, maxLng: 98 };

/**
 * Turn a Geocoding API response body into a lookup result.
 * Response format: https://developers.google.com/maps/documentation/geocoding/requests-geocoding
 */
export function interpretGeocodeResponse(payload: unknown): GeocodeLookup {
    if (!payload || typeof payload !== 'object') {
        return { status: 'unavailable', reason: 'malformed response' };
    }
    const body = payload as { status?: unknown; results?: unknown; error_message?: unknown };

    if (body.status === 'ZERO_RESULTS') {
        return { status: 'not_found' };
    }
    if (body.status !== 'OK') {
        // REQUEST_DENIED, OVER_QUERY_LIMIT, OVER_DAILY_LIMIT, INVALID_REQUEST, UNKNOWN_ERROR
        const detail = typeof body.error_message === 'string' ? `: ${body.error_message}` : '';
        return { status: 'unavailable', reason: `${String(body.status)}${detail}` };
    }

    const first = Array.isArray(body.results) ? body.results[0] : undefined;
    if (!first || typeof first !== 'object') {
        return { status: 'not_found' };
    }

    const result = first as {
        formatted_address?: unknown;
        partial_match?: unknown;
        types?: unknown;
        geometry?: { location?: { lat?: unknown; lng?: unknown }; location_type?: unknown };
    };

    const lat = result.geometry?.location?.lat;
    const lng = result.geometry?.location?.lng;
    if (typeof lat !== 'number' || typeof lng !== 'number' || !Number.isFinite(lat) || !Number.isFinite(lng)) {
        return { status: 'not_found' };
    }
    if (
        lat < INDIA_BOUNDS.minLat || lat > INDIA_BOUNDS.maxLat ||
        lng < INDIA_BOUNDS.minLng || lng > INDIA_BOUNDS.maxLng
    ) {
        return { status: 'not_found' };
    }

    const types = Array.isArray(result.types) ? result.types.filter((t): t is string => typeof t === 'string') : [];

    // With a country filter the geocoder answers an unknown address with the
    // country itself. That is "we do not know where this is", not a location.
    if (types.some(type => TOO_COARSE_TYPES.includes(type))) {
        return { status: 'not_found' };
    }

    const isBuildingLevel =
        result.geometry?.location_type === 'ROOFTOP' ||
        types.some(type => BUILDING_TYPES.includes(type));
    const isFullMatch = result.partial_match !== true;

    return {
        status: 'found',
        hit: {
            lat,
            lng,
            formattedAddress: typeof result.formatted_address === 'string' ? result.formatted_address : '',
            precision: isBuildingLevel && isFullMatch ? 'building' : 'approximate',
        },
    };
}

/**
 * True when every word of `query` already appears in `address`.
 *
 * Used on the search query a language model derives from a bill address. The
 * model is only allowed to remove noise; if its answer contains a word that
 * is not in the original text (a building or town it "remembered"), geocoding
 * that answer would return a real-looking location for an address the
 * customer never gave. Such answers are discarded.
 */
export function usesOnlyWordsFrom(query: string, address: string): boolean {
    const haystack = address.toLowerCase();
    const words = query
        .toLowerCase()
        .split(/[^\p{L}\p{M}\p{N}]+/u)
        .filter(word => word.length > 0);
    return words.length > 0 && words.every(word => haystack.includes(word));
}

/**
 * Look one address up. Never throws: network errors and timeouts come back
 * as "unavailable".
 */
export async function geocodeAddress(
    address: string,
    apiKey: string,
    timeoutMs: number
): Promise<GeocodeLookup> {
    const params = new URLSearchParams({
        address,
        components: 'country:IN',
        region: 'in',
        language: 'en',
        key: apiKey,
    });

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`,
            { signal: AbortSignal.timeout(timeoutMs), cache: 'no-store' }
        );
        // The Geocoding API reports most failures in the body with HTTP 200,
        // but quota and auth problems can also arrive as 4xx/5xx with a body.
        const payload: unknown = await response.json().catch(() => null);
        if (payload === null) {
            return { status: 'unavailable', reason: `HTTP ${response.status}` };
        }
        return interpretGeocodeResponse(payload);
    } catch (error) {
        // Deliberately not logging the error object: it can carry the request URL, which holds the key.
        const name = error instanceof Error ? error.name : 'Error';
        return { status: 'unavailable', reason: `request failed (${name})` };
    }
}
