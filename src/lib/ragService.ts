export interface KnowledgeDoc {
  content: string;
  title: string;
  source: string;
  relevanceScore?: number;
}

/**
 * Client-side function to retrieve RAG context
 * Calls the server-side API route that can use fs to read blog files
 */
export async function retrieveContext(query: string, limit: number = 3): Promise<KnowledgeDoc[]> {
  try {
    const response = await fetch('/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, limit }),
    });

    if (!response.ok) {
      throw new Error(`RAG API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error retrieving RAG context:', error);
    return [];
  }
}

