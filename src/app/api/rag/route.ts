import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { getAllBlogs } from '@/lib/blog';

export interface KnowledgeDoc {
  content: string;
  title: string;
  source: string;
  relevanceScore?: number;
}

// FAQ data extracted from FAQ component
const faqs = [
  {
    question: "How much does a 3kW solar system cost in Dhule?",
    answer: "A standard 3kW on-grid solar system typically ranges from ₹1.8 Lakh to ₹2.2 Lakh before subsidy. Prices vary based on component brands (panels, inverters) and site conditions. Contact us for a precise quote tailored to your roof."
  },
  {
    question: "What subsidies are available in Maharashtra?",
    answer: "Under the PM Surya Ghar Muft Bijli Yojana, residential consumers can get subsidies up to ₹30,000 per kW for the first 2kW and ₹18,000 for additional capacity up to 3kW. We assist with the entire application process."
  },
  {
    question: "How many units will a 3kW system generate?",
    answer: "In Maharashtra's climate, a 3kW system generates approximately 12-15 units per day, or about 360-450 units per month, depending on sunlight availability and panel efficiency."
  },
  {
    question: "What is the warranty on your solar systems?",
    answer: "We provide a standard 25-year performance warranty on solar panels and a 5-10 year warranty on inverters, backed by the respective manufacturers. Our installation workmanship is also guaranteed."
  },
  {
    question: "Do I need batteries for my solar system?",
    answer: "For on-grid systems (most common in cities), batteries are not required as you export excess power to the grid. Off-grid or hybrid systems require batteries for backup during power cuts."
  },
  {
    question: "How much roof space is required?",
    answer: "Approximately 100 sq. ft. of shadow-free area is required for every 1kW of solar capacity. So, a 3kW system would need about 300 sq. ft. of clear roof space."
  }
];

/**
 * Simple keyword-based search for RAG context retrieval
 * Searches across products, blogs, and FAQ
 * This runs server-side so it can use fs to read blog files
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, limit = 3 } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const queryLower = query.toLowerCase();
    // Extract meaningful words (length > 2, filter common stop words)
    const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'as', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'where', 'when', 'why', 'how']);
    const queryWords = queryLower
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
      .map(w => w.replace(/[^\w]/g, '')); // Remove punctuation

    if (queryWords.length === 0) {
      return NextResponse.json({ results: [] });
    }

    const results: KnowledgeDoc[] = [];

    // Search in products
    products.forEach(product => {
      const productText = `${product.name} ${product.description} ${product.shortDescription} ${product.features.join(' ')} ${Object.values(product.specifications).join(' ')} ${product.category}`.toLowerCase();
      const matches = queryWords.filter(word => productText.includes(word)).length;
      
      if (matches > 0) {
        const content = `${product.name}: ${product.description}. Features: ${product.features.join(', ')}. Specifications: ${Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join(', ')}`;
        results.push({
          content,
          title: product.name,
          source: `product:${product.slug}`,
          relevanceScore: matches,
        });
      }
    });

    // Search in blog content (server-side, can use fs)
    try {
      const blogs = getAllBlogs();
      blogs.forEach(blog => {
        // Search in title, excerpt, and first 500 chars of content
        const blogText = `${blog.title} ${blog.excerpt} ${blog.content.substring(0, 500)}`.toLowerCase();
        const matches = queryWords.filter(word => blogText.includes(word)).length;
        
        if (matches > 0) {
          // Use excerpt + first part of content for context
          const content = `${blog.title}: ${blog.excerpt}. ${blog.content.substring(0, 300)}...`;
          results.push({
            content,
            title: blog.title,
            source: `blog:${blog.slug}`,
            relevanceScore: matches,
          });
        }
      });
    } catch (error) {
      console.error('Error loading blogs for RAG:', error);
    }

    // Search in FAQ
    faqs.forEach(faq => {
      const faqText = `${faq.question} ${faq.answer}`.toLowerCase();
      const matches = queryWords.filter(word => faqText.includes(word)).length;
      
      if (matches > 0) {
        results.push({
          content: `Q: ${faq.question} A: ${faq.answer}`,
          title: faq.question,
          source: 'faq',
          relevanceScore: matches,
        });
      }
    });

    // Sort by relevance score and return top results
    const sortedResults = results
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, limit);

    return NextResponse.json({ results: sortedResults });
  } catch (error) {
    console.error('RAG API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve context' },
      { status: 500 }
    );
  }
}

