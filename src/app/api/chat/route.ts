import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { searchKnowledge } from '@/lib/server/knowledgeSearch';
import { rateLimit } from '@/lib/server/rateLimit';
import { readJsonBody } from '@/lib/server/requestGuards';

function getOpenAIClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const SYSTEM_PROMPT = `You are a helpful sales and education assistant for Ultron Power Systems, a solar EPC (Engineering, Procurement, and Construction) company based in Dhule, Jalgaon, and North Maharashtra, India.

Your role:
- Provide accurate, helpful information about solar energy solutions
- Answer questions about rooftop solar, solar water pumps, inverters, and EPC services
- Help customers understand pricing, subsidies, and financing options
- Be concise, practical, and avoid over-promising
- If you are not sure about specific policy/pricing details, say you will connect the user with a human expert

Important guidelines:
- Be friendly and professional
- Focus on the benefits of solar energy (cost savings, environmental impact)
- Mention that Ultron Power Systems serves Dhule, Jalgaon, and North Maharashtra
- If asked about pricing, mention that prices vary based on system size, components, and site conditions
- Always encourage users to contact the team for personalized quotes and site visits
- Never make specific promises about subsidies or government schemes without recommending they verify with the team
- Only help with solar energy and Ultron Power Systems topics. Politely decline anything else.

Keep responses conversational and helpful.`;

// ---------------------------------------------------------------------------
// Abuse limits. This route is public and unauthenticated, so everything a
// caller can use to make a request bigger or more expensive is bounded here.
// ---------------------------------------------------------------------------

/** Largest request body accepted. A long, genuine conversation is far below this. */
const MAX_BODY_BYTES = 256_000;
/** Only the most recent messages are sent to the model; older ones are dropped. */
const MAX_HISTORY_MESSAGES = 12;
/** Longest message a visitor may send. The chat input enforces the same limit. */
const MAX_USER_MESSAGE_CHARS = 2000;
/** Earlier messages in the history are cut to this length. */
const MAX_HISTORY_MESSAGE_CHARS = 4000;
/** Total characters of conversation sent to the model. */
const MAX_TOTAL_CHARS = 12_000;
/** Hard cap on the length of one reply, in tokens. */
const MAX_OUTPUT_TOKENS = 700;
/** Site content added to the system prompt: documents and characters per document. */
const MAX_CONTEXT_DOCS = 3;
const MAX_CONTEXT_DOC_CHARS = 2000;

type ChatTurn = { role: 'user' | 'assistant'; content: string };

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Validate the caller's messages and reduce them to what is sent to the model.
 * Only `user` and `assistant` turns are accepted: the system prompt is always
 * the one in this file, so a caller cannot replace or extend it.
 */
function prepareConversation(raw: unknown): ChatTurn[] | NextResponse {
  if (!Array.isArray(raw) || raw.length === 0) {
    return errorResponse('Messages array is required', 400);
  }

  const turns: ChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') {
      return errorResponse('Invalid message', 400);
    }
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') {
      return errorResponse('Invalid message role', 400);
    }
    if (typeof content !== 'string') {
      return errorResponse('Invalid message content', 400);
    }
    turns.push({ role, content });
  }

  const latest = turns[turns.length - 1];
  if (latest.role !== 'user' || !latest.content.trim()) {
    return errorResponse('A message is required', 400);
  }
  if (latest.content.length > MAX_USER_MESSAGE_CHARS) {
    return errorResponse(
      `Message is too long. Please keep it under ${MAX_USER_MESSAGE_CHARS} characters.`,
      413
    );
  }

  // Keep the most recent turns, newest first, until a limit is reached.
  const kept: ChatTurn[] = [];
  let totalChars = 0;
  for (let i = turns.length - 1; i >= 0 && kept.length < MAX_HISTORY_MESSAGES; i--) {
    const content = turns[i].content.slice(0, MAX_HISTORY_MESSAGE_CHARS);
    if (!content.trim()) continue;
    if (kept.length > 0 && totalChars + content.length > MAX_TOTAL_CHARS) break;
    totalChars += content.length;
    kept.push({ role: turns[i].role, content });
  }

  return kept.reverse();
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 'chat', { limit: 30, windowMs: 5 * 60_000 });
  if (limited) return limited;

  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return errorResponse('OpenAI API key is not configured', 500);
    }

    const body = await readJsonBody(req, MAX_BODY_BYTES);
    if (!body.ok) {
      return errorResponse(
        body.status === 413
          ? 'This conversation is too long. Please clear the chat and start again.'
          : body.error,
        body.status
      );
    }

    const conversation = prepareConversation(body.data.messages);
    if (conversation instanceof NextResponse) return conversation;

    // Site content relevant to the latest question. It is looked up here, on
    // the server, from this repository's own products, blog and FAQ. Any
    // `context` sent by the caller is ignored, so nothing a caller writes can
    // reach the system prompt.
    const latestQuestion = conversation[conversation.length - 1].content;
    const contextDocs = searchKnowledge(latestQuestion, MAX_CONTEXT_DOCS);

    const systemPrompt = contextDocs.length > 0
      ? `${SYSTEM_PROMPT}\n\nRelevant information:\n${contextDocs
          .map(doc => `- ${doc.content.slice(0, MAX_CONTEXT_DOC_CHARS)}`)
          .join('\n')}`
      : SYSTEM_PROMPT;

    const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...conversation,
    ];

    // Keep chat fast to avoid Vercel timeouts; use a dedicated env var.
    const modelName = process.env.OPENAI_CHAT_MODEL || process.env.OPENAI_MODEL_NAME || 'gpt-4o-mini';

    const completion = await getOpenAIClient().chat.completions.create({
      model: modelName,
      messages: chatMessages,
      max_completion_tokens: MAX_OUTPUT_TOKENS,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      console.error('No content in completion response:', {
        model: modelName,
        finish_reason: completion.choices[0]?.finish_reason,
        usage: completion.usage,
      });
      return errorResponse('No response generated from model', 502);
    }

    return NextResponse.json({
      reply,
    });
  } catch (error: any) {
    // Full detail goes to the server log only. Provider error text and the
    // model name are not returned to anonymous callers.
    console.error('Chat API error:', {
      status: error?.status,
      type: error?.type,
      code: error?.code,
      message: error?.message,
    });

    return errorResponse(
      'The assistant is unavailable right now. Please call or WhatsApp us instead.',
      502
    );
  }
}
