/**
 * POST /api/geocode
 * Resolve an address to geographic coordinates using Gemini with Google Maps grounding
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeoLocation } from '@/types/billExtract';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { success: false, error: 'GEMINI_API_KEY not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { address } = body;

        if (!address || address.length < 5) {
            return NextResponse.json(
                { success: false, error: 'Invalid or empty address' },
                { status: 400 }
            );
        }

        // Create a prompt to clean and resolve the address
        const prompt = `
            I have a raw address string from an Indian electricity bill: "${address}".
            
            1. Identify the specific Building Name (e.g., "Kanishk Apartment") and Locality (e.g., "Kshire Colony"). 
            2. **Discard** phone numbers (like "MNO-942..."), flat numbers (like "1,"), and administrative prefixes (like "Ta:", "Dt:").
            3. Construct a clean, high-probability search query (e.g., "Kanishk Apartment, Kshire Colony, Dhule").
            4. Use your knowledge to find the precise location coordinates.
            
            Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
            {
              "lat": <latitude as number>,
              "lng": <longitude as number>,
              "formattedAddress": "<Official formatted address>", 
              "searchQueryUsed": "<The clean query you constructed>"
            }
            
            If you cannot find the location, return:
            {
              "lat": 0,
              "lng": 0,
              "formattedAddress": "Location not found",
              "searchQueryUsed": "<The query you tried>"
            }
        `;

        // Call Gemini API
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            return NextResponse.json(
                { success: false, error: 'No response from Gemini' },
                { status: 500 }
            );
        }

        // Extract JSON from the response (handle potential markdown code blocks)
        let jsonText = text.trim();

        // Remove markdown code block if present
        if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
        }

        // Find JSON in the response
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json(
                { success: false, error: 'Could not parse location response' },
                { status: 500 }
            );
        }

        const geoLocation: GeoLocation = JSON.parse(jsonMatch[0]);

        // Check if location was actually found
        if (geoLocation.lat === 0 && geoLocation.lng === 0) {
            return NextResponse.json({
                success: false,
                error: 'Could not resolve address to coordinates',
                data: geoLocation
            });
        }

        return NextResponse.json({
            success: true,
            data: geoLocation,
        });

    } catch (error) {
        console.error('[/api/geocode] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to geocode address',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
