import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

export const revalidate = 60;

export async function GET() {
    try {
        const posts = await getSortedPostsData();
        // Return only the fields needed for searching to minimize payload size
        const searchData = posts.map(post => ({
            slug: post.slug,
            title: post.title,
            date: post.date,
            description: post.description || '',
            category: post.category || ''
        }));

        return NextResponse.json(searchData);
    } catch (error) {
        console.error('Failed to fetch posts for search API:', error);
        return NextResponse.json([], { status: 500 });
    }
}
