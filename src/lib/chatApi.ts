export interface ChatRequest {
  message: string;
  session_id: string;
  metadata?: {
    page?: string;
    utm_source?: string;
    lang?: string;
    [key: string]: any;
  };
}

export interface ChatResponse {
  reply: string;
  session_id: string;
  sources?: Array<{
    title?: string;
    url?: string;
    snippet?: string;
  }>;
}

export async function sendChatMessage(
  message: string,
  sessionId: string,
  metadata?: ChatRequest['metadata']
): Promise<ChatResponse> {
  const chatApiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;

  if (!chatApiUrl) {
    throw new Error('Chat API URL is not configured. Please set NEXT_PUBLIC_CHAT_API_URL environment variable.');
  }

  try {
    const response = await fetch(`${chatApiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        metadata: metadata || {},
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Chat API error: ${response.status} ${errorText}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send chat message');
  }
}

