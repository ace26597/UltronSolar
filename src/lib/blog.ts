import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

import { getAuthor, Author } from '@/data/authors';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    authorDetails?: Author;
    date: string;
    imageUrl: string;
    containerImageUrl?: string;
    footerImageUrl?: string;
    readTime: string;
    tags: string[];
}

export function getSortedPostsData(): Omit<BlogPost, 'content' | 'authorDetails'>[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            slug: id,
            ...matterResult.data,
        } as Omit<BlogPost, 'content' | 'authorDetails'>;
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Fetch author details
    const authorName = (matterResult.data.author as string) || 'Ultron Solar Team';
    const authorDetails = getAuthor(authorName);

    // Combine the data with the id and contentHtml
    return {
        id: slug,
        slug,
        content: contentHtml,
        authorDetails,
        ...matterResult.data,
    } as BlogPost;
}

export interface BlogPostForRAG {
    title: string;
    content: string;
    slug: string;
    excerpt: string;
}

export function getAllBlogs(): BlogPostForRAG[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allBlogs = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Return raw markdown content (not HTML) for RAG search
        return {
            title: (matterResult.data.title as string) || '',
            content: matterResult.content, // Raw markdown content
            slug: id,
            excerpt: (matterResult.data.excerpt as string) || '',
        } as BlogPostForRAG;
    });

    return allBlogs;
}