import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

export const revalidate = 60;

export async function GET() {
    try {
        const posts = await getSortedPostsData();

        // Optimize for Notion API Rate Limits:
        // We only return surface-level metadata (title, category, tags, description)
        // Fetching full block content for every post simultaneously will cause 429 Too Many Requests errors.
        const searchData = posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            date: post.date,
            description: post.description || '',
            category: post.category || '',
            tags: post.tags || [],
            // Intentionally omit full content to protect Notion API limits
            content: ''
        }));

        return NextResponse.json(searchData);
    } catch (error) {
        console.error('Failed to fetch posts for search API:', error);
        return NextResponse.json([], { status: 500 });
    }
}
