/**
 * POST /api/bill-extract
 * Extract bill data from an uploaded electricity bill image using OpenAI GPT-4o
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { BillData } from '@/types/billExtract';

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
    try {
        // Check for API key
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { success: false, error: 'OPENAI_API_KEY not configured' },
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

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${file.type};base64,${base64Data}`,
                            },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
        });

        const text = response.choices[0].message.content;

        if (!text) {
            return NextResponse.json(
                { success: false, error: 'No data returned from OpenAI' },
                { status: 500 }
            );
        }

        const billData: BillData = JSON.parse(text);

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
