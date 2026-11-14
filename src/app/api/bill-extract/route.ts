/**
 * POST /api/bill-extract
 * Extract bill data from an uploaded electricity bill image using an OpenAI vision model
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { BillData } from '@/types/billExtract';
import { billExtractModel, openAIReasoningEffort } from '@/lib/aiModels';
import { rateLimit } from '@/lib/server/rateLimit';
import { cleanLine } from '@/lib/server/requestGuards';

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

// ---------------------------------------------------------------------------
// Abuse limits. Public, unauthenticated route that calls a paid vision model.
// ---------------------------------------------------------------------------

/** Largest image accepted. Vercel itself refuses request bodies above 4.5 MB. */
const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;
/** Room for the multipart envelope around the file. */
const MAX_BODY_BYTES = MAX_UPLOAD_BYTES + 64 * 1024;
/** Hard cap on the model's answer. The JSON it returns is a few hundred tokens. */
const MAX_OUTPUT_TOKENS = 1000;
/** Longest value kept for any extracted field. */
const MAX_FIELD_CHARS = 500;

const UPLOAD_HELP = 'Please upload a JPG, PNG or WebP photo of your bill.';

/** The fields the model must return. Every one is a string; empty when not on the bill. */
const BILL_FIELDS = [
    'consumerName',
    'billingDate',
    'dueDate',
    'unitsConsumed',
    'totalAmount',
    'ratePerUnit',
    'address',
    'provider',
    'sanctionedLoad',
    'plotArea',
] as const;

/** Structured Outputs schema: the model can only answer with exactly these fields. */
const BILL_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [...BILL_FIELDS],
    properties: Object.fromEntries(BILL_FIELDS.map(name => [name, { type: 'string' }])),
};

/**
 * Identify the image from its first bytes rather than trusting the
 * Content-Type the caller declared. Only formats the vision model accepts.
 */
function sniffImageType(bytes: Buffer): 'image/jpeg' | 'image/png' | 'image/webp' | null {
    if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
        return 'image/jpeg';
    }
    if (
        bytes.length >= 8 &&
        bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    ) {
        return 'image/png';
    }
    if (
        bytes.length >= 12 &&
        bytes.subarray(0, 4).toString('latin1') === 'RIFF' &&
        bytes.subarray(8, 12).toString('latin1') === 'WEBP'
    ) {
        return 'image/webp';
    }
    return null;
}

/** Keep only the fields the frontend uses, as bounded single-line strings. */
function toBillData(raw: unknown): BillData {
    const source = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
    const field = (key: string): string => {
        const value = source[key];
        const text = typeof value === 'number' ? String(value) : cleanLine(value);
        return text.slice(0, MAX_FIELD_CHARS);
    };

    return {
        consumerName: field('consumerName'),
        billingDate: field('billingDate'),
        dueDate: field('dueDate'),
        unitsConsumed: field('unitsConsumed'),
        totalAmount: field('totalAmount'),
        ratePerUnit: field('ratePerUnit'),
        address: field('address'),
        provider: field('provider'),
        sanctionedLoad: field('sanctionedLoad'),
        plotArea: field('plotArea'),
    };
}

function failure(error: string, status: number) {
    return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
    const limited = rateLimit(request, 'bill-extract', { limit: 10, windowMs: 10 * 60_000 });
    if (limited) return limited;

    try {
        // Check for API key
        if (!process.env.OPENAI_API_KEY) {
            return failure('OPENAI_API_KEY not configured', 500);
        }

        // Turn away oversized uploads before reading them.
        const declaredLength = Number(request.headers.get('content-length') || '0');
        if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
            return failure('Image is too large. Please upload a photo smaller than 4.5 MB.', 413);
        }

        // Parse multipart form data
        let formData: FormData;
        try {
            formData = await request.formData();
        } catch {
            return failure('No file uploaded', 400);
        }
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
            return failure('No file uploaded', 400);
        }

        if (file.size === 0) {
            return failure('The uploaded file is empty.', 400);
        }

        if (file.size > MAX_UPLOAD_BYTES) {
            return failure('Image is too large. Please upload a photo smaller than 4.5 MB.', 413);
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return failure('Invalid file type. Please upload an image.', 400);
        }

        const bytes = Buffer.from(await file.arrayBuffer());
        const imageType = sniffImageType(bytes);
        if (!imageType) {
            return failure(`This image format is not supported. ${UPLOAD_HELP}`, 400);
        }

        // Convert file to base64
        const base64Data = bytes.toString('base64');

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

        // Model and reasoning effort come from environment variables (see lib/aiModels).
        const reasoningEffort = openAIReasoningEffort();

        // Call OpenAI API. Request shape for current models on Chat Completions:
        // `max_completion_tokens` (not the deprecated `max_tokens`), Structured
        // Outputs via `json_schema` (preferred over the older `json_object`
        // JSON mode), and no `temperature` (reasoning models may reject it).
        const response = await openai.chat.completions.create({
            model: billExtractModel(),
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${imageType};base64,${base64Data}`,
                            },
                        },
                    ],
                },
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "electricity_bill",
                    strict: true,
                    schema: BILL_SCHEMA,
                },
            },
            max_completion_tokens: MAX_OUTPUT_TOKENS,
            ...(reasoningEffort
                ? { reasoning_effort: reasoningEffort as OpenAI.ReasoningEffort }
                : {}),
        });

        const text = response.choices[0]?.message?.content;

        if (!text) {
            console.error('[/api/bill-extract] Empty model response:', {
                finish_reason: response.choices[0]?.finish_reason,
                usage: response.usage,
            });
            return failure('Could not read this bill. Please try a clearer photo.', 502);
        }

        let parsed: unknown;
        try {
            parsed = JSON.parse(text);
        } catch {
            console.error('[/api/bill-extract] Model response was not valid JSON');
            return failure('Could not read this bill. Please try a clearer photo.', 502);
        }

        return NextResponse.json({
            success: true,
            data: toBillData(parsed),
        });

    } catch (error) {
        // Detail stays in the server log; provider error text is not returned to callers.
        console.error('[/api/bill-extract] Error:', error);
        return failure('Failed to extract bill data', 500);
    }
}
