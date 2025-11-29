import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

Keep responses conversational and helpful.`;

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Build messages list with system prompt
    const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: context && context.length > 0
          ? `${SYSTEM_PROMPT}\n\nRelevant information:\n${context.map((doc: { content: string }) => `- ${doc.content}`).join('\n')}`
          : SYSTEM_PROMPT,
      },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME || 'gpt-4o-mini',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content || '',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

