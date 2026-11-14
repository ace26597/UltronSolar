/**
 * Keyword search over the site's own content (products, blog posts, FAQ).
 *
 * Server-only: it reads blog files from disk. Used by /api/rag (which the chat
 * widget calls to show sources) and by /api/chat, which runs the same search
 * itself so that the text placed in the model's system prompt always comes
 * from this repository and never from the caller.
 */

import { products } from '@/data/products';
import { getAllBlogs } from '@/lib/blog';

export interface KnowledgeDoc {
    content: string;
    title: string;
    source: string;
    relevanceScore?: number;
}

/** Longest query that is searched; anything beyond this is ignored. */
export const MAX_QUERY_CHARS = 500;

/** Most documents a single search returns. */
export const MAX_RESULTS = 5;

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

const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'as', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'where', 'when', 'why', 'how']);

/**
 * Simple keyword-based search for RAG context retrieval.
 * Searches across products, blogs, and FAQ.
 */
export function searchKnowledge(query: string, limit: number = 3): KnowledgeDoc[] {
    const cappedLimit = Math.min(Math.max(Math.floor(limit) || 3, 1), MAX_RESULTS);
    const queryLower = query.slice(0, MAX_QUERY_CHARS).toLowerCase();

    // Extract meaningful words (length > 2, filter common stop words)
    const queryWords = queryLower
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w))
        .map(w => w.replace(/[^\w]/g, '')); // Remove punctuation

    if (queryWords.length === 0) {
        return [];
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
    return results
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, cappedLimit);
}
