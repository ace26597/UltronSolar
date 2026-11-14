import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/server/knowledgeSearch';
import { rateLimit } from '@/lib/server/rateLimit';
import { readJsonBody } from '@/lib/server/requestGuards';

/**
 * POST /api/rag
 * Keyword search over products, blog posts and FAQ. The chat widget calls it
 * to show sources; the search itself lives in lib/server/knowledgeSearch.
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 'rag', { limit: 60, windowMs: 5 * 60_000 });
  if (limited) return limited;

  try {
    const body = await readJsonBody(req, 16_000);
    if (!body.ok) {
      return NextResponse.json({ error: body.error }, { status: body.status });
    }

    const { query, limit } = body.data;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // searchKnowledge caps the query length and the number of results itself.
    const results = searchKnowledge(query, typeof limit === 'number' ? limit : 3);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('RAG API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve context' },
      { status: 500 }
    );
  }
}
