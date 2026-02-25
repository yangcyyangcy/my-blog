import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

export const revalidate = 60;

export async function GET() {
    try {
        const posts = await getSortedPostsData();
        // Fetch full content for all posts to enable deep searching
        // Note: For very large blogs, this approach might need optimization (like Algolia), 
        // but for a lightweight API, Promise.all is sufficient.
        const searchData = await Promise.all(
            posts.map(async (post) => {
                // We must use getPostData to get the actual content/blocks from Notion
                try {
                    const postFull = await import('@/lib/posts').then(mod => mod.getPostData(post.slug));
                    return {
                        slug: post.slug,
                        title: post.title,
                        date: post.date,
                        description: post.description || '',
                        category: post.category || '',
                        // Lowercase the raw HTML content for easier client-side searching
                        content: postFull.contentHtml ? postFull.contentHtml.replace(/<[^>]*>?/gm, '') : ''
                    };
                } catch (e) {
                    // Fallback to basic metadata if block fetching fails
                    return {
                        slug: post.slug,
                        title: post.title,
                        date: post.date,
                        description: post.description || '',
                        category: post.category || '',
                        content: ''
                    };
                }
            })
        );

        return NextResponse.json(searchData);
    } catch (error) {
        console.error('Failed to fetch posts for search API:', error);
        return NextResponse.json([], { status: 500 });
    }
}
