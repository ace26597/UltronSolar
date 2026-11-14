/**
 * Small input guards shared by the public API routes: bounded JSON bodies,
 * bounded strings, and HTML escaping for anything a visitor typed that ends
 * up inside an email.
 */

export type JsonBodyResult =
    | { ok: true; data: Record<string, unknown> }
    | { ok: false; status: 400 | 413; error: string };

/**
 * Read a JSON object body, refusing anything larger than `maxBytes`.
 * The declared Content-Length is checked first so an oversized body is
 * turned away before it is read.
 */
export async function readJsonBody(req: Request, maxBytes: number): Promise<JsonBodyResult> {
    const declared = Number(req.headers.get('content-length') || '0');
    if (Number.isFinite(declared) && declared > maxBytes) {
        return { ok: false, status: 413, error: 'Request is too large.' };
    }

    let text: string;
    try {
        text = await req.text();
    } catch {
        return { ok: false, status: 400, error: 'Invalid request body' };
    }

    if (Buffer.byteLength(text, 'utf8') > maxBytes) {
        return { ok: false, status: 413, error: 'Request is too large.' };
    }

    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        return { ok: false, status: 400, error: 'Invalid request body' };
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return { ok: false, status: 400, error: 'Invalid request body' };
    }

    return { ok: true, data: data as Record<string, unknown> };
}

/** Control characters except tab, line feed and carriage return. */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * A single-line text field: control characters and line breaks removed,
 * whitespace collapsed, trimmed. Returns '' for anything that is not a string.
 */
export function cleanLine(value: unknown): string {
    if (typeof value !== 'string') return '';
    return value
        .replace(CONTROL_CHARS, '')
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

/** A multi-line text field: control characters removed, line breaks kept, trimmed. */
export function cleanText(value: unknown): string {
    if (typeof value !== 'string') return '';
    return value.replace(CONTROL_CHARS, '').replace(/\r\n?/g, '\n').trim();
}

export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * A plain ASCII mailbox: one address, no display name, no comments, no
 * quoting, no lists. Deliberately stricter than RFC 5322 - anything exotic is
 * treated as "no usable address" rather than handed to a mail parser.
 */
const EMAIL_PATTERN =
    /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9_%+-])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

export function isPlainEmailAddress(value: string): boolean {
    if (value.length > 254) return false;
    if (value.includes('..')) return false;
    return EMAIL_PATTERN.test(value);
}

/** A finite number inside [min, max], or undefined. Accepts numbers only, not numeric strings. */
export function numberInRange(value: unknown, min: number, max: number): number | undefined {
    if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
    if (value < min || value > max) return undefined;
    return value;
}
