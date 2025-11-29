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

    const modelName = process.env.OPENAI_MODEL_NAME || 'gpt-4o-mini';
    
    // Validate model name - common valid models
    const validModels = ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-4', 'gpt-5.1', 'gpt-5.1-mini'];
    if (!validModels.includes(modelName) && !modelName.startsWith('gpt-')) {
      console.warn(`Warning: Model name "${modelName}" may not be valid. Using default gpt-4o-mini.`);
    }
    
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    
    if (!reply) {
      console.error('No content in completion response:', completion);
      return NextResponse.json(
        { error: 'No response generated from model' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Provide more detailed error information
    let errorMessage = 'Failed to generate response';
    let statusCode = 500;
    
    // OpenAI SDK error format
    if (error?.error) {
      // OpenAI API error object
      statusCode = error.status || error.error.status || 500;
      errorMessage = error.error.message || error.message || errorMessage;
      console.error('OpenAI API error:', error.error);
    } else if (error?.response) {
      // Alternative error format
      statusCode = error.response.status || 500;
      errorMessage = error.response.data?.error?.message || error.message || errorMessage;
      console.error('OpenAI API error details:', error.response.data);
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        model: process.env.OPENAI_MODEL_NAME || 'gpt-4o-mini',
        details: process.env.NODE_ENV === 'development' ? {
          message: error?.message,
          status: error?.status,
          type: error?.type,
        } : undefined
      },
      { status: statusCode }
    );
  }
}

