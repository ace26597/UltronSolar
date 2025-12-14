/**
 * POST /api/bill-extract
 * Extract bill data from an uploaded electricity bill image using Gemini 2.5 Flash
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BillData } from '@/types/billExtract';

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

        // Parse multipart form data
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { success: false, error: 'Invalid file type. Please upload an image.' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const base64Data = Buffer.from(bytes).toString('base64');

        // Prepare the image part for Gemini
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        };

        // Create the extraction prompt
        const prompt = `
            Analyze this Indian electricity bill image. 
            Extract the following details carefully:
            - Consumer Name
            - Billing Date (or Bill Date)
            - Due Date
            - Units Consumed (Total units)
            - Total Amount Payable
            - Rate per Unit (if explicitly stated, otherwise calculate roughly or put 'N/A')
            - Full Service Address (Include as much detail as possible: House number, Building, Street, Area, City, Pincode)
            - Service Provider Name (e.g., BESCOM, TATA Power, Adani, MSEDCL, etc.)
            - Sanctioned Load: Look for "Sanctioned Load", "SL", "Conn Load". Usually in KW or HP.
            - Plot Area / Premise Area:
              - Look specifically for "Sqft", "Sq. Mtr", "Area". 
              - **DO NOT** use the Sanctioned Load (KW/HP) as the Area. 
              - If an area is found (e.g. 1000 Sqft), include it.
              - If no explicit area is found, leave it empty.
            
            Ensure the address is extracted as completely as possible.
            
            Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
            {
                "consumerName": "extracted name or empty string",
                "billingDate": "extracted date or empty string",
                "dueDate": "extracted date or empty string",
                "unitsConsumed": "extracted units or empty string",
                "totalAmount": "extracted amount or empty string",
                "ratePerUnit": "extracted rate or N/A",
                "address": "extracted full address or empty string",
                "provider": "extracted provider or empty string",
                "sanctionedLoad": "extracted load or empty string",
                "plotArea": "extracted area or empty string"
            }
        `;

        // Call Gemini API
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            return NextResponse.json(
                { success: false, error: 'No data returned from Gemini' },
                { status: 500 }
            );
        }

        // Parse the JSON response - handle potential markdown code blocks
        let jsonText = text.trim();

        // Remove markdown code block if present
        if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
        }

        // Find JSON in the response
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json(
                { success: false, error: 'Could not parse extraction response' },
                { status: 500 }
            );
        }

        const billData: BillData = JSON.parse(jsonMatch[0]);

        return NextResponse.json({
            success: true,
            data: billData,
        });

    } catch (error) {
        console.error('[/api/bill-extract] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to extract bill data',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
