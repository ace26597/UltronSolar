/**
 * Model IDs for every AI call the Next.js routes make, in one place.
 *
 * Each ID comes from an environment variable with a current default, so the
 * owner can move to another model from the Vercel dashboard (Project ->
 * Settings -> Environment Variables, then Redeploy) with no code change.
 * Providers retire models on a schedule; when one is announced, set the
 * variable to the replacement.
 *
 *   OPENAI_CHAT_MODEL          /api/chat           (falls back to OPENAI_MODEL_NAME)
 *   OPENAI_BILL_EXTRACT_MODEL  /api/bill-extract   (needs image input + structured outputs)
 *   OPENAI_REASONING_EFFORT    both OpenAI calls   (default "none")
 *   GEMINI_MODEL               /api/geocode        (address clean-up only)
 *
 * The Python image function has its own variables in
 * api/solar/services/image_service.py.
 */

/** OpenAI's low-cost current model: text + image input, structured outputs. */
const DEFAULT_OPENAI_MODEL = 'gpt-6-luna';

/** Google's listed replacement for gemini-2.5-flash. */
const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';

function env(name: string): string | undefined {
    const value = process.env[name]?.trim();
    return value ? value : undefined;
}

export function chatModel(): string {
    return env('OPENAI_CHAT_MODEL') || env('OPENAI_MODEL_NAME') || DEFAULT_OPENAI_MODEL;
}

export function billExtractModel(): string {
    return env('OPENAI_BILL_EXTRACT_MODEL') || DEFAULT_OPENAI_MODEL;
}

export function geminiModel(): string {
    return env('GEMINI_MODEL') || DEFAULT_GEMINI_MODEL;
}

/**
 * Reasoning effort sent with the OpenAI calls.
 *
 * gpt-6-luna is a reasoning model whose default effort is "medium". Reasoning
 * tokens are billed as output and count against `max_completion_tokens`, so
 * with the small output caps these routes use, a reasoning pass could spend
 * the whole allowance and leave an empty answer - and it adds latency inside
 * a 10 second function limit. Both tasks here (a short sales chat, reading
 * fields off a bill) need none, so the default is "none", which OpenAI's
 * model page lists as supported for gpt-6-luna.
 *
 * Not every model accepts "none" (gpt-6-astra and gpt-6.1-sol reject it with
 * HTTP 400). If you switch to such a model, set OPENAI_REASONING_EFFORT to a
 * value it accepts, or to "default" to leave the parameter out entirely - and
 * raise the output caps in the routes, because reasoning will then share them.
 */
export function openAIReasoningEffort(): string | undefined {
    const value = (env('OPENAI_REASONING_EFFORT') || 'none').toLowerCase();
    return value === 'default' ? undefined : value;
}
