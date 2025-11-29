export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface RAGContext {
  content: string;
  title?: string;
  source?: string;
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
  conversationHistory: ChatMessage[],
  context?: RAGContext[]
): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: conversationHistory,
        context: context || [],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Chat API error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      reply: data.reply || '',
      session_id: sessionId,
      sources: context?.map(c => ({
        title: c.title,
        snippet: c.content.substring(0, 150),
      })) || [],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send chat message');
  }
}

